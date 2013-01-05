/* PanoramaSample.js */

enyo.kind({
  name: "PanoramaSample",
  kind: "rwatkins.Panorama",
  classes: "enyo-unselectable",

  title: { classes: "title", content: "panorama" },
  margin: 80, // px margin
  backgroundSrc: "assets/PanoramaSample-background.png",

  // give panels some top margin to avoid title
  components: [

    { name: "panel1", classes: "panel",
      components: [
        { content: "panel 1" },
        { content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat." }
      ]
    },

    { name: "panel2", classes: "panel",
      components: [
        { content: "panel 2" },
        { content: "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat." }
      ]
    },

    { name: "panel3", classes: "panel",
      components: [
        { content: "panel 3" },
        { content: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat." }
      ]
    },
/*
    { name: "panel4", classes: "panel",
      components: [
        { content: "panel 4" },
        { content: "Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi." }
      ]
    }
*/
  ]

});