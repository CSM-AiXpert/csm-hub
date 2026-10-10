# Current official assets — verified 2026-10-10

Downloaded directly from the current official sites without image modification. CSM and CoastaFlow logos were identified in their live header HTML. Podcast logo matches the official Lowcountry Unscripted Squarespace header. Background uses live desktop/portrait assets with cover positioning. Google mark source is linked from https://developers.google.com/identity/branding-guidelines and is rendered unoptimized, square, contain, without filter/recolor.

- `public/official/csm-logo.webp`: https://www.coastalsolutionsmedia.com/csm-logo-nav.webp
  SHA-256: `40a40c75fa5b49f16387d92ff229db312aebe87bbc43782ac5ec431997e0800a`
- `public/official/csm-hex-wall.webp`: https://www.coastalsolutionsmedia.com/images/hex-wall/wall-d.webp
  SHA-256: `5c8f2beeae21a7af478fb348790dd4ac324655faaf413ed7dfb69d7eeeffafdc`
- `public/official/csm-hex-wall-mobile.webp`: https://www.coastalsolutionsmedia.com/images/hex-wall/wall-m.webp
  SHA-256: `f9c4a0b304324ae29e449d2ec517e3483fb79656067e4eb6037db6b80cef1979`
- `public/official/coastaflow-supplied.png`: Brian’s exact supplied Library file `libfile_9993e791f13081918226218b9aedd4ca`, overriding the previously downloaded website logo. Original 1254×1254 PNG copied byte-for-byte with alpha preserved; contain rendering, no crop or recolor.
  SHA-256: `c6f49bf123d46df3938f649bb7f337ff8ed34f8d1aa9abe2d09657a9060a4e8e`

- `public/official/lowcountry-logo.png`: https://images.squarespace-cdn.com/content/v1/684ef70354303f196fe16c1c/5566dc4c-71c7-4b74-bea9-632938abb1e1/12.png?format=1500w
  SHA-256: `2411ddd23c42f49f3b36e2cab952a9357d37447e41f1aa08ba7052bdc01643bd`
- `public/official/google-g.png`: https://developers.google.com/static/identity/images/g-logo.png
  SHA-256: `d1ce9c2af0b10a7333abc99bc706f9a6a199e5b65bf3e3009624f076b8638e6a`

## Chrome/social/icon assets
- public/hub-hex-static.svg: code-native static small beveled hex fallback. Animated canvas uses CSM source ring-wave math; no existing logo artwork changed.
- public/official/favicon-32.png: https://www.coastalsolutionsmedia.com/favicon-32.png?v=3 (exact bytes).
- public/official/favicon-48.png: https://www.coastalsolutionsmedia.com/favicon-48.png?v=3 (exact bytes).
- public/official/apple-touch-icon.png: https://www.coastalsolutionsmedia.com/apple-touch-icon.png?v=3 (exact bytes).
- public/official/csm-logo-social.png: lossless PNG re-encoding of current approved csm-logo.webp solely for ImageResponse compatibility; raw decoded pixel-buffer equality verified true. Original480x353 dimensions and alpha preserved.
- app/opengraph-image.tsx: code-composed hub-specific1200x630 social card; output/playwright/hub-social.png is the local exported preview.

### Latest reflection palette provenance
Live CSM CSS `/tmp/csm-live-chunks/1kar09498d8dd.css` defines --pf-peri:#687dff and --pf-peri-hi:#8193ff. Parent verified approved logo bright blue pixel clusters near RGB96/112/240 and112/128/240, consistent with those tokens. Background reflected blue now uses these tokens (superseding initial #3B82F6 for reflections only); teal #14B8A6 and copper #EA580C retained. No logo raster altered.

### Social icons and profile links
Only four company social profiles were found in the current official CSM page (`/tmp/csm-current-site.html`): YouTube @coastalsolutionsmedia; Facebook profile id61569810494297; Instagram coastalsolutionsmedia; LinkedIn company/coastalsolutionsmedia. Their published 24×24 SVG paths are copied unchanged to public/official/youtube.svg, facebook.svg, instagram.svg, linkedin.svg and use recognizable official platform colors #FF0000, #1877F2, #E4405F, #0A66C2. No unverified social handles added.
