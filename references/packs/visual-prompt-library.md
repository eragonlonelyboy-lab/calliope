# Pack: visual prompt library

A harvested, reusable library of image-generation and copy prompts CALLIOPE draws from during production. Each entry is a fill-in-the-[BRACKET] template: a distilled skeleton keeping the load-bearing art-direction levers, not the full source prose. Pick the entry that matches the deliverable, fill the brackets from the locked brief, then generate.

Note on flags and Avoid lists: parameter flags and per-prompt Avoid lists are art-direction levers, not decoration. Version pinning (`--v 6.1`, `--niji 6`) is a reproducibility lever: without it a model update silently changes the output. Midjourney weights `--no` far more strongly than the same words written as prose, so a prose negative is not a substitute. Do not strip either when condensing a prompt.

This is raw material, not a license to freestyle. Every output still passes CALLIOPE's quality gate (the Creative Director final review and the eight core-bar dimensions) and the Demiurge Visual Standard. When a template's default (palette, lighting mood, type feel) conflicts with the engagement's brand system, the brand system wins: swap the bracket values to the kit's tokens, never let a stock prompt override locked brand style. Route to whatever generator the engagement is wired to at Phase 0.

## 1. Brand marks and logos

Reduction rules apply: every mark must survive the reduction battery (16px favicon, one-color black and white). Keep prompts asking for flat vector, single color, invisible grid, isolated mark, no text unless a wordmark.

**[58] Minimal vector logo mark.** Primary symbol for a new identity.
`Minimalist vector logo mark for [BRAND], which [WHAT IT DOES]. Concept: [SYMBOL IDEA]. Reductive geometric, single uniform stroke OR solid flat fill, one color [COLOR] on white, deliberate negative space carrying a second meaning, legible at 16px favicon and billboard scale. No wordmark, no shadow, no 3D. --ar 1:1 --v 6.1`

**[119] Bold abstract brand mark.** Fintech/tech symbol built on negative space.
`Abstract geometric brand symbol for [BRAND], few bold interlocking shapes using negative space to suggest [CONCEPT, e.g. motion, connection]. Flat vector, single solid [COLOR] on white, high-contrast silhouette readable at 16px, built on an invisible grid with consistent angles. No text, no gradient, no 3D. --ar 1:1 --v 6.1`

**[116] Geometric tech wordmark.** Name-forward logotype.
`Wordmark logo, exact text "[BRAND]" in a clean rounded geometric sans with optically corrected kerning. Flat vector, smooth horizontal gradient from [COLOR A] to [COLOR B] on white, uniform stroke, shared baseline and cap-height. Wordmark only, spell exactly, no icon, no shadow. --ar 3:1`

**[115] Luxury monogram.** Fashion/beauty/hospitality initials mark.
`Elegant monogram, initials [XY] intertwined into one refined mark, symmetrical geometry, graceful overlap. Minimal flat vector, thin precise uniform linework, carved negative space where letters cross, [matte black on cream]. Isolated, centered, timeless. No ornament, no crest, no wordmark. --ar 1:1 --v 6.1`

**[117] Vintage circular emblem badge.** Heritage/craft brand seal.
`Vintage circular emblem, flat vector Americana line art. Center [ICON, e.g. coffee bean, mountain, anchor] in fine linework inside a double-ring border. Curved text "[BRAND]" top, "[EST. YEAR]" bottom, star separators at sides. Two-tone [cream on deep brown], symmetric, isolated on white. No grunge texture, no gradient. --ar 1:1 --style raw --v 6.1`

**[118] Single-line continuous icon.** Wellness/boutique minimal mark.
`Logo of [SUBJECT, e.g. leaf, face profile, mountain] drawn as one unbroken continuous line. Uniform 2px stroke, rounded caps, no fill, [deep green] on white, centered, calm and premium. No shading, no text, no double lines. --ar 1:1`

## 2. App icons and icon sets

**[59] Premium app icon.** iOS/Android launcher tile with depth.
`App icon for [APP], which [WHAT IT DOES]. One bold glyph for [CORE FUNCTION] on a squircle tile with a diagonal gradient [COLOR A] top-left to [COLOR B] bottom-right, subtle inner shadow and top highlight, matte-modern not glossy. White glyph, generous padding, readable at 40px. 1024x1024, no text. --ar 1:1`

