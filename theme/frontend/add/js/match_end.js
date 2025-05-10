var slideMatch;
var MATCH_RESULT = {
    init() {
        MATCH_RESULT.initSlider();
        MATCH_RESULT.initShowHd();
    },
    initSlider() {
        if (typeof Tech.$(".slide-question-match") === "undefined") return;
        slideMatch = new Swiper(".slide-question-match", {
            slidesPerView: 1,
            disableOnInteraction: true,
            speed: 0,
            autoHeight: false,
            spaceBetween: 0,
            allowTouchMove: false,
        });
    },
    nextQuestion(index) {
        MATCH_RESULT.changeQuestion(index);
    },
    changeQuestion(index) {
        slideMatch.slideTo(index, 0, false);
        var newIndex = index + 1;
        $(".curent-question").html(newIndex);
        $(".line-progess").css(
            "width",
            (index * 100) / (totalQuestion - 1) + "%"
        );
        $(".question-match-map .item-map").removeClass("active");
        $(".question-match-map .item-map[index=" + index + "]").addClass(
            "active"
        );
    },
    initShowHd() {
        $(".show-match-answer").on("click", function () {
            $(this).next(".tutorial__detail").toggleClass("show");
        });
    },
};
$(document).ready(function () {
    MATCH_RESULT.init();
});
