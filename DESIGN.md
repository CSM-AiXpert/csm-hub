# Compact CSM QR hub — revision
Marketing QR landing page, one narrow column on mobile and desktop. Target approximately one phone screen, concise labels and 44px+ touch targets. Order: current official brand, audit CTA, Brian direct call/email, main site, CoastaFlow, explicit Lowcountry Unscripted Podcast, work/about links, Google review viewer. Remove general contacts and long explanatory copy per Brian.

Use exact live CSM wall-d/wall-m hex background assets, fixed full-viewport cover with portrait source. Current official CSM nav lighthouse, CoastaFlow header logo and Lowcountry Squarespace header logo downloaded directly from each live site; no generated artwork. Mulish and JetBrains Mono retained. Readable dark translucent controls over photographic texture.

All route targets verified read-only: /free-growth-audit#request, /portfolio, /about on main www.coastalsolutionsmedia.com; www.coastaflow.ai, www.lowcountryunscripted.com; Google share profile. Brian direct telephone/email only. No push/deploy/QR change.

## Small kinetic chrome hex revision
Preserve compact controls and exact supplied logos. All interface text JetBrains Mono. Background reuses CSM source ringA/ringB/crest wave model (source KineticHexBackground.tsx) at far smaller cell scale, projected beveled tiles on lightweight canvas; desktop capped18fps/DPR1.25. Static CSS SVG tile fallback exists without JS; mobile runs10fps, desktop18fps; reduced motion, low-memory/save-data and hidden tabs do not animate. No pointer chasing, flashing, or layout movement. Social preview uses code-rendered1200x630 composition with unchanged official CSM logo, hub headline and concise actions. Favicon uses official compact CSM identity.

## Physical correction
The canvas2D projection was rejected as imperceptible. Current implementation uses real Three.js instanced extrusions and MeshPhysicalMaterial iridescence with reflection environment. Physical ring height and tilt expose walls and move full-face reflected light. Retain small cells, compact readable foreground, static accessibility/device fallbacks.

### Latest motion direction
Black physical tile faces with localized metallic reflections. One coordinated low-amplitude wave (±0.08), tiny shared-phase tilt, and slowly shifting studio reflections replace the prior exaggerated height motion. Small tile scale and compact foreground remain unchanged. Reduced-motion and low-power modes render a static physical frame.

### Latest kinetic refinement
A coordinated 18-second wave now has ±0.32 world-unit travel, replacing imperceptible ±0.08 travel. More oblique camera reveals real sidewalls. Black tops have lower roughness and polished clearcoat; reflections use official live periwinkle #687DFF / #8193FF, teal, and restrained copper. No random motion or foreground changes.

### Backlighting and social links
Wave amplitude increases modestly to ±0.40 units, retaining the same coordinated 18-second timing. A separate emissive blue/copper backplate sits at z=-2.1 behind the black extruded tiles; only open gaps reveal it. This does not recolor the top-face material. Four official-color social icons occupy a compact centered row with 46px touch targets and explicit accessible names.

Final amplitude: ±0.48 units; backplate intensity1.5 linear, retaining18-second timing and black top materials. This supersedes the preceding ±0.40 settings.

Final correction: six-sided below-face luminous channels and additive halos follow tiles, alongside concentrated studio softboxes. The actual appearance remains narrow luminous rims with broad moving highlights; full soft bloom/mirror-gloss target is not claimed. Supplied review composer now appears as its own prominent action.

## Current direction: solid black
The entire animated hex/WebGL component and static hex fallback have been removed from the page. Pure black background, neutral charcoal surfaces and shared palette tokens now govern app-owned UI. Periwinkle #687DFF is the primary CTA/border accent with black CTA text for contrast; #8193FF is hover/focus. Teal marks direct-contact icons; copper identifies reviews. Official logo and social icon artwork retains its original colors. Prior motion directions above are historical and superseded.

## Latest: independent piston field
Latest user direction restores the original hex field, superseding solid black. Rigid tiles move independently on Z only with smooth strokes and holds. No tilt, scaling, lateral motion, or coordinated wave. Foreground palette tokens from the solid-black pass remain.