**[120] Rounded-square app icon (flat).** Bold single-color tile variant.
`Squircle app icon for [APP]. One simple [GLYPH, e.g. bolt, leaf, chat bubble] on a solid [COLOR] tile in high-contrast [black or white], flat, generous padding, readable at 40px. 1024x1024, no gradient banding, no text, no border. --ar 1:1`

**[60] Line-icon set (row of 6).** Feature-row iconography.
`Set of 6 minimalist line icons for [CONCEPTS, e.g. speed, security, support, growth, automation, insight], one horizontal row on white. Unified system: single 2px stroke, rounded caps and corners, each on a 24x24 optical grid, single [COLOR], no fill, none heavier than the others. No labels, no containers. --ar 3:2`

**[121] Cohesive UI icon set (4x4 grid).** Full app icon family.
`4x4 grid of 16 line-art UI icons on white: [home, search, profile, settings, cart, heart, bell, calendar, message, camera, lock, star, download, share, play, trash]. Single 2px stroke, rounded caps, each on a shared 24x24 grid, single [COLOR], even gutters, one designed family. No labels, no containers, no color variation. --ar 1:1`

## 3. Product and e-commerce shots

Levers: hero angle, surface, lighting scheme (key/rim/fill), reflection/shadow, label legibility, negative space for copy. Default 4:5, flat-lays 1:1.

**[55] Premium product hero.** Clean commercial pack shot.
`Hero photo of [PRODUCT], single subject, slightly elevated three-quarter angle on [SURFACE] against [BG COLOR] seamless gradient. Softbox key upper-left, strip rim right, bounce fill, soft contact shadow and a faint gradient reflection directly beneath the product. Label razor sharp, materials [KEY MATERIALS] true to life. 100mm macro f9, medium-format clarity. Negative space on [right/top] for headline. 4:5. Avoid: clutter, busy props, harsh blown highlights, distracting reflections, visible seams, text, watermarks, warped or unreadable labels`

**[107] Bottle hero on seamless sweep.** Cosmetics/skincare sweep shot.
`Commercial photo of [FROSTED GLASS BOTTLE + CAP], centered on [PALE-GREY] floor-to-wall sweep, hero angle above eye level. Softbox key upper-left, strip rim right, low bounce fill, mirror reflection and soft contact shadow beneath. Label legible, gentle speculars. Shot on Phase One medium format, 120mm macro f9. Negative space above for headline. 4:5. Avoid: harsh blown highlights, double or messy reflections, dust, fingerprints, warped labels, background seams, extra objects, text, watermarks`

**[114] Moody low-key hero.** Luxury spirits/watch drama.
`Low-key photo of [LUXURY PRODUCT], single hard spotlight carving sculpted highlights and deep shadow. Dark [charcoal] gradient background with faint smoke, wet reflective surface below. Materials [cut crystal, polished metal] luxurious, rich blacks with retained shadow detail. 80mm f2.8. Dark negative space for headline. 4:5. Avoid: flat or muddy lighting, blown highlights, crushed featureless blacks, clutter, distracting reflections, warped label, text, watermarks`

**[108] Frozen splash beauty shot.** High-speed liquid product.
`High-speed photo of [PRODUCT] with a crystalline [liquid] splash frozen mid-motion wrapping around it, droplets suspended, on wet reflective [black acrylic]. Single hard spotlight key with moody falloff and rim. [Charcoal] palette, every droplet razor sharp, label undistorted. 80mm f8. Centered with headline room. 4:5. Avoid: motion blur, muddy or foamy splash, cluttered background, blown highlights, warped label, floating artifacts, text, watermarks`

**[111] Levitating ingredient burst.** Ingredient-story product ad.
`Macro ad photo of [PRODUCT] with key ingredients ([INGREDIENTS]) levitating in a dynamic orbit, motion frozen. Soft [pastel] gradient backdrop, clean studio key + fill, implied contact shadow grounding the cluster. Crisp true texture, vibrant. Macro f8. Headline room. 4:5. Avoid: motion blur, messy or random floating debris, harsh shadows, blown highlights, warped labels, cluttered background, text, watermarks`

**[56] Product in real life.** Lifestyle in-use shot.
`Lifestyle photo of [PRODUCT] in genuine use in [REAL SETTING], hands or shoulders-only model [ACTION]. Product is tack-sharp hero on [right third/center], surroundings soft-blur. Warm directional window light, [PALETTE], lived-in honest details. 35mm f2.0. Negative space for overlay. 4:5. Avoid: obvious stock-photo staging, plastic-looking skin, cluttered background, logos of other brands, distorted or extra fingers, harsh flash, text, watermarks`

