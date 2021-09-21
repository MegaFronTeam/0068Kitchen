let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

  btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
  menuMobile: document.querySelector(".menu-mobile--js"),
  menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

  modalCall() {
    const link = ".link-modal-js";

    Fancybox.bind(link, {
      arrows: false,
      infobar: false,
      touch: false,
      type: 'inline',
      autoFocus: false,
      keyboard: {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        // PLAY_START: "Start slideshow",
        // PLAY_STOP: "Pause slideshow",
        // FULL_SCREEN: "Full screen",
        // THUMBS: "Thumbnails",
        // DOWNLOAD: "Download",
        // SHARE: "Share",
        // ZOOM: "Zoom"
      },

			//
			//infinite: false,
      on: {
				initCarousel: (fancybox, slide) => {
					$('.header').addClass('has-pe');
        },
				destroy: (fancybox, slide) => {
					$('.header').removeClass('has-pe');
					console.log(this);
        },
      },
    });

    $(".modal-close-js").click(function () {
      fancybox.close();
    })
    // fancybox.defaults.backFocus = false;
    const linkModal = document.querySelectorAll(link);
    function addData() {
      linkModal.forEach(element => {
        element.addEventListener('click', () => {
          let modal = document.querySelector(element.getAttribute("href"));
          const data = element.dataset;

          function setValue(val, elem) {
            if (elem && val) {
              const el = modal.querySelector(elem);
              el.tagName == "INPUT"
                ? el.value = val
                : el.innerHTML = val;
              // console.log(modal.querySelector(elem).tagName)
            }
          }

          setValue(data.title, '.ttu');
          setValue(data.text, '.after-headline');
          setValue(data.btn, '.btn');
          setValue(data.order, '.order');
        })
      })
    }
    if (linkModal) addData();
  },
  // /modalCall
  toggleMenu() {
    const toggle = this.btnToggleMenuMobile;
    const menu = this.menuMobile;
    document.addEventListener("click", function (event) {
      const toggleEv = event.target.closest(".toggle-menu-mobile--js");
      if (!toggleEv) return;
      toggle.forEach(el => el.classList.toggle("on"));
      menu.classList.toggle("active");
      [document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
    }, {passive: true});
  },
  closeMenu() {
    let menu = this.menuMobile;
    if (!menu) return;
    if (menu.classList.contains("active")) {
      this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
      this.menuMobile.classList.remove("active");
      [document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
    }

  },
  mobileMenu() {
    if (!this.menuMobileLink) return;
    this.toggleMenu();
    document.addEventListener('mouseup', (event) => {
      let container = event.target.closest(".menu-mobile--js.active"); // (1)
      let link = event.target.closest(".menu-mobile .menu a"); // (1)
      if (!container || link) this.closeMenu();
    }, {passive: true});

    window.addEventListener('resize', () => {
      if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
    }, {passive: true});
  },
  // /mobileMenu

  // tabs  .
  tabscostume(tab) {
    let tabs = {
      Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
      BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
      Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
    }
    tabs.Btn.forEach((element, index) => {
      element.addEventListener('click', () => {
        if (!element.classList.contains('active')) {
          //turn off old
          let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
          let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

          oldActiveEl.classList.remove('active');
          oldActiveContent.classList.remove('active')

          //turn on new(cklicked el)
          element.classList.add('active');
          tabs.Content[index].classList.add('active');
        }
      })
    })
  },
  // /tabs

  inputMask() {
    // mask for input
    let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
    InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
    Inputmask("+9(999)999-99-99").mask(InputTel);
  },
  // /inputMask
  ifie() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
      document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
    }
  },
  sendForm() {
    var gets = (function () {
      var a = window.location.search;
      var b = new Object();
      var c;
      a = a.substring(1).split("&");
      for (var i = 0; i < a.length; i++) {
        c = a[i].split("=");
        b[c[0]] = c[1];
      }
      return b;
    })();
    // form
    $(document).on('submit', "form", function (e) {
      e.preventDefault();
      const th = $(this);
      var data = th.serialize();
      th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
      th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
      th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
      th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
      $.ajax({
        url: 'action.php',
        type: 'POST',
        data: data,
      }).done(function (data) {

        fancybox.close();
        Fancybox.show([{src: "#modal-thanks", type: "inline"}]);
        // window.location.replace("/thanks.html");
        setTimeout(function () {
          // Done Functions
          th.trigger("reset");
          // $.magnificPopup.close();
          // ym(53383120, 'reachGoal', 'zakaz');
          // yaCounter55828534.reachGoal('zakaz');
        }, 4000);
      }).fail(function () {
      });

    });
  },
  heightwindow() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, {passive: true});
  },
  animateScroll() {
    let header = document.querySelector("#headerAlt") || document.querySelector('.top-nav');
    $(document).on('click', '.scroll-link, .aside-menu-js > ul > li > a', function () {
      event.preventDefault();
      let elementClick = $(this).attr("href");
      let scrollBox = this.getAttribute('data-scrollbox');

      if (scrollBox){
        scrollBox = document.querySelector(scrollBox);
        let destination = $(elementClick).offset().top - $(elementClick).parent().offset().top;

        $(scrollBox).animate({
          scrollTop: destination,
        }, 700);
      }
      else{
        let destination = $(elementClick).offset().top - header.offsetHeight - 20;
        $('html, body').animate({ scrollTop: destination }, 600);
      }
      // window.scrollTo({
      //   top: destination,
      //   behavior: "smooth"
      // });

      return false;
    });
  },
  getCurrentYear(el) {
    let now = new Date();
    let currentYear = document.querySelector(el);
    if (currentYear) currentYear.innerText = now.getFullYear();
  }
};
const $ = jQuery;

