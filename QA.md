# Compact hub QA — 2026-10-10

Preview: http://localhost:3001 and http://127.0.0.1:3001. Running in visible macOS Terminal tab 1, window 4116; logs /tmp/csm-hub-terminal.log. Preview survived a completed task turn and repeated independent checks. Temporary launchctl service was unloaded; workspace plist removed. No login/boot service installed. Browser used is Brian’s local browser.

## Final compact revision
- Content height: 628px at320; 645px at375/390/430/1440, approximately half the previous 1270px mobile design.
- At320/375/390/430/1440: document scrollWidth equals viewport, all images decoded successfully, minimum main link height46px.
- Exact live CSM desktop/portrait hex background assets; current official CSM, CoastaFlow and Lowcountry logos. Sources and checksums in ASSETS.md.
- Google mark: official original multicolor PNG, rendered20x20, contain, filter:none, unoptimized. Label See Our Reviews points only to verified Google profile viewer.
- Concise about caption, verified See Our Work and About Us routes, explicit Lowcountry Unscripted Podcast accessible name.
- Brian direct cell/email are prominent; general business contacts removed per revision request.
- Keyboard first Tab reveals Skip to links with solid focus; second reaches audit CTA with solid focus. No forms/contact actions submitted.
- Reduced motion: animation none, transition0s.
- Full npm run lint PASS; npm run build PASS; npx --no-install tsc --noEmit PASS; git diff --check PASS.
- Header uses loading=eager/fetchPriority=high per installed Next16 docs. Local-only allowedDevOrigins includes localhost/127.0.0.1 so both support development resources.

## Link targets
1. https://www.coastalsolutionsmedia.com/free-growth-audit#request
2. tel:+16784165997
3. mailto:brian@coastalsolutionsmedia.com
4. https://www.coastalsolutionsmedia.com
5. https://www.coastaflow.ai
6. https://www.lowcountryunscripted.com
7. https://www.coastalsolutionsmedia.com/portfolio
8. https://www.coastalsolutionsmedia.com/about
9. https://share.google/cGTG3DA4y7jDHL0ZB

## Screenshots
Final screenshots: output/playwright/compact-hub-320.png, compact-hub-375.png, compact-hub-390.png, compact-hub-430.png, compact-hub-1440.png. Earlier hub-*.png files document superseded design.

## Source and boundaries
Fresh clean clone of https://github.com/CSM-AiXpert/csm-hub; original local checkout unlocated. Vercel project csm-hub prj_wkO5Gb4INokXtoBkalvWFk4LJEqv maps hub.coastalsolutionsmedia.com. Deployed commit72a155682ddc5bc53cccc147955792f02a84711c; clone master8f6d64db33f93160f4eeb3f163b450d1aea7fe3d. No push, deployment, live QR modification or message sending performed.

Previously authorized lint fixes retained: FractalOrb random arrays initialized with lazy state; exact-file CommonJS lint configuration for existing logo script. No remaining lint/build/type blockers.

## Supplied CoastaFlow logo update
Brian’s exact Library PNG libfile_9993e791f13081918226218b9aedd4ca is now public/official/coastaflow-supplied.png. Source and destination SHA-256 both c6f49bf123d46df3938f649bb7f337ff8ed34f8d1aa9abe2d09657a9060a4e8e. Alpha and original1254×1254 bytes preserved, square intrinsic dimensions, contain within fixed47px logo frame without crop/recolor. All five screenshots refreshed; logo loads and no overflow at320/375/390/430/1440. Full lint/build/type checks pass.