**[109] Sunlit lifestyle tabletop.** Backlit editorial product-on-table.
`Lifestyle photo of [PRODUCT] on [SURFACE] beside [PROP], warm morning sun backlighting from behind casting long soft shadows. A hand (no face) enters [ACTION] mid-moment. Shallow DoF, product sharp, warm cohesive [PALETTE], authentic details. 50mm f2.0. Copy space. 4:5. Avoid: stiff staging, plastic skin, distorted or extra fingers, clutter, competing logos, harsh flash, text, watermarks`

**[57] Branded flat-lay scene.** Styled overhead brand story.
`Top-down flat-lay, camera parallel to surface, of [PRODUCT] hero surrounded by [PROPS] in intentional asymmetry with negative space. [SURFACE] background, soft daylight top-left, cohesive [PALETTE], crisp legible label. 50mm f8. Open zone [upper-right/center] for logo. 1:1. Avoid: clutter, competing brand logos, tilted or non-parallel perspective, muddy colors, heavy shadows, text, watermarks`

**[113] Brand flat-lay grid.** Ordered multi-product merchandising.
`Top-down flat-lay of [MULTIPLE PRODUCTS] in an evenly spaced grid on [SURFACE], complementary props tucked between without breaking order. Soft even overhead light, cohesive [PALETTE], every label legible. 50mm f8. Negative space for title. 1:1. Avoid: crooked or misaligned items, tilted perspective, clutter, clashing colors, harsh shadows, competing brand logos, text, watermarks`

**[110] Top-down food flat lay.** Appetizing overhead food hero.
`Overhead food photo of [DISH] hero on [SURFACE] with [napkin/scattered ingredients] and oil droplets for freshness. Soft window light top-left, rich true [PALETTE], crisp texture (herb edges, yolk, grain). 100mm f8. Caption space. 1:1. Avoid: dull or greasy-looking food, harsh shadows, tilted perspective, wilted garnish, clutter, plastic sheen, text, watermarks`

**[112] Embossed packaging mockup.** Blank-panel logo placeholder shot.
`Photoreal mockup of [PACKAGING] on [neutral surface], with a blank embossed panel on the front face as a logo placeholder (soft self-shadow for compositing later). Soft window light right + bounce fill, materials [matte kraft, soft-touch] true, shallow DoF. 90mm f8. 4:5. Avoid: any existing logo or text on the blank panel, warped packaging, harsh shadows, clutter, competing brands, dust, fingerprints, watermarks`

**[84] Clean app UI concept.** SaaS screen inside a device mockup.
`Modern UI concept for a [APP TYPE] app, [SCREEN] screen doing [WHAT IT DOES]. Light mode warm-white, single [ACCENT] for primary actions, generous whitespace, soft card shadows, clear type hierarchy. Real elements: [nav, cards, chart, button, list]. Render inside a [DEVICE] mockup, subtle tilt, neutral studio background. Real readable labels. 16:9 (or 4:5 phone). Avoid: gibberish or garbled text, misaligned elements, cluttered layouts, clashing colors, low contrast, watermarks, lorem-ipsum spilling out of containers`

## 4. Illustration and hero graphics

Levers: style system (isometric, flat vector, watercolor, anime, oil), brand-color anchoring, negative space for headline, no photorealism unless intended.

**[64] Clean isometric illustration.** Tech-brand 3D scene.
`Isometric 3D illustration of [SCENE], true 30-degree orthographic, single object group on [BG COLOR]. Vector-3D, rounded beveled matte-clay shapes, pastels around a [BRAND COLOR] accent, soft top-left key, long contact shadows. Balanced negative space. 1:1. Avoid: text, logos, watermarks, photorealism, busy backgrounds, harsh shadows, warped or non-isometric perspective, clutter`

**[103] Cute isometric diorama.** Collectible miniature toy world.
`Ultra-cute isometric 3D diorama of [SUBJECT] as a toy world on [BG COLOR]. Low-poly rounded chunky forms, tiny props, true isometric 3/4 top-down angle, orthographic feel, tilt-shift miniature effect, warm golden-hour key, soft AO shadows, soft pastels + one accent, matte clay render. Centered. 1:1. Avoid: text, logos, harsh shadows, photorealism, gritty textures, cluttered background, watermark`

**[65] Flat vector hero illustration.** Website hero graphic.
`Flat-design vector hero of [CONCEPT]. Bold geometric shapes, clean linework, subtle paper-grain, palette around [BRAND COLOR] plus one accent (4-5 colors), subject weighted to one side with open negative space opposite for headline and button, soft long shadows. Optimistic. 16:9. Avoid: text, real photos, 3D render, drop-shadow clutter, muddy colors, busy backgrounds, watermarks`

**[105] Flat vector editorial spot.** Article/section spot illustration.
`Flat vector spot illustration of [CONCEPT], corporate-editorial. Bold geometric shapes, sharp linework, grain overlay, limited scheme ([BRAND COLORS] or teal/coral/cream), one accent on the focal element, subject to one side with copy space, off-white background. 3:2. Avoid: text, real photography, 3D render, cluttered detail, muddy or clashing colors, drop-shadow noise, watermark`

**[86] Clean infographic visual.** Process/steps explainer graphic.
`Minimal infographic of [PROCESS], laid out as [STRUCTURE, e.g. 3 connected steps left-to-right]. One flat icon per node, tidy connectors, consistent 2px linework, palette on [BRAND COLOR] + one accent on the key step, soft shadows. Empty zones sized for a headline and per-step labels. 16:9. Avoid: dense paragraphs of text, cluttered decoration, clashing colors, 3D render, photoreal elements, watermark`

**[66] Soft watercolor artwork.** Hand-painted editorial piece.
`Watercolor of [SUBJECT], wet-on-wet washes, soft bleeds and blooms, layered glazes, sparse ink accents, visible cold-press paper, [COLOR] harmony, single focal point most saturated, loose airy edges, off-center. Gallery-grade. 4:5. Avoid: digital-flat look, vector edges, hard outlines, 3D, photorealism, oversaturation, heavy black, harsh borders, text, watermark`

**[102] Watercolor botanical.** Delicate plant illustration.
`Loose watercolor botanical of [PLANT SUBJECT], wet-on-wet feathered bleeds, translucent washes, few dry-brush edges, sparse ink accents, cold-press paper, muted [PALETTE] with granulating pigment, single off-center arcing stem, airy. No hard outlines, no photorealism. 4:5`

**[104] Classical oil portrait.** Old-master painted portrait.
`Half-length oil portrait of [SUBJECT], Dutch Golden Age. Rembrandt light from high camera-left, chiaroscuro, luminous flesh from warm shadow, background near-dark. Oil on linen, visible impasto, glazing, craquelure, earthy [browns/umbers] with one jewel highlight. Museum-quality. --ar 4:5 --style raw --stylize 250 --v 6.1`

**[100] Ghibli countryside.** Warm hand-painted anime landscape.
`Studio Ghibli style illustration of [PEACEFUL SCENE], watercolor-gouache textures, lush painterly foliage, cel shading, warm late-afternoon sun and long shadows, verdant [PALETTE] with one pop color, wide establishing view with clear depth layers. --ar 16:9 --stylize 180 --niji 6 --no sharp vector lines, harsh black outlines, 3D render, photorealism, text, watermark`

**[101] Shinkai twilight.** Wistful photoreal-anime scene.
`Makoto Shinkai style scene: [CHARACTER] alone at [LOCATION] at twilight, low cinematic angle. Sweeping blue-violet-peach sky gradient, luminous clouds, god-rays, bloom, light particles, hyper-detailed environment, saturated blues/purples vs warm amber. Lone figure small against a vast sky. --ar 16:9 --niji 6 --style scenic`

**[106] Cyberpunk anime alley.** Neon-noir illustrated scene.
`Cinematic anime of [CHARACTER] in a rain-soaked neon alley at night, low angle. Glowing holographic signs, cables, steam, wet reflective pavement, magenta/cyan neon, strong rim light, bloom, deep near-black shadows, hyper-detailed. Character as focal point. --ar 16:9 --niji 6 --style scenic`

**[70] Character concept sheet.** Original mascot/character design.
`Concept art of [WHO], [BUILD], wearing [CLOTHING AND GEAR], vibe [VIBE]. Full-body front hero pose, expressive face, distinctive silhouette, [ART STYLE] with believable materials, palette anchored by [ACCENT], soft upper-left key + rim, neutral gradient background, optional prop callout. Concept-art finish. 3:4. Avoid: text labels, watermark, cluttered background, muddy colors, deformed hands, inconsistent proportions`

## 5. Portraits and headshots

