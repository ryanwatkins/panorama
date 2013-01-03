/* PanoramaSample.js */

enyo.kind({
  name: "PanoramaSample",
  kind: "rwatkins.Panorama",

  title: { classes: "title", content: "Panorama Sample" },
  margin: 100, // px margin

  // give panels some top margin to avoid title
  components: [
    { classes: "panel", content: "panel 1" },
    { classes: "panel", content: "panel 2" },
    { classes: "panel", content: "panel 3" }
  ]

});