## Kinetic chrome, mono typography, social and icons revision
- Background uses inspected CSM ringA/ringB/crest equations, rendered as small beveled canvas tiles:46px cell diameter mobile,60px desktop, approximately1–5px projected lift. Desktop18fps, mobile10fps cap, DPR<=1.25. Reduced motion, save-data/low-memory and hidden tabs use static frames; native SVG CSS fallback remains if JS/canvas unavailable.
- Browser canvas snapshots1200ms apart differ with motion enabled and are byte-identical after reduced-motion stabilization.
- At320/375/390/430/1440, all measured headings/body/buttons/labels/footer resolve to JetBrains Mono. Local font preloaded. No horizontal overflow; minimum link46px; content637px at320 and646.5px at other widths.
- Screenshots: output/playwright/chrome-hub-{320,375,390,430,1440}.png and chrome-hub-reduced-motion.png.
- Social preview output/playwright/hub-social.png1200x630PNG. Route /opengraph-image generated at build. Real approved transparent lighthouse embedded; WEBP->PNG re-encoding verified decoded pixel buffers exactly equal. No image artwork modified.
- Browser metadata includes OG title/description/url/site/type/image/alt/width1200/height630 and Twitter summary_large_image/title/description/image. Next dev resolves automatic OG image to local host; production metadataBase is https://hub.coastalsolutionsmedia.com.
- Browser icon hrefs /official/favicon-32.png (32x32alpha), /official/favicon-48.png (48x48alpha), /official/apple-touch-icon.png(180x180opaque). Exact official live CSM files.
- Full lint/build/type checks pass after revision. Social route and homepage respond200. Persistent visible Terminal retained. All prior contacts, destinations, and exact supplied CoastaFlow file unchanged.

## Corrected true-3D background after Brian’s visual rejection
Runtime diagnosis in Brian’s actual local browser390×844: prefers-reduced-motion=false, document.hidden=false, deviceMemory16, saveData=false, canvas opacity1 and full viewport. No OS settings changed. Root cause: previous2D renderer’s face gradient never changed, only edgealpha and1–5pxYshift; prior byte-difference proof was insufficient for perceived motion.

Replacement: instanced extruded beveled hex geometry with1.45-unit sidewalls, actual Z displacement crest1.75 + secondarywave.38, per-tile tilt, perspective camera and MeshPhysicalMaterial thin-film iridescence.85, metalness.88, roughness.24. Silver/blue/teal code-painted environment produces changing whole-face reflections. Small55pxmobile/67pxdesktop nominal cells.30fpsdesktop/24fpsmobile cap, DPR<=1.5. Reduced-motion/saveData/low-memory/hidden uses static render; canvas-unavailable uses existing SVG fallback.

Visual evidence: physical-desktop-a/b.png and physical-mobile-a/b.png captured2.5seconds apart. Both lead and parent inspected visible sidewall/occlusion and face-reflection changes. Uncovered desktop region x20–449,y20–799:49.27% of335400pixels change by>12 RGB levels; mean max-channel delta24.33. Reduced-motion pair1.8seconds apart:0changed pixels, mean delta0.

320/375/390/430/1440: WebGL rendered, no horizontal overflow, minimum main targets46px. Full lint/build/type passed. All approved assets, mono text, links/social/icons unchanged.

Motion preview: output/playwright/hub-physical-motion.mp4,30actual browser frames captured over6.26s, encoded at4.63fps to preserve approximate recorded timing (no synthetic interpolation).

## Calm black-surface revision — October 10, 2026 (latest)

