"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

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
				PREV: "Назад" // PLAY_START: "Start slideshow",
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
				}
			}
		});
		$(".modal-close-js").click(function () {
			fancybox.close();
		}); // fancybox.defaults.backFocus = false;

		const linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
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
		}, {
			passive: true
		});
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
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu-mobile .menu a"); // (1)

			if (!container || link) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	// /mobileMenu
	// tabs  .
	tabscostume(tab) {
		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(".".concat(tab)).querySelector(".".concat(tab, "__btn.active"));
					let oldActiveContent = tabs.Content[index].closest(".".concat(tab)).querySelector(".".concat(tab, "__content.active"));
					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active'); //turn on new(cklicked el)

					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		});
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
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


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
				data: data
			}).done(function (data) {
				fancybox.close();
				Fancybox.show([{
					src: "#modal-thanks",
					type: "inline"
				}]); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},

	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");

			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick);
			} else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({
					scrollTop: destination - 80
				}, 0);
				return false;
			}
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
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile();

	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} //


	function setFixedNav() {
		let header = document.querySelector('header');
		if (!header) return;

		if (window.scrollY > (header.offsetHeight || 205)) {
			header.classList.add('fixed');
		} else {
			header.classList.remove('fixed');
		}
	} //


	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', () => {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		}
	};
	const swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window
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
				spaceBetween: 25
			},
			768: {
				spaceBetween: 25
			},
			1200: {
				spaceBetween: 50
			}
		},
		loop: true,
		navigation: {
			nextEl: brandsNext,
			prevEl: brandsPrev
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	}); //

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
	}); //

	let paymentSlider = new Swiper('.payment-slider-js', {
		spaceBetween: 25,
		slidesPerView: 'auto',
		loop: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	}); //

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

	makeDDGroup(['.payment-dd-items-js', '.footer-dd-items-js']); //

	let sUseFullPrev = document.querySelector('.sUseFull--js .swiper-prev');
	let sUseFullNext = document.querySelector('.sUseFull--js .swiper-next');
	let sUseFullSlider = new Swiper('.sUseFull-slider-js', {
		slidesPerView: 'auto',
		breakpoints: {
			0: {
				spaceBetween: 20
			},
			1200: {
				spaceBetween: 30
			}
		},
		loop: true,
		navigation: {
			nextEl: sUseFullNext,
			prevEl: sUseFullPrev
		}
	}); //

	let prodCardThumb = new Swiper('.sProdCard-thumb-js', {
		slidesPerView: 'auto'
	});
	let prodCardSlider = new Swiper('.sProdCard-slider-js', {
		spaceBetween: 30,
		thumbs: {
			swiper: prodCardThumb
		},
		loop: true
	}); //

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
				slidesPerColumn: 1
			},
			575: {
				slidesPerColumn: 1,
				slidesPerView: 1
			},
			768: {
				slidesPerView: 2,
				slidesPerColumn: 2
			},
			1200: {
				slidesPerView: 3,
				slidesPerColumn: 2
			}
		},
		// Navigation arrows
		navigation: {
			nextEl: sFamiliarNext,
			prevEl: sFamiliarPrev
		},
		//pagination
		pagination: {
			el: $(this).find('.action-slider-puging'),
			clickable: true
		}
	}); //

	let captionSlider = new Swiper('.pc-tabs-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		spaceBetween: 20
	}); //.sProd-slider-js

	let sProdSlider = new Swiper('.sProd-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev'
		}
	}); //

	let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true // navigation: {
		// 	nextEl: '.swiper-next',
		// 	prevEl: '.swiper-prev',
		// },

	}); //

	let sNewPrev = document.querySelector('.sNew--js .swiper-prev');
	let sNewNext = document.querySelector('.sNew--js .swiper-next');
	let sNewSlider = new Swiper('.sNew-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: sNewNext,
			prevEl: sNewPrev
		}
	}); //

	let sBrendsPrev = document.querySelector('.sBrends--js .swiper-prev');
	let sBrendsNext = document.querySelector('.sBrends--js .swiper-next');
	let sBrendsSlider = new Swiper('.sBrends-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		loop: true,
		navigation: {
			nextEl: sBrendsNext,
			prevEl: sBrendsPrev
		}
	}); //

	$('.sTags-btn-js').click(function () {
		$('.sTags-btn-js, .sTags-row-js').toggleClass('active');
	}); //css vars

	let header = document.querySelector(".header--js");

	function calcHeaderHeight() {
		if (!header.classList.contains('fixed')) {
			document.documentElement.style.setProperty('--header-height', "".concat(header.offsetHeight, "px"));
		}

		document.documentElement.style.setProperty('--header-real-height', "".concat(header.offsetHeight, "px"));
	}

	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight(); //

	$('.catalog-btn-js').click(function () {
		$('.catalog-dd--js').toggleClass('active');
	});
	document.addEventListener('click', function () {
		if (!event.target.closest('.catalog-dd') && !event.target.closest('.catalog-btn-js')) {
			$('.catalog-dd--js').removeClass('active');
		}
	});
	$('.catalog-close-btn-js').click(function () {
		$('.catalog-dd--js').removeClass('active');
	}); //end luckyone Js
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }