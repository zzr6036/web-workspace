# Homepage photo assets

Edited using the built-in image_gen tool. Original files were not modified. All three final images were visually inspected for Chinese text, lettering, advertising badges and shop information. AI cleanup may introduce small differences; these are presentation images, not manufacturing specifications.

Source base: `/Users/zhaoziru/Documents/Parttime/photoframe/source/`

| Website asset             | Source                          |
| ------------------------- | ------------------------------- |
| public/frames/desktop.png | item1/无边框-圆角/1.jpeg        |
| public/frames/wood.png    | item4/general/Main Images1.jpg  |
| public/frames/classic.png | item4/黑胡桃色/Main Images6.jpg |

Final prompts (use case: precise-object-edit; edit target: supplied local product photograph):

- desktop: Remove TOP 1 badge, bottom red Chinese promotional banner, circular detail inset, and ALL lettering on books. Fill removed areas naturally as continuation of background/table. Preserve all four photo panels and people, proportions, original lighting and camera angle. No text, badges, logos or watermarks anywhere.
- wood: Remove only all Chinese text in the upper background, replacing it seamlessly with the same plain wall. Preserve the wooden frame and its couple photo, flowers, lamp, tabletop, perspective, texture and light. No text, logos, watermarks or badges anywhere.
- classic: Remove only the Chinese text and promotional outlines in the top right, restoring plain background. Preserve the entire brown wooden empty frame, white mat, angle, wood grain, tabletop and lighting exactly. Keep image square. No text, logos, watermarks or badges anywhere.

Layout reference: https://www.printforfun.sg/ — photo-led hero, category cards, alternating editorial sections. No reference-site product photos, reviews, pricing or merchant details were copied.

## Purple photo-panel hero (previous draft)

`public/frames/hero-panels.png` is a high-resolution generated hero visual. It replaces the earlier photo-wall hero and is based on the supplied product references: images printed directly onto thin, rounded, glossy rigid panels, without wooden borders or picture-frame mats. It was visually checked for text, logos, watermarks and product-form accuracy.

Prompt: rich purple studio background; 9–12 thin, rounded, glossy frameless photo panels with high-definition printed photos; central lifestyle photo panel dominant; subtle depth and reflections; space for text on the left; no words, logos, watermarks, traditional frames, wooden borders, or mats.

## Current wide photo-panel hero

`public/frames/new-hero-panels.png` is the current high-resolution, full-width homepage banner. It was generated with the built-in image_gen tool to show direct-printed, thin glossy photo panels in a violet gallery scene. The central panels are sharp while both outer edges fall into soft bokeh, leaving the image suitable for white text overlay.

Prompt: ultra-wide purple product-banner composition; frameless, high-definition photographs printed directly onto thin glossy acrylic-style panels; crisp centre with couple, family, child, friends and coastal holiday images; progressive blur at both outer edges; no writing, Chinese characters, logos, watermarks, traditional wooden frames, mats or shop information.
