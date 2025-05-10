var CLICK = {
    fixedMenu: function () {
        /* Cài đặt chế độ menu */
        optionMenu = {
            hideOnScrollDown: false,
            delayShowOnScrollTop: 0 /* Delay hiển thị khi scroll top. Áp dụng khi hideOnScrollDown = true */,
        };

        hideOnScrollDown = optionMenu.hideOnScrollDown || false;
        delayShowOnScrollTop = optionMenu.delayShowOnScrollTop || 0;

        /* Khai báo header */
        var header = Tech.$(".header");
        if (!header) return;
        var headerHeight = header.outerHeight();
        var headerTop = Tech.$(".header-top").outerHeight();
        var classMenuInShow = "in-menu-show";
        var classMenuInHide = "in-menu-hide";
        var _width = window.innerWidth;
        var bodyPage = Tech.$("body");
        Tech.$("body").css("padding-top", headerHeight + `px`);
        header.addClass("fixed");

        /* Function phụ trợ */

        /* Ẩn hiện menu khi scroll */
        var lastScrollTop = 0;
        window.addEventListener("scroll", function () {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                if (lastScrollTop > headerHeight) {
                    header.css("top", `-` + headerTop + `px`);
                }
            } else {
                header.css("top", "0px");
            }

            lastScrollTop = st <= 0 ? 0 : st;
        });
    },
    showMenu: function () {
        var buttonShowMenu = Tech.$(".show-menu__mobile");
        var closeMenu = Tech.$(".over-lay");
        if (typeof buttonShowMenu != "undefined") {
            buttonShowMenu.onClick(function () {
                Tech.$(".menu-mobile").addClass("active");
                Tech.$(".over-lay").addClass("show");
                Tech.$("body").addClass("show-menu");
            });
        }
        if (typeof closeMenu != "undefined") {
            closeMenu.onClick(function () {
                Tech.$(".menu-mobile").removeClass("active");
                Tech.$(".over-lay").removeClass("show");
                Tech.$("body").removeClass("show-menu");
            });
        }

        var width_ = window.innerWidth;
        var menuMobile = Tech.$(".menu-mobile");
        if (menuMobile) {
            var listIitemLi = menuMobile.find("li");
            listIitemLi.forEach(function (element, index) {
                if (element.find(":scope > ul").length() > 0) {
                    element.append(
                        `<span class="btn-dropdown-menu"><i class="fa fa-angle-down" aria-hidden="true"></i></span>`
                    );
                }
            });
        }
        if (width_ < 992) {
            var listBtnDropdownMenu =
                Tech.$(".menu-mobile").find(".btn-dropdown-menu");
            var timeSlide = 300;
            listBtnDropdownMenu.onClick(function (event) {
                var _this = Tech.$(this);
                _this.css("pointer-events", "none");
                setTimeout(function () {
                    _this.css("pointer-events", "all");
                }, timeSlide);
                // var parentLi = Tech.$(this.closest('li'));
                var listUlChild = Tech.$(this).prev("ul");
                _this.toggleClass("open");
                listUlChild.toggleSlide(timeSlide);
            });
        }
    },

    playVideo: function () {
        var buttonPlayVideo = Tech.$(".click-play-video");
        var video = Tech.$("#video-lesson");
        if (typeof buttonPlayVideo != "undefined") {
            buttonPlayVideo._element.forEach(function (elm) {
                elm._element.onclick = function (event) {
                    event.preventDefault();
                    var link = Tech.$(this).attr("data-link");
                    var html =
                        '<video width="100%" controls autoplay><source src=" ' +
                        link +
                        '"></video>';
                    video.html(html);
                };
            });
        }
    },
    initAnimation: function () {
        var width_ = window.innerWidth;
        if (width_ > 991) {
            var wow = new WOW();
            wow.init();
        }
    },

    showContentDetail: function () {
        var content = Tech.$(".content-intro__prd");
        var btnShowContent = Tech.$(".show-content-intro ");
        if (typeof content !== "undefined") {
            var height_ = content.outerHeight();
            if (height_ > 48) {
                content.addClass("hidden");
            } else {
                content.removeClass("hidden");
            }
        }
        if (typeof btnShowContent !== "undefined" && content !== "undefined") {
            btnShowContent.onClick(function () {
                if (Tech.$(this).text() == "Xem thêm") {
                    Tech.$(this).prev(".show-content-intro").addClass("show");
                    Tech.$(this).text("Thu gọn");
                } else {
                    Tech.$(this)
                        .prev(".show-content-intro")
                        .removeClass("show");
                    Tech.$(this).text("Xem thêm");
                }
            });
        }
    },

    initMasonry: function () {
        const elem = document.querySelector(".grid-image");
        if (typeof elem !== "undefined") {
            var msnry = new Masonry(elem, {
                itemSelector: ".grid-item",
                fitWidth: true,
                columnWidth: 1,
                horizontalOrder: true,
            });
        }
    },
    moduleSearch: function () {
        /* Khai basco setting */
        optinonSearch = {
            fullContent: false,
            /* Chỉ để true khi đã dung menu fixed. */
            contentTagertSelector: ".header",
        };
        fullContent = optinonSearch.fullContent || false;
        contentTagertSelector = optinonSearch.contentTagertSelector || "";
        if (fullContent && contentTagertSelector != "") {
            contentTagert = Tech.$(contentTagertSelector);
            offSetContentTagert = contentTagert.offset();
        }

        var btnShowSearch = Tech.$(".show-form__search");
        var formSearch = Tech.$(".form-search__content");
        if (formSearch) {
            var inputSearch = formSearch.find("input");
        }

        function resetPositionFormSearch() {
            if (fullContent && typeof contentTagert !== "undefined") {
                if (formSearch.hasClass("active")) {
                    formSearch.css("top", offSetContentTagert.top + `px`);
                } else {
                    formSearch.css(
                        "top",
                        offSetContentTagert.top - contentTagert.height() + `px`
                    );
                }
            }
        }

        if (btnShowSearch) {
            btnShowSearch.onClick(function (event) {
                btnShowSearch.toggleClass("active");
                if (fullContent && typeof contentTagert !== "undefined") {
                    var btnDoSearch = formSearch.find(".btn-do-search");
                    if (btnDoSearch.length() > 0) {
                        btnDoSearch.remove();
                    }
                    var btnCloseSearch = formSearch.find(".show-form__search");
                    if (btnCloseSearch.length() == 0) {
                        formSearch.append(`<button class="smooth btn-close-search d-flex justify-content-center align-items-center" type="button">
                            <div class="icon-close"></div>
                            </button>`);
                    }
                    formSearch.css("position", "fixed");
                    formSearch.css(
                        "top",
                        offSetContentTagert.top - contentTagert.height() + `px`
                    );
                    formSearch.css("left", offSetContentTagert.left + `px`);
                    formSearch.css("width", contentTagert.width() + `px`);
                    formSearch.css("height", contentTagert.height() + `px`);
                }
                formSearch.addClass("have-transition");
                formSearch.toggleClass("show");
                resetPositionFormSearch();
                setTimeout(function () {
                    document.getElementById("input-search-header").focus();
                }, 500);
            });
            document.addEventListener("click", function (event) {
                var insideBtnShowSearch =
                    event.target.closest(".show-form__search");
                var insideFormSearch = event.target.closest(
                    ".form-search__content"
                );
                var insideCloseSearch =
                    event.target.closest(".btn-close-search");
                if (
                    (!insideBtnShowSearch && !insideFormSearch) ||
                    insideCloseSearch
                ) {
                    btnShowSearch.removeClass("active");
                    formSearch.removeClass("show");
                    resetPositionFormSearch();
                }
            });
        }
    },
    numberUpDown: function () {
        var btnUp = Tech.$(".up-btns");
        var btnDown = Tech.$(".down-btns");
        if (typeof btnUp !== "undefined") {
            btnUp.onClick(function (event) {
                event.preventDefault();

                var value = parseInt(
                    Tech.$(this).prev("input.number").val(),
                    10
                );

                value++;

                Tech.$(this).prev("input.number").val(value);
            });
        }
        if (typeof btnDown !== "undefined") {
            btnDown.onClick(function (event) {
                var value = parseInt(
                    Tech.$(this).next("input.number").val(),
                    10
                );

                value--;

                value = value < 1 ? 1 : value;

                Tech.$(this).next("input.number").val(value);

                if (Tech.$(this).next().hasClass("change-deal-main")) {
                    DEAL.handlerChangeDealMain(Tech.$(this).next());
                }
            });
        }
    },
    initCountUp: function () {
        var listCountNumber = Tech.$(".section-statis__index");
        if (typeof listCountNumber == "undefined") return false;
        var capacityStatus = 0;
        var heightWindow =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        window.addEventListener(
            "scroll",
            function () {
                if (
                    capacityStatus == 0 &&
                    window.pageYOffset >
                        listCountNumber.offset().top - heightWindow
                ) {
                    const itemCounts = listCountNumber.find(".number");

                    if (itemCounts.length() == 0) return;
                    /* setup thời gian nhảy số */
                    const animationDuration = 5000;
                    const frameDuration = 1000 / 30;
                    const totalFrames = Math.round(
                        animationDuration / frameDuration
                    );

                    itemCounts.forEach(function (element, index) {
                        const easeOutQuad = (t) => t * (2 - t);
                        const animateCountUp = (el) => {
                            let frame = 0;
                            const countTo = el.tech5s("number");
                            const counter = setInterval(() => {
                                frame++;
                                const countToNumber = countTo.replace(
                                    /([^0-9])+/i,
                                    ""
                                );
                                const progress = easeOutQuad(
                                    frame / totalFrames
                                );
                                const currentCount = Math.round(
                                    countToNumber * progress
                                );
                                if (parseInt(el.text(), 10) !== currentCount) {
                                    var textTarget = currentCount;
                                    if (currentCount < 10) {
                                        textTarget = "0" + textTarget;
                                    }
                                    el.text(textTarget);
                                }
                                if (frame === totalFrames) {
                                    el.text(countTo);
                                    clearInterval(counter);
                                }
                            }, frameDuration);
                        };
                        animateCountUp(element);
                    });
                    capacityStatus = 1;
                }
            },
            false
        );
    },
    showDocumentCategory: function () {
        var listIitem = Tech.$(".document-category");
        if (typeof listIitem !== "undefined") {
            var listIitemLi = listIitem.find("li");
            listIitemLi.forEach(function (element, index) {
                if (element.find(":scope > ul").length() > 0) {
                    element.append(
                        `<span class="btn-dropdown-doc"><i class="fa fa-angle-down" aria-hidden="true"></i></span>`
                    );
                }
            });
            var listBtnDropdownDoc =
                Tech.$(".document-category").find(".btn-dropdown-doc");
            var timeSlide = 300;
            listBtnDropdownDoc.onClick(function (event) {
                var _this = Tech.$(this);
                _this.css("pointer-events", "none");
                Tech.$(this).parent().toggleClass("active");
                setTimeout(function () {
                    _this.css("pointer-events", "all");
                }, timeSlide);
                // var parentLi = Tech.$(this.closest('li'));
                var listUlChild = Tech.$(this).prev("ul");
                _this.toggleClass("open");
                listUlChild.toggleSlide(timeSlide);
            });
        }
    },
    showPractice: function () {
        var button = Tech.$(".show-all-practice");
        if (typeof button !== "undefined") {
            if (button._element.length > 1) {
                button._element.forEach(function (elm) {
                    elm._element.onclick = function (e) {
                        e.preventDefault();
                        var parent = Tech.$(this)._element.parentElement;
                        parent.classList.toggle("active");
                        if (parent.classList.contains("active")) {
                            Tech.$(this)._element.firstElementChild.innerHTML =
                                "Rút gọn";
                        } else {
                            Tech.$(this)._element.firstElementChild.innerHTML =
                                "Xem thêm";
                        }
                        Tech.$(this)._element.classList.toggle("open");
                    };
                });
            } else {
                button._element.onclick = function (e) {
                    e.preventDefault();
                    var parent = Tech.$(this)._element.parentElement;
                    parent.classList.toggle("active");
                    if (parent.classList.contains("active")) {
                        Tech.$(this)._element.firstElementChild.innerHTML =
                            "Rút gọn";
                    } else {
                        Tech.$(this)._element.firstElementChild.innerHTML =
                            "Xem thêm";
                    }
                    Tech.$(this)._element.classList.toggle("open");
                };
            }
        }
    },
    showFaq: function () {
        var button = Tech.$(".show-faq__content");
        if (typeof button !== "undefined") {
            if (button._element.length > 1) {
                button._element.forEach(function (elm) {
                    elm._element.onclick = function () {
                        Tech.$(this).next(".content-faq").toggleSlide(300);
                        Tech.$(this).parent().toggleClass("show");
                    };
                });
            } else {
                button._element.onclick = function () {
                    Tech.$(this).next(".content-faq").toggleSlide(300);
                    Tech.$(this).parent().toggleClass("show");
                };
            }
        }
        var btnShowCourse = Tech.$(".show-program__content");
        if (typeof btnShowCourse !== "undefined") {
            btnShowCourse._element.forEach(function (elm) {
                elm._element.onclick = function () {
                    Tech.$(this)
                        .next(".list-program__content")
                        .toggleSlide(300);
                };
            });
        }
        var btnShowCourse = document.querySelectorAll(".show-program__content");
        btnShowCourse.forEach(function (elm) {
            elm.onclick = function () {
                Tech.$(this).next(".list-program__content").toggleSlide(300);
            };
        });
        var btnShowSugges = Tech.$(".view-suggestions");
        if (typeof btnShowSugges !== "undefined") {
            if (btnShowSugges._element.length > 1) {
                btnShowSugges._element.forEach(function (elm) {
                    elm._element.onclick = function () {
                        Tech.$(this).toggleClass("show");
                        $(this).next(".form-suggestions").toggleClass("show");
                        if (Tech.$(this).hasClass("show")) {
                            Tech.$(this)._element.innerHTML = "Ẩn gợi ý";
                            if (
                                $(this)
                                    .next(".form-suggestions")
                                    .find(".audio_ques").length > 0
                            ) {
                                $(this)
                                    .next(".form-suggestions")
                                    .find(".audio_ques")
                                    .click();
                            }
                        } else {
                            Tech.$(this)._element.innerHTML = "Xem gợi ý";
                        }
                    };
                });
            } else {
                btnShowSugges._element.onclick = function () {
                    Tech.$(this).toggleClass("show");
                    $(this).next(".form-suggestions").toggleClass("show");
                    if (Tech.$(this).hasClass("show")) {
                        Tech.$(this)._element.innerHTML = "Ẩn gợi ý";
                        if (
                            $(this)
                                .next(".form-suggestions")
                                .find(".audio_ques").length > 0
                        ) {
                            $(this)
                                .next(".form-suggestions")
                                .find(".audio_ques")
                                .click();
                        }
                    } else {
                        Tech.$(this)._element.innerHTML = "Xem gợi ý";
                    }
                };
            }
        }

        var btnShowGuide = Tech.$(".show-guide__test");
        if (typeof btnShowGuide !== "undefined") {
            if (btnShowGuide._element.length > 1) {
                btnShowGuide._element.forEach(function (elm) {
                    elm._element.onclick = function () {
                        Tech.$(this)
                            .next(".guide-test__content ")
                            .toggleClass("show");
                    };
                });
            } else {
                btnShowGuide._element.onclick = function () {
                    Tech.$(this)
                        .next(".guide-test__content ")
                        .toggleClass("show");
                };
            }
        }
        var btnShowQuiz = Tech.$(".show-result__quiz");
        if (typeof btnShowQuiz !== "undefined") {
            btnShowQuiz._element.onclick = function () {
                console.log("ok");
            };
        }
    },
    showContentDetail: function () {
        var content = Tech.$(".intro-lesson__detail");

        if (typeof content !== "undefined") {
            var height = content.outerHeight();
            var button = Tech.$(".show-intro__detail");
            var y = content._element.offsetTop;
            if (height === 0) {
                content.removeClass("hidden");
            }
            button._element.onclick = function () {
                if (height < 285) {
                    content.removeClass("hidden");
                } else {
                    if (Tech.$(this).hasClass("show")) {
                        Tech.$(this)
                            .prev(".intro-lesson__detail")
                            .addClass("show");
                        Tech.$(this).text("Thu gọn");
                        Tech.$(this).removeClass("show");
                        // specification.addClass('show')
                    } else {
                        Tech.$(this)
                            .prev(".intro-lesson__detail")
                            .removeClass("show");
                        // specification.remove('show');
                        Tech.$(this).text("Xem thêm");
                        Tech.$(this).addClass("show");

                        window.scrollTo({
                            top: y - height,
                            behavior: "smooth",
                        });
                    }
                }
            };
        }
    },

    playYoutube: function () {
        var buttonPlayVideo = Tech.$(".btn-play__video");
        var video = Tech.$(".video-about");
        if (typeof buttonPlayVideo != "undefined") {
            buttonPlayVideo.onClick(function (event) {
                event.preventDefault();
                var link = Tech.$(this).attr("data-link");
                var html =
                    '<iframe width="100%" src="https://www.youtube.com/embed/' +
                    youtubeParser(link) +
                    '?autoplay=1" frameborder="0" allow="autoplay;accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                Tech.$(this).addClass("active");
                video.html(html);
            });
        }
    },

    init: function () {
        CLICK.initCountUp();
        CLICK.showDocumentCategory();
        CLICK.showPractice();
        CLICK.showFaq();
        CLICK.showContentDetail();
        CLICK.moduleSearch();
        CLICK.showMenu();
        CLICK.initAnimation();
        CLICK.playVideo();
        CLICK.fixedMenu();
        CLICK.playYoutube();
    },
};
Tech.Query.ready(function () {
    setTimeout(function () {
        CLICK.init();
    }, 100);
    // BackToTop.create('.back-to-top', {
    //     threshold: 300,
    // })
});

function youtubeParser(url) {
    let regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}
