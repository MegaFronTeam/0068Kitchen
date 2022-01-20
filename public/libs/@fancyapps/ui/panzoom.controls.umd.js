// @fancyapps/ui/Panzoom.Controls v4.0.19
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).window=t.window||{})}(this,(function(t){"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,n){for(var o=0;o<n.length;o++){var e=n[o];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var o=0,e=new Array(n);o<n;o++)e[o]=t[o];return e}function r(t,n){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=function(t,n){if(t){if("string"==typeof t)return e(t,n);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){o&&(t=o);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,l=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return c=t.done,t},e:function(t){l=!0,a=t},f:function(){try{c||null==o.return||o.return()}finally{if(l)throw a}}}}var i,a=function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.panzoom=n,this.$container=null}var n,e,i;return n=t,e=[{key:"addButton",value:function(t){var n=this,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=document.createElement("button");return e.setAttribute("title",this.panzoom.localize("{{CONTROLS.".concat(t.toUpperCase(),"}}"))),e.classList.add("panzoom__button"),e.classList.add("panzoom__button--".concat(t)),e.innerHTML=this.panzoom.localize(this.panzoom.option("Controls.tpl.".concat(t),"")),o&&e.addEventListener("click",(function(o){o.stopPropagation(),n.panzoom[t]()})),this.$container.appendChild(e),e}},{key:"createContainer",value:function(){if(!this.$container&&this.panzoom.option("zoom")){var t=document.createElement("div");t.classList.add("panzoom__controls"),this.$container=this.panzoom.$container.appendChild(t);var n,o=r(this.panzoom.option("Controls.buttons",[]));try{for(o.s();!(n=o.n()).done;){var e=n.value;this.addButton(e,!0)}}catch(t){o.e(t)}finally{o.f()}}}},{key:"removeContainer",value:function(){this.$container&&(this.$container.remove(),this.$container=null)}},{key:"attach",value:function(){this.createContainer()}},{key:"detach",value:function(){this.removeContainer()}}],e&&o(n.prototype,e),i&&o(n,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();a.defaults={l10n:{ZOOMIN:"Zoom in",ZOOMOUT:"Zoom out"},buttons:["zoomIn","zoomOut"],tpl:{zoomIn:'<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" /></svg>',zoomOut:'<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 12H4" /></svg>'}},"undefined"!=typeof Panzoom&&("object"===n(i=Panzoom.Plugins)&&null!==i&&i.constructor===Object&&"[object Object]"===Object.prototype.toString.call(i))&&(Panzoom.Plugins.Controls=a),t.Controls=a}));