Convention for all: `Using [PHOTO] as exact identity reference, keep face, bone structure, and likeness 100% intact, natural realistic skin, unmistakably the same person. Face preservation is priority one, change only [wardrobe/light/setting].` End with `Avoid: waxy/plastic skin, over-smoothing, distorted features, extra fingers, watermarks.` For Midjourney add `--cref [PHOTO URL] --style raw`.

**[52] Studio headshot.** Corporate/LinkedIn identity shot.
`...Professional studio headshot in [WARDROBE], relaxed confident slight smile. Soft three-point octabox key at 45deg + fill + rim, clear catchlights in both eyes, medium-grey seamless backdrop. 85mm f/2, sharp on near eye. 4:5. Avoid: plastic or waxy skin, over-smoothing, harsh on-camera flash, distorted features, extra fingers, text or watermarks`

**[89] Rembrandt studio portrait.** Dramatic fine-art headshot.
`...Rembrandt-lit studio portrait, triangular cheek highlight, soft chiaroscuro, warm key camera-left + cool fill right, deep charcoal backdrop. 85mm f/1.8. Avoid: waxy over-retouched skin, crushed shadow detail, distorted features, watermarks. --ar 4:5 --style raw --stylize 180 --v 6.1`

**[93] Editorial beauty close-up.** Magazine-grade beauty crop.
`...Editorial beauty close-up, butterfly light from octabox above + silver reflector under-glow, even tones keeping pores, glossy lips, crisp catchlights, neutral grey background. 100mm macro f/8. Avoid: airbrushed plastic skin, heavy face-altering retouching, harsh flash, distorted features, watermarks. --ar 4:5 --style raw --stylize 150 --v 6.1`

**[54] On-brand founder portrait.** Personal-brand editorial.
`...Editorial founder portrait, three-quarter, arms loosely crossed, warm confident smile, eye contact. Bright modern [SETTING], soft window light left, hint of [BRAND COLOR] in the blurred background, [WARDROBE]. 35mm f/2.2. 4:5. Avoid: waxy skin, over-retouching, harsh flash, cluttered background, distorted hands, text or watermarks`

**[53] Cinematic golden-hour portrait.** Warm candid outdoor.
`...Candid golden-hour portrait, warm low sun backlighting hair into a rim, soft lens flare, relaxed mid-laugh, eyes off-camera. [SETTING] as creamy bokeh, [WARDROBE]. 50mm f/1.8, film grain, warm grade. 4:5. Avoid: plastic skin, blown-out highlights on the face, over-saturation, distorted features, watermarks`

**[88] Golden-hour headshot.** Warm side-lit headshot.
`...Golden-hour headshot, warm side light + soft rim, dewy skin, relaxed confident look, blurred park sunset bokeh, [WARDROBE]. 85mm f/1.4, warm grade. Avoid over-smoothed plastic skin and blown highlights on the face. --ar 4:5 --style raw --stylize 200 --v 6.1`

**[91] Window-light natural portrait.** Intimate indoor close-up (SDXL).
`...Soft indoor close-up lit by a single window from the left, gentle falloff, calm blurred interior, ultra-detailed skin keeping freckles, sharp eyes. 85mm f/1.8, 8k. 4:5. Negative prompt: plastic skin, over-smoothing, altered features, extra fingers, text, watermark`

**[90] Tokyo rain street portrait.** Moody documentary street.
`...Documentary street portrait walking through Tokyo in light rain at night, neon reflecting in wet pavement, mid-stride, motion blur on a passing figure, one streetlight flare, wet skin/hair, [WARDROBE]. Leica 35mm reportage, Portra 400 grain. Avoid: a staged posed look, plastic skin, over-saturated neon on the face, distorted features, watermarks. --ar 3:2 --style raw --stylize 120 --v 6.1`

**[83] Put me in any scene.** Believable environment composite.
`...Place them believably into [SCENE], [WARDROBE]. Match environment lighting, shadow direction, and color temperature so they read as genuinely in the space, accurate contact shadows, natural posture. 35mm, subject sharp, background soft. 3:2. Avoid: a pasted cut-out look, mismatched lighting on the face, floating or missing shadows, distorted features, extra fingers, watermarks`

**[85] Double-exposure art portrait.** Silhouette-blend fine-art piece.
`...Double-exposure: clean profile head-and-shoulders silhouette with [SECOND SCENE] blended into the darker hair/shoulder mass, face and jawline stay sharp and true. [COLOR] tones on off-white or deep monochrome, seamless transitions, negative space. 4:5. Avoid: a muddy overlap that hides the face, harsh seams, clashing colors, distorted or reshaped features, watermarks`

