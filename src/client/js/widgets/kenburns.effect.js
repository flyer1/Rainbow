define('widgets/kenburns.effect',
  function () {

      // Generate a randomized Ken Burns transition effect (for scale and x/y movement)
      var applyEffect = function () {

          var maxscale = 1.4;
          var minscale = 1.1;
          var minMov = 5;
          var maxMov = 10;
          var scalar = randomizer(minscale, maxscale).toFixed(2);
          var moveX = randomizer(minMov, maxMov).toFixed(2);
          moveX = Math.random() < 0.5 ? -Math.abs(moveX) : Math.abs(moveX);

          var moveY = randomizer(minMov, maxMov).toFixed(2);
          moveY = Math.random() < 0.5 ? -Math.abs(moveY) : Math.abs(moveY);

          var prefix = "";
          if (CSSRule.WEBKIT_KEYFRAMES_RULE) {
              prefix = "-webkit-";
          }
          else if (CSSRule.MOZ_KEYFRAMES_RULE) {
              prefix = "-moz-";
          }

          sheet = document.createElement('style');
          document.head.appendChild(sheet);

          var animation = "@" + prefix + "keyframes burnseffect { " +
                                "10% { " + prefix + "transform: scale(1); } " +
                                "90% { " + prefix + "transform: scale(" + scalar + " ) translate(" + moveX + "%," + moveY + "%); } " +
                                "100% { " + prefix + "transform: scale(" + scalar + ") translate(" + moveX + "%," + moveY + "%); } " +
                            "}";
          sheet.appendChild(document.createTextNode(animation));
          document.head.appendChild(sheet);

          monae = document.querySelector(".kenburns-effect");

          if (monae !== null) {
              monae.style.webkitAnimationName = 'burnseffect';
              monae.style.mozAnimationName = 'burnseffect';
              monae.style.animationName = 'burnseffect';
          }
      }

      function randomizer(min, max) {
          randomresult = Math.random() * (max - min) + min;
          return randomresult;
      }

      var vm = {
          applyEffect: applyEffect,
      };

      return vm;
  });