Supersedes the earlier physical-motion recording. The previous two superimposed height waves and independent tilt produced excessive motion; its pale metallic base also colored the entire surface. The existing instanced extrusion now uses one slow deterministic spatial wave, bounded to ±0.08 world units, and coordinated tilt bounded to 0.009 radians. Faces remain black (#05070a); localized studio reflections provide silver, CSM blue #3B82F6, teal #14B8A6, and a restrained copper #EA580C accent. No foreground, link, logo, or typography changes.

Reviewed actual browser frames five seconds apart: calm-desktop-a.png and calm-desktop-b.png; mobile calm-mobile.png. Parent also visually reviewed these and confirmed calm black faces, visible silver top reflections, and no chaotic popping. Latest recording: output/playwright/hub-calm-motion.mp4, 40 actual browser captures over 10.03 seconds, encoded at measured 3.89 fps. This low-frame-rate evidence recording is not the renderer frame rate (24 mobile / 30 desktop).

Responsive 320, 375, 390, 430, and 1440 widths: no horizontal overflow, all link targets at least 46px tall. Reduced-motion emulation confirmed true and canvas screenshots 1.8 seconds apart were byte-identical after settling; no OS settings changed. Initial full-page comparison had nine text-antialiasing pixels differ, so the settled isolated canvas test was used. Full lint, production build, TypeScript noEmit, and git diff --check passed. Existing development-only Next image LCP/preload warnings remain; no WebGL runtime errors observed.

Persistent Terminal server unchanged: parent PID25070, Next listener25193. localhost:3001 and 127.0.0.1:3001 both HTTP200 after checks. No deploy or push.

## Latest kinetic refinement — October 10, 2026

Supersedes calm-motion evidence: user requested perceptible plane travel as well as reflected shine. Existing geometry now follows z=0.32*sin(0.9*dA - t*pi/9): a deterministic 18-second traveling radial wave, exact bounded ±0.32 units (0.64 peak-to-peak). The same phase controls tiny ±0.009-radian tilt; no independent random phases. At a representative wave-origin tile, z at 0/4.5/9/13.5/18 seconds is 0/-0.32/0/+0.32/0. This changes actual instance translation, independently of environment rotation. Camera offset increases from 0.18 to 0.30 viewport-world heights to expose the sidewalls.

Geometry evidence: kinetic-desktop-a.png and kinetic-desktop-b.png captured six seconds apart show tile edges and exposed sidewalls changing position, not merely face color. Parent independently reviewed both and mobile and confirmed visible coherent sidewall/edge shift, retained black faces, and no return to initial chaotic popping. Recording output/playwright/hub-kinetic-motion.mp4 contains 60 actual local-browser captures over 16.23 seconds at measured 3.63 fps; render cap remains 24 mobile / 30 desktop.

Material retains #05070a black base; roughness 0.19, clearcoat 1, clearcoat roughness 0.08, environment intensity 1.5. Reflection blue now matches verified live CSM CSS --pf-peri:#687dff / --pf-peri-hi:#8193ff, with teal #14B8A6 and restrained copper #EA580C. Foreground colors and all approved logo bytes unchanged.

Full lint, production build, tsc --noEmit, diff whitespace checks pass. Responsive 320/375/390/430/1440 and reduced-motion timed screenshots rerun. No content, links, typography, favicon, social image, or server lifecycle changes.

## Latest deeper motion, gap backlight, and socials

Final requested amplitude is ±0.48 world units, same coherent 18-second wave, no random popping. The physical extrusions remain black with previous glossy reflection material. A separate emissive blue/orange backplate is placed behind all geometry at z=-2.1, with linear intensity1.5; the darkest/deepest tile bottom stays in front of it. Its illumination appears through gaps, not as recolored top faces. Latest visuals: gap-brighter-desktop.png, gap-brighter-mobile.png; refreshed recording hub-gap-light-motion.mp4 supersedes earlier recordings.

Four verified company socials added using paths from the current official CSM site and recognizable platform colors. All open external tabs with noopener noreferrer, accessible platform/company names, and 46×46 targets. Widths320/375/390/430/1440 all no overflow with minimum46px controls. Keyboard traversal reaches every social with visible solid focus outlines. Local browser console reports zero errors; existing dev image/font warnings remain.

Unfinished requested item: a separate Leave a Review action requires the verified Google Ask for reviews composer URL. Parent research could not establish that destination with available authorized access. The existing See Our Reviews viewer remains accurate; no guessed generic composer or mislabeled profile link was added.

Final lint, production build, tsc --noEmit, and git diff --check passed after latest amplitude/light adjustment. Final reduced-motion canvas captures1.8 seconds apart identical. Motion recording:60 actual frames across18.24 seconds, encoded at measured3.23fps (renderer24mobile/30desktop).

## Final single-pass correction and consolidated QA

User supplied exact review URL https://g.page/r/CfYAy-Jna-CUEBM/review. Prominent Leave Us a Review button now uses it with official Google G; the separate compact See Our Reviews viewer remains unchanged. Prior missing-URL blocker is resolved. No review submitted.

Each tile now carries an instanced six-sided extruded luminous channel immediately below its face, plus a transparent additive halo. Both follow the existing ±0.48 /18-second tile transform. Top material still black #05070a, with roughness0.1, metalness0.15, clearcoat1/roughness0.045, environment intensity3 and concentrated white studio softboxes. Parent and implementer reviewed final-rim-desktop-a/b five seconds apart and mobile: six exposed sides are visibly illuminated and depth shifts are clear. Honest visual limitation: the treatment reads as narrow luminous rims more than soft bloom, and moving top reflections remain broader/softer than a convincing mirror-gloss highlight. No further optional creative iteration performed.

One consolidated final QA: full lint, production build, tsc --noEmit, diff whitespace all pass. Widths320/375/390/430/1440 no overflow; minimum44px link targets. All15 keyboard stops have visible solid focus, including review actions and four socials. Browser DOM exact hrefs confirm supplied review composer and existing viewer remain separate. Reduced-motion canvas screenshots1.8 seconds apart identical. Final recording output/playwright/hub-final-motion.mp4:60 actual frames, 18.30s capture, 3.22fps encoded. Renderer remains24mobile/30desktop. New final-320/375/390/430/1440.png screenshots saved.

Execution accounting (this resumed working segment, not a total-session or usage estimate): five full lint/build/type pipelines ran across successive user-directed revisions, repeated browser frame captures, and five motion-video exports. Repeated substantial work was caused by successive visual revisions; final pass above consolidated checks once. No token, credit, or cost estimate inferred.

## Latest requirement: independent Z pistons (supersedes solid-black and wave directions)

Original hex geometry restored: face radius0.76, extrusion1.45, bevel0.018/thickness0.025, pointy orientation and original fixed XY lattice/camera,55px mobile/67px desktop nominal spacing. Every instance has zero rotation and unit scale. Only Z changes: deterministic independent phase and16–24-second period per tile,20% low hold,30% quintic rise,20% high hold,30% quintic fall. Bound±0.28 units prevents large independent neighbor offsets. No radial wave or moving environment; each geometric change is a piston stroke. Black material and restrained periwinkle/copper rims retained. Reflections still broad; mirror gloss is not claimed.

Parent and implementer inspected desktop frames5seconds apart and mobile recording frames0/40: independent neighbor depth differences and rigid shapes visible. Actual first-six Z samples A:[0.2731,-0.2783,-0.0251,-0.0775,0.28,0.28]; B:[-0.2799,0.28,0.28,0.28,0.2661,-0.0908]. Reduced-motion frames1.5seconds apart identical. Widths320/390/430 no overflow,min46px targets. Focused lint and tsc --noEmit pass; no repeated full build for this latest motion revision.

Foreground palette pass retained: black text on #687DFF CTA contrast5.97:1; main text on neutral charcoal16.77:1; muted text8.94:1. Teal contact icons and copper review accents; exact logos, links, JetBrains Mono, and equal adjacent64px review buttons preserved. Shared Three dependencies retained because FractalOrb still uses them.

Latest recording output/playwright/hub-piston-motion.mp4:18.12seconds of actual local browser captures,60frames encoded at measured3.26fps. Latest screenshots piston-desktop-a/b.png and piston-mobile.png. These supersede all previous wave/background recordings.

## Narrow black-material correction
Compared official stored csm-hex-wall.webp with new actual browser screenshots black-piston-desktop.png and black-piston-mobile.png. Reduced exposure1→0.8, environment intensity3→0.45, clearcoat1→0.45 and iridescence0.28→0.08; face base#020305 and metalness0.65, lower neutral ambient/teal fill. Tiles now read black/dark charcoal with faint reflections rather than the prior broad gray/purple wash. Geometry, independent piston transforms/timing, foreground CSS, links and equal review row untouched. Relevant lint passed; localhost HTTP200. No new motion export or full build pipeline for this narrow material-only edit.