function eventHandler() {
  JSCCommon.ifie();
  JSCCommon.modalCall();
  JSCCommon.tabscostume('tabs');
  JSCCommon.mobileMenu();
  JSCCommon.inputMask();
  JSCCommon.sendForm();
  JSCCommon.heightwindow();
  JSCCommon.animateScroll();

  // JSCCommon.CustomInputFile();
  var x = window.location.host;
  let screenName;
  screenName = document.body.dataset.bg;
  if (screenName && x.includes("localhost:30")) {
    document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
  }

  //
  function setFixedNav() {
    let header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > (header.offsetHeight || 205)) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }

  //
  function whenResize() {
    setFixedNav();
  }

  window.addEventListener('scroll', () => {
    setFixedNav();
  }, {passive: true})
  window.addEventListener('resize', () => {
    whenResize();
  }, {passive: true});

  whenResize();


  let defaultSl = {
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true,
    },
    watchOverflow: true,
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
      // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
    },
  }

  const swiper4 = new Swiper('.sBanners__slider--js', {
    // slidesPerView: 5,
    ...defaultSl,
    slidesPerView: 'auto',
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true,

  });
  // modal window

  //luckyone Js
  //.breands-slider-js
  //.,
  // 	.swiper-next

  let brandsPrev = document.querySelector('.brands--js .swiper-prev');
  let brandsNext = document.querySelector('.brands--js .swiper-next');
  let brandsSlider = new Swiper('.breands-slider-js', {
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        spaceBetween: 25,
      },
      768: {
        spaceBetween: 25,
      },
      1200: {
        spaceBetween: 50,
      },
    },

    loop: true,
    navigation: {
      nextEl: brandsNext,
      prevEl: brandsPrev,
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });
  //
  $('img.img-svg-js').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      } // Remove any invalid XML tags as per http://validator.w3.org


      $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      } // Replace image with new SVG


      $img.replaceWith($svg);
    }, 'xml');
  });

  //
  let paymentSlider = new Swiper('.payment-slider-js', {
    spaceBetween: 25,
    slidesPerView: 'auto',

    loop: true,
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  //
  function makeDDGroup(ArrSelectors) {
    for (let parentSelect of ArrSelectors) {
      let parent = document.querySelector(parentSelect);
      if (parent) {
        // childHeads, kind of funny))
        let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
        $(ChildHeads).click(function () {
          let clickedHead = this;

          $(ChildHeads).each(function () {
            if (this === clickedHead) {
              //parent element gain toggle class, style head change via parent
              $(this.parentElement).toggleClass('active');
              $(this.parentElement).find('.dd-content-js').slideToggle(function () {
                $(this).toggleClass('active');
              });
            } else {
              $(this.parentElement).removeClass('active');
              $(this.parentElement).find('.dd-content-js').slideUp(function () {
                $(this).removeClass('active');
              });
            }
          });

        });
      }
    }
  }
  makeDDGroup([
    '.payment-dd-items-js',
    '.delivery-dd-items-js',
    '.footer-dd-items-js',
    '.prod-card-dd-items-js',
    //'.sidebar-dd-items-js',
  ]);

  //free
  $('.free-dd-head-js').click(function () {
    if (event.target.closest('.hint-js')) return
    $(this.parentElement).toggleClass('active');
    $(this.parentElement).find('.free-dd-content-js').slideToggle(function () {
      $(this).toggleClass('active');
    });
  });


  //
  let sUseFullPrev = document.querySelector('.sUseFull--js .swiper-prev');
  let sUseFullNext = document.querySelector('.sUseFull--js .swiper-next');
  let sUseFullSlider = new Swiper('.sUseFull-slider-js', {
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        spaceBetween: 20,
      },
      1200: {
        spaceBetween: 30,
      },
    },

    loop: true,
    navigation: {
      nextEl: sUseFullNext,
      prevEl: sUseFullPrev,
    },
  });

  //
  let prodCardThumb = new Swiper('.sProdCard-thumb-js', {
    slidesPerView: 'auto',
  });

  let prodCardSlider = new Swiper('.sProdCard-slider-js', {
    spaceBetween: 30,
    thumbs: {
      swiper: prodCardThumb,
    },
    loop: true,
  });

  //
  let sFamiliarPrev = document.querySelector('.sFamiliar--js .swiper-prev');
  let sFamiliarNext = document.querySelector('.sFamiliar--js .swiper-next');
  let sFamiliarSlider = new Swiper('.sFamiliar-slider-js', {
    // Optional parameters
    //loop: true,//break all
    slidesPerColumnFill: 'row',
    spaceBetween: 0,

    breakpoints: {
      1: {
        slidesPerView: 1,
        slidesPerColumn: 1,
      },
      575: {
        slidesPerColumn: 1,
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerColumn: 2,
      },
      1200: {
        slidesPerView: 3,
        slidesPerColumn: 2,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: sFamiliarNext,
      prevEl: sFamiliarPrev,
    },
    //pagination
    pagination: {
      el: $(this).find('.action-slider-puging'),
      clickable: true,
    },
  });
  //
  let captionSlider = new Swiper('.pc-tabs-slider-js', {
    slidesPerView: 'auto',
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true,
    spaceBetween: 20,
  });
  //.sProd-slider-js
  let sProdSlider = new Swiper('.sProd-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
  });

  //
  let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.headerBlock-slider-js .swiper-pagination',
      clickable: true,
    },
    // navigation: {
    // 	nextEl: '.swiper-next',
    // 	prevEl: '.swiper-prev',
    // },
  });

  //
  let sNewPrev = document.querySelector('.sNew--js .swiper-prev, .sBuyWith--js .swiper-prev');
  let sNewNext = document.querySelector('.sNew--js .swiper-next, .sBuyWith--js .swiper-next');
  let sNewSlider = new Swiper('.sNew-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,

    navigation: {
      nextEl: sNewNext,
      prevEl: sNewPrev,
    },
  });
  //
  let sBrendsPrev = document.querySelector('.sBrends--js .swiper-prev');
  let sBrendsNext = document.querySelector('.sBrends--js .swiper-next');
  let sBrendsSlider = new Swiper('.sBrends-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,

    navigation: {
      nextEl: sBrendsNext,
      prevEl: sBrendsPrev,
    },
  });
  //
  // $('.sTags-btn-js').click(function () {
  //   $('.sTags-btn-js, .sTags-row-js').toggleClass('active');
  // });
  //
  $('.sTags-btn-js').click(function () {
    let row = this.closest('.sTags-row-js');
    $(row).toggleClass('active').find('.sTags-btn-js').toggleClass('active');
  });

  //css vars
  let header = document.querySelector(".header--js");
  let brands = document.querySelector(".brands--js");
  let fixedNav = document.querySelector(".fixed-nav--js");

  function calcHeaderHeight() {
    if (!header.classList.contains('fixed')) {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
    document.documentElement.style.setProperty('--header-real-height', `${header.offsetHeight}px`);
    document.documentElement.style.setProperty('--brands-h', `${brands.offsetHeight}px`);

    if (fixedNav){
      document.documentElement.style.setProperty('--fixed-foot-nav-h', `${fixedNav.offsetHeight}px`);
    }
  }

  window.addEventListener('resize', calcHeaderHeight, {passive: true});
  window.addEventListener('scroll', calcHeaderHeight, {passive: true});
  calcHeaderHeight();
  //
  $('.catalog-btn-js').click(function (){
    $('.catalog-dd--js').toggleClass('active');
    JSCCommon.closeMenu();
  });
  document.addEventListener('click', function (){
    if (!event.target.closest('.catalog-dd') && !event.target.closest('.catalog-btn-js')){
      $('.catalog-dd--js').removeClass('active');
    }
  });
  $('.catalog-close-btn-js').click(function (){
    $('.catalog-dd--js').removeClass('active');
  });
  //.close-mob-search-js
  //.mob-search-js
  //.mob-search-btn-js
  $('.mob-search-btn-js').click(function (){
    $('.mob-search-js').fadeToggle(function (){
      $(this).toggleClass('active');
    });
  })
  //
  $('img.img-svg-js').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      } // Remove any invalid XML tags as per http://validator.w3.org


      $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      } // Replace image with new SVG


      $img.replaceWith($svg);
    }, 'xml');
  });
  //

  let readMoreConts = document.querySelectorAll('.rm-cont-js');
  for (let cont of readMoreConts){
    let btn = cont.querySelector('.rm-btn-js');
    if (btn){
      btn.addEventListener('click', function (){
        this.classList.toggle('active');
        let hidden = cont.querySelector('.rm-hidden-js');

        $(hidden).slideToggle(function (){
          $(this).toggleClass('active');
        })
      });
    }
  }

  // rangle sliders
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }
  $(".range-wrap").each(function () {

    let _this = $(this);
    var $range= _this.find(".slider-js");
    var $inputFrom = _this.find(".input_from");
    var $inputTo = _this.find(".input_to");

    var instance, from, to,
      min = $range.data('min'),
      max = $range.data('max');

    $range.ionRangeSlider({
      skin: "round",
      type: "double",
      grid: false,
      grid_snap: false,
      hide_min_max: false,
      hide_from_to: true,
      //here
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;

      $inputFrom.prop("value", currencyFormat(from));
      $inputTo.prop("value", currencyFormat(to));
      // InputFormat();
    }

    $inputFrom.on("change input ", function () {
      var val = +($(this).prop("value").replace(/\s/g, ''));
      // validate
      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }

      instance.update({
        from: val
      });
      $(this).prop("value", currencyFormat(val));
      console.log(val)
    });

    $inputTo.on("change input ", function () {
      var val = +($(this).prop("value").replace(/\s/g, ''));

      // validate
      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        to: val
      });
      $(this).prop("value", currencyFormat(val));
    });

  });

  //end luckyone Js
  let popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  let popovers = [];

  for(let elem of popoverTriggerList){
    let popoverContent = {
      title: elem.dataset.title,
      descr: elem.dataset.descr,
    };

    let popoverInner= `
      <div class="sidebar__popover">
        <div class="sidebar__close-btn close-popover-js">
          <img loading="lazy" src="img/svg/cross-sm.svg" alt="">
        </div>
        <h4>
          ${popoverContent.title}
        </h4>
        ${popoverContent.descr}
      </div>`;

    let index = $(popoverTriggerList).index(elem);

    let popover =  new bootstrap.Popover(elem, {
      template: `<div class="popover" role="tooltip">
			${popoverInner}`,
      container: '#sCatalog',
      trigger: 'manual',
      placement: 'auto',
    });
    popovers.push(popover);

    elem.addEventListener('click', popOverElemClick);
  }

  $('body').click(function (){
    if (event.target.closest('.close-popover-js')){
      $(popovers).each(function (){
        this.hide();
      });
    }
  });

  function popOverElemClick(){
    document.removeEventListener('click', popoverMissClick);
    let index = $(popoverTriggerList).index(this);

    $(popovers).each(function (){
      this.hide();
    })
    popovers[index].show();
    $(this).addClass('active');

    window.setTimeout(function (){
      document.addEventListener('click', popoverMissClick);
    }, 10);
  }


  let popoverMissClick = function (){
    if (!event.target.closest('.popover') ){
      $(popovers).each(function (){
        this.hide();
      });
    }
  };


  //.filter-btn-js
  $('.filter-btn-js').click(function (){
    $(this).toggleClass('active');
    $('.sidebar--js').slideToggle(function (){
      $(this).toggleClass('active');
    })
  });

  //location
  $('.location-btn-js').click(function (){
    $('.location-dd-js').toggleClass('active');
  });
  $('.location-close-js').click(function (){
    $('.location-dd-js').removeClass('active');
  })
  document.addEventListener('click', function (){
    if(!event.target.closest('.location-dd-js') && !event.target.closest('.location-btn-js')){
      $('.location-dd-js').removeClass('active');
    }
  })


  //#modal-city
  $('.mc-show-all-js').click(function (){
    $(this).fadeOut(function (){
      $(this).removeClass('active');
    }, 0);
    $('.modal-city--js').toggleClass('big');
    $('.mc-popular-js, .mc-all-js').toggleClass('active');
  })

  //.add-btn-js
  $('.add-btn-js').click(function (){
    document.body.removeEventListener('click', addMissClick);
    let thisItem = this.closest('.cart-item--js');

    $('.add-dd--js').each(function (){
      let currItem = this.closest('.cart-item--js');
      if (currItem !== thisItem){
        $(currItem).find('.add-dd--js').slideUp(function (){
          $(this).removeClass('active');
        })
      }
    })
    $(thisItem).find('.add-dd--js').slideToggle(function (){
      $(this).toggleClass('active');
    });
    document.body.addEventListener('click', addMissClick);
  })

  let addMissClick = function (){
    if(!event.target.closest('.add-btn-js') && !event.target.closest('.add-dd--js')){
      document.body.removeEventListener('click', addMissClick);

      $('.add-dd--js').slideUp(function (){
        $(this).removeClass('active');
      })
    }
  }
  $('.sCart-baner-btn-js').click(function (){
    $(this).closest('.sCart-baner-js').slideUp(function (){
      $(this).removeClass('active');
    })
  })
  //
  let sCompareMainSlider = new Swiper('.sCompare-main-slider-js', {
    slidesPerView: 'auto',

    scrollbar: {
      el: ".swiper-scrollbar",
      //draggable: true,
      //hide: true,
    },
  });
  let subSlidersConts = document.querySelectorAll('.sCompare-sub-slider-js');
  for(let [index, sliderCont] of Object.entries(subSlidersConts)){
    let prevBtns = sliderCont.querySelectorAll('.sub-slider-prev-js');
    let nextBtns = sliderCont.querySelectorAll('.sub-slider-next-js');

    let subSlider = new Swiper(sliderCont, {
      initialSlide: index,
      slidesPerView: 'auto',
      allowTouchMove: false,
    });
    $(prevBtns).click(function (){
      subSlider.slidePrev();
    });
    $(nextBtns).click(function (){
      subSlider.slideNext();
    });
  }
  //
  let allSlides = document.querySelectorAll('.sCompare-sub-slider-js .swiper-slide');
  let compareCard = document.querySelector('.compare-card--js');
  let headlines = document.querySelectorAll('.c-item-js');
  let lines=[];
  //
  for (let [headLineIndex,line] of Object.entries(headlines)){
    lines[headLineIndex] = [line];
    for(let slide of allSlides){
      let slideLine = slide.querySelectorAll(`.slide-char-js`)[headLineIndex];
      lines[headLineIndex].push(slideLine);
    }
  }

  function compareCardResize() {
    if (compareCard){
      document.documentElement.style.setProperty('--comp-card-h', `${compareCard.offsetHeight}px`);
    }
    if (window.matchMedia("(max-width: 992px)").matches) return
    for (let line of lines){
      let minH = 0;
      for (let item of line){
        if (minH < item.offsetHeight){
          minH = item.offsetHeight;
        }
      }
      $(line).each(function (){
        this.style.minHeight = minH+'px';
      })
    }
  }
  window.addEventListener('resize', compareCardResize, {passive: true});
  //-window.addEventListener('scroll', compareCardResize, {passive: true});
  compareCardResize();

  let sAboutSlider = new Swiper('.sAbout-slider-js', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.sAbout--js .swiper-next',
      prevEl: '.sAbout--js .swiper-prev',
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  //
  // let tagsSlider = new Swiper('.tags-slider-js', {
  //   slidesPerView: 'auto',
  //   freeMode: true,
  //   loopFillGroupWithBlank: true,
  //   touchRatio: 0.2,
  //   slideToClickedSlide: true,
  //   freeModeMomentum: true,
  //   slidesPerColumn: 4,
  //   slidesPerColumnFill: 'row',
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //     draggable: true,
  //   }
  // });

  new ScrollBooster({
    viewport: document.querySelector('.tags-slider-js'),
    content: document.querySelector('.tag-wrapper'),
    scrollMode: 'native',
    // scrollMode: 'transform', // use CSS 'transform' property
    direction: 'horizontal', // allow only horizontal scrolling
    emulateScroll: true, // scroll on wheel events
  });


};
if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}