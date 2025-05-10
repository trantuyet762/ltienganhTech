var MATCH_GUI = {
    init() {
        MATCH_GUI.initCountDown();
        MATCH_GUI.initReloadToCounDown();
    },
    initReloadToCounDown() {
        var itemMatchActive = $("#item-match-active");
        if (itemMatchActive.length > 0) {
            var timeEnd = itemMatchActive.data("time");
            if (parseInt(timeEnd) > 0) {
                setTimeout(() => {
                    window.location.reload();
                }, (timeEnd + 5) * 1000);
            }
        }
    },
    initCountDown() {
        if ($("#countdown-active-match").length > 0) {
            countDown = new CountDown(
                $("#countdown-active-match"),
                $("#countdown-active-match").data("time")
            );
            countDown.setCallback("MATCH_GUI.countDownDone", [
                countDown.currentElment,
            ]);
            countDown.start();
        }
        if ($("#end-time-box").length > 0) {
            countDownEnd = new CountDown(
                $("#end-time-box"),
                $("#end-time-box").data("time")
            );
            countDownEnd.setCallback("MATCH_GUI.countDownDone", [
                countDownEnd.currentElment,
            ]);
            countDownEnd.start();
        }
    },
    countDownDone() {
        if (typeof urlEndMatch != "undefined") {
            window.location.href = urlEndMatch;
        } else {
            window.location.reload();
        }
    },
    changeClassStudy() {
        $(document).on("change", "select.list-class-match", function (event) {
            $(this).closest("form").submit();
        });
    },
};
$(document).ready(function () {
    MATCH_GUI.init();
    MATCH_GUI.changeClassStudy();
    if ($("#content-popup-erc-warning").length > 0) {
        $.alert({
            icon: "fa fa-warning",
            closeIcon: true,
            type: "orange",
            columnClass:
                "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
            typeAnimated: true,
            title: "Thông báo",
            content: $("#content-popup-erc-warning").text(),
            buttons: {
                close: {
                    text: "Đóng",
                    btnClass: "btn btn-warning text-white py-1",
                },
            },
        });
    }
});
