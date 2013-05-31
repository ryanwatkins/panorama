/**
The _rwatkins.Panorama_ kind is designed to provide an
enyo.Panels-like control with an Arranger that simualtes the
Windows Phone 8 Panorama control.

Any Enyo control may be placed inside an _rwatkins.Panorama_, but by
convention we refer to each of these controls as a "panel." The active
panel is the one in front, and the user can slide left or right to
bring other panels into the viewport.  As the panels slide a parallax
effect is used on the title and backgroundSrc to give a sense of depth
to the screen.

For more information, see http://www.ryanwatkins.net/software/panorama/
*/

/*
 * Copyright © 2013 Ryan Watkins <ryan@ryanwatkins.net>
 *
 * Permission to use, copy, modify, distribute, and sell this software
 * and its documentation for any purpose is hereby granted without
 * fee, provided that the above copyright notice appear in all copies
 * and that both that copyright notice and this permission notice
 * appear in supporting documentation. No representations are made
 * about the suitability of this software for any purpose. It is
 * provided "as is" without express or implied warranty.
 */

// FIXME: breaks with 2 Panels

enyo.kind({
  name: "rwatkins.Panorama",
  kind: "Panels", // requires enyo.layout.panels
  classes: "rwatkins-panorama",

  arrangerKind: "rwatkins.PanoramaArranger",
  wrap: true,
  narrowFit: false,

  published: {
    //* the amount of the next panel in the Panorama to peek - typically ~10%
    margin: "0", // in px
    //* multiplier for the parallax effect on title
    titleParallax: 0.9,
    //* multiplier for the parallax effect on title
    backgroundParallax: 0.9,
    //* image for background to move as panels slide
    backgroundSrc: null
  },

  rendered: function() {
    this.inherited(arguments);
    this.backgroundSrcChanged();
    this.resizeHandler();
    this.moveHandler(null, { position: 0 });
  },

  resizeHandler: function() {
    this.inherited(arguments);
    this.width = this.getBounds().width;
    if (this.$._panorama_title) {
      this.titlewidth = this.$._panorama_title.getBounds().width;
    }
  },

  initComponents: function() {
    this.title.name = "_panorama_title";
    this.title.classes += " rwatkins-panorama-title";

    this.createChrome([this.title]);
    this.inherited(arguments);
  },

  backgroundSrcChanged: function() {
    if (this.backgroundSrc) {
      this.applyStyle('background-image',  'url("' + this.backgroundSrc + '")');
    }
  },

  // override default getPanels() so we ignore title chrome
  getPanels: function() {
    var p = this.controlParent || this;
    var panels = [];
    enyo.forEach(p.children, function(child) {
      if (child.name !== "_panorama_title") {
        panels.push(child);
      }
    });
    return panels;
  },

  moveHandler: function(params) {
    if (!params || typeof(params.position) == 'undefined') { return; }

    // shift title
    if (this.$._panorama_title && this.titlewidth) {
      var l = ((this.titlewidth * params.position) * this.titleParallax) + "px";
      enyo.dom.transform(this.$._panorama_title, { translateX: l || null, translateY: null });
    }
    // shift background position
    if (this.width !== undefined) {
      this.applyStyle('background-position',  (this.width * params.position * 2 * this.backgroundParallax) + 'px 0px');
    }
  }

});