**[92] Corporate pet CEO.** Playful pet headshot.
`Using [PET PHOTO] as exact reference, keep fur markings, coloring, and breed features 100% intact. Corporate headshot of the pet in a tailored navy suit, shirt and tie, sitting upright in a modern glass office. Soft window light + studio fill, clean catchlights. 85mm f/2.2, photoreal fur and fabric. 4:5. Avoid: a cartoonish or over-filtered look, a human-like distorted face, mismatched fur color, extra limbs, text or watermark. --ar 4:5`

## 6. Cinematic and backgrounds

Levers: shot scale, lens (anamorphic/wide), lighting time-of-day, color grade (teal-orange etc.), grain/atmosphere. Wide formats 16:9 to 21:9.

**[61] Cinematic establishing shot.** Wide scene-setter.
`Cinematic wide establishing shot of [SCENE]. Anamorphic ~28mm, low camera height, deep focus, subtle horizontal flare. Rule of thirds, strong foreground lead, layered depth, sky negative space. Soft [TIME OF DAY] light, volumetric fog, [COLOR MOOD] grade, 35mm grain. Movie-still quality. 16:9. Avoid: cartoon or illustration look, HDR halos, oversaturation, flat lighting, cluttered composition, visible text, watermark, logo`

**[63] Epic natural landscape.** Awe-scale nature shot.
`Landscape of [PLACE] at [TIME]. Crisp foreground lead into layered midground and vast distance, low horizon, tiny human for scale. Wide 16-24mm, deep focus, god-rays through broken clouds, warm low light, vivid but natural earth palette, HDR held in shadow and highlight. Nat-Geo caliber. 16:9. Avoid: HDR halos, oversaturated neon colors, fake-looking sky, muddy shadows, flat lighting, tilted horizon, text, watermark`

**[95] Moody mountain mist.** Wallpaper-grade alpine.
`Landscape of [ALPINE SCENE] at dawn, valleys of rolling mist separating ridges into fading tonal planes, god-rays through broken clouds, glassy foreground lake mirroring peaks, cool shadows warmed by amber sunrise, strong atmospheric perspective, wide deep focus. Tack sharp, ethereal. --ar 16:9 --style raw --stylize 250 --v 6.1`

**[97] Desert sandstorm epic.** Dune-scale drama.
`Wide cinematic shot of [DESERT DUNES] with a monumental sandstorm wall advancing on the horizon, swirling sand catching light, warm amber dunes vs cool twilight sky, one tiny traveler in the lower third for scale, layered haze, low raking sun. Anamorphic widescreen, fine grain. --ar 21:9 --style raw --stylize 200 --v 6.1`

**[99] Storm coast drama.** Powerful seascape (Nano Banana).
`Ultra-realistic seascape of [COASTLINE] in a gathering storm. Towering waves exploding on dark jagged cliffs, spray catching light, brooding clouds with one golden shaft breaking through. Wide-angle low near the waterline, long-exposure misty water with razor-sharp rock, moody high-contrast grade. Avoid: HDR halos, oversaturation, flat lighting, cartoon look, text, watermark --aspect 16:9`

**[62] Neo-noir night scene.** Moody figure/street piece.
`Neo-noir night scene of [SUBJECT]. Rain-slicked street after midnight, neon mirrored in wet asphalt, steam, bokeh traffic lights. 35mm anamorphic, shallow DoF, single hard key carving the subject from near-black, strong wet rim light, teal shadows vs sodium-orange/magenta neon, 35mm grain. 16:9. Avoid: flat even lighting, daylight look, oversaturation, cartoon style, text, watermark, deformed anatomy`

**[94] Neon-noir film still.** Blade Runner-grade frame.
`Cinematic film still of [SUBJECT] on a rain-slicked street, dystopian neon-noir like Blade Runner 2049, towering holographic billboards in low fog, dense haze, wet mirror reflections, single hard key + rim, teal/magenta grade with sodium-orange accents, anamorphic flare, shallow DoF, 35mm grain. --ar 21:9 --style raw --stylize 250 --v 6.1`

**[96] 1980s dark fantasy frame.** Practical-era genre still.
`1980s dark fantasy film still of [SCENE], practical effects and prosthetics, matte-painting backdrop, low volumetric fog, hard side light with inky shadows, one warm torch key, anamorphic flares, muted slate palette with ember gold, grainy 35mm with halation, ornate decayed sets, practical-era Ridley Scott/Jim Henson feel. --ar 2.39:1 --style raw --stylize 200 --v 6.1`

