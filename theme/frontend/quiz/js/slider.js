var SLIDER = {


	slideBannerHome: function () {
		const swiperBanner = new Swiper('.slide-banner__index', {
			slidesPerView: 1,
			disableOnInteraction: true,
			speed: 800,
			spaceBetween: 10,
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".pagination__index",
				clickable: true,
			},
			navigation: {
				nextEl: ".banner-next",
				prevEl: ".banner-prev",
			},
		});
	},
	slideSystem: function () {
		if (typeof Tech.$('.slide-system') === 'undefined') return;
		const swiperBanner = new Swiper('.slide-system', {
			slidesPerView: 1,
			disableOnInteraction: true,
			speed: 600,
			spaceBetween: 10,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".system_next",
				prevEl: ".system_prev",
			},
			pagination: {
				el: ".pagination-system",
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 15
				},

				1023: {
					slidesPerView: 3,
					spaceBetween: 24,
				},


			}

		});
	},
	slideExperts: function () {
		if (typeof Tech.$('.slide-experts') === 'undefined') return;
		var slide = Tech.$('.slide-experts');

		var btnPrev = Tech.$('.experts_prev');

		var btnNext = Tech.$('.experts_next');
		if (slide._element.length > 1) {
			for (i = 0; i < slide._element.length; i++) {
				slide._element[i].addClass('slide-experts-' + i);

				btnPrev._element[i].addClass('experts_prev-' + i);

				btnNext._element[i].addClass('experts_next-' + i);
				const swiperBanner = new Swiper('.slide-experts-' + i, {
					slidesPerView: 1.2,
					disableOnInteraction: true,
					speed: 600,
					spaceBetween: 10,
					navigation: {
						nextEl: ".experts_next-"+ i,
						prevEl: ".experts_prev-" + i,
					},

					breakpoints: {
						576: {
							slidesPerView: 2,
							spaceBetween: 15
						},
						768: {
							slidesPerView: 2.5,
							spaceBetween: 15
						},
						992: {
							slidesPerView: 3,
							spaceBetween: 15
						},

						1023: {
							slidesPerView: 3,
							spaceBetween: 24,
						},


					}

				});
			}
		}else{
			const swiperBanner = new Swiper('.slide-experts', {
				slidesPerView: 1.2,
				disableOnInteraction: true,
				speed: 600,
				spaceBetween: 10,
				navigation: {
					nextEl: ".experts_next",
					prevEl: ".experts_prev",
				},

				breakpoints: {
					576: {
						slidesPerView: 2,
						spaceBetween: 15
					},
					768: {
						slidesPerView: 2.5,
						spaceBetween: 15
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 15
					},

					1023: {
						slidesPerView: 3,
						spaceBetween: 24,
					},


				}

			});
		}

	},


	init: function () {
		SLIDER.slideBannerHome();
		SLIDER.slideSystem();
		SLIDER.slideExperts();

	},
}
Tech.Query.ready(function () {
	setTimeout(function () {
		SLIDER.init();
	}, 100);
});