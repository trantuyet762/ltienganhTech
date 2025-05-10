var MODULE_QUESTION_EXAM = {
    getQuestionAnswerBox: function (dataExam, questionIdx) {
        return $("[question=" + questionIdx + "]").find(
            ".list-question-answer"
        );
    },
    getValue: function (dataExam, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_EXAM.getQuestionAnswerBox(
            dataExam,
            questionIdx
        );
        var fnc = "getValue" + dataExam[questionIdx].type;
        return MODULE_QUESTION.callInternalFunc(fnc, questionAnswerBox);
    },
    disableAnswerQuestion: function (dataExam, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_EXAM.getQuestionAnswerBox(
            dataExam,
            questionIdx
        );
        var fnc = "disableAnswerQuestion" + dataExam[questionIdx].type;
        return MODULE_QUESTION.callInternalFunc(fnc, questionAnswerBox);
    },
    getQuestionDoStatus: function (dataExam, questionIdx) {
        var questionAnswerBox = MODULE_QUESTION_EXAM.getQuestionAnswerBox(
            dataExam,
            questionIdx
        );
        var fnc = "getQuestionDoStatus" + dataExam[questionIdx].type;
        return MODULE_QUESTION.callInternalFunc(fnc, questionAnswerBox);
    },
};
var MODULE_EXAM = (function () {
    var countDown;
    var audio_point_finish = document.getElementById("audio_point_finish");
    var initAudio = function (argument) {
        $("#module-content__test").ubaPlayer({
            audioButtonClass: "audio_ques",
            codecs: [{ name: "MP3", codec: "audio/mpeg;" }],
        });
    };
    var playFinishAudio = function () {
        audio_point_finish.play();
    };
    var initStartExam = function () {
        var currentDate = new Date();
        // var startTime =
        //     currentDate.getFullYear() +
        //     "-" +
        //     ("0" + (currentDate.getMonth() + 1)).slice(-2) +
        //     "-" +
        //     ("0" + currentDate.getDate()).slice(-2) +
        //     " " +
        //     ("0" + currentDate.getHours()).slice(-2) +
        //     ":" +
        //     ("0" + currentDate.getMinutes()).slice(-2) +
        //     ":" +
        //     ("0" + currentDate.getSeconds()).slice(-2);
        // dataExam.exam.start_time = startTime;
        $("#module-content__test")
            .find(".module-content__test")
            .removeClass("do-start");
        $("#module-content__test")
            .find(".form-button__submit")
            .removeClass("d-none");
        setTimeout(function () {
            $("#count-down-exam").removeClass("d-none");
        }, 1000);
        countDown = new CountDown(
            $("#count-down-exam"),
            dataExam.exam.time_remaining
        );
        countDown.setCallback("MODULE_EXAM.countDownDone", [
            countDown.currentElment,
        ]);
        countDown.start();
    };
    var initClickKeyboard = function () {
        $(".module-question-test").each(function (index, el) {
            var listInput = $(el).find("input[type=text]");
            if (listInput.length > 0) {
                $(listInput[0]).addClass("on-focus-input");
            }
        });
        $(document).on(
            "click",
            ".module-question-test input[type=text]",
            function (event) {
                $(this)
                    .closest(".module-question-test")
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
                .closest(".module-question-test")
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
    var submitExam = function (elm) {
        buildResultExam();
        if (dataExam.exam.status == 0) {
            $.confirm({
                closeIcon: true,
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-xl-6 col-xl-offset-6",
                typeAnimated: true,
                title: `<p class="fz-24 f-bold text-center">Xác nhận nộp bài</p>`,
                content:
                    '<p class="fz-18 text-center">Bạn chưa hoàn thành hết câu hỏi. Bạn có muốn tiếp tục nộp bài.</p>',
                buttons: {
                    continue: {
                        text: '<i class="fa fa-play me-2" aria-hidden="true"></i> Nộp bài',
                        btnClass: "btn btn-yellow__all px-3 py-2 me-3",
                        action: function () {
                            MODULE_EXAM._submitExam(elm);
                        },
                    },
                    close: {
                        text: '<i class="fa fa-pencil-square-o me-2" aria-hidden="true"></i> Làm tiếp',
                        btnClass: "btn-green__all text-white px-3 py-2",
                        action: function () {},
                    },
                },
            });
            return;
        } else {
            $.confirm({
                closeIcon: true,
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-xl-6 col-xl-offset-6",
                typeAnimated: true,
                title: `<p class="fz-24 f-bold text-center">Bạn có chăc chắn muốn nộp bài không?</p>`,
                content: " ",
                buttons: {
                    continue: {
                        text: '<i class="fa fa-play me-2" aria-hidden="true"></i> Nộp bài',
                        btnClass: "btn btn-yellow__all px-3 py-2 me-3",
                        action: function () {
                            MODULE_EXAM._submitExam(elm);
                        },
                    },
                    close: {
                        text: '<i class="fa fa-pencil-square-o me-2" aria-hidden="true"></i> Làm tiếp',
                        btnClass: "btn-green__all text-white px-3 py-2",
                        action: function () {},
                    },
                },
            });
            return;
        }
    };
    var _submitExam = function (elm) {
        $(".module-question-test").each(function (index, el) {
            var questionIdx = parseInt($(this).attr("question"));
            MODULE_QUESTION_EXAM.disableAnswerQuestion(dataExam, questionIdx);
        });
        if ("onLine" in window.navigator) {
            if (!window.navigator.onLine) {
                $.alert({
                    title: "Kết nối mạng không ổn định!",
                    content:
                        "Không thể gửi được kết quả tới server. Em hãy kiểm tra lại kết nối mạng của mình. Khi có kết nối ổn định trở lại hãy nộp bài nhé.",
                    type: "red",
                });
                return;
            }
        }
        $(elm).remove();
        if (typeof countDown != "undefined") {
            countDown.stop();
        }
        url = "exam-rated-capacity-send-question";
        $(".loadding-box").addClass("active");
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: { data: dataExam },
        }).done(function (json) {
            if (dataExam.exam.type == "exam") {
                playFinishAudio();
            }
            if (json.code == 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                $(".loadding-box").removeClass("active");
                $.alert({
                    icon: "fa fa-warning",
                    closeIcon: true,
                    type: "red",
                    columnClass:
                        "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                    typeAnimated: true,
                    title: json.message,
                    content: " ",
                    buttons: {
                        close: {
                            text: "Đóng",
                            btnClass: "btn btn-danger",
                            action: function () {
                                // window.location.reload();
                            },
                        },
                    },
                });
            }
        });
    };
    var buildResultExam = function () {
        var statusExam = 1;
        $(".module-question-test").each(function (index, el) {
            var questionIdx = parseInt($(this).attr("question"));
            dataExam[questionIdx].answer = MODULE_QUESTION_EXAM.getValue(
                dataExam,
                questionIdx
            );
            if (dataExam[questionIdx].answer == "") {
                statusExam = 0;
            }
        });
        dataExam.exam.status = statusExam;
    };
    var countDownDone = function (elm) {
        elm.html("Hết thời gian");
        buildResultExam();
        _submitExam($("#module-content__test .form-button__submit button"));
    };
    return {
        _: function () {
            initStartExam();
            initAudio();
            initClickKeyboard();
        },
        countDownDone(elm) {
            countDownDone(elm);
        },
        submitExam(elm) {
            submitExam(elm);
        },
        _submitExam(elm) {
            _submitExam(elm);
        },
    };
})();
$(document).ready(function () {
    MODULE_EXAM._();
    $("body").keydown(function (e) {
        if (e.which == 123) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.which == 73) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.which == 75) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.which == 67) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.which == 74) {
            e.preventDefault();
        }
    });
    document.addEventListener("contextmenu", (event) => event.preventDefault());
});
