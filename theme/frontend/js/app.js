"use strict";

var CHECKOUT = (() => {
    var callback = (res) => {
        ADD_NOTIFICATION.alertMessageRedirect(res);
    };

    var answer = (res) => {
        if (res.code === 100) {
            toastr["error"](res.message);
        } else {
            toastr["success"](res.message);
        }
        const count = document.querySelector(".count-answer");
        if (count && res.count) {
            count.innerHTML = res.count;
        }
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };
    return {
        _: () => {},
        callback(res) {
            callback(res);
        },
        answer(res) {
            answer(res);
        },
    };
})();

CHECKOUT._();

var VIDEO_DOWNLOAD = (() => {
    var downloadDocument = () => {
        var buttons = document.querySelectorAll(".btn-download-document");
        buttons.forEach((btnElement) => {
            btnElement.onclick = () => {
                XHR.send({
                    url: "/download-document",
                    method: "POST",
                    data: {
                        id: btnElement.dataset.id,
                        video_lecture_id: btnElement.dataset.videoLectureId,
                    },
                }).then((res) => {
                    if (res.code === 100) {
                        toastr["error"](res.message);
                    } else {
                        const link = document.createElement("a");
                        link.href = res.link;
                        link.setAttribute("download", "");
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        toastr["success"](res.message);
                    }
                });
            };
        });
    };

    return {
        _: () => {
            downloadDocument();
        },
        refresh: () => {
            downloadDocument();
        },
    };
})();

VIDEO_DOWNLOAD._();

var HMAIN = (() => {
    var showQuiz = () => {
        if (typeof Tech !== "undefined") {
            var button = Tech.$("span.show-result__quiz");
            var timeOutClick = 0;
            if (button) {
                button._element.onclick = function () {
                    clearTimeout(timeOutClick);
                    timeOutClick = setTimeout(() => {
                        Tech.$(this).next(".content-faq").toggleSlide(300);
                        Tech.$(this).parent().toggleClass("show");
                    }, 500);
                };
            }
        }
    };

    return {
        _: () => {
            showQuiz();
        },
    };
})();

HMAIN._();
