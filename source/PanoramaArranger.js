/* PanoramaArranger.js */

enyo.kind({
  name: "rwatkins.PanoramaArranger",
  kind: "enyo.Arranger", // requires enyo.layout.panels

  axisSize: "width",
  offAxisSize: "height",
  axisPosition: "left",
  constructor: function() {
    this.inherited(arguments);
    this.margin = this.container.margin != null ? this.container.margin : this.margin;
  },

  // adjusted margin to just calc on right
  size: function() {
    var c$ = this.container.getPanels();
    var port = this.containerBounds[this.axisSize];
    var box = port - this.margin;  // only one margin here

    this.box = box;  // cache

    for (var i=0, b, c; (c=c$[i]); i++) {
      b = {};
      b[this.axisSize] = box;
      b[this.offAxisSize] = "100%";
      c.setBounds(b);
    }
  },

  // again, adjust margin to only calc on right
  // and set panels to only offset by 1
  arrange: function(inC, inIndex) {
    var i,c,v,b;

    if (this.container.getPanels().length == 1) {
      b = {};
      b[this.axisPosition] = 0; // no margin
      this.arrangeControl(this.container.getPanels()[0], b);
      return;
    }

    var o = 1; // only offset one when rotating panels, dont center
    var c$ = this.getOrderedControls(Math.floor(inIndex)-o);
    var box = this.containerBounds[this.axisSize] - this.margin;

    var e = 0 - box * o; // no margin
    for (i=0; (c=c$[i]); i++) {
      b = {};
      b[this.axisPosition] = e;
      this.arrangeControl(c, b);
      e += box;
    }
  },

  // HACK: use show/hide rather than set z-index
  start: function() {
    this.inherited(arguments);

    var panels = this.container.getPanels();
    if (panels.length == 1) {
      return;
    }

    var s = this.container.fromIndex;
    var f = this.container.toIndex;
    var c$ = this.getOrderedControls(f);
    var o = 1; // only offset one when rotating panels, dont center

    for (var i=0, c; (c=c$[i]); i++) {
      if (s > f){
        if (i == (c$.length - o)){
          c.hide();
        } else {
          c.show();
        }
      } else {
        if (i == (c$.length-1 - o)){
          c.hide();
        } else {
          c.show();
        }
      }
    }

  },

  finish: function() {
    this.inherited(arguments);
    enyo.forEach(this.getOrderedControls(this.container.toIndex), function(panel) {
      panel.show();
    });
  },

  flowArrangement: function() {
    this.inherited(arguments);

    if (this.container.getPanels().length == 1) {
      return;
    }

    // determine panel position for setting title and background offset 
    var arrangement = this.container.arrangement;
    var left = arrangement[(arrangement.length - 2)].left - ((this.c$.length - 2) * this.box);
    var position = left / (this.c$.length * this.box);
    this.container.moveHandler({ position: position });
  },

  calcArrangementDifference: function(inI0, inA0, inI1, inA1) {
    if (this.container.getPanels().length==1) {
      return 0;
    }
    var i = Math.abs(inI0 % this.c$.length);
    return inA0[i][this.axisPosition] - inA1[i][this.axisPosition];
  },

  destroy: function() {
    var c$ = this.container.getPanels();
    for (var i=0, c; (c=c$[i]); i++) {
      enyo.Arranger.positionControl(c, {left: null, top: null});
      enyo.Arranger.opacifyControl(c, 1);
      c.applyStyle("left", null);
      c.applyStyle("top", null);
      c.applyStyle("height", null);
      c.applyStyle("width", null);
    }
    this.inherited(arguments);
  }

});
