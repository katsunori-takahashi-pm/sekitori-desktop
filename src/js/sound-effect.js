(function() {
  "use strict";

  var f1 = function(t) {
      return Math.sin(t*(0.001+Math.sin(t>>10)))*64;
  };
  var f2 = function(t) {
      return (t>>9)&((t<<5)|(Math.sin(t*1.4142)*3000))+(t>>3);
  };

  function oneliner() {
      var t = 0, dt = 8000 / pico.samplerate;

      return {
          process: function(L, R) {
              for (var i = 0; i < L.length; i++) {
                  L[i] = (f1(t|0) % 256) / 512;
                  R[i] = (f2(t|0) % 256) / 512;
                  t += dt;
              }
          }
      };
  }

  var exports = function() {
      return oneliner();
  };

  if (typeof module !== "undefined" && module.exports) {
      module.exports = exports;
  } else {
      window.song = exports;
  }
})();