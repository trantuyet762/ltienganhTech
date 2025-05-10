var matchGuiConnecter;
var matchGuiReady = false;
var MATCH_GUI = {
    init() {
        MATCH_GUI.initCountDown();
        MATCH_GUI.initReloadToCounDown();
        MATCH_GUI.initReservePlaceBtn();
        MATCH_GUI.initMatchGuiConnection();
        MATCH_GUI.initRealtimeChartBox();
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
    initReservePlaceBtn() {
        $(document).on("click", ".btn-reserve-place", function (event) {
            event.preventDefault();
            var _this = $(this);
            $(this).css("min-width", this.clientWidth + 2 + "px");
            var baseBtnHtml = _this.html();
            _this.prop("disabled", true);
            _this.html(
                `<i class="fa fa-refresh fa-spin" aria-hidden="true"></i>`
            );
            $.ajax({
                url: "reserve-place",
                method: "post",
                dataType: "json",
                data: { item: $(this).data("item") },
            }).done(function (data) {
                if (data.code == 200) {
                    toastr.success(data.message);
                    _this.html(data.html);
                    _this.addClass("active");
                    _this.removeClass("btn-reserve-place");
                    // var data = {};
                    // data.action = 2;
                    // matchGuiConnecter.send(JSON.stringify(data));
                } else {
                    toastr.error(data.message);
                    _this.html(baseBtnHtml);
                    setTimeout(() => {
                        _this.prop("disabled", false);
                    }, 1000);
                }
                if (data.redirect_url) {
                    setTimeout(function () {
                        window.location.href = data.redirect_url;
                    }, 1500);
                }
            });
        });
    },
    initMatchGuiConnection() {
        if (typeof updateGuiBase == "undefined" || !updateGuiBase) return;
        if (
            $(".count-user-register-match").length > 0 ||
            $(".total-join-match").length > 0
        ) {
            setInterval(() => {
                $.ajax({
                    url: "match-gui-support",
                    method: "get",
                    dataType: "json",
                    data: {
                        channel: channel,
                        type: 1,
                    },
                }).done(function (data) {
                    MATCH_GUI.updateCountUserRegisterMatch(data);
                });
            }, 25000);
        }
    },
    updateCountUserRegisterMatch(data) {
        if (data.count_register) {
            $(".count-user-register-match").html(data.count_register);
        }
        if (data.count_user_join) {
            $(".total-join-match").html(data.count_user_join);
        }
    },
    updateUserRoomAction(data) {
        var userActionbox = $(".user-action-box");
        if (userActionbox.length > 0) {
            var htmlAdd = `<div class="item-user-action d-flex">
                <div class="user-avatar">
                    <img src="${data.avartar}">
                </div>
                <div class="user-info">
                    <p class="user-name fz-18 cl-gray">${data.user}</p>
                    <p class="action-name fz-24 cl-black f-bold">${data.message}</p>
                </div>
            </div>`;
            userActionbox.append(htmlAdd);
            userActionbox
                .animate({ scrollTop: userActionbox.prop("scrollHeight") }, 500)
                .promise()
                .done(function () {
                    var listItemUserAction =
                        userActionbox.find(".item-user-action");
                    if (
                        listItemUserAction.length > userActionbox.data("count")
                    ) {
                        $(listItemUserAction[0]).remove();
                    }
                });
        }
    },
    initRealtimeChartBox() {
        if (typeof updateGuiBxh == "undefined" || !updateGuiBxh) return;
        if ($("#realtime-chart-box").length > 0) {
            setTimeout(() => {
                MATCH_GUI._initRealtimeChartBox();
            }, 1000);
            setInterval(() => {
                MATCH_GUI._initRealtimeChartBox();
            }, 25000);
        }
    },
    _initRealtimeChartBox() {
        $.ajax({
            url: "match-gui-support",
            method: "get",
            dataType: "json",
            data: {
                channel: channel,
                type: 7,
            },
        }).done(function (data) {
            if (data.html) {
                $("#realtime-chart-box").html(data.html);
            }
        });
    },
};
$(document).ready(function () {
    if (typeof channel != "undefined") {
        MATCH_GUI.init();
    }
    MATCH_GUI.changeClassStudy();
});
