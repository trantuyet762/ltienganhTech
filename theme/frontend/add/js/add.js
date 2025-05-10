$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});
toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-center-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};
var BASE_JS = {
    init: function () {
        BASE_JS.globalNotify();
    },
    globalNotify: function () {
        if (typeNotify != "" && messageNotify != "") {
            toastr.clear();
            toastr[typeNotify](messageNotify);
        }
    },
};
$(document).ready(function ($) {
    BASE_JS.init();
});
var ADD_GUI = {
    init: function () {
        ADD_GUI.initSelect2();
        ADD_GUI.loadAddress();
        ADD_GUI.loadClass();
        ADD_GUI.initPopupNotiffycationMatch();
        ADD_GUI.initPopupNotiffycationErc();
    },
    initSelect2: function () {
        if ($(".select-2").length > 0) {
            $(".select-2").select2();
        }
    },
    loadAddress: function () {
        $(document).on("change", "select[name=province_id]", function (event) {
            var _this = $(this);
            $.ajax({
                url: "load-address",
                type: "POST",
                data: {
                    type: "province",
                    province_id: _this.val(),
                },
            }).done(function (html) {
                $("select[name=district_id]").html(html);
                $("select[name=district_id]").prop("disabled", false);
                $("select[name=ward_id]").html("");
                $("select[name=ward_id]").prop("disabled", true);
                FORM_VALIDATION.refresh();
            });
        });
        $(document).on("change", "select[name=district_id]", function (event) {
            var _this = $(this);
            $.ajax({
                url: "load-address",
                type: "POST",
                data: {
                    type: "ward",
                    district_id: _this.val(),
                },
            }).done(function (html) {
                $("select[name=ward_id]").html(html);
                $("select[name=ward_id]").prop("disabled", false);
                FORM_VALIDATION.refresh();
            });
        });
    },
    loadClass: function () {
        $(document).on(
            "change",
            "select[name=class_study_id]",
            function (event) {
                var _this = $(this);
                $.ajax({
                    url: "load-class",
                    type: "POST",
                    data: {
                        class_study_id: _this.val(),
                    },
                }).done(function (html) {
                    $("select[name=subject_id]").html(html);
                });
            }
        );
    },
    getCookie(cname) {
        var name = cname + "=";
        decodedCookie = document.cookie;
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    initPopupNotiffycationMatch: function () {
        if ($(".popup-notiffycation-match").length == 0) {
            return;
        }
        if (ADD_GUI.getCookie("showPopupNotiffycationMatch") == 1) {
            return;
        }
        var now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        document.cookie = "showPopupNotiffycationMatch=" + 1;
        document.cookie = "expires=" + now.toUTCString() + ";";
        setTimeout(() => {
            $(".popup-notiffycation-match").fadeIn(200);
        }, 1000);
        $(".popup-notiffycation-match-content .close-icon").click(function () {
            $(".popup-notiffycation-match").fadeOut(200);
        });
    },
    initPopupNotiffycationErc: function () {
        if ($(".popup-notiffycation-erc").length == 0) {
            return;
        }
        if (ADD_GUI.getCookie("showPopupNotiffycationerc") == 1) {
            return;
        }
        var now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        document.cookie = "showPopupNotiffycationerc=" + 1;
        document.cookie = "expires=" + now.toUTCString() + ";";
        setTimeout(() => {
            $(".popup-notiffycation-erc").fadeIn(200);
        }, 1000);
        $(".popup-notiffycation-erc-content .close-icon").click(function () {
            $(".popup-notiffycation-erc").fadeOut(200);
        });
    },
};
var ADD_NOTIFICATION = {
    alertMessage: function (data) {
        if (data.code == 200) {
            $.alert({
                icon: "fa fa-check",
                closeIcon: false,
                type: "green",
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                typeAnimated: true,
                title: data.message,
                content: " ",
                buttons: {
                    oke: {
                        btnClass: "btn-success",
                        text: "Đóng",
                        action: function () {
                            window.location.reload();
                        },
                    },
                },
            });
        } else {
            $.alert({
                icon: "fa fa-warning",
                closeIcon: true,
                type: "red",
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                typeAnimated: true,
                title: data.message,
                content: " ",
            });
        }
    },
    alertMessageRedirect: function (data) {
        if (data.code == 200) {
            $.alert({
                icon: "fa fa-check",
                closeIcon: false,
                type: "green",
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                typeAnimated: true,
                title: data.message,
                content: " ",
                buttons: {
                    oke: {
                        btnClass: "btn-success",
                        text: "Đóng",
                        action: function () {
                            window.location.href = data.redirect_url;
                        },
                    },
                },
            });
        } else {
            $.alert({
                icon: "fa fa-warning",
                closeIcon: true,
                type: "red",
                columnClass:
                    "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
                typeAnimated: true,
                title: data.message,
                content: " ",
            });
        }
    },
    toastrMessage: function (data) {
        toastr.clear();
        if (data.code == 200) {
            toastr.success(data.message);
        } else {
            toastr.error(data.message);
        }
    },
    toastrMessageReload: function (data) {
        toastr.clear();
        if (data.code == 200) {
            toastr.success(data.message);
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toastr.error(data.message);
        }
    },
    toastrMessageRedirect: function (data) {
        toastr.clear();
        if (data.code == 200) {
            toastr.success(data.message);
            setTimeout(function () {
                window.location.href = data.redirect_url;
            }, 1500);
        } else {
            toastr.error(data.message);
        }
    },
};
var AJAX_SP = (function () {
    var paginateAjax = function () {
        var main_content = $(".module-paginate-ajax");
        if ($(".module-paginate-ajax").length > 0) {
            main_content.each(function (index, el) {
                var _this = $(this);
                $.ajax({
                    url: _this.data("action"),
                    type: "GET",
                    dataType: "html",
                    data: { info: _this.data("info") },
                }).done(function (data) {
                    _this.html(data);
                });
            });
        }
        $(document).on(
            "click",
            ".module-paginate-ajax .pagination a",
            function (event) {
                event.preventDefault();
                var resultBox = $(this).closest(".module-paginate-ajax");
                $.ajax({
                    url: $(this).attr("href"),
                    type: "GET",
                    dataType: "html",
                }).done(function (data) {
                    resultBox.html(data);
                    var offsettop = resultBox.offset().top - 50;
                    $("html,body").animate(
                        {
                            scrollTop: offsettop,
                        },
                        700
                    );
                });
            }
        );
    };
    var changeAvatar = function () {
        if ($(".item-avatar input:checked").length == 0) {
            toastr.error("Vui lòng chọn một hình ảnh");
            return;
        }
        $.ajax({
            url: "change-user-avatar",
            type: "POST",
            dataType: "json",
            data: {
                avatar: $(".item-avatar input:checked").val(),
            },
        }).done(function (json) {
            ADD_NOTIFICATION.alertMessage(json);
        });
    };
    var loadClassSchoolProfile = function (elm) {
        var _this = $(elm);
        if (_this.hasClass("active")) return;
        $(".item-class-school-profile").removeClass("active");
        _this.addClass("active");
        window.history.pushState("", "", "hoc-ba?item=" + _this.data("class"));
        $.ajax({
            url: "load-class-school-profile",
            type: "POST",
            dataType: "html",
            data: {
                item: _this.data("class"),
            },
        }).done(function (html) {
            $("#school-profile-result").html(html);
        });
    };
    var deleteSubjectSchoolProfile = function (subject) {
        $.confirm({
            closeIcon: true,
            columnClass:
                "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6",
            typeAnimated: true,
            type: "red",
            title: `<p class="text-center f-bold"><i class="fa fa-exclamation-circle text-danger me-2" aria-hidden="true"></i>Xác nhận xóa kết quả</>`,
            content: `<p class="text-center fz-20">Bạn có xác nhận xóa hết kết quả làm bài của môn học này ko?</p>`,
            buttons: {
                cancel: {
                    text: "Đóng",
                    btnClass: "btn-info text-white px-3 px-lg-5 py-2 me-3",
                    action: function () {},
                },
                continue: {
                    text: "Xóa",
                    btnClass: "btn-danger px-3 px-lg-5 py-2",
                    action: function () {
                        $.ajax({
                            url: "delete-subject-school-profile",
                            type: "POST",
                            dataType: "json",
                            data: {
                                subject: subject,
                            },
                        }).done(function (json) {
                            ADD_NOTIFICATION.alertMessage(json);
                        });
                    },
                },
            },
        });
    };
    var fillterLearningProgess = function () {
        $(document).on(
            "change",
            ".form-fillter-learning-progess select",
            function (event) {
                $(".form-fillter-learning-progess").submit();
            }
        );
    };
    var fillterFullLeaderboard = function () {
        $(document).on(
            "submit",
            ".full-leaderboard-fillter-box",
            function (event) {
                event.preventDefault();
                $.ajax({
                    url: "bang-xep-hang",
                    type: "GET",
                    dataType: "html",
                    data: $(this).serialize(),
                }).done(function (html) {
                    $(".full-leaderboard-resutl").html(html);
                });
            }
        );
        if ($(".full-leaderboard-fillter-box").length > 0) {
            $(".full-leaderboard-fillter-box").submit();
        }
    };
    var showContentFeedbackReport = function (type, questionIdx, mapItem) {
        $.confirm({
            closeIcon: false,
            type: "orange",
            columnClass:
                "col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6 col-xl-5 col-xl-offset-7",
            typeAnimated: true,
            title: `<p class="text-center text-warning">Báo lỗi - Góp ý <i class="fa fa-paper-plane-o" aria-hidden="true"></i></>`,
            content:
                `<form action="send-feed-back-reposrt" class="send-feed-back-form" method="post" accept-charset="utf8">
                <input type="hidden" name="type" value="` +
                type +
                `">
                <input type="hidden" name="question_idx" value="` +
                questionIdx +
                `">
                <input type="hidden" name="map_item" value="` +
                mapItem +
                `">
                <div class="content-feeedback-form s-content">` +
                feedbackFormContent +
                `</div>
                <textarea name="note" rows="5" name="note" placeholder="Nếu có lỗi hoặc góp ý khác bạn hãy nhập nội dung ở đây..."></textarea>
            </form>`,
            buttons: {
                submit: {
                    text: "Gửi thông tin",
                    btnClass:
                        "btn-info btn-small text-white px-3 px-lg-5 py-2 me-3",
                    action: function () {
                        $(".send-feed-back-form").submit();
                    },
                },
                cancel: {
                    text: "Đóng",
                    btnClass: "btn-default btn-small px-3 px-lg-5 py-2",
                },
            },
        });
    };
    var initShowFeedbackReport = function () {
        $(document).on("submit", ".send-feed-back-form", function (event) {
            event.preventDefault();
            $.ajax({
                url: $(this).attr("action"),
                type: "POST",
                dataType: "json",
                data: $(this).serialize(),
            }).done(function (data) {
                ADD_NOTIFICATION.toastrMessage(data);
            });
        });
        $(document).on("click", ".feedback-report", function (event) {
            event.preventDefault();
            var type = $(this).data("type");
            var questionIdx = $(".swiper-slide-active .content-exam").attr(
                "question"
            );
            var mapItem = $(this).data("map");
            showContentFeedbackReport(type, questionIdx, mapItem);
        });
        $(document).on("click", ".feedback-report-exam", function (event) {
            event.preventDefault();
            var type = $(this).data("type");
            var questionIdx = $(this).data("ques");
            var mapItem = $(this).data("map");
            showContentFeedbackReport(type, questionIdx, mapItem);
        });
    };
    var changeSelectAbilityTest = function () {
        $(document).on(
            "change",
            ".form-register-ability-tests select[name=class_study]",
            function (event) {
                $.ajax({
                    url: "danh-gia-nang-luc",
                    type: "POST",
                    dataType: "json",
                    data: {
                        val: $(this).val(),
                        type: "class_study",
                    },
                }).done(function (data) {
                    var selectTarget = $(
                        ".form-register-ability-tests select[name=subject]"
                    );
                    selectTarget.html(data.html);
                    if (data.code == 200) {
                        selectTarget.prop("disabled", false);
                        toastr.options = {
                            positionClass: "toast-top-right",
                        };
                        toastr.success(data.message);
                        toastr.options = {
                            positionClass: "toast-center-center",
                        };
                    } else {
                        selectTarget.prop("disabled", true);
                    }
                    selectTarget.trigger("change");
                });
            }
        );
        $(document).on(
            "change",
            ".form-register-ability-tests select[name=subject]",
            function (event) {
                $.ajax({
                    url: "danh-gia-nang-luc",
                    type: "POST",
                    dataType: "json",
                    data: {
                        val: $(this).val(),
                        type: "subject",
                    },
                }).done(function (data) {
                    var selectTarget = $(
                        ".form-register-ability-tests select[name=difficulty]"
                    );
                    var selectCtSgk = $(
                        ".form-register-ability-tests select[name=ct_sgk]"
                    );
                    selectTarget.html(data.html);
                    selectCtSgk.html(data.htmlCtSgk);
                    if (data.code == 200) {
                        selectTarget.prop("disabled", false);
                        selectCtSgk.prop("disabled", false);
                        toastr.options = {
                            positionClass: "toast-top-right",
                        };
                        toastr.success(data.message);
                        toastr.options = {
                            positionClass: "toast-center-center",
                        };
                    } else {
                        selectTarget.prop("disabled", true);
                        selectCtSgk.prop("disabled", true);
                        if (data.message != "") {
                            toastr.options = {
                                positionClass: "toast-top-right",
                            };
                            toastr.error(data.message);
                            toastr.options = {
                                positionClass: "toast-center-center",
                            };
                        }
                    }
                });
            }
        );
        $(document).on(
            "change",
            ".form-register-ability-tests select[name=difficulty]",
            function (event) {
                var value = parseInt($(this).val());
                if (value > 0) {
                    toastr.success("Mời bạn làm bài");
                }
            }
        );
    };
    return {
        _: function () {
            paginateAjax();
            fillterLearningProgess();
            fillterFullLeaderboard();
            initShowFeedbackReport();
            changeSelectAbilityTest();
        },
        changeAvatar() {
            changeAvatar();
        },
        deleteSubjectSchoolProfile(subject) {
            deleteSubjectSchoolProfile(subject);
        },
        loadClassSchoolProfile(elm) {
            loadClassSchoolProfile(elm);
        },
    };
})();
let progressChart = null;
var ADD_CHART_STATIS = {
    init: function () {
        if (typeof strChart != "undefined") {
            ADD_CHART_STATIS.initProgressChart(strChart);
        }
    },
    initProgressChart: function (strChart) {
        var lineData = {
            labels: strChart.labels,
            datasets: [
                {
                    label: " ",
                    backgroundColor: strChart.dataColor,
                    data: strChart.dataArray,
                },
            ],
        };
        var chartOptions = {
            responsive: true,
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        console.log(tooltipItem);
                        console.log(data);
                        return (
                            " " +
                            data.labels[tooltipItem.index] +
                            ": " +
                            data.datasets[tooltipItem.datasetIndex].data[
                                tooltipItem.index
                            ] +
                            "%"
                        );
                    },
                },
            },
        };
        if ($("#progressChart").length > 0) {
            var ctx = document.getElementById("progressChart").getContext("2d");
            if (!progressChart) {
                progressChart = new Chart(ctx, {
                    type: "pie",
                    data: lineData,
                    options: chartOptions,
                });
                progressChart.render();
            } else {
                progressChart.destroy();
                progressChart = new Chart(ctx, {
                    type: "pie",
                    data: lineData,
                    options: chartOptions,
                });
                progressChart.render();
            }
        }
    },
};
$(document).ready(function () {
    ADD_GUI.init();
    AJAX_SP._();
    ADD_CHART_STATIS.init();
});
