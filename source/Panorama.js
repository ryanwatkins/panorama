// Panorama.js

// FIXME: breaks with 2 Panels
// FIXME: in 3 panel setup should always keep one peeking

enyo.kind({
  name: "rwatkins.Panorama",
  kind: "Panels", // requires enyo.layout.panels
  classes: "rwatkins-panorama",

  arrangerKind: "rwatkins.PanoramaArranger",
  wrap: true,
  narrowFit: false,

  //* the amount of the next panel in the Panorama to peek - typically ~10%
  margin: "0", // in px
  //* multiplier for the parallax effect on title
  parallax: 0.9,
  // TODO: backgroundSrc - here rather than in css

  rendered: function() {
    this.inherited(arguments);
    this.resizeHandler();
    this.moveHandler(null, { position: 0 });
  },

  resizeHandler: function() {
    this.inherited(arguments);
    this.width = this.getBounds().width;
    if (this.$._title) {
      this.titlewidth = this.$._title.getBounds().width;
    }
  },

  initComponents: function() {
    this.title.name = "_title";
    this.title.classes += " isis-panorama-title";

    this.createChrome([this.title]);
    this.inherited(arguments);
  },

  // override default getPanels() so we ignore title chrome
  getPanels: function() {
    var p = this.controlParent || this;
    var panels = [];
    enyo.forEach(p.children, function(child) {
      if (child.name !== "_title") {
        panels.push(child);
      }
    });
    return panels;
  },

  moveHandler: function(params) {
    if (!params || typeof(params.position) == 'undefined') { return; }
    // shift title
    if (this.$._title && this.titlewidth) {
      var l = ((this.titlewidth * params.position) * this.parallax) + "px"; // lots of magic numbers
      enyo.dom.transform(this.$._title, {translateX: l || null, translateY: null});
    }
    // shift background position
    if (this.width !== undefined) {
      this.applyStyle('background-position',  (this.width * params.position * 2 * this.parallax) + 'px 0px');
    }
  }

});