**[98] Cozy window film mood.** Intimate indie interior (SDXL).
`Cinematic film still of [PERSON reading by a rain-streaked window in a cozy lamplit room], soft overcast daylight + warm lamp glow, rim light on the rain, dust motes, lived-in details (mug, blanket, books), muted earthy grade, shallow DoF, 35mm anamorphic, soft halation, A24 aesthetic. 16:9. Negative prompt: cartoon, oversaturated, hard flash, deformed hands, text, watermark`

**[69] Quote-card background.** Text-free social base.
`Text-free quote-card background, warm white (#FAFAF8) canvas, soft [COLOR] mesh gradient blooming from center (muted, never neon), gentle radial glow at the center where text sits, fine even film grain, soft corner vignette. Center region clean and empty for legible overlay text. 1:1. Avoid: any text or letters, busy patterns, harsh banding in the gradient, logos, watermarks, clutter`

## 7. Social and thumbnails

For face thumbnails, reuse the portrait face-preservation convention, then add exaggerated expression permission. Every thumbnail leaves clean negative space for text but does NOT render the headline itself (except entries that specify literal text).

**[67] High-CTR face thumbnail.** YouTube click-driver with your face.
`[Face-preservation + push expression to [EXAGGERATED, e.g. wide-eyed shock]]. 16:9. Person on right third, chest-up, bright rim separation. Left two-thirds a strong focal element for [SUBJECT], crisp and dramatically lit. Punchy key, deep contrast, saturated [COLOR] background with radial glow. Clean empty upper-left for 3-4 words (do not render text). 4k`

**[126] Bold expressive face closeup.** Tight reaction crop.
`[Face-preservation + exaggerate to [excited/stunned]]. 16:9. Close crop head-to-upper-chest, 50mm, sharp eyes. Dramatic studio key + rim, deep shadows. Person on right third against bold [COLOR] gradient with glow, clean negative space left for headline (no text). 4k`

**[123] Shocked-face reaction thumbnail.** Pointing reaction shot.
`[Face-preservation + wide-eyed mouth-open shock]. 16:9. Chest-up, one hand raised pointing toward the [right] empty space. Bright key + strong rim, close-up slight low angle, 35mm, sharp eyes. Bold high-saturation [COLOR] backdrop with radial glow. Clean space on the pointed side (no text). 4k`

**[125] Big-number curiosity thumbnail.** Listicle number hook.
`[Face-preservation + curious raised-brow look]. 16:9. Giant number '[N]' filling the left two-thirds in [COLOR] with thick black outline and drop shadow. Person on right third glancing at it, rim-separated. Dark [BG COLOR] with radial glow, complementary contrast. Render the number only, no other text. 4k`

**[124] Before/after split thumbnail.** Transformation reveal.
`[Face-preservation + impressed reaction]. 16:9, divided by a bold glowing diagonal. Left 'before' [SCENE] dull and cold; right 'after' [SCENE] bright and saturated; luminous divider with glow spill. Person chest-up center foreground reacting, rim-separated. Clean top corners for [BEFORE]/[AFTER] labels (do not render text). 4k`

**[68] Scroll-stopping carousel cover.** Instagram cover (graphic).
`Instagram carousel cover, 4:5 (1080x1350). Single focal graphic for [TOPIC] in flat-plus-soft-3D style, placed lower-center/right. Top 35% clean empty for a headline (no text). [BRAND COLOR] vs warm white (#FAFAF8) + one accent, soft directional light with long shadows and faint glow, subtle grain. Premium editorial. 4:5. Avoid: clutter, busy backgrounds, stock-photo look, watermarks, placeholder text, low contrast`

**[129] Flat-lay carousel cover.** Photo-based IG cover with title.
`Instagram carousel cover, 4:5, photoreal top-down flat lay of [ITEMS] on [SURFACE], cohesive [PALETTE], soft even daylight. Semi-transparent off-white panel across the lower third holding title '[TITLE]' in a bold dark sans + small subtitle, crisp and legible. Premium lifestyle. 4k, 4:5. Avoid: messy overlap, off-palette colors, harsh shadows, misspelled text, watermarks`

