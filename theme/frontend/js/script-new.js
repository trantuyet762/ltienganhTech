var GUI = (function () {
    var menu = function () {
        if (document.querySelector(".header__top"))
        {
            document.querySelectorAll(".toogle-menu").forEach((btn) => {
                btn.addEventListener("click", function () {
                    if (!btn.classList.contains("icon-bar"))
                    {
                        document.querySelector(".toogle-menu.icon-bar").classList.remove("active");
                    }
                    btn.classList.toggle("active");
                    document.querySelector(".header__bottom-menu").classList.toggle("active");
                    document.body.classList.toggle("no-scroll");
                });
            });

            var menuItems = document.querySelectorAll(
                ".header__bottom-menu > ul > li"
            );
            menuItems.forEach(function (menuItem) {
                var submenu = menuItem.querySelector("ul");
                if (submenu)
                {
                    var span = document.createElement("span");
                    span.className = "btn-down-menu";
                    span.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
                    span.addEventListener("click", function () {
                        slideToggle(submenu, 400)
                        span.classList.toggle("active");
                    });
                    menuItem.appendChild(span);
                }
            });
        }
    }

    var fixedHeader = function () {
        var header = document.querySelector("header");
        var scrollWatcher = document.querySelector(".header-scroll-watcher");

        function adjustBodyMargin() {
            var headerHeight = header.offsetHeight;
            document.querySelector("body").style.paddingTop = headerHeight + "px";
            document.querySelector("body").style.setProperty("--header-height", headerHeight + "px");
            header.classList.add("fixed-head");
        }

        function handleIntersection(entries) {
            entries.forEach(entry => {
                var headerTop = document.querySelector(".header__top");
                if (!entry.isIntersecting && window.innerWidth > 768)
                {
                    headerTop.style.marginTop = `-${headerTop.offsetHeight}px`;
                } else
                {
                    headerTop.style.marginTop = '0';
                }
            });
        }

        adjustBodyMargin();
        var observer = new IntersectionObserver(handleIntersection, {
            root: null, // viewport,
            rootMargin: "10px",
            threshold: 0 // trigger as soon as even one pixel is visible
        });

        observer.observe(scrollWatcher);

        var resizeObserver = new ResizeObserver(() => {
            adjustBodyMargin();
        });
        resizeObserver.observe(header);
    }

    var showPassword = function () {
        if (document.querySelector(".show-password"))
        {
            document.querySelectorAll(".show-password").forEach(function (item) {
                item.querySelector("i").addEventListener("click", function () {
                    if (item.querySelector("i").classList.contains("fa-eye-slash"))
                    {
                        item.querySelector("i").classList.add("fa-eye")
                        item.querySelector("i").classList.remove("fa-eye-slash")
                        item.querySelector("input").type = "text"
                    } else
                    {
                        item.querySelector("i").classList.add("fa-eye-slash")
                        item.querySelector("i").classList.remove("fa-eye")
                        item.querySelector("input").type = "password"
                    }
                })
            })
        }
    }

    var backToTop = () => {
        var backToTopButton = document.querySelector(".btn-to-top")
        if (backToTopButton)
        {
            window.addEventListener("scroll", function () {
                if (window.scrollY > 600)
                {
                    backToTopButton.style.display = "flex"
                } else
                {
                    backToTopButton.style.display = "none"
                }
            })
            backToTopButton.addEventListener("click", function () {
                var scrollOptions = {
                    top: 0,
                    behavior: "smooth",
                }
                if ("scrollBehavior" in document.documentElement.style)
                {
                    window.scrollTo(scrollOptions)
                } else
                {
                    var scrollInterval = setInterval(function () {
                        if (window.scrollY <= 0)
                        {
                            clearInterval(scrollInterval)
                        } else
                        {
                            window.scrollBy(0, -20)
                        }
                    }, 16)
                }
                return false
            })
        }
    }

    var openModal = function () {
        if (document.querySelector(".module-modal"))
        {
            var modals = document.querySelectorAll(".module-modal[modal-target]")
            var clickBtns = document.querySelectorAll("[modal-click-target]")

            clickBtns.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault()
                    var target = btn.getAttribute("modal-click-target")
                    var modal = document.querySelector(
                        `.module-modal[modal-target="${target}"]`
                    )
                    modals.forEach((i) => i.classList.remove("active"))
                    if (modal)
                    {
                        modal.classList.add("active")
                    }
                })
            })

            modals.forEach((modal) => {
                var closeBtns = modal.querySelectorAll(".close-modal[modal-close]")
                closeBtns.forEach((closeBtn) => {
                    closeBtn.addEventListener("click", () => {
                        modal.classList.remove("active")
                    })
                })
                modal.addEventListener("click", (e) => {
                    if (!e.target.closest(".modal-content"))
                    {
                        modal.classList.remove("active")
                    }
                })
            })
        }
    }

    var openSearchModal = () => {
        if (document.querySelector(".modal-search"))
        {
            var btns = document.querySelectorAll(".btn-search,.btn-close-search")
            btns.forEach((btn) => {
                btn.addEventListener("click", function () {
                    document.querySelector(".modal-search").classList.toggle("active")
                })
            })
        }
    }

    var loadMap = function () {
        var map = document.getElementById("map")
        if (map)
        {
            var data = map.getAttribute("data-map")
            var frame = `<iframe src="${data}"></iframe>`
            setTimeout(function () {
                map.innerHTML = frame
            }, 1000)
        }
    }

    var clickTab = function () {
        if (document.querySelectorAll(".module-tabs").length > 0)
        {
            document.querySelectorAll(".module-tabs").forEach((module) => {
                var tabLinks = module.querySelectorAll(".tab-link")
                var tabContents = module.querySelectorAll(".tab-content")
                var tabLinksItem = module.querySelectorAll(".tab-link-item")
                var tabContentsItem = module.querySelectorAll(".tab-content-item")
                tabLinks.forEach((el) => {
                    el.addEventListener("click", function () {
                        openTabContent(el)
                        if (tabLinksItem.length)
                        {
                            // openTabItem(tabLinksItem[0])
                        }
                    })
                })

                tabLinksItem.forEach((el) => {
                    el.addEventListener("click", function () {
                        openTabItem(el)
                    })
                })

                function openTabContent(btn) {
                    tabContents.forEach((el) => {
                        tabLinks.forEach((i) => i.classList.remove("active"))
                        btn.classList.add("active")
                        el.classList.remove("active")
                        if (el.id === btn.getAttribute("data-electronic"))
                        {
                            el.classList.add("active")
                        }
                    })
                }

                function openTabItem(btn) {
                    tabContentsItem.forEach((el) => {
                        tabLinksItem.forEach((i) => i.classList.remove("active"))
                        btn.classList.add("active")
                        el.classList.remove("active")
                        if (el.id === btn.getAttribute("data-electronic"))
                        {
                            el.classList.add("active")
                        }
                    })
                }

            })
        }
    }

    var clickExam = function () {
        if (document.querySelector(".exam-preparation-history"))
        {
            document.querySelectorAll(".exam-preparation-history .item").forEach((item) => {
                item.querySelector(".btn").addEventListener("click", function () {
                    slideToggle(item.querySelector(".content"))
                    item.querySelector(".btn").classList.toggle("active")
                })
            })
        }
    }

    var listCategoryChoose = function () {
        var listCategoryChoose = document.querySelector(".list-category-choose")
        if (listCategoryChoose)
        {
            listCategoryChoose.querySelector(".btn").addEventListener("click", function () {
                slideToggle(listCategoryChoose.querySelector("ul"))
                listCategoryChoose.querySelector(".btn").classList.toggle("active")
            })
        }
    }

    var copyText = function () {
        var copyTexts = document.querySelectorAll(".copy-text")
        if (copyTexts.length > 0)
        {
            copyTexts.forEach(function (item) {
                item.querySelector(".btn-copy").addEventListener("click", function () {

                })
            })
        }
    }

    return {
        _: function () {
            menu()
            fixedHeader()
            showPassword()
            backToTop()
            openModal()
            openSearchModal()
            loadMap()
            clickTab()
            clickExam()
            listCategoryChoose()
            copyText()
        },
    }
})()

