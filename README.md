Panorama
========

Panorama - an Enyo 2.0 kind to roughly emulate the horizontal scrolling Panorama Control with a parallax effect in Windows Phone 8.

You can side swipe to slide thru the panels of the panorama, and it wraps around to first panel.  The title and background image are shifted as you scroll thru the panels creating the parallax effect.

Based on the Panels/Arranger controls.

- "title" - define a component to create for the title across the panorama.
- "margin" - the amount to 'peek' the next panel, typically ~10% of the viewport on WP.
- "backgroundSrc" - path to the image to load for the background.  Can also just apply via CSS to ".rwatkins-panorama"
- "titleParallax" - multiplier for the parallax effect on the title component
- "backgroundParallax" - multiplier for the parallax effect on the title component

See example in "sample" directory.

NOTES:

- if there are only two panels, they do not slide correctly
- the title does not 'snap around' when you wrap around in the carousel, it just slides back into place
- if there are only three panels, the peeling panel sometimes 'appears', rather than slides into place

Tested platforms include: Chrome 24+, Safari 6.0.2+, Firefox 17+, Windows Phone 8.0

Copyright © 2013 Ryan Watkins <ryan@ryanwatkins.net>

Permission to use, copy, modify, distribute, and sell this software and its documentation for any purpose is hereby granted without fee, provided that the above copyright notice appear in all copies and that both that copyright notice and this permission notice appear in supporting documentation. No representations are made about the suitability of this software for any purpose. It is provided "as is" without express or implied warranty.