**[127] Editorial quote card.** Typographic quote post (renders text).
`Premium quote card, 1:1 (1080x1080). Quote '[QUOTE]' as focal point in a bold modern serif, centered, balanced line breaks; handle '[@HANDLE]' below in small wide-tracked sans. Strong hierarchy, generous margins, warm [BG COLOR] canvas with one subtle [ACCENT] shape in a single corner. Refined editorial, all text sharp and correctly spelled. 1:1. Avoid: cluttered decoration, drop shadows on the text, more than one accent element, watermarks, misspellings`

**[130] Single-tip infographic.** Branded tip card (renders text).
`On-brand tip card, 1:1. Minimal [BG COLOR] canvas. Circular badge top-left with '[01]' in [BRAND COLOR]; headline '[TIP TITLE]' beside it in a strong sans; one short body line under it; a single flat-line icon on the right in the brand accent. Tidy grid, whitespace, all text correctly spelled. 1:1. Avoid: clutter, more than one icon, competing colors, tiny unreadable text, misspellings, watermarks`

**[128] Golden-hour product ad poster.** Vertical social ad (renders text).
`Vertical ad poster, 4:5 (1080x1350). [PRODUCT] centered as hero in warm golden-hour light, [SETTING], condensation/highlights, shallow DoF. Warm directional glow + rim separation, long shadows. Headline '[HEADLINE]' in clean white sans across the top third, legible; small logo placeholder near bottom (leave clean, do not invent a logo). Vibrant cinematic grade. 4k, 4:5. Avoid: clutter, distracting props, low contrast, misspelled text, watermarks`

## 8. Mascots

**[87] Friendly brand mascot (flat-3D).** Soft-shaded modern mascot.
`Friendly mascot for a [BRAND TYPE] brand: [DESCRIBE CHARACTER]. Built from simple rounded shapes, warm approachable expression, clear readable eyes. [COLOR] + warm-white + one accent, gentle shading and soft occlusion for a flat-3D feel, matte surfaces, no hard black outlines. Full-body front-facing, centered on warm-white. Repeatable across stickers/app/packaging. No text, no props, no drop shadow. --ar 1:1`

**[122] Flat-vector mascot character.** Bold-outline flat mascot.
`Flat-vector mascot of [CHARACTER, e.g. smiling fox, robot] for [PRODUCT]. Simple rounded shapes, bold clean uniform outlines, expressive minimal face, cheerful [PALETTE] + one accent, flat solid fills, no gradients or shading. Front-facing, strong silhouette at small sizes, centered on white. Playful and scalable. No text, no photorealism, no drop shadow. --ar 1:1`

## Naming module (from #24)

When the engagement needs a name (product, brand, feature, campaign), run this five-style method. Mirrors the Demiurge naming discipline.

Intake: WHAT IT IS, WHO IT IS FOR, DESIRED FEELING, names liked or hated (with why).

Generate 20 candidates, 4 per style:
1. Short and punchy (one or two syllables)
2. Real-word used in a fresh way
3. Invented/coined word (ownable, trademark-friendly)
4. Two-word combo or compound
5. Metaphor or evocative image

Rules: every name easy to say aloud, easy to spell after hearing once, no unfortunate double meanings or awkward abbreviations, not an existing famous brand.

Then pick the 5 strongest, and for each give: why it fits the audience and vibe; the likely .com situation (stated explicitly as a best guess to verify, not a live lookup) plus one alternative domain angle; one risk or objection. Finish with a single top recommendation and a one-line tagline beside it.

Note: domain and trademark availability are guesses to verify with the client's counsel, never asserted as cleared. This matches the brand-pack rule: flag proximity, do not adjudicate.

## UX and onboarding copy lens (from #77)

Activation-focused writing lens for any product with a first-run flow. Goal: get a new user from sign-up to first real win before interest fades.

Intake: app and what it does; core value (the one outcome); target user; likely arrival hesitation; the first meaningful action (the aha moment); brand voice. If the aha moment or core value is unclear, ask before writing.

Deliver, paste-ready:
1. Welcome screen: headline + one line of subtext naming the payoff and quietly answering the hesitation. Give 2 headline options.
2. The 3 setup steps: per step a short title, one line of motivating microcopy framed as progress toward the payoff (never a chore), the button label, and one sentence on why the step earns its friction.
3. Empty state: the pre-action message that pulls the user into that first action, plus the primary button label.
4. First-win message: celebration copy the moment they complete the aha action, plus a single obvious next step.

Rules: warm, clear, short. Lead with what the user gets, not what the app requires. No jargon, no exclamation spam, no fake urgency. Every screen leaves the user feeling capable and one small step from value.