var SLIDER = (function () {
    var sliderBannerHome = function () {
        if (document.querySelector('.swiper-banner-home'))
        {
            new Swiper('.swiper-banner-home', {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                speed: 1000,
                slidesPerView: 1,
                loop: true,
            });
        }
    }

    var swiperExamQuestion = function () {
        if (document.querySelector('.swiper-exam-question'))
        {
            new Swiper('.swiper-exam-question .swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                grid: {
                    fill: 'row',
                    rows: 1,
                },
                navigation: {
                    nextEl: '.swiper-exam-question .btn-exam-next',
                    prevEl: '.swiper-exam-question .btn-exam-prev',
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        grid: {
                            fill: 'row',
                            rows: 2,
                        },
                    },
                    576: {
                        slidesPerView: 2,
                        grid: {
                            fill: 'row',
                            rows: 2,
                        },
                    },
                },
            });
        }
    }

    var swiperFeedback = function () {
        if (document.querySelector('.swiper-feedback'))
        {
            new Swiper('.swiper-feedback .swiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                navigation: {
                    nextEl: '.swiper-feedback .btn-feedback-next',
                    prevEl: '.swiper-feedback .btn-feedback-prev',
                },
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                speed: 1000,
                breakpoints: {
                    1280: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                },
            });
        }
    }

    var swiperPartner = function () {
        if (document.querySelector('.swiper-partner'))
        {
            new Swiper('.swiper-partner', {
                slidesPerView: 2,
                centeredSlides: true,
                spaceBetween: 24,
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                allowTouchMove: false,
                speed: 3000,
                breakpoints: {
                    1252: {
                        slidesPerView: 6,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    576: {
                        slidesPerView: 3,
                    },
                }
            });
            new Swiper('.swiper-partner-reverse', {
                slidesPerView: 2,
                centeredSlides: true,
                spaceBetween: 24,
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: true,
                },
                allowTouchMove: false,
                speed: 3000,
                breakpoints: {
                    1252: {
                        slidesPerView: 6,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    576: {
                        slidesPerView: 3,
                    },
                }
            });
        }
    }

    var swiperQualityCourse = function () {
        if (document.querySelector('.swiper-quality-course'))
        {
            new Swiper('.swiper-quality-course', {
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-quality-course-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                speed: 1000,
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                },
            });
        }
    }

    return {
        _: function () {
            sliderBannerHome()
            swiperExamQuestion()
            swiperFeedback()
            swiperPartner()
            swiperQualityCourse()
        },
    }
})()

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        GUI._()
        SLIDER._()
    }, 100)
})

function slideToggle(element, duration = 300) {
    if (window.getComputedStyle(element).display === 'none')
    {
        return slideDown(element, duration);
    } else
    {
        return slideUp(element, duration);
    }
}

function slideUp(element, duration) {
    return new Promise(function (resolve) {
        element.style.height = element.offsetHeight + 'px';
        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration + 'ms';
        element.offsetHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        window.setTimeout(function () {
            element.style.display = 'none';
            element.style.removeProperty('height');
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
            resolve(false);
        }, duration);
    });
}

function slideDown(element, duration) {
    return new Promise(function (resolve) {
        element.style.removeProperty('display');
        let display = window.getComputedStyle(element).display;
        if (display === 'none') display = 'block';
        element.style.display = display;
        let height = element.offsetHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        element.offsetHeight;
        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration + 'ms';
        element.style.height = height + 'px';
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        window.setTimeout(function () {
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
            resolve(true);
        }, duration);
    });
}