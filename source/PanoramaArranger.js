/* PanoramaArranger.js */
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

enyo.kind({
  name: "rwatkins.PanoramaArranger",
  kind: "enyo.Arranger",

  constructor: function() {
    this.inherited(arguments);
    this.margin = this.container.margin != null ? this.container.margin : this.margin;
  },

  // adjusted margin to just calc on right
  size: function() {
    this.box = this.containerBounds.width - this.margin;  // only one margin here, cache

    enyo.forEach(this.container.getPanels(), function(panel) {
      var bounds = { width: this.box, height: "100%" };
      panel.setBounds(bounds);
    }, this);
  },

  // again, adjust margin to only calc on right
  // and set panels to only offset by 1
  arrange: function(inC, inIndex) {
    var panels = this.container.getPanels();

    if (panels.length == 1) {
      this.arrangeControl(panels[0], { left: 0 });
      return;
    }

    var offset = 1; // only offset one when rotating panels, dont center
    var orderedPanels = this.getOrderedControls(Math.floor(inIndex) - offset);
    var width = this.containerBounds.width - this.margin;

    var left = 0 - width * offset; // no margin

    enyo.forEach(orderedPanels, function(panel, index) {
      this.arrangeControl(panel, { left: left });
      left += width;
    }, this);
  },

  start: function() {
    this.inherited(arguments);

    if (this.c$.length == 1) { return; }

    var fromIndex = this.container.fromIndex;
    var toIndex = this.container.toIndex;
    var orderedPanels = [];
    // if to > from, hide panel before from
    // if from > to, hide panel before to
    if (toIndex > fromIndex) {
      orderedPanels = this.getOrderedControls(fromIndex);
    } else {
      orderedPanels = this.getOrderedControls(toIndex);
    }
    orderedPanels[orderedPanels.length - 1].hide();
  },

  finish: function() {
    this.inherited(arguments);
    enyo.forEach(this.c$, function(panel) {
      panel.show();
    });
  },

  flowArrangement: function() {
    this.inherited(arguments);

    if (this.c$.length == 1) { return; }

    // determine panel position for setting title and background offset 
    var arrangement = this.container.arrangement;
    var left = arrangement[(arrangement.length - 2)].left - ((this.c$.length - 2) * this.box);
    var position = left / (this.c$.length * this.box);
    this.container.moveHandler({ position: position });
  },

  calcArrangementDifference: function(inI0, inA0, inI1, inA1) {
    if (this.c$.length == 1) { return 0; }
    var i = Math.abs(inI0 % this.c$.length);
    return inA0[i].left - inA1[i].left;
  },

  destroy: function() {
    var panels = this.container.getPanels();
    enyo.forEach(panels, function(panel, index) {
      enyo.Arranger.positionControl(panel, { left: null, top: null });
      enyo.Arranger.opacifyControl(panel, 1);
      panel.applyStyle("left", null);
      panel.applyStyle("top", null);
      panel.applyStyle("height", null);
      panel.applyStyle("width", null);
      panel.show();
    });
    this.inherited(arguments);
  }

});
