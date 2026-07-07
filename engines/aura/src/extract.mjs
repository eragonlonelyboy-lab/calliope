// AURA extraction: a clean-room Playwright DOM walk. Loads a URL, reads
// getComputedStyle off every rendered element, and returns weighted, context-tagged
// observations (color with a role hint, type, spacing, radius, shadow). This is the
// commodity layer; the judgment in color.mjs / scale.mjs is where the value lives.
//
// getComputedStyle is a universal browser API. Nothing here is derived from another
// tool's source; the technique is owed to no one.

import { chromium } from 'playwright';

/**
 * @param {string} url
 * @param {{viewport?:{width:number,height:number}, timeoutMs?:number, maxElements?:number, waitMs?:number}} opts
 * @returns {Promise<object>} raw observations + meta
 */
export async function extractSite(url, opts = {}) {
  const {
    viewport = { width: 1440, height: 900 },
    timeoutMs = 45000,
    maxElements = 6000,
    waitMs = 1200,
  } = opts;

  const browser = await chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: timeoutMs }).catch(async () => {
      // networkidle can hang on sites with long-poll/analytics; fall back to load.
      await page.goto(url, { waitUntil: 'load', timeout: timeoutMs });
    });
    // Nudge lazy content: scroll through the page once, then settle.
    await autoScroll(page);
    await page.waitForTimeout(waitMs);

    const raw = await page.evaluate(collectFromDom, { maxElements });
    const title = await page.title().catch(() => '');
    return { url, title, viewport, ...raw };
  } finally {
    await browser.close();
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, window.innerHeight);
        y += window.innerHeight;
        if (y >= document.body.scrollHeight || y > 20000) { window.scrollTo(0, 0); resolve(); }
        else setTimeout(step, 60);
      };
      step();
    });
  }).catch(() => {});
}

// Runs in the browser. Must be self-contained (no external refs).
function collectFromDom({ maxElements }) {
  const colors = [];       // {value, weight, roleHints}
  const fontSizes = [];     // {value, weight}
  const families = new Map();
  const weights = new Map();
  const lineHeights = [];
  const letterSpacings = [];
  const spacings = [];      // {value, weight}
  const radii = [];         // {value, weight}
  const shadows = new Map();

  const els = Array.from(document.querySelectorAll('*')).slice(0, maxElements);
  for (const el of els) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    const area = Math.max(0, rect.width) * Math.max(0, rect.height);
    if (area === 0 && el.childElementCount > 0) continue;

    const areaWeight = clamp(1 + Math.log2(1 + area / 5000), 1, 8);
    const text = (el.textContent || '').trim();
    const ownText = directText(el).length;

    // Background color: weighted by painted area (prominence).
    const bg = cs.backgroundColor;
    if (paintable(bg)) colors.push({ value: bg, weight: areaWeight, roleHints: { background: 1 } });

    // Text color: only where this element paints its own text.
    if (ownText > 0) {
      colors.push({ value: cs.color, weight: clamp(1 + ownText / 40, 1, 6), roleHints: { text: 1 } });
      pushNum(fontSizes, cs.fontSize, 1 + ownText / 80);
      const fam = primaryFamily(cs.fontFamily);
      if (fam) families.set(fam, (families.get(fam) || 0) + 1 + ownText / 80);
      const fw = cs.fontWeight;
      if (fw) weights.set(fw, (weights.get(fw) || 0) + 1);
      pushNum(lineHeights, cs.lineHeight, 1);
      if (cs.letterSpacing && cs.letterSpacing !== 'normal') pushNum(letterSpacings, cs.letterSpacing, 1);
    }

    // Borders: color hint + radius.
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(cs['border' + side + 'Width']);
      if (w > 0) {
        const bc = cs['border' + side + 'Color'];
        if (paintable(bc)) colors.push({ value: bc, weight: 1, roleHints: { border: 1 } });
      }
    }
    pushNum(radii, cs.borderTopLeftRadius, 1);

    // Spacing: padding + gap are intentional system spacing; margins are noisier but count.
    for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']) pushNum(spacings, cs[p], 1);
    if (cs.rowGap && cs.rowGap !== 'normal') pushNum(spacings, cs.rowGap, 1.5);
    if (cs.columnGap && cs.columnGap !== 'normal') pushNum(spacings, cs.columnGap, 1.5);

    // Shadows.
    if (cs.boxShadow && cs.boxShadow !== 'none') shadows.set(cs.boxShadow, (shadows.get(cs.boxShadow) || 0) + 1);
  }

  return {
    elementCount: els.length,
    colors,
    fontSizes,
    fontFamilies: mapToArr(families),
    fontWeights: mapToArr(weights),
    lineHeights,
    letterSpacings,
    spacings,
    radii,
    shadows: mapToArr(shadows),
  };

  // --- browser-scope helpers ---
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function paintable(c) {
    if (!c) return false;
    if (c === 'transparent' || c === 'rgba(0, 0, 0, 0)') return false;
    return true;
  }
  function pushNum(arr, cssValue, weight) {
    const n = parseFloat(cssValue);
    if (Number.isFinite(n) && n >= 0) arr.push({ value: n, weight });
  }
  function primaryFamily(ff) {
    if (!ff) return null;
    const first = ff.split(',')[0].trim().replace(/^["']|["']$/g, '');
    const generic = ['serif', 'sans-serif', 'monospace', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', '-apple-system'];
    return generic.includes(first.toLowerCase()) ? null : first;
  }
  function directText(el) {
    let s = '';
    for (const node of el.childNodes) if (node.nodeType === 3) s += node.textContent;
    return s.trim();
  }
  function mapToArr(m) { return [...m.entries()].map(([value, weight]) => ({ value, weight })).sort((a, b) => b.weight - a.weight); }
}
