var SLIDER = {
    slideBannerHome: function () {
        if (typeof Tech.$(".slide-banner__index") === "undefined") return;
        const swiperBanner = new Swiper(".slide-banner__index", {
            slidesPerView: 1,
            loop: false,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 30,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
        });
        function doAnimations(elems) {
            var animEndEv = "webkitAnimationEnd animationend";
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data("animation");
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }
        var firstElments = $(".slide-banner__index")
            .find(".swiper-slide")
            .eq(0)
            .find("[data-animation ^= 'animated']");
        doAnimations(firstElments);
        swiperBanner.on("slideChange", function () {
            var slideItems = $(".slide-banner__index").find(".swiper-slide");
            var active = swiperBanner.activeIndex;

            var aniElm = $(slideItems[active]).find(
                "[data-animation ^= 'animated']"
            );
            doAnimations(aniElm);
        });
    },

    slideTestKit: function () {
        if (typeof Tech.$(".slide-test-kit") === "undefined") return;
        const swiperBanner = new Swiper(".slide-test-kit", {
            slidesPerView: 5,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 0,
            navigation: {
                nextEl: ".test-kit__next",
                prevEl: ".test-kit__prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                992: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },
            },
        });
    },
    slideFunPrize: function () {
        if (typeof Tech.$(".slide-fun-prize") === "undefined") return;
        const swiperBanner = new Swiper(".slide-fun-prize", {
            slidesPerView: 4,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 35,
            navigation: {
                nextEl: ".fun-prize__next",
                prevEl: ".fun-prize__prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 35,
                },
            },
        });
    },
    slideFeedback: function () {
        if (typeof Tech.$(".slide-feedback") === "undefined") return;
        var slide = Tech.$(".slide-feedbacl");
        const swiperBanner = new Swiper(".slide-feedback", {
            slidesPerView: 2,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 30,
            pagination: {
                el: ".pagination-feedback",
                clickable: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                576: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            },
        });
    },
    slideNewRelated: function () {
        if (typeof Tech.$(".slide-new__related") === "undefined") return;
        const swiperBanner = new Swiper(".slide-new__related", {
            slidesPerView: 3,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 30,
            navigation: {
                nextEl: ".new-related__next",
                prevEl: ".new-related__prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    },
    slideExamGoodStudentMath: function () {
        if (typeof Tech.$(".slide-exam-good-student-math") === "undefined")
            return;
        new Swiper(".slide-exam-good-student-math", {
            slidesPerView: 2.5,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 12,
            breakpoints: {
                576: {
                    slidesPerView: 3.5,
                },
                768: {
                    slidesPerView: 4.5,
                },
                992: {
                    slidesPerView: 5.8,
                },
                1200: {
                    slidesPerView: 7,
                },
            },
        });
    },
    init: function () {
        SLIDER.slideBannerHome();
        SLIDER.slideTestKit();
        SLIDER.slideFunPrize();
        SLIDER.slideFeedback();
        SLIDER.slideNewRelated();
        SLIDER.slideExamGoodStudentMath();
    },
};
Tech.Query.ready(function () {
    setTimeout(function () {
        SLIDER.init();
    }, 100);
});
