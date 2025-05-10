var slideMatch;
var MODULE_QUESTION_MATCH = {
    getQuestionAnswerBox: function (dataMatch, questionIdx) {
        return $("[question=" + questionIdx + "]").find(
            ".list-question-answer"
        );
    },
    getValue: function (dataMatch, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_MATCH.getQuestionAnswerBox(
            dataMatch,
            questionIdx
        );
        var fnc = "getValue" + dataMatch[questionIdx].type;
        return MODULE_QUESTION.callInternalFunc(fnc, questionAnswerBox);
    },
    getQuestionDoStatus: function (dataMatch, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_MATCH.getQuestionAnswerBox(
            dataMatch,
            questionIdx
        );
        var fnc = `getQuestionDoStatus${dataMatch[questionIdx].type}`;
        return MODULE_QUESTION.callInternalFunc(fnc, questionAnswerBox);
    },
    disableAnswerQuestion: function (dataMatch, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_MATCH.getQuestionAnswerBox(
            dataMatch,
            questionIdx
        );
        var fnc = `disableAnswerQuestion${dataMatch[questionIdx].type}`;
        return MODULE_QUESTION.callInternalFunc(fnc, questionAnswerBox);
    },
    checkQuestionResult: function (dataMatch, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_MATCH.getQuestionAnswerBox(
            dataMatch,
            questionIdx
        );
        var answer = MODULE_QUESTION_MATCH.getValue(dataMatch, questionIdx);
        var correct = dataMatch[questionIdx].correct;
        var fnc = `checkCompareAnswer${dataMatch[questionIdx].type}`;
        return MODULE_QUESTION.callInternalFunc(fnc, answer, correct);
    },
};
var MODULE_MATCH = (function () {
    var countDown;
    var audio_clickbtn = document.getElementById("audio_clickbtn");
    var audio_incorrect = document.getElementById("audio_incorrect");
    var audio_correct = document.getElementById("audio_correct");
    var audio_skipques = document.getElementById("audio_skipques");
    var audio_point_finish = document.getElementById("audio_point_finish");
    var initSlideMatch = function () {
        if (typeof Tech.$(".slide-question-match") === "undefined") return;
        slideMatch = new Swiper(".slide-question-match", {
            slidesPerView: 1,
            disableOnInteraction: true,
            speed: 0,
            autoHeight: false,
            spaceBetween: 0,
            allowTouchMove: false,
        });
    };
    var initConnectMath = function () {
        setTimeout(() => {
            startMatch(dataBaseInfo);
        }, 700);
    };
    var startMatch = function (data) {
        $("#number-question-true").html(data.total_true_question);
        $("#number-question-false").html(data.total_false_question);
        $(".current-user-rank").html(data.current_user_rank);
        dataMatch.match.total_true_question = data.total_true_question;
        dataMatch.match.total_false_question = data.total_false_question;
        chaneQuestion(data.current_question_idx - 1);
        setTimeout(() => {
            $(".loading-match-content-start").removeClass(
                "loading-match-content-start"
            );
        }, 700);
    };
    var initCountDownTime = function () {
        if (parseInt(dataMatch.match.time_remaining) > 0) {
            countDown = new CountDown(
                $(".match-count-down-box"),
                dataMatch.match.time_remaining,
                false
            );
            countDown.setCallback("MODULE_MATCH.countDownDone", [
                countDown.currentElment,
            ]);
            countDown.start();
        }
    };
    var countDownDone = function (elm) {
        setTimeout(() => {
            window.location.href = urlEndMatch;
        }, 1000);
    };
    var playClickAudio = function () {
        audio_clickbtn.play();
    };
    var playIncorrectAudio = function () {
        audio_incorrect.play();
    };
    var playCorrectAudio = function () {
        audio_correct.play();
    };
    var playSkipquesAudio = function () {
        audio_skipques.play();
    };
    var playFinishAudio = function () {
        audio_point_finish.play();
    };
    var submitQuestion = function (elm) {
        var itemQuestion = $(elm).closest(".content-match");
        var questionIdx = itemQuestion.attr("question");
        var statusDoQuestion = MODULE_QUESTION_MATCH.getQuestionDoStatus(
            dataMatch,
            questionIdx
        );
        var audioPlayed = false;
        var showPopuped = false;
        playClickAudio();
        if (!statusDoQuestion) {
            $.confirm({
                closeIcon: true,
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                typeAnimated: true,
                title: `<p class="text-center">Em chưa làm xong câu này</>`,
                content: `<p class="text-center fz-20">Em có muốn tiếp tục làm không ?</p>`,
                buttons: {
                    continue: {
                        text: "Bỏ qua",
                        btnClass: "btn-info text-white px-3 px-lg-5 py-2 me-3",
                        action: function () {
                            dataMatch.match.total_false_question =
                                dataMatch.match.total_false_question + 1;
                            $("#number-question-false").html(
                                dataMatch.match.total_false_question
                            );
                            playSkipquesAudio();
                            showSkipPopUp();
                            audioPlayed = true;
                            showPopuped = true;
                            finishQuestion(
                                itemQuestion,
                                dataMatch,
                                questionIdx,
                                false
                            );
                            $(elm).remove();
                            $(
                                ".question-match-map .item-status[index=" +
                                    questionIdx +
                                    "]"
                            ).addClass("false");
                        },
                    },
                    cancel: {
                        text: "Làm tiếp",
                        btnClass: "btn-success px-3 px-lg-5 py-2",
                        action: function () {
                            playClickAudio();
                        },
                    },
                },
            });
            return;
        }
        $(elm).remove();
        var questionResult = MODULE_QUESTION_MATCH.checkQuestionResult(
            dataMatch,
            questionIdx
        );
        if (questionResult) {
            dataMatch.match.total_true_question =
                dataMatch.match.total_true_question + 1;
            $("#number-question-true").html(
                dataMatch.match.total_true_question
            );
            if (!audioPlayed) {
                playCorrectAudio();
            }
            $(
                ".question-match-map .item-status[index=" + questionIdx + "]"
            ).addClass("success");
            if (!showPopuped) {
                if (dataMatch[questionIdx].isMultiplyPoint == 1) {
                    showMultiplyPointPopUp();
                } else {
                    showSuccessPopUp();
                }
            }
        } else {
            dataMatch.match.total_false_question =
                dataMatch.match.total_false_question + 1;
            $("#number-question-false").html(
                dataMatch.match.total_false_question
            );
            if (!audioPlayed) {
                playIncorrectAudio();
            }
            $(
                ".question-match-map .item-status[index=" + questionIdx + "]"
            ).addClass("false");
            if (!showPopuped) {
                showFalsePopUp();
            }
        }
        finishQuestion(itemQuestion, dataMatch, questionIdx, questionResult);
    };
    var chaneQuestion = function (index) {
        var newIndex = index + 1;
        $(".item-multiply-point[data-index=" + newIndex + "]").fadeOut(300);
        $(".curent-question").html(newIndex);
        $(".line-progess").css(
            "width",
            (index * 100) / (dataMatch.match.total_question - 1) + "%"
        );
        slideMatch.slideTo(index, 0, false);
    };
    var finishQuestion = function (
        itemQuestion,
        dataMatch,
        questionIdx,
        questionResult
    ) {
        var index = parseInt(itemQuestion.attr("index"));
        dataMatch[questionIdx].answer = MODULE_QUESTION_MATCH.getValue(
            dataMatch,
            questionIdx
        );
        if (index == dataMatch.match.total_question) {
            var targetBox = $("#match-content-start");
            setTimeout(() => {
                targetBox.addClass("loading-match-content-start");
                $.ajax({
                    url: urlEnd,
                    method: "GET",
                }).done(function (data) {
                    targetBox.html(data);
                    var timeEndBox = $("#end-time-box");
                    var timeEnd = timeEndBox.data("time");
                    if (parseInt(timeEnd) < 1) {
                        window.location.reload();
                    }
                    var countDownEnd = new CountDown(timeEndBox, timeEnd);
                    countDownEnd.setCallback("MODULE_MATCH.countDownDone", [
                        countDownEnd.currentElment,
                    ]);
                    countDownEnd.start();
                    setTimeout(() => {
                        playFinishAudio();
                        targetBox.removeClass("loading-match-content-start");
                    }, 1000);
                });
            }, 2000);
        } else {
            MODULE_QUESTION_MATCH.disableAnswerQuestion(dataMatch, questionIdx);
            setTimeout(() => {
                chaneQuestion(index);
            }, 1500);
            itemQuestion.find(".box_keyboard").slideUp(300);
        }
        var data = {};
        data.channel = channel;
        data.questionResult = questionResult;
        data.answer = dataMatch[questionIdx].answer;
        data.currentIndex = index + 1;
        data.questionIdx = parseInt(questionIdx);
        $.ajax({
            url: "match-send-question",
            type: "POST",
            dataType: "json",
            data: data,
        }).done(function (data) {
            // if (data.current_user_rank) {
            //     $(".current-user-rank").html(data.current_user_rank);
            // }
            if (data.code && data.code == 105) {
                $.confirm({
                    closeIcon: false,
                    columnClass:
                        "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                    typeAnimated: true,
                    title: `<p class="text-center">Hoàn thành câu hỏi</>`,
                    content: `<p class="text-center fz-20">${data.message}</p>`,
                    buttons: {
                        continue: {
                            text: "Xác nhận",
                            btnClass:
                                "btn-info text-white px-3 px-lg-5 py-2 me-3",
                            action: function () {
                                window.location.reload();
                            },
                        },
                    },
                });
            }
        });
        if ("onLine" in window.navigator) {
            if (!window.navigator.onLine) {
                $.alert({
                    title: "Kết nối mạng không ổn định!",
                    content:
                        "Không thể gửi được kết quả tới server. Em hãy kiểm tra lại kết nối mạng của mình. Khi có kết nối ổn định trở lại hãy tải lại trang để làm lại câu hỏi nhé.",
                    type: "red",
                });
            }
        } else {
        }
    };
    var initClickKeyboard = function () {
        $(".content-match").each(function (index, el) {
            var listInput = $(el).find("input[type=text]");
            if (listInput.length > 0) {
                $(listInput[0]).addClass("on-focus-input");
            }
        });
        $(document).on(
            "click",
            ".content-match input[type=text]",
            function (event) {
                $(this)
                    .closest(".content-match")
                    .find("input[type=text]")
                    .removeClass("on-focus-input");
                $(this).addClass("on-focus-input");
            }
        );
        $(document).on("click", ".box_keyboard ._k_hidden", function (event) {
            event.preventDefault();
            $(this).closest(".box_keyboard").slideUp(300);
        });
        $(document).on("click", ".box_keyboard ._keypad", function (event) {
            var inputFocused = $(this)
                .closest(".content-match ")
                .find("input.on-focus-input")
                .not(":disabled");
            if (inputFocused.length > 0) {
                var val = inputFocused.val();
                if ($(this).hasClass("del")) {
                    inputFocused
                        .val(
                            val.length > 0
                                ? val.substring(0, val.length - 1)
                                : val
                        )
                        .trigger("input");
                } else {
                    inputFocused.val(val + $(this).text()).trigger("input");
                }
            }
        });
    };
    var initPopupQuestionResultPosition = function () {
        $(".false-popup").css(
            "margin-top",
            "-" + $(".false-popup").innerHeight() / 2 + "px"
        );
        $(".skip-popup").css(
            "margin-top",
            "-" + $(".skip-popup").innerHeight() / 2 + "px"
        );
        $(".success-popup").css(
            "margin-top",
            "-" + $(".success-popup").innerHeight() / 2 + "px"
        );
        $(".multiply-point-popup").css(
            "margin-top",
            "-" + $(".multiply-point-popup").innerHeight() / 2 + "px"
        );

        $(".false-popup").css(
            "margin-left",
            "-" + $(".false-popup").innerWidth() / 2 + "px"
        );
        $(".skip-popup").css(
            "margin-left",
            "-" + $(".skip-popup").innerWidth() / 2 + "px"
        );
        $(".success-popup").css(
            "margin-left",
            "-" + $(".success-popup").innerWidth() / 2 + "px"
        );
        $(".multiply-point-popup").css(
            "margin-left",
            "-" + $(".multiply-point-popup").innerWidth() / 2 + "px"
        );
        $(".content-item-popup").addClass("d-none");
    };
    var showFalsePopUp = function (argument) {
        var contentPopup = $(".false-popup").find(".content-item-popup");
        if (contentPopup.length == 0) return;
        var numberRand = randomInteger(0, contentPopup.length - 1);
        $(contentPopup[numberRand]).removeClass("d-none");
        $(".false-popup").css("display", "block");
        setTimeout(function () {
            $(".false-popup").css("display", "none");
            $(contentPopup[numberRand]).addClass("d-none");
        }, 1500);
    };
    var showSkipPopUp = function (argument) {
        var contentPopup = $(".skip-popup").find(".content-item-popup");
        if (contentPopup.length == 0) return;
        var numberRand = randomInteger(0, contentPopup.length - 1);
        $(contentPopup[numberRand]).removeClass("d-none");
        $(".skip-popup").css("display", "block");
        setTimeout(function () {
            $(".skip-popup").css("display", "none");
            $(contentPopup[numberRand]).addClass("d-none");
        }, 1500);
    };
    var showSuccessPopUp = function (argument) {
        var contentPopup = $(".success-popup").find(".content-item-popup");
        if (contentPopup.length == 0) return;
        var numberRand = randomInteger(0, contentPopup.length - 1);
        $(contentPopup[numberRand]).removeClass("d-none");
        $(".success-popup").css("display", "block");
        setTimeout(function () {
            $(".success-popup").css("display", "none");
            $(contentPopup[numberRand]).addClass("d-none");
        }, 1500);
    };
    var randomInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var showMultiplyPointPopUp = function () {
        var contentPopup = $(".multiply-point-popup").find(
            ".content-item-popup"
        );
        if (contentPopup.length == 0) return;
        var numberRand = randomInteger(0, contentPopup.length - 1);
        $(contentPopup[numberRand]).removeClass("d-none");
        $(".multiply-point-popup").css("display", "block");
        setTimeout(function () {
            $(".multiply-point-popup").css("display", "none");
            $(contentPopup[numberRand]).addClass("d-none");
        }, 1500);
    };
    return {
        _: function () {
            if ($("#match-content-start").length == 0) {
                return;
            }
            initSlideMatch();
            initConnectMath();
            initCountDownTime();
            initPopupQuestionResultPosition();
            initClickKeyboard();
        },
        countDownDone(elm) {
            countDownDone(elm);
        },
        submitQuestion(elm) {
            submitQuestion(elm);
        },
    };
})();
$(document).ready(function () {
    MODULE_MATCH._();
});
