$(window).on("load", function () {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14,
        });
    }
});
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});
var _ADD_AZOTA = {
    mergeAzota: (mamResult, azotaResult) => {
        console.log((window["XXX"] = azotaResult));
        let maths = azotaResult.data;
        let html = mamResult.value;
        for (let i = 0; i < maths.length; i++) {
            const math = maths[i].value;
            const type = maths[i].type;
            if (type != "mathml") continue;
            let latex = "$" + MathML2LaTeX.convert(math) + "$";
            html = html.replace("###EQUATION_MATH###", latex);
        }
        mamResult.value = html;
        return mamResult;
    },
};
$(document).ready(function () {
    let t = {},
        fileQuestions = {},
        audioQuestions = {},
        videoQuestions = {},
        e = 0,
        s = 0;
    var n = new (class {
        constructor() {
            this.showProcess("VUI LÒNG ĐỢI MỘT CHÚT..."),
                (this.isEditQuiz = document.querySelector("#quiz_id")
                    ? true
                    : false),
                (this.storeURL = document.getElementById("URL_STORE").value),
                (this.updateURL = document.getElementById("URL_UPDATE").value),
                (this.searchParams = new URLSearchParams(
                    window.location.search
                )),
                (this.posst = null),
                (this.db = {}),
                (this.TableResult = null),
                (this.clone = !1),
                (this.home = window.location.origin),
                (this.sheet_id = null),
                (this.jwt = {}),
                this.init(),
                this.funcUpdate(),
                this.refreshQuizs();
            this.isInternet(),
                (this.wmf = new WMFConverter()),
                $("body").append(
                    '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>'
                );
            this.addEventRefreshQuiz();
        }
        addEventRefreshQuiz() {
            window.addEventListener("quiz.refresh", () => {
                this.refreshQuizs();
            });
        }
        isInternet() {
            window.addEventListener("online", () =>
                toastr.success("", "ĐÃ CÓ KẾT NỐI INTERNET", {
                    positionClass: "toast-bottom-left",
                    showDuration: 100,
                })
            ),
                window.addEventListener("offline", () =>
                    toastr.error("", "ĐÃ MẤT KẾT NỐI INTERNET", {
                        positionClass: "toast-bottom-left",
                        showDuration: 100,
                    })
                );
        }
        loadJs(t, e) {
            var s = document.createElement("script");
            s.setAttribute("src", t), s.setAttribute("type", "text/javascript");
            var i = function () {
                e && e();
            };
            (s.onload = i),
                (s.onreadystatechange = i),
                document.getElementsByTagName("head")[0].appendChild(s);
        }
        init() {
            var i = this;
            window.addEventListener("change.content.rs", (e) => {
                const { el, content } = e.detail;
                el.innerHTML = content;
            });
            $("body").delegate(".upload-audio-question", "click", function (e) {
                const input = document.createElement("input");
                const item = e.target.closest(".item-question");
                const itemId = item.getAttribute("data-id");
                input.type = "file";
                input.accept = ".mp3";
                input.click();
                input.onchange = (e) => {
                    const { files } = e.target;
                    audioQuestions[itemId] = files[0];
                    $(this).html(
                        `${files.length} audio <i  class='fa fa-times' delete-audio-item="${itemId}"/></i>`
                    );
                };
            });
            $("body").delegate(".upload-video-question", "click", function (e) {
                const input = document.createElement("input");
                const item = e.target.closest(".item-question");
                const itemId = item.getAttribute("data-id");
                input.type = "file";
                input.accept = ".mp4";
                input.click();
                input.onchange = (e) => {
                    const { files } = e.target;
                    videoQuestions[itemId] = files[0];
                    $(this).html(
                        `${files.length} video <i  class='fa fa-times' delete-video-item="${itemId}"/></i>`
                    );
                };
            });
            $("body").delegate(".upload-file-question", "click", function (e) {
                const input = document.createElement("input");
                const item = e.target.closest(".item-question");
                const itemId = item.getAttribute("data-id");
                input.type = "file";
                input.accept = ".jpeg,.png,.gif,.jpg";
                input.setAttribute("multiple", "");
                input.click();
                input.onchange = (e) => {
                    const { files } = e.target;
                    fileQuestions[itemId] = files;
                    $(this).html(
                        `${files.length} ảnh <i  class='fa fa-times' delete-file-item="${itemId}"/></i>`
                    );
                };
            });
            $("body").delegate("[delete-file-item]", "click", function (e) {
                e.stopPropagation();
                const itemId = $(this).parent().attr("delete-file-item");
                if (itemId in fileQuestions) {
                    delete fileQuestions[itemId];
                }
                $(this)
                    .closest(".heading-elements")
                    .find('[name="quiz_imgs"]')
                    .html("");
                $(this).parent().html("Tải ảnh");
            });
            $("body").delegate("[delete-video-item]", "click", function (e) {
                e.stopPropagation();
                const itemId = $(this).parent().attr("delete-video-item");
                if (itemId in videoQuestions) {
                    delete videoQuestions[itemId];
                }
                $(this)
                    .closest(".heading-elements")
                    .find('[name="quiz_video"]')
                    .html("");
                $(this).parent().html("Tải video");
            });
            $("body").delegate("[delete-audio-item]", "click", function (e) {
                e.stopPropagation();
                const itemId = $(this).parent().attr("delete-audio-item");
                if (itemId in audioQuestions) {
                    delete audioQuestions[itemId];
                }
                $(this)
                    .closest(".heading-elements")
                    .find('[name="quiz_audio"]')
                    .html("");
                $(this).parent().html("Tải audio");
            });
            $("body").delegate(".uploadFile", "click", function (t) {
                (s = $(".sectionQuizs").index(
                    $(this).parents(".sectionQuizs")
                )),
                    $("#uploadPDFDOCX").val(""),
                    $("#uploadPDFDOCX").trigger("click");
            });
            $("body").delegate(".level-question", "change", function (t) {
                $(this).parents(".item-question").attr("edit", "1");
            });
            $("body").delegate("#quiz_title", "change", function (t) {
                document.title = $(this).val() + " - admin.hs.edu.vn";
            });
            $("body").delegate(".html--edit", "blur", function (e) {
                if ($(this).prev().length > 0) {
                    $(this).prev().remove();
                }
                e.preventDefault();
                $(this).parent().find(".html--content").html($(this).val());
                i.refreshQuizs();
                $(this).hide();
                $(this).parent().find(".html--content").removeClass("preview");
                updateMathContent();
                // MathJax.typesetPromise();
            });
            $("body").delegate(
                ".html--content:not(.preview)",
                "click",
                async function (t) {
                    t.preventDefault();
                    const selectorInput = $(this).parent().find(".html--edit");
                    if ($(this).val() == "Vui lòng nhập nội dung") {
                    }
                    $(this).addClass("preview");
                    const selectorTextarea = $(this)
                        .parent()
                        .find("textarea.html--edit")[0];
                    if (selectorTextarea != null) {
                        selectorTextarea.style.display = "";
                        const tinymceEl = await tinymceInit(selectorTextarea);
                    } else {
                        selectorInput.show();
                        selectorInput.select();
                    }
                }
            );
            $("body").delegate(
                "[href='#point'],[href='#points'],[href='#numbers']",
                "click",
                function (e) {
                    e.preventDefault();
                }
            );
            $("body").delegate(".userchoice", "click", function (t) {
                t.preventDefault(),
                    $(this)
                        .parent()
                        .parent()
                        .find(".userchoice")
                        .removeClass("done"),
                    $(this).addClass("done"),
                    $(this).parents(".item-question").attr("edit", "1");
            });
            $("body").delegate("#bangdapan .string-key", "keyup", function (t) {
                t.preventDefault();
                for (var e = $(this).val(), s = "", n = 0; n < e.length; n++)
                    "ABCD".indexOf(e[n].toUpperCase()) > -1 &&
                        (s += e[n].toUpperCase());
                $(this).val(s),
                    $(".cnt-key").text("ĐÁP ÁN: " + s.length + " CÂU"),
                    $(".cnt-number").text(
                        "TỔNG SỐ CÂU: " +
                            $(".sectionQuizs")
                                .eq($("#bangdapan").attr("position"))
                                .find(".item-question").length +
                            " CÂU"
                    ),
                    $(".list-key").html(i.renderPanelAnswer(s));
            });
            $("body").delegate("#bangdapan .save-keys", "click", function (t) {
                t.preventDefault();
                var e = $(".sectionQuizs").eq($("#bangdapan").attr("position")),
                    s = $("#bangdapan .string-key").val().toString() || 0,
                    i = e.find(".item-question").length;
                s.length === i
                    ? (e.find(".userchoice ").removeClass("done"),
                      s.split("").forEach(function (t, s) {
                          e.find(".item-question")
                              .eq(s)
                              .find('.userchoice[data-value="' + t + '"]')
                              .addClass("done");
                      }),
                      $("#bangdapan").modal("hide"))
                    : Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Vui lòng chọn đáp án cho tất cả câu hỏi",
                          footer: '<a href="//hs.edu.vn">Xem thêm cách khắc phục</a>',
                          customClass: {
                              confirmButton: "btn btn-primary",
                          },
                          buttonsStyling: !1,
                      });
            });
            $("body").delegate("#bangdapan .userselect", "click", function (t) {
                t.preventDefault(),
                    $(this)
                        .parent()
                        .find(".userselect")
                        .removeClass("bg-success"),
                    $(this).addClass("bg-success");
                var e = "";
                $("#bangdapan .userselect.bg-success").each(function (t, s) {
                    e += $(s).attr("data-value");
                }),
                    $("#bangdapan .string-key").val(e),
                    $("#bangdapan .string-key").trigger("keyup");
            });
            $("body").delegate(".copy-link", "click", function (t) {
                t.preventDefault(),
                    $(this).parent().parent().find("input").eq(0).select();
                document.execCommand("copy");
                toastr.success("", "Đã sao chép!");
            });
            $("body").delegate("[modal]", "click", function (t) {
                t.preventDefault(), $($(this).attr("modal")).modal();
            });
            $("#quiz-cover-upload").on("change", function (t) {
                var e = new FileReader(),
                    s = t.target.files;
                (e.onload = function () {
                    $("#quiz-cover").attr("src", e.result);
                }),
                    e.readAsDataURL(s[0]);
            });
            var checkValidate = (s) => {
                // if (s.user_id.trim() == "") {
                //     $("#quiz_user_id").focus();
                //     return i.showError("Vui lòng chọn giáo viên");
                // }
                // if (s.quiz_category_id.trim() == "") {
                //     $("#quiz_category_id").focus();
                //     return i.showError("Vui lòng danh mục đề thi!");
                // }
                // if (s.name.trim() == "") {
                //     $("#quiz_title").focus();
                //     return i.showError("Vui lòng nhập tên đề thi!");
                // }
                // if (s.subject_id.trim() == "") {
                //     $("#quiz_subject_id").focus();
                //     return i.showError("Vui lòng chọn môn!");
                // }
                // if (s.time.trim() == "") {
                //     $("#quiz_time").focus();
                //     return i.showError("Vui lòng nhập thời gian thi!");
                // }
                // if (s.name.match(/Vui lòng nhập/gi)) {
                //     return (
                //         i.gotoID($("#quiz_title").parent()),
                //         $("#quiz_title").prev().trigger("click"),
                //         void i.showError("Vui lòng nhập tên đề thi")
                //     );
                // }
                return true;
            };
            $("body").delegate(".btn-submit-quiz", "click", function (t) {
                t.preventDefault();
                var s = i.getDataSetting();
                //Validate
                if (!checkValidate(s)) {
                    return false;
                }
                var a = i.getDataQuiz();
                if (a.error.length) i.showError(a.error[0]);
                else {
                    a.warning.forEach(function (t) {
                        toastr.warning("", t);
                    }),
                        (s.data = a.data),
                        (s.inputs = n);
                    i.connectServer(
                        {
                            action: "create",
                            data: {
                                question: a.question,
                                setting: s,
                                jwt: localStorage.getItem("jwt"),
                            },
                        },
                        (t) => {
                            if (t.code == 200) {
                                if (t.isEdit && t.isEdit == 1) {
                                    return i.showSuccess(t.message);
                                }
                                $("#share-link .modal-body").html(t.html);
                                $("#share-link").modal("show");
                                document.querySelector("[copy-code]").onclick =
                                    () => {
                                        const code =
                                            document.querySelector(
                                                "[code-copy]"
                                            ).innerHTML;
                                        i.copyToClipboard(code);
                                        i.showSuccess("Copy mã thành công");
                                    };
                                document.querySelector("[copy-href]").onclick =
                                    () => {
                                        const href =
                                            document.querySelector(
                                                "[data-href-copy]"
                                            ).innerHTML;
                                        i.copyToClipboard(href);
                                        i.showSuccess("Copy link thành công");
                                    };
                                $("#share-link").on(
                                    "hidden.bs.modal",
                                    function (e) {
                                        window.location.href = document
                                            .querySelector("[link-edit]")
                                            .getAttribute("link-edit");
                                    }
                                );
                            } else {
                                i.showError(t.message);
                            }
                        }
                    );
                }
            });
            $("body").delegate(
                ".thongtinthuthap .delete",
                "click",
                function (t) {
                    t.preventDefault(),
                        $(this).parent().parent().remove(),
                        i.refreshOptionStudent();
                }
            );
            $("body").delegate(".thongtinthuthap .add", "click", function (t) {
                t.preventDefault(),
                    $("#thongtinthuthap").append(i.renderOptionStudent()),
                    i.refreshOptionStudent();
            });
            $("#importExcel").on("change", function (t) {
                var e = t.target.files[0],
                    s = new FileReader();
                (s.onload = function (t) {
                    var e = new Uint8Array(t.target.result),
                        s = XLSX.read(e, {
                            type: "array",
                        }),
                        n = XLSX.utils.sheet_to_json(s.Sheets[s.SheetNames[0]]),
                        a = "";
                    n.forEach(function (t, e) {
                        a += i.renderItemUser(t);
                    }),
                        $("#liststudent .table  tbody").html(a);
                }),
                    s.readAsArrayBuffer(e),
                    $(this).val("");
            });
            $("body").delegate(
                "#liststudent .edit-user",
                "click",
                function (t) {
                    t.preventDefault();
                    var e = $(this).parents(".itemUser"),
                        s = $("#liststudent .itemUser").index(e),
                        n = {};
                    "TT#HỌ VÀ TÊN#LỚP#TRƯỜNG#TÊN ĐĂNG NHẬP#MẬT KHẨU"
                        .split("#")
                        .forEach(function (t, s) {
                            n[t] = e.find("td").eq(s).text();
                        }),
                        (n.TT = s + 1),
                        i.editItemUser(n);
                }
            );
            $("body").delegate("#liststudent .saveUser", "click", function (t) {
                t.preventDefault();
                var e = $("#addUser"),
                    s = {};
                "HỌ VÀ TÊN#LỚP#TRƯỜNG#TÊN ĐĂNG NHẬP#MẬT KHẨU"
                    .split("#")
                    .forEach(function (t, i) {
                        s[t] = e.find("input").eq(i).val();
                    }),
                    (s.TT =
                        parseInt(e.attr("edit")) ||
                        $("#liststudent .table  tbody tr").length + 1),
                    s["TÊN ĐĂNG NHẬP"].trim() && s["MẬT KHẨU"].trim()
                        ? (i.setItemUser(s), e.hide())
                        : i.showError(
                              "TÊN ĐĂNG NHẬP/MẬT KHẨU LÀ THÔNG TIN BẮT BUỘC"
                          );
            });
            $("body").delegate("#liststudent .addUser", "click", function (t) {
                t.preventDefault();
                var e = {};
                "TT#HỌ VÀ TÊN#LỚP#TRƯỜNG#TÊN ĐĂNG NHẬP#MẬT KHẨU"
                    .split("#")
                    .forEach(function (t, s) {
                        e[t] = "";
                    }),
                    (e.TT = 0),
                    i.editItemUser(e);
            });
            $("body").delegate("#switchshare", "change", function (t) {
                $(this).is(":checked") && i.post_id && i.sheet_id
                    ? ($("#sharecode").val(i.mahoaID(i.post_id)),
                      $(".code-share").html(
                          feather.icons.globe.toSvg() +
                              "  MÃ CHIA SẺ: " +
                              i.mahoaID(i.post_id)
                      ))
                    : $(this).is(":checked")
                    ? ($("#sharecode").val(""),
                      $("#sharecode").attr(
                          "placeholder",
                          "HÃY LƯU ĐỀ THI ĐỂ SỬ DỤNG CHỨC NĂNG NÀY"
                      ),
                      $(".code-share").html(
                          feather.icons.globe.toSvg() +
                              "  MÃ CHIA SẺ: CHƯA ĐƯỢC TẠO"
                      ))
                    : ($("#sharecode").val(""),
                      $("#sharecode").attr(
                          "placeholder",
                          "CHỨC NĂNG NÀY ĐANG TẮT"
                      ),
                      $(".code-share").html(
                          feather.icons.globe.toSvg() + "  MÃ CHIA SẺ: ĐANG TẮT"
                      ));
            });
            $("body").delegate(
                "#liststudent .delete-user",
                "click",
                function (t) {
                    t.preventDefault(), $(this).parents(".itemUser").remove();
                }
            );
            $("body").delegate("#app .sectionQuizs", "dragover", function (t) {
                t.preventDefault(),
                    $(this).find(".noti-drop").text("THẢ RA ĐỂ NHẬP DỮ LIỆU"),
                    $(this).addClass("bg-light-success");
            });
            $("body").delegate(
                "#app .sectionQuizs",
                "dragleave ",
                function (t) {
                    t.preventDefault(),
                        $(this)
                            .find(".noti-drop")
                            .text("KÉO & THẢ PDF DOCX VÀO ĐÂY"),
                        $(this).removeClass("bg-light-success");
                }
            );
            $("body").delegate("#app .sectionQuizs", "drop", function (t) {
                t.preventDefault(),
                    (s = $("#app .sectionQuizs").index($(this))),
                    $(this)
                        .find(".noti-drop")
                        .text("KÉO & THẢ PDF DOCX VÀO ĐÂY"),
                    $(this).removeClass("bg-light-success");
                var e = t.originalEvent.dataTransfer.files;
                1 === e.length
                    ? i.upfilePDFDOCX(t.originalEvent.dataTransfer.files[0])
                    : i.uploadFolderImg(e);
            });
            $("body").delegate("#uploadPDFDOCX", "change", function (t) {
                t.preventDefault(),
                    i.upfilePDFDOCX(t.target.files[0]),
                    $("#uploadPDFDOCX").val("");
            });
            $("body").delegate(
                "#bangdiem-auto-update",
                "change",
                function (t) {}
            );
            $("body").delegate(
                "#thongke-auto-update",
                "change",
                function (t) {}
            );
            i.contextOption();
            i.contextQuestion();
            // i.contextQuiz();
        }
        uploadFolderImg(t) {
            for (var e = [], s = [], i = "", n = this, a = 0; a < t.length; a++)
                t[a].type.indexOf("image") > -1 && e.push(t[a]),
                    t[a].type.indexOf("text") > -1 && s.push(t[a]);
            if (!e.length)
                return n.showError("KHÔNG TỒN TẠI ẢNH NÀO TRONG THƯ MỤC NÀY!");
            if (s.length) {
                var r = new FileReader();
                (r.onloadend = function () {
                    (i = r.result), n.buildQuizFromImg(e, i);
                }),
                    r.readAsText(s[0]);
            } else n.buildQuizFromImg(e, i);
        }
        buildQuizFromImg(t, i) {
            var n,
                a,
                r = this,
                o = "";
            i.split("").forEach((t) => {
                t.toString().match(/([a-d]|[A-D])/g) && (o += t.toUpperCase());
            }),
                (i = o),
                Swal.fire({
                    title:
                        "CÓ TẤT CẢ " +
                        t.length +
                        " HÌNH ẢNH VÀ " +
                        i.length +
                        " ĐÁP ÁN",
                    icon: "info",
                    text: "Số hình ảnh này có bao gồm hình ảnh lời giải hay không?",
                    showDenyButton: !0,
                    showCancelButton: !1,
                    confirmButtonText: "Có",
                    denyButtonText: "Không",
                }).then((o) => {
                    if (o.isConfirmed) {
                        if (t.length % 2)
                            return r.showError(
                                "SỐ ẢNH ĐỀ THI VÀ LỜI GIẢI KHÔNG KHỚP NHAU"
                            );
                        r.showProcess("ĐANG PHÂN TÍCH...."),
                            r.readImage(t, (o) => {
                                if (o.length === t.length) {
                                    (o = o.sort(function (t, e) {
                                        return t.name < e.name
                                            ? -1
                                            : t.name > e.name
                                            ? 1
                                            : 0;
                                    })),
                                        (n = "");
                                    for (var l = 0; l < o.length; l += 2)
                                        (a = {
                                            question_id: ++e,
                                            level: "0",
                                            point: parseFloat(
                                                10 / (o.length / 2)
                                            ).toFixed(2),
                                            title: "CÂU " + e + ".",
                                            content:
                                                '<img class="img-fluid" src="' +
                                                o[l].image +
                                                '"/>',
                                            explain:
                                                '<img class="img-fluid" src="' +
                                                o[l + 1].image +
                                                '"/>',
                                            answer: {
                                                type: 1,
                                                answer: [
                                                    {
                                                        key: "A",
                                                        text: "Đáp án A",
                                                    },
                                                    {
                                                        key: "B",
                                                        text: "Đáp án B",
                                                    },
                                                    {
                                                        key: "C",
                                                        text: "Đáp án C",
                                                    },
                                                    {
                                                        key: "D",
                                                        text: "Đáp án D",
                                                    },
                                                ],
                                            },
                                            keys: i.hasOwnProperty(
                                                Math.floor(l / 2)
                                            )
                                                ? i[Math.floor(l / 2)]
                                                : "",
                                        }),
                                            (n += r.itemquestion(a));
                                    $("#app .sectionQuiz").eq(s).html(n),
                                        r.refreshTitle(
                                            $("#app .sectionQuiz").eq(s)
                                        ),
                                        r.refreshQuizs(),
                                        r.hideProcess();
                                }
                            });
                    } else
                        o.isDenied &&
                            (r.showProcess("ĐANG PHÂN TÍCH...."),
                            r.readImage(t, (o) => {
                                if (o.length === t.length) {
                                    (o = o.sort(function (t, e) {
                                        return t.name < e.name
                                            ? -1
                                            : t.name > e.name
                                            ? 1
                                            : 0;
                                    })),
                                        (n = "");
                                    for (var l = 0; l < o.length; l++)
                                        (a = {
                                            question_id: ++e,
                                            level: "0",
                                            point: parseFloat(
                                                10 / o.length
                                            ).toFixed(2),
                                            title: "CÂU " + e + ".",
                                            content:
                                                '<img class="img-fluid" src="' +
                                                o[l].image +
                                                '"/>',
                                            explain: "",
                                            answer: {
                                                type: 1,
                                                answer: [
                                                    {
                                                        key: "A",
                                                        text: "Đáp án A",
                                                    },
                                                    {
                                                        key: "B",
                                                        text: "Đáp án B",
                                                    },
                                                    {
                                                        key: "C",
                                                        text: "Đáp án C",
                                                    },
                                                    {
                                                        key: "D",
                                                        text: "Đáp án D",
                                                    },
                                                ],
                                            },
                                            keys: i.hasOwnProperty(l)
                                                ? i[l]
                                                : "",
                                        }),
                                            (n += r.itemquestion(a));
                                    $("#app .sectionQuiz").eq(s).html(n),
                                        r.refreshTitle(
                                            $("#app .sectionQuiz").eq(s)
                                        ),
                                        r.refreshQuizs(),
                                        r.hideProcess();
                                }
                            }));
                });
        }
        readImage(t, e) {
            var s = t.length,
                i = [];
            !(function n(a) {
                var r = new FileReader(),
                    o = t[a];
                (r.onload = function (t) {
                    if (
                        (i.push({
                            name: o.name,
                            image: t.target.result,
                        }),
                        a < s - 1 && n(++a),
                        a === s - 1)
                    )
                        return e(i);
                }),
                    r.readAsDataURL(o);
            })(0);
        }
        stastQuestion(t, e) {
            var s = {
                labels: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
                series: e,
                chart: {
                    height: 350,
                    type: "donut",
                },
                legend: {
                    show: !0,
                    position: "bottom",
                },
                responsive: [
                    {
                        breakpoint: 992,
                        options: {
                            chart: {
                                height: 380,
                            },
                        },
                    },
                    {
                        breakpoint: 576,
                        options: {
                            chart: {
                                height: 320,
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        labels: {
                                            show: !0,
                                            name: {
                                                fontSize: "1.5rem",
                                            },
                                            value: {
                                                fontSize: "1rem",
                                            },
                                            total: {
                                                fontSize: "1.5rem",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                ],
            };
            new ApexCharts(document.querySelector(t), s).render();
        }
        renderQuizItems(t) {
            var e = this.createID(5);
            return `\n\t\t\t<div class="card border-${t.color}">\n\t\t\t\t<div class="card-header" data-toggle="collapse" href="#${e}" role="button" aria-expanded="false" aria-controls="${e}">\n\t\t\t\t\t<h4  class="card-title">${t.title}</h4>\t\n\t\t\t\t\t<div class="heading-elements  flex gap-2">\n\t\t\t\t\t${t.elements}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="card-content collapse" id="${e}">\n\t\t\t\t\t<div class="card-body ${t.parent}">${t.body} </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t`;
        }
        contextQuiz() {
            var t = this;
            $.contextMenu({
                selector: ".sectionQuizs>div.card-header",
                callback: function (i, n) {
                    var a = n.$trigger.parent();
                    switch (i) {
                        case "add":
                            if ($("#app .sectionQuizs").length >= 5)
                                return void t.showError(
                                    "HỖ TRỢ TỐI ĐA 5 ĐỀ THI"
                                );
                            var r = t.renderItemQuiz();
                            $("#app").append(r);
                            t.refreshTitleQuiz;
                            t.gotoID($("#app .sectionQuizs").last());
                            break;
                        case "delete":
                            if ($("#app .sectionQuizs").length <= 1) {
                                t.showError("PHẢI CÓ TỐI THIẾU MỘT ĐỀ  THI");
                                break;
                            }
                            a.remove();
                            break;
                        case "convert":
                            var o = a.find("img").length - 1;
                            t.auto2Text(a, o, o);
                            break;
                        case "table":
                            var l = $("#app .sectionQuizs").index(a),
                                d = "";
                            a.find(".userchoice.done").each(function (t, e) {
                                d += $(e).attr("data-value");
                            }),
                                $("#bangdapan").attr("position", l),
                                $("#bangdapan .string-key").val(d),
                                $("#bangdapan .string-key").trigger("keyup"),
                                $("#bangdapan").modal();
                            break;
                        case "question":
                            var h = e,
                                c = {
                                    question_id: ++h,
                                    level: "0",
                                    point: "0",
                                    title: "CÂU " + h + ".",
                                    content: "",
                                    explain: "",
                                    answer: {
                                        type: 2,
                                        answer: [
                                            {
                                                key: "A",
                                                text: "",
                                            },
                                        ],
                                    },
                                };
                            (a = a.find(".sectionQuiz")).append(
                                t.itemquestion(c)
                            ),
                                t.refreshTitle(a),
                                t.refreshQuizs(),
                                t.gotoID(a.find(".item-question").last());
                            break;
                        case "drive":
                            var u = $("#importDrive");
                            (l = $("#app .sectionQuizs").index(a)),
                                u.find("#oneFolder").prop("checked", !1),
                                u.find(".question-link").val(""),
                                u.find(".explain-link").val(""),
                                u.attr("position", l),
                                u.modal();
                            break;
                        case "files":
                            (s = $("#app .sectionQuizs").index(a)),
                                $("#uploadPDFDOCX").trigger("click");
                    }
                },
                items: {
                    add: {
                        name:
                            feather.icons["file-plus"].toSvg() + " Thêm Đề thi",
                        isHtmlName: !0,
                    },
                    delete: {
                        name: feather.icons["x-circle"].toSvg() + " Xoá Đề thi",
                        isHtmlName: !0,
                    },
                    convert: {
                        name:
                            feather.icons.crop.toSvg() +
                            " Chuyển ảnh sang Text",
                        isHtmlName: !0,
                    },
                    table: {
                        name: feather.icons.clipboard.toSvg() + " Bảng đáp án",
                        isHtmlName: !0,
                    },
                    question: {
                        name:
                            feather.icons["check-circle"].toSvg() +
                            " Thêm câu hỏi",
                        isHtmlName: !0,
                    },
                    files: {
                        name:
                            feather.icons["file-text"].toSvg() +
                            " Nhập câu hỏi từ file .pdf .docx",
                        isHtmlName: !0,
                    },
                    drive: {
                        name:
                            feather.icons["hard-drive"].toSvg() +
                            " Nhập câu hỏi từ Drive",
                        isHtmlName: !0,
                    },
                },
            });
        }
        contextQuestion() {
            var t = this;
            $.contextMenu({
                selector: ".item-question",
                callback: function (s, i) {
                    var n = i.$trigger;
                    if (n.parents(".sectionQuiz"))
                        switch (s) {
                            case "add":
                                var a = {
                                    question_id: ++e,
                                    level: 1,
                                    point: n
                                        .find('[href="#point"] .html--edit')
                                        .val(),
                                    title: "CÂU " + e + ".",
                                    content: "",
                                    explain: "",
                                    answer: {
                                        type: 2,
                                        answer: [
                                            {
                                                key: "A",
                                                text: "",
                                            },
                                        ],
                                    },
                                };
                                $(t.itemquestion(a)).insertAfter(n),
                                    t.refreshTitle(n.parents(".sectionQuiz")),
                                    t.refreshQuizs();
                                break;
                            case "delete":
                                var r = n.parents(".sectionQuiz");
                                var id = n.attr("data-id");
                                if (r.find(".item-question").length <= 1) {
                                    t.showError(
                                        "PHẢI CÓ TỐI THIẾU MỘT CÂU HỎI"
                                    );
                                    break;
                                }
                                if (id in fileQuestions) {
                                    delete fileQuestions[id];
                                }
                                if (id in videoQuestions) {
                                    delete videoQuestions[id];
                                }
                                if (id in audioQuestions) {
                                    delete audioQuestions[id];
                                }
                                n.remove(), t.refreshTitle(r), t.refreshQuizs();
                                break;
                            case "convert":
                                var o = n.find("img").length - 1;
                                t.auto2Text(n, o, o);
                        }
                },
                items: {
                    add: {
                        name:
                            feather.icons["file-plus"].toSvg() +
                            " Thêm câu hỏi",
                        isHtmlName: !0,
                    },
                    delete: {
                        name:
                            feather.icons["x-circle"].toSvg() + " Xoá câu hỏi",
                        isHtmlName: !0,
                    },
                    convert: {
                        name:
                            feather.icons.crop.toSvg() +
                            " Chuyển ảnh sang Text",
                        isHtmlName: !0,
                    },
                },
            });
        }
        contextOption() {
            var t = this;
            $.contextMenu({
                selector: ".options-question .d-flex",
                callback: function (e, s) {
                    var i = s.$trigger;
                    if (i.parents(".sectionQuiz"))
                        switch (e) {
                            case "add":
                                s = {
                                    key: "X",
                                    text: "",
                                };
                                $(t.renderOption(s)).insertAfter(i),
                                    t.refreshOptions(
                                        i.parents(".item-question")
                                    );
                                break;
                            case "edit":
                                s.$trigger
                                    .find(".html--content")
                                    .trigger("click");
                                break;
                            case "delete":
                                var n = i.parents(".item-question");
                                if (
                                    n.find(".options-question .d-flex")
                                        .length <= 1
                                ) {
                                    t.showError(
                                        "PHẢI CÓ TỐI THIẾU MỘT ĐÁP ÁN LỰA CHỌN"
                                    );
                                    break;
                                }
                                i.remove(), t.refreshOptions(n);
                                break;
                            case "convert":
                                var a = i.find("img").length - 1;
                                t.auto2Text(i, a, a);
                        }
                },
                items: {
                    add: {
                        name:
                            feather.icons["file-plus"].toSvg() + " Thêm đáp án",
                        isHtmlName: !0,
                    },
                    edit: {
                        name: feather.icons.edit.toSvg() + " Sửa đáp án",
                        isHtmlName: !0,
                    },
                    delete: {
                        name: feather.icons["x-circle"].toSvg() + " Xoá đáp án",
                        isHtmlName: !0,
                    },
                    convert: {
                        name:
                            feather.icons.crop.toSvg() +
                            " Chuyển ảnh sang Text",
                        isHtmlName: !0,
                    },
                },
            });
        }
        convertMM2SS(t) {
            var e = t.split(":");
            return parseInt(e[2]) + 60 * e[1] + 60 * e[0] * 60;
        }
        renderStats(t) {
            return (
                `\n\t\t\t<div class="col-lg-3 col-sm-6 col-12">\n\t\t\t\t<div class="card bg-light-${t.color}">\n\t\t\t\t\t<div class="card-body">\n\t\t\t\t\t\t<div class="card-header">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<h2 class="font-weight-bolder mb-0 all">${t.data}</h2>\n\t\t\t\t\t\t\t\t<p class="card-text">${t.title}</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="avatar bg-light-${t.color} p-50 m-0">\n\t\t\t\t\t\t\t\t<div class="avatar-content">\n\t\t\t\t\t\t\t\t\t` +
                feather.icons[t.icons].toSvg() +
                "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t"
            );
        }
        showTableResult(t, e) {
            this.TableResult = $(".tableResult").DataTable({
                data: t,
                autoWidth: !1,
                columns: e,
                ordering: !0,
                columnDefs: [
                    {
                        targets: 0,
                        title: "",
                        width: "80px",
                        orderable: !1,
                        render: function (t, e, s, i) {
                            return (
                                '<div class="d-flex align-items-center col-actions"><a class="mr-1 view-result" data-id="' +
                                t +
                                '" href="javascript:void(0);" title="XEM BÀI LÀM">' +
                                feather.icons.eye.toSvg({
                                    class: "font-medium-2",
                                }) +
                                '</a><a class="mr-1 download-result text-info" data-id="' +
                                t +
                                '" href="javascript:void(0);" title="TẢI XUỐNG LÀM BÀI">' +
                                feather.icons["download-cloud"].toSvg({
                                    class: "font-medium-2",
                                }) +
                                '</a><a class="mr-1 logs-result text-success" data-id="' +
                                t +
                                '" href="javascript:void(0);" title="LỊCH SỬ LÀM BÀI">' +
                                feather.icons.list.toSvg({
                                    class: "font-medium-2",
                                }) +
                                '</a><a class="mr-1 text-danger delete-item" data-id="' +
                                t +
                                '" href="javascript:void(0);"  title="XOÁ BÀI LÀM">' +
                                feather.icons["x-circle"].toSvg({
                                    class: "font-medium-2",
                                }) +
                                "</a></div>"
                            );
                        },
                    },
                ],
                dom: '<"row d-flex justify-content-between align-items-center m-1"<"col-lg-6 d-flex align-items-center"l<"dt-action-buttons text-xl-right text-lg-left text-lg-right text-left "B>><"col-lg-6 d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap pr-lg-1 p-0"f<"invoice_status ml-sm-2">>>t<"d-flex justify-content-between mx-2 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                language: {
                    url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json",
                    sLengthMenu: "Show _MENU_",
                    search: "Tìm",
                    searchPlaceholder: "Nội dung cần tìm",
                    paginate: {
                        previous: "&nbsp;",
                        next: "&nbsp;",
                    },
                },
                buttons: [
                    {
                        extend: "collection",
                        className:
                            "btn btn-outline-secondary dropdown-toggle mr-2",
                        text:
                            feather.icons.share.toSvg({
                                class: "font-small-4 mr-50",
                            }) + "Xuất dữ liệu",
                        buttons: [
                            {
                                extend: "print",
                                text:
                                    feather.icons.printer.toSvg({
                                        class: "font-small-4 mr-50",
                                    }) + "Print",
                                className: "dropdown-item",
                            },
                            {
                                extend: "excel",
                                text:
                                    feather.icons.file.toSvg({
                                        class: "font-small-4 mr-50",
                                    }) + "Excel",
                                className: "dropdown-item",
                            },
                            {
                                extend: "pdf",
                                text:
                                    feather.icons.clipboard.toSvg({
                                        class: "font-small-4 mr-50",
                                    }) + "Pdf",
                                className: "dropdown-item",
                            },
                        ],
                        init: function (t, e, s) {
                            $(e).removeClass("btn-secondary"),
                                $(e).parent().removeClass("btn-group"),
                                setTimeout(function () {
                                    $(e)
                                        .closest(".dt-buttons")
                                        .removeClass("btn-group")
                                        .addClass("d-inline-flex");
                                }, 50);
                        },
                    },
                    {
                        text:
                            feather.icons["download-cloud"].toSvg({
                                class: "me-50 font-small-4",
                            }) + " TẢI BÀI LÀM",
                        className: "download-result btn btn-info",
                        init: function (t, e, s) {
                            $(e).removeClass("btn-secondary");
                        },
                    },
                ],
                initComplete: function () {},
            });
        }
        showPhoDiem(t) {
            var e = {
                series: t,
                chart: {
                    height: 400,
                    id: "phodiem",
                    type: "line",
                    zoom: {
                        enabled: !0,
                    },
                },
                fill: {
                    type: "gradient",
                },
                dataLabels: {
                    enabled: !0,
                },
                stroke: {
                    curve: "smooth",
                },
                markers: {
                    size: 0,
                },
                xaxis: {
                    categories: [
                        "0<=x<0.5",
                        "0.5<=x<1",
                        "1<=x<1.5",
                        "1.5<=x<2",
                        "2<=x<2.5",
                        "2.5<=x<3",
                        "3<=x<3.5",
                        "3.5<=x<4",
                        "4<=x<4.5",
                        "4.5<=x<5",
                        "5<=x<5.5",
                        "5.5<=x<6",
                        "6<=x<6.5",
                        "6.5<=x<7",
                        "7<=x<7.5",
                        "7.5<=x<8",
                        "8<=x<8.5",
                        "8.5<=x<9",
                        "9<=x<9.5",
                        "9.5<=x<10",
                        "10",
                    ],
                },
                yaxis: {
                    title: {
                        text: "Số bài làm",
                    },
                },
            };
            return "" !== $("#pho-diem").html()
                ? ApexCharts.exec("phodiem", "updateSeries", t, !0)
                : new ApexCharts(
                      document.querySelector("#pho-diem"),
                      e
                  ).render();
        }
        ajaxResult(t, e) {
            var s = this;
            $.ajax({
                url:
                    "https://spreadsheets.google.com/feeds/cells/" +
                    t.sheet +
                    "/1/public/values",
                type: "GET",
                dataType: "jsonp",
                data: {
                    alt: "json-in-script",
                    q: '""post_id":"' + t.post_id.toString() + '"" ' + t.search,
                    "max-results": t.max,
                    "start-index": t.start,
                },
                beforeSend: function () {
                    $(" .status-load").text(t.title || "ĐANG TẢI DỮ LIỆU...");
                },
                success: (t) => {
                    s.hideProcess(),
                        (s.db.totalIndex =
                            parseInt(t.feed.openSearch$totalResults.$t) || 1),
                        s.db.totalIndex > 4 * s.db.maxResult &&
                            1e3 === s.db.maxResult &&
                            (s.db.maxResult = Math.floor(s.db.totalIndex / 4));
                    var i = [],
                        n = 0;
                    t.feed.hasOwnProperty("entry") &&
                        (t.feed.entry.forEach(function (t) {
                            try {
                                i.push(JSON.parse(t.content.$t));
                            } catch (t) {}
                        }),
                        (n = t.feed.entry.length)),
                        e(i, n),
                        $(" .status-load").text(
                            "Cập nhật lúc " +
                                moment().format().substr(11, 8) +
                                " (" +
                                parseInt(
                                    (100 * (s.db.startIndex - 1)) /
                                        s.db.totalIndex
                                ) +
                                "%)"
                        );
                },
                error: (t) => {
                    s.hideProcess(),
                        s.showError("VUI LÒNG KIỂM TRA LẠI KẾT NỐI INTERNET");
                },
            });
        }
        upfilePDFDOCX(e) {
            var i,
                n = this;
            if (
                "PDF" ===
                    (i = (i = e.name.split("."))[i.length - 1]
                        .toString()
                        .toUpperCase()) ||
                "DOCX" === i
            ) {
                Swal.fire({
                    icon: "info",
                    title: e.name,
                    text:
                        "Hệ thống sẽ phân tích và thay thế toàn bộ dữ liệu câu hỏi ĐỀ SỐ " +
                        (s + 1) +
                        ". Bạn có muốn thực hiện không?",
                    showCancelButton: !0,
                    confirmButtonText: "TIẾP TỤC",
                    CancelButtonText: "HUỶ",
                }).then((o) => {
                    o.isConfirmed &&
                        ("PDF" === i
                            ? (t = new a()).loadFileExam(URL.createObjectURL(e))
                            : ((t = new r()).ngOnInit(), t.loadFileDocx(e)),
                        n.gotoID($("#app .sectionQuizs").eq(s)));
                });
            } else {
                n.showError("ĐỊNH DẠNG FILE KHÔNG HỖ TRỢ.");
            }
        }
        checkLatex(t) {
            return $(t).text()
                ? ((t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(
                      /([A-D]) \\/g,
                      "$1\\"
                  )).replace(/\{.&.\}/g, "@")).replace(
                      /(\\\[|\\\]|\\\(|\\\))/g,
                      "$"
                  )).replace(/\\end{align}/g, "\\end{matrix}")).replace(
                      /\\end{array}/g,
                      "\\end{matrix}"
                  )).replace(/\\begin{array}/g, "\\begin{matrix}")).replace(
                      /\\begin{align}/g,
                      "\\begin{matrix}"
                  )).replace(/\%/g, "\\%")).replace(/\^\^/g, "^"))
                      .split("$")
                      .forEach(function (e, s) {
                          if (s % 2) {
                              var i = $("<div>" + e + "</div>").text();
                              (i = (i = (i = (i = i.replace(
                                  /\</g,
                                  "<  "
                              )).replace(/\n/g, " ")).replace(
                                  /\\begin/g,
                                  "\n \\begin"
                              )).replace(/\\!\\!/g, "")),
                                  (t = t.replace(e, i));
                          }
                      }),
                  t)
                : t;
        }
        processText(t) {
            return (t = (t = (t = $("<div>" + t + "</div>").html()).replace(
                /(\t|\n)+/g,
                ""
            )).replace(/<[^/>][^>]*><\/[^>]+>/g, "")).trim();
        }
        processDataWord(t) {
            var n,
                a,
                r,
                o,
                l,
                d,
                h = this;
            t = (t = (t = (t = t.replace(
                /<\s*a[^>]*>(.*?)<\s*\/\s*a>/g,
                "$1"
            )).replace(/(alt=\"(.*)\")/g, "")).replace(
                /(<img([\w\W]+?)\/>)/g,
                "<p>$1</p>"
            )).replace(/(Chọn [A-K])([\.\:])/gi, "$1");
            var c,
                u,
                p,
                g,
                m = [],
                f = [];
            if (
                ((n = t.match(/Câu \d{1,5}[:.]/gi)) &&
                    (n
                        .slice()
                        .reverse()
                        .forEach((e) => {
                            (l = t.substr(
                                t.indexOf(e) + e.length,
                                t.length - t.indexOf(e)
                            )),
                                m.push(l),
                                (t = t.substr(0, t.indexOf(e)));
                        }),
                    m.length &&
                        m
                            .slice()
                            .reverse()
                            .forEach((t, s) => {
                                if (
                                    ((r = []),
                                    (a = (o = t).match(
                                        /(<u>|)([A-K]([.:]))(<\/u>|)/g
                                    )),
                                    (u = ""),
                                    (g = ""),
                                    o.match(/<u>([A-K]([.:]))<\/u>/g) &&
                                        (u = /<u>([A-K]([.:]))<\/u>/g
                                            .exec(o)[1]
                                            .replace(/(\.|\:)/g, "")),
                                    (c = {
                                        type: 1,
                                        answer: [],
                                    }),
                                    (p = ""),
                                    a
                                        .slice()
                                        .reverse()
                                        .forEach((t) => {
                                            (l = o.substr(
                                                o.indexOf(t) + t.length,
                                                o.length - o.indexOf(t)
                                            )),
                                                (d = l.match(/Lời giải/gi)) &&
                                                    ((p = l.substr(
                                                        l.indexOf(d[0]) +
                                                            d[0].length,
                                                        l.length -
                                                            l.indexOf(d[0])
                                                    )),
                                                    (l = l.substr(
                                                        0,
                                                        l.indexOf(d[0])
                                                    )),
                                                    p.match(/Chọn ([A-K])/gi) &&
                                                        (g =
                                                            /Chọn ([A-K])/gi.exec(
                                                                p
                                                            )[1])),
                                                r.push(l),
                                                (o = o.substr(0, o.indexOf(t)));
                                        }),
                                    r.length)
                                )
                                    (c.type = 2),
                                        r
                                            .slice()
                                            .reverse()
                                            .forEach((t, e) => {
                                                c.answer.push({
                                                    key: String.fromCharCode(
                                                        65 + e
                                                    ),
                                                    text: h.processText(t),
                                                });
                                            });
                                else
                                    for (; ; i++)
                                        c.answer.push({
                                            key: String.fromCharCode(65),
                                            text:
                                                "Đáp án " +
                                                String.fromCharCode(65),
                                        });
                                f.push({
                                    question_id: e++,
                                    content: h.processText(o),
                                    explain: h.processText(p),
                                    keys: u || g,
                                    point: "",
                                    answer: c,
                                });
                            })),
                !f.length)
            )
                return h.showError("KHÔNG PHÂN TÍCH ĐƯỢC DỮ LIỆU");
            var v = "";
            f.forEach((t) => {
                (t.point = (10 / f.length).toFixed(2)),
                    (v += h.itemquestion(t));
            }),
                $("#app .sectionQuiz").eq(s).html(v),
                h.refreshTitle($("#app .sectionQuiz").eq(s)),
                h.refreshQuizs(),
                h.hideProcess();
        }
        gotoID(t) {
            $("html, body").animate(
                {
                    scrollTop: t.offset().top - 100,
                },
                1e3
            );
        }
        funcUpdate() {
            var t = this;
            t.hideProcess();
            t.setUrlBar({});
        }
        setDataSetting(t) {
            if (
                t &&
                !t.sharecode &&
                t.user_id &&
                parseInt(t.user_id) !== parseInt(this.jwt.user_id) &&
                1 !== this.jwt.user_id
            ) {
                let t;
                Swal.fire({
                    icon: "error",
                    title: "ĐỀ THI NÀY KHÔNG Ở CHẾ ĐỘ CHIA SẺ",
                    html: "Chuyển sang tạo đề mới sau <b></b> mili giây.",
                    timer: 3e3,
                    timerProgressBar: !0,
                    didOpen: () => {
                        Swal.showLoading(),
                            (t = setInterval(() => {
                                const t = Swal.getHtmlContainer();
                                if (t) {
                                    const e = t.querySelector("b");
                                    e && (e.textContent = Swal.getTimerLeft());
                                }
                            }, 100));
                    },
                    willClose: () => {
                        clearInterval(t),
                            (window.location.href = "./p/create.html");
                    },
                }).then((t) => {
                    window.location.href = "./p/create.html";
                });
            }
            var e = $("#profile-info");
            e.find("#quiz-time").val(t.time),
                e.find("#quiz-taked").val(t.retake),
                e.find("#quiz-start").val(t.start),
                e.find("#quiz-lock").val(t.end),
                e.find("#quiz-pwd").val(t.password),
                e.find("#quiz-show-explain").val(t.explain).trigger("change"),
                e.find("#quiz-show-result").prop("checked", t.result),
                e.find("#quiz-show-marks").prop("checked", t.marks),
                e.find("#quiz-show-answer").prop("checked", t.answer),
                e.find("#quiz-show-single").prop("checked", t.single),
                e
                    .find("#quiz-mode-question")
                    .val(t.rquestion)
                    .trigger("change"),
                e.find("#quiz-random-answer").prop("checked", t.ranswer),
                e.find("#quiz-required").prop("checked", t.required),
                e.find("#quiz-switch-tabs").prop("checked", t.tabs),
                e.find("#quiz-show-comment").prop("checked", t.comment),
                $("#switchshare")
                    .prop("checked", t.sharecode)
                    .trigger("change"),
                e.find("#quiz_title").val(t.title).trigger("change"),
                e
                    .find("#quiz_title")
                    .parent()
                    .find(".html--content")
                    .html(t.title),
                e.find("#quiz-subtitle").val(t.subtitle),
                e
                    .find("#quiz-subtitle")
                    .parent()
                    .find(".html--content")
                    .html(t.subtitle),
                e.find("#quiz-cover").attr("src", t.cover);
            var s = "",
                i = this;
            t.inputs.input.forEach(function (t) {
                s += i.renderOptionStudent(t);
            }),
                $("#thongtinthuthap").html(s),
                i.refreshOptionStudent();
        }
        ajaxSheet(t, e) {
            var s = this;
            $.ajax({
                url:
                    "https://spreadsheets.google.com/feeds/cells/" +
                    t.sheet +
                    "/2/public/values",
                type: "GET",
                dataType: "jsonp",
                data: {
                    alt: "json-in-script",
                    q:
                        '""post_id":"' +
                        t.post_id.toString() +
                        '"" "' +
                        t.search +
                        '"',
                },
                beforeSend: function () {
                    toastr.info("", t.title || "ĐANG LẤY DỮ LIỆU..."),
                        s.showProcess(t.title || "ĐANG LẤY DỮ LIỆU...");
                },
                success: (t) => {
                    var s = [];
                    t.feed.hasOwnProperty("entry") &&
                        t.feed.entry.forEach(function (t) {
                            s.push(JSON.parse(t.content.$t));
                        }),
                        e(s);
                },
                error: (i) => {
                    $.ajax({
                        url:
                            "https://spreadsheets.google.com/feeds/cells/" +
                            t.sheet +
                            "/1/public/values",
                        type: "GET",
                        dataType: "jsonp",
                        data: {
                            alt: "json-in-script",
                            q:
                                '""post_id":"' +
                                t.post_id.toString() +
                                '"" "' +
                                t.search +
                                '"',
                        },
                        beforeSend: function () {
                            toastr.info("", t.title || "ĐANG LẤY DỮ LIỆU..."),
                                s.showProcess(t.title || "ĐANG LẤY DỮ LIỆU...");
                        },
                        success: (t) => {
                            var s = [];
                            t.feed.hasOwnProperty("entry") &&
                                t.feed.entry.forEach(function (t) {
                                    s.push(JSON.parse(t.content.$t));
                                }),
                                e(s);
                        },
                        error: (t) => {
                            e([]);
                        },
                    });
                },
            });
        }
        toDataUrl(t, e) {
            var s = new XMLHttpRequest();
            (s.onload = function () {
                var t = new FileReader();
                (t.onloadend = function () {
                    e(t.result);
                }),
                    t.readAsDataURL(s.response);
            }),
                s.open("GET", t),
                (s.responseType = "blob"),
                s.send();
        }
        sortUrl(t, e) {
            return e({
                tinyurl: t,
            });
        }
        setUrlBar(t) {
            if ("URLSearchParams" in window) {
                var e = new URLSearchParams();
                for (var s in t) e.set(s, t[s]);
                var i = window.location.pathname + "?" + e.toString();
                history.pushState(null, "", i);
            }
        }
        connectServer(t, e) {
            var s = this;
            var newData = new FormData();
            for (const [key, value] of Object.entries(t.data)) {
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (item != null && Object.keys(item).length > 0) {
                            for (const [
                                keyObject,
                                valueObject,
                            ] of Object.entries(item)) {
                                if (
                                    Array.isArray(valueObject) ||
                                    (["imgs"].includes(keyObject) &&
                                        valueObject != undefined &&
                                        valueObject != "" &&
                                        typeof valueObject != "string")
                                ) {
                                    Array.from(valueObject).forEach((data) => {
                                        newData.append(
                                            key +
                                                `[${index}]` +
                                                `[${keyObject}]` +
                                                "[]",
                                            data
                                        );
                                    });
                                } else if (
                                    !["video", "audio"].includes(keyObject) &&
                                    typeof valueObject == "object"
                                ) {
                                    newData.append(
                                        key + `[${index}]` + `[${keyObject}]`,
                                        JSON.stringify(valueObject)
                                    );
                                } else {
                                    newData.append(
                                        key + `[${index}]` + `[${keyObject}]`,
                                        valueObject
                                    );
                                }
                            }
                        }
                    });
                } else if (value != null && Object.keys(value).length > 0) {
                    for (const [keyObject, valueObject] of Object.entries(
                        value
                    )) {
                        newData.append(keyObject, valueObject);
                    }
                } else {
                    newData.append(key, value);
                }
            }
            newData.append(
                "_token",
                document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            );
            const urlCurrent = s.isEditQuiz ? s.updateURL : s.storeURL;
            $.ajax({
                url: urlCurrent,
                method: "POST",
                data: newData,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    s.showProcess("Đang lưu dữ liệu...");
                },
                success: function (t) {
                    window.location.href = t.url;
                    // e(t);
                },
                error: function (t) {
                    // s.showError(""),
                },
            }).always(() => {
                s.hideProcess();
            });
        }
        setItemUser(t) {
            var e = this.renderItemUser(t);
            $("#liststudent .table  tbody tr").length < t.TT
                ? $("#liststudent .table  tbody ").append(e)
                : $("#liststudent .table  tbody tr")
                      .eq(t.TT - 1)
                      .replaceWith(e);
        }
        editItemUser(t) {
            var e = $("#addUser");
            "HỌ VÀ TÊN#LỚP#TRƯỜNG#TÊN ĐĂNG NHẬP#MẬT KHẨU"
                .split("#")
                .forEach(function (s, i) {
                    e.find("input")
                        .eq(i)
                        .val(t[s] || "");
                }),
                e.attr("edit", t.TT || 0),
                e.show();
        }
        renderItemUser(t) {
            var e = "";
            return (
                (e += '<tr class="itemUser">'),
                "TT#HỌ VÀ TÊN#LỚP#TRƯỜNG#TÊN ĐĂNG NHẬP#MẬT KHẨU"
                    .split("#")
                    .forEach(function (s, i) {
                        e +=
                            "<td>" +
                            ((t.hasOwnProperty(s) && t[s]) || "") +
                            "</td>";
                    }),
                (e +=
                    '<td><div class="d-inline-flex"><a href="javascript:;" class="pr-1 text-primary edit-user" title="Sửa thông tin">' +
                    feather.icons.edit.toSvg() +
                    '</a><a href="javascript:;" class="delete-user text-danger" title="Xoá thông tin">' +
                    feather.icons.delete.toSvg() +
                    "</a></div></td>"),
                (e += "</tr>")
            );
        }
        refreshOptionStudent() {
            $("#thongtinthuthap .input-group").each(function (t, e) {
                $(e)
                    .find(".input-group-text")
                    .text("Trường thông tin " + (t + 1));
            });
        }
        renderOptionStudent(t = "") {
            return (
                `<div class="input-group mb-2">\n\t\t\t\t\t<div class="input-group-prepend">\n\t\t\t\t\t\t<span class="input-group-text  bg-light-success"></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<input type="text" class="form-control" placeholder="Nhập thông tin mà bạn muốn học sinh phải nhập" value="${t}">\n\t\t\t\t\t<div class="input-group-append">\n\t\t\t\t\t\t<button class="btn btn-danger waves-effect delete" type="button">` +
                feather.icons.delete.toSvg() +
                "  Xoá</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"
            );
        }
        copyToClipboard = (text) => {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            document.body.appendChild(textarea);
            var selection = document.getSelection();
            var range = document.createRange();
            range.selectNode(textarea);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
            selection.removeAllRanges();
            document.body.removeChild(textarea);
        };
        showError(t, e = window.location.origin) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: t,
                // footer: '<a href="' + e + '">Xem thêm cách khắc phục</a>',
                customClass: {
                    confirmButton: "btn btn-primary",
                },
                buttonsStyling: !1,
            });
        }
        showSuccess(t, e = window.location.origin) {
            Swal.fire({
                icon: "success",
                title: t.message,
                text: t,
                customClass: {
                    confirmButton: "btn btn-primary",
                },
                buttonsStyling: !1,
            });
        }
        getDataStudent() {
            var t,
                e = $("#hocsinh"),
                s = {};
            return (
                (s.status =
                    "#everyone" ===
                    e.find("ul.status .nav-link.active").attr("href")),
                (s.input = []),
                (s.error = []),
                e.find("#thongtinthuthap input").each(function (t, e) {
                    s.input.push($(e).val().trim()),
                        $(e).val().trim() ||
                            s.error.push(
                                "KHÔNG ĐƯỢC ĐỂ TRỐNG TRƯỜNG THÔNG TIN " +
                                    (t + 1)
                            );
                }),
                s.status &&
                    !s.input.length &&
                    s.error.push(
                        "BẮT BUỘC PHẢI CÓ MỘT TRƯỜNG THÔNG TIN THU THẬP"
                    ),
                (s.users = []),
                !s.status &&
                    e.find("#liststudent .itemUser").each(function (e, i) {
                        (t = {}),
                            "TT#HỌ VÀ TÊN#LỚP#TRƯỜNG#TÊN ĐĂNG NHẬP#MẬT KHẨU"
                                .split("#")
                                .forEach(function (e, s) {
                                    t[e] = $(i).find("td").eq(s).text().trim();
                                }),
                            s.users.push(t);
                    }),
                s
            );
        }
        getDataSetting() {
            var t = $("#profile-info");
            var setting = {
                user_id: t.find("#quiz_user_id").val(),
                name: t.find("#quiz_title").val(),
                ord: t.find("#quiz_start").val(),
                start: t.find("#quiz_start").val(),
                lock: t.find("#quiz_lock").val(),
                password: t.find("#quiz_password").val(),
                act: t.find("#quiz_act").is(":checked") ? 1 : 0,
                quiz_category_id: t.find("#quiz_category_id").val(),
                subject_id: t.find("#quiz_subject_id").val(),
                class: $.map(
                    t.find('[name="classTeacher"]:checked'),
                    function (item) {
                        return item.value;
                    }
                ),
                number_order: t.find("#quiz_number_order").is(":checked")
                    ? 1
                    : 0,
                request_birthday: t
                    .find("#quiz_request_birthday")
                    .is(":checked")
                    ? 1
                    : 0,
                code_share: t.find("#quiz_code_share").is(":checked") ? 1 : 0,
                comment_fb_show: t.find("#quiz_comment_fb_show").is(":checked")
                    ? 1
                    : 0,
                submit_switch_tab: t
                    .find("#quiz_submit_switch_tab")
                    .is(":checked")
                    ? 1
                    : 0,
                show_single: t.find("#quiz_show_single").is(":checked") ? 1 : 0,
                required_all_question: t
                    .find("#quiz_required_all_question")
                    .is(":checked")
                    ? 1
                    : 0,
                show_answer: t.find("#quiz_show_answer").is(":checked") ? 1 : 0,
                show_marks: t.find("#quiz_show_marks").is(":checked") ? 1 : 0,
                show_result: t.find("#quiz_show_result").is(":checked") ? 1 : 0,
                mix_answers: t.find("#quiz_mix_answers").is(":checked") ? 1 : 0,
                mix_questions: t.find("#quiz_mix_questions").is(":checked")
                    ? 1
                    : 0,
                quiz_mode_question_id: t.find("#quiz_mode_question").val(),
                quiz_show_explain_id: t.find("#quiz_show_explain").val(),
                tasked: t.find("#quiz_tasked").val(),
                time: t.find("#quiz_time").val(),
                img:
                    document.querySelector("#quiz-cover-upload").files.length ==
                    0
                        ? ""
                        : document.querySelector("#quiz-cover-upload").files[0],
                short_content: t.find("#quiz_short_content").val(),
            };
            if (document.getElementById("quiz_id")) {
                setting["id"] = document.getElementById("quiz_id").value;
            }
            return setting;
        }
        getDataQuestion(t) {
            let dataAudio = "";
            let dataVideo = "";
            let dataImgs = "";
            const oldAudio = t.find('textarea[name="quiz_audio"]').val();
            if (audioQuestions[parseInt(t.attr("data-id"))] != undefined) {
                dataAudio = audioQuestions[parseInt(t.attr("data-id"))];
            } else if (
                oldAudio != null &&
                oldAudio != undefined &&
                oldAudio != ""
            ) {
                dataAudio = oldAudio;
            }
            const oldVideo = t.find('textarea[name="quiz_video"]').val();
            if (videoQuestions[parseInt(t.attr("data-id"))] != undefined) {
                dataVideo = videoQuestions[parseInt(t.attr("data-id"))];
            } else if (
                oldVideo != null &&
                oldVideo != undefined &&
                oldVideo != ""
            ) {
                dataVideo = oldVideo;
            }
            const oldImgs = t.find('textarea[name="quiz_imgs"]').val();
            if (fileQuestions[parseInt(t.attr("data-id"))] != undefined) {
                dataImgs = fileQuestions[parseInt(t.attr("data-id"))];
            } else if (
                oldImgs != null &&
                oldImgs != undefined &&
                oldImgs != ""
            ) {
                dataImgs = oldImgs;
            }
            const question = {
                audio: dataAudio,
                video: dataVideo,
                imgs: dataImgs,
                question_id: parseInt(t.attr("data-id")),
                content: decode(t.find(".content-question .html--edit").html()),
                explain: decode(t.find(".explain-question .html--edit").html()),
                keys: t.find(".userchoice.done").attr("data-value") || "",
                level: t.find(".level-question").val(),
                point: t.find('[href="#point"] .html--edit').val(),
                answer: this.getDataOptions(t),
            };
            if (t.attr("data-old-id") != null) {
                question["question_old_id"] = t.attr("data-old-id");
            }
            return question;
        }
        getDataQuiz() {
            var t,
                e,
                s = $("#app"),
                i = [],
                n = [],
                a = this,
                r = [],
                o = [];
            return (
                s.find(".sectionQuizs").each(function (s, l) {
                    n[s] = [];
                    e = 0;
                    $(l)
                        .find(".sectionQuiz .item-question")
                        .each(function (l, d) {
                            (t = a.getDataQuestion($(d))).quiz_id = parseInt(s);
                            n[s].push(t.question_id);
                            i.push(t);
                            e += parseFloat(t.point);
                            t.keys ||
                                o.push(
                                    "CÂU  " +
                                        (l + 1) +
                                        " ĐỀ " +
                                        (s + 1) +
                                        " CHƯA CÓ ĐÁP ÁN."
                                );
                            4 !== t.answer.answer.length &&
                                r.push(
                                    "CÂU  " +
                                        (l + 1) +
                                        " ĐỀ " +
                                        (s + 1) +
                                        " CÓ " +
                                        t.answer.answer.length +
                                        " PHƯƠNG ÁN LỰA CHỌN."
                                );
                        });
                    n[s].length ||
                        o.push("ĐỀ SỐ " + (s + 1) + " CHƯA CÓ DỮ LIỆU"),
                        1 * e.toFixed(2) != 10 &&
                            r.push(
                                "ĐIỂM CỦA ĐỀ SỐ " +
                                    (s + 1) +
                                    " KHÔNG THEO THANG ĐIỂM 10."
                            );
                }),
                {
                    warning: r,
                    error: o,
                    data: n,
                    question: i,
                }
            );
        }
        getDataOptions(t) {
            var e,
                s = [],
                i = 0;
            return (
                t.find(".options-question .d-flex").each(function (t, n) {
                    e = decode($(n).find(".aic .html--edit").html());
                    const option = {
                        key: String.fromCharCode(65 + t),
                        text: e,
                    };
                    if (document.querySelector("#quiz_id")) {
                        option["answer_id"] = $(n)
                            .find(".html--edit")
                            .attr("data-old-id");
                    }
                    s.push(option), e.match(/Đáp án [A-D]/g) && i++;
                }),
                {
                    type: i === s.length ? 1 : 2,
                    answer: s,
                }
            );
        }
        renderPanelAnswer(t) {
            var e,
                s,
                i = "";
            return (
                t.split("").forEach(function (t, n) {
                    e = "";
                    for (var a = 0; a < 4; a++)
                        (s = String.fromCharCode(65 + a)),
                            (e +=
                                '<div class="avatar bg-' +
                                (s === t ? "success" : "light-secondary") +
                                ` avatar-lg userselect" data-value="${s}">\n\t\t\t\t\t\t\t<span class="avatar-content">${s}</span>\n\t\t\t\t\t\t</div>`);
                    i +=
                        '<div class="d-flex justify-content-around mb-1">\n\t\t\t\t\t<div class="avatar bg-primary avatar-lg">\n\t\t\t\t\t\t<div class="avatar-content">' +
                        (n + 1) +
                        "</div>\n\t\t\t\t\t</div>" +
                        e +
                        "\n\t\t\t\t</div>";
                }),
                i
            );
        }
        showProcess(t) {
            $(".content-overlay").addClass("show"),
                $(".content-overlay .noti").text(t);
        }
        hideProcess() {
            setTimeout(function () {
                $(".content-overlay").removeClass("show"),
                    $(".content-overlay .noti").text("");
            }, 1e3);
        }
        _t5sConvertImageToLatex(_thisElement) {
            let itemQuestion = _thisElement.hasClass("item-question")
                ? _thisElement
                : _thisElement.parents(".item-question");
            let imgs = itemquestion.find("sub img");
            let _simpleSendConvert = async function readFiles(imgs) {
                i.showProcess(
                    "Đang tiến hành phân tích ... " +
                        parseInt(100 - (100 * e) / s) +
                        "%"
                );
                for (const img of imgs) {
                    await apiImage2Text(file.attr("src"), (a) => {
                        if (
                            a.hasOwnProperty("data") &&
                            a.data &&
                            !a.data.match(
                                /^\\begin\{tabular\}(.*)\\end\{tabular\}/gs
                            )
                        ) {
                            var r, o;
                            (a.data = a.data.replace(
                                /\\begin\{tabular\}(.*)\\end\{tabular\}/gs,
                                "<br/><b>BẢNG BIẾN THIÊN Ở ĐÂY</b><br/>"
                            )),
                                (r = a.data.match(/(\${1})[^]*?[^\\]\1/gm)) &&
                                    r.forEach((t) => {
                                        (o = (o = t.replace(
                                            /\</g,
                                            "$& "
                                        )).replace(/\./g, "$& ")),
                                            (a.data = a.data.replace(t, o));
                                    });
                            var l = n.parent(".html--content");
                            if (
                                (l.parent().hasClass("content-question") &&
                                    a.data.match(/[A-D][\.\:]/g)) ||
                                a.data.match(/Câu\s\d{1,3}[\:\.]/gis)
                            ) {
                                var d = i.parseQuestion(a.data);
                                if (d.length) {
                                    var h = (l =
                                            l.parents(
                                                ".item-question"
                                            )).parents(".sectionQuiz"),
                                        c = "",
                                        u = l
                                            .find('[href="#point"] .html--edit')
                                            .val(),
                                        p = l.find(".level-question").val();
                                    d.forEach(function (t, e) {
                                        (t.point = u),
                                            (t.level = p),
                                            (c += i.itemquestion(t));
                                    }),
                                        $(c).insertAfter(l),
                                        l.remove(),
                                        i.refreshTitle(h);
                                } else {
                                    var g = n.prop("outerHTML"),
                                        m = a.data;
                                    n.replaceWith(m);

                                    (g = l
                                        .parent()
                                        .find(".html--edit")
                                        .text()
                                        .replace(g, m)),
                                        l.parent().find(".html--edit").html(g);
                                }
                            } else
                                (g = n.prop("outerHTML")),
                                    (m = "$" + a.data + "$");
                            let parent = n.parent();
                            let eTarget =
                                parent.prop("tagName") == "SUB" ? parent : n;
                            eTarget.replaceWith(m);

                            console.log(g, m);
                            let contentAfter = l
                                .parent()
                                .find(".html--content")
                                .html();
                            l.parent().find(".html--edit").html(contentAfter);
                            updateMathContent();
                            /*(g = l
                            .parent()
                            .find(".html--edit")
                            .text()
                            .replace(g, m)),
                        l.parent().find(".html--edit").html(g),
                            updateMathContent();*/
                        } else {
                            /*n.addClass("img-fluid"),
                        (g = n.attr("src")),
                        i.imageUploadAjax(g, (t) => {
                            if (t.success) {
                                n.attr("src", t.url);
                                var e = n
                                    .parent(".html--content")
                                    .parent()
                                    .find(".html--edit");
                                (g = e.html().replace(g, t.url)),
                                e.html(g);
                            }
                        });*/
                        }
                        i.auto2Text(t, e - 1, s);
                    });
                }
            };
        }
        isNeedConvertToLatex(base64) {
            return new Promise((resolve, reject) => {
                var i = new Image();
                i.onload = function () {
                    if (i.width >= 500) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                };
                i.src = base64;
            });
        }
        async auto2Text(t, e, s) {
            var i = this;
            if (((s = s || 1), e < 0))
                return (
                    i.showProcess("Đã CHUẨN HOÁ thành công!"),
                    // MathJax.typesetPromise(),
                    updateMathContent(),
                    void i.hideProcess()
                );
            var n = t.find("img").eq(e);
            i.showProcess(
                "Đang tiến hành phân tích ... " +
                    parseInt(100 - (100 * e) / s) +
                    "%"
            );
            if (n.attr("src").match(/base64\,/g)) {
                let needConvert = await i.isNeedConvertToLatex(n.attr("src"));
                if (!needConvert) {
                    i.auto2Text(t, e - 1, s);
                    return;
                }
            }
            n.attr("src").match(/base64\,/g) ||
            n.attr("src").indexOf("drive.google.com") > -1
                ? i.apiImage2Text(n.attr("src"), (a) => {
                      if (
                          a.hasOwnProperty("data") &&
                          a.data &&
                          !a.data.match(
                              /^\\begin\{tabular\}(.*)\\end\{tabular\}/gs
                          )
                      ) {
                          var r, o;
                          (a.data = a.data.replace(
                              /\\begin\{tabular\}(.*)\\end\{tabular\}/gs,
                              "<br/><b>BẢNG BIẾN THIÊN Ở ĐÂY</b><br/>"
                          )),
                              (r = a.data.match(/(\${1})[^]*?[^\\]\1/gm)) &&
                                  r.forEach((t) => {
                                      (o = (o = t.replace(
                                          /\</g,
                                          "$& "
                                      )).replace(/\./g, "$& ")),
                                          (a.data = a.data.replace(t, o));
                                  });
                          var l = n.parent(".html--content");
                          if (
                              (l.parent().hasClass("content-question") &&
                                  a.data.match(/[A-D][\.\:]/g)) ||
                              a.data.match(/Câu\s\d{1,3}[\:\.]/gis)
                          ) {
                              var d = i.parseQuestion(a.data);
                              if (d.length) {
                                  var h = (l =
                                          l.parents(".item-question")).parents(
                                          ".sectionQuiz"
                                      ),
                                      c = "",
                                      u = l
                                          .find('[href="#point"] .html--edit')
                                          .val(),
                                      p = l.find(".level-question").val();
                                  d.forEach(function (t, e) {
                                      (t.point = u),
                                          (t.level = p),
                                          (c += i.itemquestion(t));
                                  }),
                                      $(c).insertAfter(l),
                                      l.remove(),
                                      i.refreshTitle(h);
                              } else {
                                  var g = n.prop("outerHTML"),
                                      m = a.data;
                                  n.replaceWith(m);

                                  (g = l
                                      .parent()
                                      .find(".html--edit")
                                      .text()
                                      .replace(g, m)),
                                      l.parent().find(".html--edit").html(g);
                              }
                          } else {
                              (g = n.prop("outerHTML")),
                                  (m = "$" + a.data + "$");
                              let parent = n.parent();
                              let htmlContent = n.parents(".html--content");

                              let eTarget =
                                  parent.prop("tagName") == "SUB" ? parent : n;
                              eTarget.replaceWith(m);

                              let targetBigWrapper = htmlContent.parent();
                              let tmpHtmlContentWrapper =
                                  targetBigWrapper.find(".html--content");
                              let contentAfter = tmpHtmlContentWrapper.html();

                              contentAfter = contentAfter
                                  .replace(/(\S)\$/, "$1 $")
                                  .trim();
                              tmpHtmlContentWrapper.html(contentAfter);
                              let tbw = targetBigWrapper.find(".html--edit");
                              let isTextarea =
                                  tbw.prop("tagName") == "TEXTAREA";
                              isTextarea
                                  ? tbw.val(contentAfter)
                                  : tbw.html(contentAfter);
                              // updateMathContent();
                              /**
                                 *  (g = n.prop("outerHTML")),
                                      (m = "$" + a.data + "$"),
                                      n.replaceWith(m);
                                    console.log(g, m);
                                (g = l
                                  .parent()
                                  .find(".html--edit")
                                  .text()
                                  .replace(g, m)),
                                  l.parent().find(".html--edit").html(g),
                                  updateMathContent();
                                 */
                          }
                      } else {
                          /*n.addClass("img-fluid"),
                            (g = n.attr("src")),
                              i.imageUploadAjax(g, (t) => {
                                if (t.success) {
                                    n.attr("src", t.url);
                                    var e = n
                                        .parent(".html--content")
                                        .parent()
                                        .find(".html--edit");
                                    (g = e.html().replace(g, t.url)),
                                        e.html(g);
                                }
                            });*/
                      }

                      i.auto2Text(t, e - 1, s);
                  }) && i.hideProcess()
                : (n.addClass("img-fluid"), i.auto2Text(t, e - 1, s));
        }
        renderOption(t) {
            var e =
                t.text || '<b class="text-danger">Vui lòng nhập nội dung</b>';
            return (
                '<div class="d-flex" > <div class="userchoice center" data-value="' +
                t.key +
                '">' +
                t.key +
                '</div> <div class="df aic" ><textarea class="form-control html--edit" style="display:none">' +
                e +
                '</textarea><div class="html--content">' +
                e +
                "</div></div> </div>"
            );
        }
        refreshQuizs() {
            var t, e;
            $(".sectionQuizs").each(function (s, i) {
                (t = 0),
                    (e = 0),
                    $(i)
                        .find('.item-question [href="#point"] .html--edit')
                        .each(function (s, i) {
                            (t += parseFloat($(i).val())), e++;
                        }),
                    $(i).find('[href="#points"] .html--edit').val(t.toFixed(2)),
                    $(i)
                        .find('[href="#points"] .html--content')
                        .text(t.toFixed(2)),
                    $(i)
                        .find('[href="#numbers"]')
                        .text(e + " câu");
            });
        }
        refreshTitle(t) {
            t.find(".item-question h5.card-title").each(function (t, e) {
                $(e).text("CÂU " + (t + 1) + ".");
            });
        }
        refreshOptions(t) {
            t.attr("data-id");
            var e,
                s = [];
            t.find(".options-question .d-flex").each(function (t, i) {
                (e = String.fromCharCode(65 + t)),
                    $(i).find(".center").text(e),
                    $(i).find(".center").attr("data-value", e);
                const option = {
                    key: e,
                    text: $(i).find(".html--edit").html(),
                };
                if (document.querySelector("#quiz_id")) {
                    option["answer_id"] = $(t)
                        .find(".html--edit")
                        .attr("data-old-id");
                }
                s.push(option);
            });
        }
        parseQuestion(t = "") {
            var s,
                i,
                n,
                a,
                r = this,
                o = t.match(/Câu\s\d{1,3}[\:\.]/gis),
                l = [],
                d = [];
            if ((!o && t.match(/[A-D][\.\:]/gm) && (o = [t]), o)) {
                for (var h = o.length - 1; h >= 0; h--) {
                    n = [];
                    var c = (i = t.substr(t.indexOf(o[h]), t.length)).match(
                        /[A-D][\.\:]/gm
                    );
                    if (c) {
                        for (var u = c.length - 1; u >= 0; u--)
                            n.push(
                                i.substr(
                                    i.indexOf(c[u]) + "A.".length,
                                    i.length
                                )
                            ),
                                (i = i.substr(0, i.indexOf(c[u])));
                        l.push({
                            content: i
                                .replace(/Câu\s\d{1,3}[\:\.]/gis, "")
                                .trim(),
                            data: n,
                        }),
                            (t = t.substr(0, t.indexOf(o[h])));
                    }
                }
                l.slice()
                    .reverse()
                    .forEach(function (t) {
                        e++;
                        var i = [];
                        t.data
                            .slice()
                            .reverse()
                            .forEach(function (t, e) {
                                i.push({
                                    key: String.fromCharCode(65 + e),
                                    text:
                                        t.trim() ||
                                        '<b class="text-danger">Vui lòng nhập nội dung</b>',
                                });
                            }),
                            (s = r.parseExplains(i)),
                            (a = {
                                title: "CÂU ",
                                content:
                                    t.content ||
                                    '<b class="text-danger">Vui lòng nhập nội dung</b>',
                                answer: {
                                    type: 2,
                                    answer: s.answers,
                                },
                                point: "0.00",
                                explain: s.explain || "",
                                question_id: e,
                                level: 0,
                                keys: s.keys || "",
                            }),
                            d.push(a);
                    });
            }
            return d;
        }
        parseExplains(t) {
            var e,
                s = "",
                i = "";
            return (
                t.forEach(function (i, n) {
                    (e = i.text.match(/LỜI GIẢI/gi)) &&
                        ((s = i.text.split(e[0])[1].trim()),
                        (i.text = i.text.split(e[0])[0].trim())),
                        i.text.trim() || delete t[n];
                }),
                (e = s.match(/CHỌN\s([A-D])\./gi)) &&
                    ((i = /CHỌN\s([A-D])\./gi.exec(e[0])[1]),
                    (s = (s = s.replace(e[0], "")).replace("<br/>", ""))),
                {
                    answers: t,
                    explain: s,
                    keys: i,
                }
            );
        }
        createID(t) {
            for (
                var e = "T",
                    s =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    i = s.length,
                    n = 0;
                n < t;
                n++
            )
                e += s.charAt(Math.floor(Math.random() * i));
            return e;
        }
        renderItemQuiz() {
            var t = this.createID(5);
            return (
                '\n\t\t\t<div class="card sectionQuizs">\n\t\t\t\t<div class="card-header">\n\t\t\t\t\t<h4  class="card-title">ĐỀ SỐ 1</h4>\n\t\t\t\t\t<strong class="noti-drop d-none d-sm-block text-warning uploadFile" >KÉO &amp; THẢ PDF DOCX VÀO ĐÂY</strong>\n\t\t\t\t\t<div class="heading-elements flex gap-2">\n\t\t\t\t\t\t<ul class="list-inline mb-0">\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a type="button" class="btn btn-icon btn-success uploadFile">\n\t\t\t\t\t\t\t\t\t\t  ' +
                feather.icons.upload.toSvg() +
                `\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a class="btn bg-light-primary waves-effect waves-float waves-light" href="#numbers" >0 câu</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a class="btn bg-light-success  waves-effect waves-float waves-light" href="#points" >\n\t\t\t\t\t\t\t\t\t<input type="text" class="form-control html--edit" style="display:none" value="0.00">\n\t\t\t\t\t\t\t\t\t<span class="html--content">0.00</span> <span>điểm</span>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a data-toggle="collapse" href="#${t}" role="button" aria-expanded="true" aria-controls="${t}">` +
                feather.icons["chevron-down"].toSvg() +
                `</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="card-content collapse show" id="${t}">\n\t\t\t\t\t<div class="card-body sectionQuiz"> </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t`
            );
        }
        refreshTitleQuiz() {
            $("#app .sectionQuizs").each((t, e) => {
                $(e)
                    .find(".card-header .card-title")
                    .eq(0)
                    .text("ĐỀ SỐ " + (t + 1));
            });
        }
        giaimaID(t) {
            t = t.toString();
            for (var e = "", s = 0; s < t.length; s++)
                e += (t.charCodeAt(s) - 65).toString();
            return e;
        }
        mahoaID(t) {
            t = t.toString();
            for (var e = "", s = 0; s < t.length; s++)
                e += String.fromCharCode(parseInt(t[s]) + 65);
            return e;
        }
        apiImage2Text(t, e) {
            var s = this;
            // Tesseract.recognize(t, "vie").then(({ data: { text } }) => {
            //     e({ data: text });
            // });
            $.ajax({
                url: "/manage-question/api-latex",
                method: "POST",
                data: {
                    base64: t,
                },
                error: (t) => {
                    s.hideProcess(),
                        s.showError("Vui lòng kiểm tra lại kết nối mạng");
                },
                success: e,
            });
        }
        b64toBlob(t, e = "image/png", s = 512) {
            const i = atob(t),
                n = [];
            for (let t = 0; t < i.length; t += s) {
                const e = i.slice(t, t + s),
                    a = new Array(e.length);
                for (let t = 0; t < e.length; t++) a[t] = e.charCodeAt(t);
                const r = new Uint8Array(a);
                n.push(r);
            }
            const a = new Blob(n, {
                type: e,
            });
            return URL.createObjectURL(a);
        }
        itemquestion(t, e = null) {
            var s,
                i = "",
                n = "";
            if (
                (1 === t.answer.type &&
                    t.answer.answer.forEach(function (e, s) {
                        t.answer.answer[s] = {
                            key: String.fromCharCode(65 + s),
                            text: "Đáp án " + String.fromCharCode(65 + s),
                        };
                    }),
                (i = '<div class="options-question d-flex flex-column" >'),
                e)
            ) {
                var a,
                    r = e.answer ? e.sort[e.answer.charCodeAt() - 65] : "";
                r === t.keys || (t.point = "0.00"),
                    e.sort.split("").forEach((e, s) => {
                        var n = t.answer.answer[
                            e.charCodeAt() - 65
                        ].text.replace(/\s(\<(|\/)sub>)/gi, "$1");
                        (a = t.answer.answer[e.charCodeAt() - 65].key),
                            (i +=
                                '<div class="d-flex  ' +
                                ("" == r
                                    ? "unselect"
                                    : a == t.keys
                                    ? "right"
                                    : r == a
                                    ? "error"
                                    : "") +
                                '" > <div class="userchoice center" >' +
                                String.fromCharCode(65 + s) +
                                "(" +
                                a +
                                ')</div> <div class="df aic" style=" background: transparent; ">' +
                                (n ||
                                    '<b class="text-danger">Vui lòng nhập nội dung</b>') +
                                "</div> </div>");
                    });
            } else
                t.answer.answer.forEach(function (e, s) {
                    var n = e.text.replace(/\s(\<(|\/)sub>)/gi, "$1");
                    i +=
                        '<div class="d-flex" > <div class="userchoice center ' +
                        (t.keys === String.fromCharCode(65 + s) && "done") +
                        '" data-value="' +
                        String.fromCharCode(65 + s) +
                        '">' +
                        String.fromCharCode(65 + s) +
                        '</div> <div class="df aic" ><textarea class="form-control html--edit" style="display:none">' +
                        (n ||
                            '<b class="text-danger">Vui lòng nhập nội dung</b>') +
                        '</textarea><div class="html--content">' +
                        (n ||
                            '<b class="text-danger">Vui lòng nhập nội dung</b>') +
                        "</div></div> </div>";
                });
            return (
                (i += "</div>"),
                t.content.match(/\[\w{1,5}\-\d{1,3}\.\d{1,3}\-(\d{1})\]/g)
                    ? ((s = /\[\w{1,5}\-\d{1,3}\.\d{1,3}\-(\d{1})\]/g.exec(
                          t.content
                      )),
                      parseInt(s[1])
                          ? (t.level = parseInt(s[1]) - 1 || 0)
                          : (t.level = 0),
                      (t.content = t.content.replace(s[0], "")))
                    : (t.level = t.level || 0),
                (t.content = t.content.replace(/\s(\<(|\/)sub>)/gi, "$1")),
                (t.content = t.content.trim()),
                (t.content = t.content.replace(/^<(\/|)br(\/|)>/gi, "")),
                (t.content = t.content.replace(/<(\/|)br(\/|)>$/gi, "")),
                (n = `<div class="d-none hidden gap-2"><button class="upload-audio-question rounded-lg !bg-[#E43024] px-[10px] py-1 !text-white outline-none">Tải Audio</button><button class="upload-video-question rounded-lg !bg-[#0A6ECA] px-[10px] py-1 !text-white outline-none">Tải Video</button> <button class="upload-file-question rounded-lg !bg-[#FCD13B] px-[10px] py-1 !text-white outline-none">Tải Ảnh</button><select class="form-control-sm level-question" >`),
                ["Nhận biết", "Thông hiểu", "Vận dụng", "Vận dụng cao"].forEach(
                    function (e, s) {
                        n +=
                            '<option value="' +
                            (Number(s) + 1) +
                            '" ' +
                            (Number(s) + 1 == t.level ? "selected" : "") +
                            ">" +
                            e +
                            "</option>";
                    }
                ),
                (n += "</select></div>"),
                `\n\t\t\t\x3c!-- ${t.title} --\x3e\n\t\t\t\t<div class="card item-question" data-id="${t.question_id}">\n\t\t\t\t\t<div class="card-header">\n\t\t\t\t\t\t<h5 class="card-title">${t.title}  </h5> \n\t\t\t\t\t\t<div class="heading-elements flex gap-2">\t\t\n\t\t\t\t\t\t\t` +
                    (e ? "" : n) +
                    `\n\t\t\t\t\t\t\t<a class="btn point " href="#point" >\n\t\t\t\t\t\t\t\t<input type="text" class="form-control html--edit" style="display:none" value="10">\n\t\t\t\t\t\t\t\t<span class="html--content">10</span>\t<span>điểm</span>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\x3c!--<a class="btn bg-danger ml-1" href="#delete">XOÁ</a>--\x3e\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="card-body">\t\t\t\n\t\t\t\t\t\t<div class="content-question mt-1 mb-1 " >\n\t\t\t\t\t\t\t<textarea class="form-control html--edit" style="display:none">` +
                    (t.content ||
                        '<b class="text-danger">Vui lòng nhập nội dung</b>') +
                    '</textarea>\n\t\t\t\t\t\t\t<div class="html--content">' +
                    (t.content ||
                        '<b class="text-danger">Vui lòng nhập nội dung</b>') +
                    `</div>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t${i}\n\t\t\t\t\t\t` +
                    (e
                        ? ""
                        : '\n\t\t\t\t\t\t<div class="divider">\n\t\t\t\t\t\t\t<div class="divider-text">HƯỚNG DẪN GIẢI</div>\n\t\t\t\t\t\t</div>\t\t\t\t\n\t\t\t\t\t\t<div class="alert alert-primary explain-question" role="alert">\n\t\t\t\t\t\t\t<div class="alert-body" >\n\t\t\t\t\t\t\t\t<textarea class="form-control html--edit" style="display:none">' +
                          (t.explain ||
                              '<h5 class="text-center text-danger">Chưa có lời giải</h5>') +
                          '</textarea>\n\t\t\t\t\t\t\t\t<div class="html--content">' +
                          (t.explain ||
                              '<h5 class="text-center  text-danger">Chưa có lời giải</h5>') +
                          "</div>\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t") +
                    "\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"
            );
        }
    })();
    class a {
        constructor(t, e, s, i, n, a, r, o) {
            (this.activeRoute = t),
                (this.router = e),
                (this.commonService = s),
                (this.localize = i),
                (this.localizeService = n),
                (this.apiService = a),
                (this.route = r),
                (this.renderer = o),
                (this.categoriesIdParram = 1),
                (this.version = "v1.8"),
                (this.cur_cateId = 0),
                (this.DEFAULT_WIDTH = 1080),
                (this.DEFAULT_HEIGHT = 1500),
                (this.nameExamInp = "Nhập tên đề thi vào đây"),
                (this.questionCropObjs = []),
                (this.keywordStartQuestion = "CÂU"),
                (this.keywordEndExam = [
                    "HẾT",
                    "ĐÁPÁN",
                    "HƯỚNGDẪN",
                    "GIẢITHÍCH",
                    "Hết",
                    "LỜIGIẢI",
                    "ĐápÁn",
                    "Đápán",
                    "BẢNGĐÁPÁN",
                    "MATRẬN",
                    "Matrận",
                    "ÁPÁN",
                ]),
                (this.keywordAnswers = ["A.", "B.", "C.", "D."]),
                (this.arrQuestions = []),
                (this.arrResult = []),
                (this.processPhase = 0),
                (this.stringAnswer = ""),
                (this.questionSelect = []),
                (this.urlPdfLoaded = ""),
                (this.percentLeft = 0.6),
                (this.defaultShowResultMedia = !1),
                (this.pageInfo = []),
                (this.arrStatusFileExam = []),
                (this.isShowLoadingFileExam = !1),
                (this.documentPDF = null),
                (this.questionDataSaveObjs = []),
                (this.isChangeQuestionPoint = !1),
                (this.topEndExamInfo = []);
        }
        loadFileExam(t) {
            this.urlPdfLoaded = t;
            var e = this;
            jQuery("#box-left-file-drop").css("display", "none"),
                (this.arrStatusFileExam = ["Đang tải lên tệp tin"]),
                this.updateIndexStatusFileExam(0, "Tải lên tệp tin thành công"),
                (this.isShowLoadingFileExam = !0),
                PDFJS.getDocument({
                    url: t,
                })
                    .then(function (t) {
                        var s;
                        e.documentPDF = t;
                        for (let t = 1; t <= e.documentPDF.numPages; t++) {
                            var i = t,
                                n = document.createElement("div"),
                                a = document.createElement("canvas"),
                                r = document.createElement("div");
                            (n.className = "page"),
                                n.appendChild(a),
                                n.appendChild(r),
                                (r.id = "text_layer_page" + i),
                                (r.className = "text-layer"),
                                (a.id = "canvas_layer_page" + i),
                                (n.id = "page_" + i),
                                null ===
                                    (s =
                                        document.getElementById(
                                            "box-left-file-pdf"
                                        )) ||
                                    void 0 === s ||
                                    s.appendChild(n),
                                (a.height = e.DEFAULT_HEIGHT),
                                (a.width = e.DEFAULT_WIDTH),
                                (n.style.width = e.DEFAULT_WIDTH + "px"),
                                (n.style.height = e.DEFAULT_HEIGHT + "px");
                        }
                        e.renderPage(1);
                    })
                    .then((res) => {});
            // this.eventAddQuestion();
        }
        // eventAddQuestion = () => {
        //     window.addEventListener("quiz.add.question", (e) => {
        //         var n = {
        //             metadata: {
        //                 ResultMediaIndex: false,
        //                 isRealQuestion: true,
        //                 text: "",
        //             },
        //             questionText: "",
        //             name: "",
        //             typeNumber: 1,
        //             point: 1,
        //             answerResult: [],
        //             categoryId: 0,
        //             answerConfig: {
        //                 type: 1,
        //                 count: 4,
        //                 answer: [
        //                     {
        //                         key: "A",
        //                         text: "Đáp án A",
        //                     },
        //                     {
        //                         key: "B",
        //                         text: "Đáp án B",
        //                     },
        //                     {
        //                         key: "C",
        //                         text: "Đáp án C",
        //                     },
        //                     {
        //                         key: "D",
        //                         text: "Đáp án D",
        //                     },
        //                 ],
        //             },
        //             questionMedia: "",
        //             answerMedia: "",
        //             numberQuestion: this.arrQuestions.length,
        //             showResultMedia: false,
        //             isSelect: true,
        //             image: "",
        //             blockInfo: {
        //                 info: [
        //                     {
        //                         start: 59,
        //                         end: 180,
        //                         height: 121,
        //                         left: 78,
        //                         width: 1080,
        //                         pageNumber: 5,
        //                         root:
        //                             "box_canvas_question_index_" +
        //                             this.arrQuestions.length -
        //                             1,
        //                     },
        //                 ],
        //                 isQuestion: true,
        //                 text: "",
        //                 numberQuestion: this.arrQuestions.length,
        //                 topAnswer: 157,
        //                 isRender: true,
        //                 indexQuestion: this.arrQuestions.length - 1,
        //             },
        //             canvas_id:
        //                 "box_canvas_question_index_" +
        //                 this.arrQuestions.length -
        //                 1,
        //         };
        //         this.arrQuestions.push({
        //             info: [
        //                 {
        //                     start: 203,
        //                     end: 587,
        //                     height: 384,
        //                     left: 78,
        //                     width: 1080,
        //                     pageNumber: 1,
        //                 },
        //             ],
        //             isQuestion: true,
        //             text: "",
        //             numberQuestion: 1,
        //             topAnswer: 547,
        //             isRender: true,
        //         });
        //         this.questionCropObjs.push(n);
        //         this.renderQuestion();
        //     });
        // };
        renderPage(t) {
            var e = this;
            e.documentPDF.getPage(t).then(function (s) {
                var i = document.getElementById("page_" + t),
                    n = e.DEFAULT_WIDTH / s.getViewport(1).width,
                    a = s.getViewport(n),
                    r = document.getElementById("canvas_layer_page" + t),
                    o = r.getContext("2d");
                (r.height = a.height),
                    (r.width = a.width),
                    (i.style.width = a.width + "px"),
                    (i.style.height = a.height + "px"),
                    s
                        .render({
                            canvasContext: o,
                            viewport: a,
                        })
                        .promise.then(function () {
                            s.getTextContent().then(function (s) {
                                jQuery("#text_layer_page" + t).html(""),
                                    jQuery("#text_layer_page" + t).css({
                                        height:
                                            jQuery(
                                                "#canvas_layer_page" + t
                                            ).height() + "px",
                                        width:
                                            jQuery(
                                                "#canvas_layer_page" + t
                                            ).width() + "px",
                                    });
                                var i = [];
                                if (
                                    (PDFJS.renderTextLayer({
                                        textContent: s,
                                        container: jQuery(
                                            "#text_layer_page" + t
                                        ).get(0),
                                        viewport: a,
                                        textDivs: i,
                                    }),
                                    e.processPage(t, i),
                                    t < e.documentPDF.numPages)
                                )
                                    e.renderPage(t + 1);
                                else {
                                    var n = document.getElementById(
                                        "canvas_layer_page" + t
                                    );
                                    if (0 === e.processPhase) {
                                        if (e.arrQuestions.length > 0) {
                                            var r = e.arrQuestions.filter(
                                                    (t) =>
                                                        !t.hasOwnProperty(
                                                            "isRender"
                                                        )
                                                ),
                                                o =
                                                    e.arrQuestions.length -
                                                    r.length;
                                            for (let s = 0; s < r.length; s++) {
                                                var l = r[s],
                                                    d = 0;
                                                (d =
                                                    o <
                                                    e.arrQuestions.length - 1
                                                        ? e.arrQuestions[o + 1]
                                                              .info[0].start
                                                        : (d = parseInt(
                                                              n.getAttribute(
                                                                  "footer-top"
                                                              )
                                                          )) || n.height),
                                                    e.updateQuestion(d, t, o),
                                                    e.renderQuestionFromBlock(
                                                        l
                                                    ),
                                                    o++;
                                            }
                                        }
                                    } else if (1 === e.processPhase) {
                                        var h = e.parseDapAnStr(e.stringAnswer);
                                        e.bindAnswers(h);
                                    } else
                                        e.arrResult.length > 0 &&
                                            (e.updateLastResult(n.height, t),
                                            e.renderQuestionFromBlock(
                                                e.arrResult[
                                                    e.arrResult.length - 1
                                                ]
                                            ));
                                }
                                if (2 === t || 1 === e.documentPDF.numPages) {
                                    var c = 0;
                                    for (let t = 0; t <= 100; t += 5)
                                        setTimeout(() => {
                                            e.updateIndexStatusFileExam(
                                                0,
                                                "Đang phân tích tệp tin ... " +
                                                    t +
                                                    " %"
                                            ),
                                                100 === t &&
                                                    (setTimeout(() => {
                                                        e.updateIndexStatusFileExam(
                                                            0,
                                                            "Hoàn thành phân tích."
                                                        ),
                                                            e.hideProcess();
                                                    }, 300),
                                                    setTimeout(() => {
                                                        (e.arrStatusFileExam =
                                                            []),
                                                            (e.isShowLoadingFileExam =
                                                                !1);
                                                    }, 700));
                                        }, (c += 100));
                                }
                            });
                        });
            });
        }
        processPage(t, e) {
            this.parseTextLayer(t, e);
        }
        parseDapAnStr(t) {
            if ("" != t.trim() && 0 != this.arrQuestions.length) {
                for (
                    var e = this.arrQuestions[0].numberQuestion,
                        s =
                            this.arrQuestions[this.arrQuestions.length - 1]
                                .numberQuestion,
                        i = [],
                        n = e;
                    n <= s;
                    n++
                )
                    i[n] = "";
                var a = t.split(" "),
                    r = [],
                    o = [],
                    l = 0;
                for (let t = 0; t < a.length; t++)
                    if (isNaN(parseInt(a[t])))
                        0 == l && (o = []),
                            (l = 1),
                            o.length < r.length &&
                                ((a[t] = a[t].trim()),
                                (c = a[t].substr(a[t].length - 1)),
                                a[t].length <= 2 &&
                                    ("A" == c ||
                                        "B" == c ||
                                        "C" == c ||
                                        "D" == c) &&
                                    o.push(c));
                    else {
                        if (1 == l) {
                            for (var d = -1, h = o.length - 1; h >= 0; h--)
                                r.length > 0
                                    ? "" == i[(d = r.pop())] && (i[d] = o[h])
                                    : (i[d] = o[h]);
                            o = [];
                        }
                        l = 0;
                        var c,
                            u = parseInt(a[t]);
                        if (u >= e && u <= s)
                            if (
                                "A" == (c = a[t].substr(a[t].length - 1)) ||
                                "B" == c ||
                                "C" == c ||
                                "D" == c
                            ) {
                                if ("" == i[u]) {
                                    if (u == e)
                                        for (h = 0; h < i.length; h++)
                                            i[h] = "";
                                    i[u] = c;
                                }
                            } else {
                                if (u == e)
                                    for (h = 0; h < i.length; h++) i[h] = "";
                                0 == r.length
                                    ? r.push(u)
                                    : u == e
                                    ? (r = [u])
                                    : r[r.length - 1] + 1 == u
                                    ? r.push(u)
                                    : 1 == r.length && (r[0] = u);
                            }
                    }
                for (d = -1, h = o.length - 1; h >= 0; h--)
                    r.length > 0
                        ? "" == i[(d = r.pop())] && (i[d] = o[h])
                        : (i[d] = o[h]);
                for (o = [], r = [], n = e; n <= s; n++);
                return i;
            }
        }
        parseTextLayer(t, e) {
            var s,
                i = document.getElementById("canvas_layer_page" + t),
                n = i.height,
                a = !1;
            for (let w = 0; w < e.length; w++)
                if (0 === this.processPhase) {
                    var r = (c = this.isStartQuestion(w, e)) > 0,
                        o = null;
                    if (
                        (this.arrQuestions.length > 0 &&
                            r &&
                            (o =
                                this.arrQuestions[this.arrQuestions.length - 1])
                                .numberQuestion > c &&
                            (r = !1),
                        r)
                    ) {
                        var l = {
                            info: [
                                {
                                    start: Math.floor(parseInt(e[w].style.top)),
                                    end: n,
                                    height:
                                        n -
                                        Math.floor(parseInt(e[w].style.top)),
                                    left: Math.floor(parseInt(e[w].style.left)),
                                    width: i.width,
                                    pageNumber: t,
                                },
                            ],
                            isQuestion: !0,
                            text: e[w].innerText,
                            numberQuestion: c,
                            topAnswer: Math.floor(parseInt(e[w].style.top)),
                        };
                        null !== o &&
                            this.arrQuestions.length > 1 &&
                            (this.updateQuestion(
                                Math.floor(parseInt(e[w].style.top)),
                                t,
                                this.arrQuestions.length - 2
                            ),
                            this.renderQuestionFromBlock(
                                this.arrQuestions[this.arrQuestions.length - 2]
                            ));
                        this.arrQuestions.push(l);
                    } else if (!0 === this.isEndExam(w, e, t))
                        (this.topEndExamInfo = {
                            pageNumber: t,
                            top: Math.floor(parseInt(e[w].style.top)),
                        }),
                            this.arrQuestions.length > 1 &&
                                (this.updateQuestion(
                                    Math.floor(parseInt(e[w].style.top)),
                                    t,
                                    this.arrQuestions.length - 2
                                ),
                                this.renderQuestionFromBlock(
                                    this.arrQuestions[
                                        this.arrQuestions.length - 2
                                    ]
                                )),
                            this.arrQuestions.length > 0 &&
                                ((o =
                                    this.arrQuestions[
                                        this.arrQuestions.length - 1
                                    ]),
                                this.updateLastQuestion(
                                    Math.floor(parseInt(e[w].style.top)) - 5,
                                    t
                                ),
                                this.renderQuestionFromBlock(o)),
                            (this.processPhase = 1);
                    else {
                        if (
                            this.arrQuestions.length > 0 &&
                            parseInt(e[w].style.fontSize) < 70
                        ) {
                            var d = (o =
                                this.arrQuestions[this.arrQuestions.length - 1])
                                .info[0];
                            if (d.pageNumber === t) {
                                var h = Math.floor(parseInt(e[w].style.top));
                                h < d.start &&
                                    h > d.start - 30 &&
                                    (d.start = h);
                            }
                            o.text += e[w].innerText;
                        }
                        !1 === a &&
                            ((v = Math.floor(parseInt(e[w].style.top))) <
                                i.height / 2 &&
                                ((a = !0),
                                i.setAttribute("footer-top", (n -= 2))),
                            !1 === a && (n = n > v ? v : n)),
                            this.isAnswersQuestion(w, e) &&
                                this.arrQuestions.length > 0 &&
                                ((o =
                                    this.arrQuestions[
                                        this.arrQuestions.length - 1
                                    ]).topAnswer = Math.floor(
                                    parseInt(e[w].style.top)
                                ));
                    }
                } else if (1 === this.processPhase) {
                    var c = this.isStartQuestion(w, e);
                    if (this.arrQuestions.length > 0) {
                        var u = this.arrQuestions[0].info[0].left,
                            p = !0;
                        if (
                            (c < this.arrQuestions[0].numberQuestion &&
                                (p = !1),
                            c >
                                this.arrQuestions[this.arrQuestions.length - 1]
                                    .numberQuestion && (p = !1),
                            Math.abs(
                                Math.floor(parseInt(e[w].style.left)) - u
                            ) > 30 && (p = !1),
                            p)
                        ) {
                            var g = this.parseDapAnStr(this.stringAnswer);
                            this.bindAnswers(g);
                            var m = {
                                info: [
                                    {
                                        start: Math.floor(
                                            parseInt(e[w].style.top)
                                        ),
                                        end: i.height,
                                        height:
                                            i.height -
                                            Math.floor(
                                                parseInt(e[w].style.top)
                                            ),
                                        left: Math.floor(
                                            parseInt(e[w].style.left)
                                        ),
                                        width: i.width,
                                        pageNumber: t,
                                    },
                                ],
                                isQuestion: !1,
                                numberQuestion: c,
                            };
                            this.arrResult.push(m), (this.processPhase = 2);
                        } else {
                            if (
                                !isNaN(parseInt(e[w].innerText)) &&
                                w > 0 &&
                                !isNaN(parseInt(e[w - 1].innerText)) &&
                                !isNaN(parseInt(e[w].style.fontSize))
                            ) {
                                var f = parseInt(e[w].style.fontSize);
                                parseInt(e[w].style.left) -
                                    parseInt(e[w - 1].style.left) <
                                    f &&
                                    (this.stringAnswer =
                                        this.stringAnswer.substring(
                                            0,
                                            this.stringAnswer.length - 1
                                        ));
                            }
                            this.topEndExamInfo.pageNumber <= t &&
                                this.topEndExamInfo.top <=
                                    Math.floor(parseInt(e[w].style.top)) &&
                                (this.stringAnswer += e[w].innerText + " ");
                        }
                    }
                } else if (2 === this.processPhase) {
                    var v,
                        b = this.isStartQuestion(w, e),
                        x = ((r = b > 0), null);
                    this.arrResult.length > 0 &&
                        r &&
                        (x = this.arrResult[this.arrResult.length - 1])
                            .numberQuestion +
                            1 !=
                            b &&
                        (r = !1),
                        !0 === r &&
                            ((l = {
                                info: [
                                    {
                                        start: (v = this.correctTopImage(
                                            Math.floor(
                                                parseInt(e[w].style.top)
                                            ),
                                            i,
                                            Math.floor(
                                                parseInt(e[w].style.top)
                                            ) - 150
                                        )),
                                        end: i.height,
                                        height: i.height - v,
                                        left: Math.floor(
                                            parseInt(e[w].style.left)
                                        ),
                                        width: i.width,
                                        pageNumber: t,
                                    },
                                ],
                                isQuestion: !1,
                                numberQuestion: b,
                            }),
                            this.updateLastResult(v, t),
                            this.renderQuestionFromBlock(x),
                            this.arrResult.push(l),
                            null === (s = this.resultFileBoxComponent) ||
                                void 0 === s ||
                                s.pastePdfExam(t));
                }
        }
        checkWhiteLine(t, e) {
            var s = t.getContext("2d"),
                i = t.width,
                n = s.getImageData(0, 0, i, t.height);
            for (let t = 0; t < i; t++) {
                var a = 4 * (e * i + t);
                if (
                    n.data[a] < 180 &&
                    n.data[a + 1] < 180 &&
                    n.data[a + 2] < 180
                )
                    return !1;
            }
            return !0;
        }
        cropWhiteTop(t, e, s) {
            var i = document.createElement("canvas");
            (i.width = Math.floor(t.width / 2)),
                (i.height = Math.floor(t.height / 2));
            var n = i.getContext("2d");
            null == n ||
                n.drawImage(
                    t,
                    0,
                    0,
                    t.width,
                    t.height,
                    0,
                    0,
                    i.width,
                    i.height
                );
            for (let t = Math.floor(e / 2); t <= Math.floor(s / 2); t++)
                if (!this.checkWhiteLine(i, t)) return 2 * t;
            return e;
        }
        cropWhiteBottom(t, e, s) {
            var i = document.createElement("canvas");
            (i.width = Math.floor(t.width / 2)),
                (i.height = Math.floor(t.height / 2));
            var n = i.getContext("2d");
            null == n ||
                n.drawImage(
                    t,
                    0,
                    0,
                    t.width,
                    t.height,
                    0,
                    0,
                    i.width,
                    i.height
                );
            for (let t = Math.floor(s / 2); t >= Math.floor(e / 2); t--)
                if (!this.checkWhiteLine(i, t)) return 2 * t;
            return s;
        }
        updateQuestion(t, e, s) {
            if (
                0 !== this.arrQuestions.length &&
                !(s < 0 || s >= this.arrQuestions.length)
            )
                if (s === this.arrQuestions.length - 1)
                    this.updateLastQuestion(t, e);
                else {
                    var i = this.arrQuestions[s],
                        n = i.info[i.info.length - 1],
                        a = this.arrQuestions[s + 1].info[0],
                        r = document.getElementById(
                            "canvas_layer_page" + a.pageNumber
                        ),
                        o = document.getElementById(
                            "canvas_layer_page" + n.pageNumber
                        );
                    if (n.pageNumber === a.pageNumber)
                        (n.end = a.start), (n.height = n.end - n.start);
                    else {
                        var l = this.cropWhiteBottom(o, n.start, n.end);
                        (n.end = l + 5),
                            (n.height = n.end - n.start),
                            (a.start = this.correctTopImage(
                                a.start,
                                r,
                                i.topAnswer < a.start ? i.topAnswer : 0
                            ));
                        for (let t = n.pageNumber + 1; t < a.pageNumber; t++) {
                            var d = document.getElementById(
                                    "canvas_layer_page" + t
                                ),
                                h = parseInt(d.getAttribute("footer-top"));
                            (l = this.cropWhiteBottom(
                                d,
                                0,
                                (h = h || d.height)
                            )),
                                i.info.push({
                                    start: 0,
                                    end: l,
                                    height: l,
                                    width: d.width,
                                    pageNumber: t,
                                });
                        }
                        var c = this.cropWhiteTop(r, 0, a.start);
                        c > 0 &&
                            i.info.push({
                                start: c,
                                end: a.start,
                                height: a.start - c,
                                width: r.width,
                                pageNumber: a.pageNumber,
                            });
                    }
                }
        }
        updateLastQuestion(t, e) {
            if (0 !== this.arrQuestions.length) {
                var s = document.getElementById("canvas_layer_page" + e),
                    i = this.arrQuestions[this.arrQuestions.length - 1],
                    n = i.info[i.info.length - 1],
                    a = document.getElementById(
                        "canvas_layer_page" + n.pageNumber
                    );
                if (n.pageNumber === e) {
                    var r = this.cropWhiteBottom(s, n.start, t);
                    (n.end = r + 5), (n.height = n.end - n.start);
                } else {
                    (r = this.cropWhiteBottom(a, n.start, n.end)),
                        (n.end = r + 5),
                        (n.height = n.end - n.start);
                    for (let t = n.pageNumber + 1; t < e; t++) {
                        var o = document.getElementById(
                                "canvas_layer_page" + t
                            ),
                            l = parseInt(o.getAttribute("footer-top"));
                        (r = this.cropWhiteBottom(o, 0, (l = l || o.height))),
                            i.info.push({
                                start: 0,
                                end: r,
                                height: r,
                                width: o.width,
                                pageNumber: t,
                            });
                    }
                    var d = this.cropWhiteTop(s, 0, t);
                    i.info.push({
                        start: d,
                        end: t,
                        height: t - d,
                        width: s.width,
                        pageNumber: e,
                    });
                }
            }
        }
        updateLastResult(t, e) {
            var s = this.arrResult[this.arrResult.length - 1],
                i = document.getElementById("canvas_layer_page" + e),
                n = s.info[s.info.length - 1];
            if (n.pageNumber === e) (n.end = t), (n.height = n.end - n.start);
            else {
                for (let t = n.pageNumber + 1; t < e; t++) {
                    var a = document.getElementById("canvas_layer_page" + t);
                    s.info.push({
                        start: 0,
                        end: a.height,
                        height: a.height,
                        width: a.width,
                        pageNumber: t,
                    });
                }
                s.info.push({
                    start: 0,
                    end: t,
                    height: t,
                    width: i.width,
                    pageNumber: e,
                });
            }
        }
        bindAnswers(t) {
            if (this.arrQuestions.length > 0 && t) {
                var e =
                    this.arrQuestions[this.arrQuestions.length - 1]
                        .numberQuestion;
                for (let i = this.arrQuestions[0].numberQuestion; i <= e; i++)
                    if (t[i] && "" != t[i]) {
                        var s = this.questionCropObjs.findIndex(
                            (t) => t.numberQuestion === i
                        );
                        this.questionCropObjs[s] &&
                            (this.questionCropObjs[s].answerResult = [t[i]]);
                    }
            }
        }
        isAnswersQuestion(t, e) {
            var s = e[t].innerText,
                i = t + 1;
            if ("" !== s)
                for (let t = 0; t < this.keywordAnswers.length; t++) {
                    for (
                        ;
                        s.length < this.keywordAnswers[t].length &&
                        i < e.length;

                    )
                        (s += e[i].innerText), i++;
                    if ((s = s.trim()).indexOf(this.keywordAnswers[t]) >= 0)
                        return !0;
                }
            return !1;
        }
        isStartQuestion(t, e) {
            var s = e[t].innerText,
                i = t + 1;
            if ("" !== s) {
                for (
                    ;
                    s.length < this.keywordStartQuestion.length + 6 &&
                    i < e.length;

                )
                    (s += e[i].innerText), i++;
                if (
                    0 ===
                    (s = s.toLocaleUpperCase()).indexOf(
                        this.keywordStartQuestion
                    )
                ) {
                    var n = s.substring(this.keywordStartQuestion.length);
                    if (!isNaN(parseInt(n))) return parseInt(n);
                }
            }
            return -1;
        }
        isEndExam(t, e, s) {
            var i = e[t].innerText,
                n = t + 1;
            if (
                "" !==
                (i = (i = (i = i.replace(/\./g, "")).replaceAll(
                    "-",
                    ""
                )).replaceAll("_", ""))
            )
                for (let t = 0; t < this.keywordEndExam.length; t++) {
                    for (
                        ;
                        i.length < this.keywordEndExam[t].length &&
                        n < e.length;

                    )
                        (i += e[n].innerText), n++;
                    if (
                        0 ===
                        (i = (i = i.trim()).replaceAll(" ", "")).indexOf(
                            this.keywordEndExam[t]
                        )
                    )
                        return !0;
                }
            return !1;
        }
        renderQuestionFromBlock(t) {
            t.isRender = !0;
            var e = document.getElementById("box-left-file-canvas"),
                s = this.questionCropObjs.length,
                i = document.createElement("canvas");
            (i.id = "box_canvas_question_index_" + s),
                null == e || e.appendChild(i);
            var n = {
                metadata: {
                    ResultMediaIndex: !1,
                    isRealQuestion: t.isQuestion,
                    text: t.text,
                },
                questionText: "",
                name: "",
                typeNumber: 1,
                point: 1,
                answerResult: [],
                categoryId: 0,
                answerConfig: {
                    type: 1,
                    count: 4,
                    answer: ["A", "B", "C", "D"],
                },
                questionMedia: "",
                answerMedia: "",
                numberQuestion: t.numberQuestion,
                showResultMedia: !1,
                isSelect: t.isQuestion,
                image: "",
                blockInfo: Object.assign(Object.assign({}, t), {
                    info: t.info.map((t) =>
                        Object.assign(Object.assign({}, t), {
                            root: "box_canvas_question_index_" + s,
                        })
                    ),
                    indexQuestion: s,
                }),
                pageNumber: t.pageNumber,
                canvas_id: "box_canvas_question_index_" + s,
            };
            this.questionCropObjs.push(n), this.cropImageByPositionPage(n);
        }
        cropImageByPositionPage(t) {
            var e = document.getElementById(t.canvas_id);
            e.setAttribute("info", JSON.stringify(t.blockInfo)),
                this.renderBlockCanvas(e);
        }
        renderBlockCanvas(t) {
            var e = t.getAttribute("info");
            if (e) {
                var s = (e = JSON.parse(e)).info;
                if (s.length > 0) {
                    const l = t.getContext("2d");
                    var i = s[0].width,
                        n = 0;
                    for (let t = 0; t < s.length; t++) n += s[t].height;
                    (t.width = i),
                        (t.height = n),
                        (t.parentNode.style.width = i + "px"),
                        (t.parentNode.style.height = n + "px");
                    var a = 0;
                    l.clearRect(0, 0, t.width, t.height);
                    for (let t = 0; t < s.length; t++) {
                        var r = document.getElementById(
                            "canvas_layer_page" + s[t].pageNumber
                        );
                        l.drawImage(
                            r,
                            0,
                            s[t].start,
                            s[t].width,
                            s[t].height,
                            0,
                            a,
                            s[t].width,
                            s[t].height
                        ),
                            (a += s[t].height);
                    }
                    if (
                        ((this.questionCropObjs[e.indexQuestion].image =
                            t.toDataURL("image/png", 1)),
                        2 === this.processPhase &&
                            !1 ===
                                this.questionCropObjs[e.indexQuestion].isSelect)
                    ) {
                        var o = this.questionCropObjs.findIndex(
                            (t) =>
                                this.questionCropObjs[e.indexQuestion]
                                    .numberQuestion == t.numberQuestion
                        );
                        (this.questionCropObjs[o].answerMedia =
                            this.questionCropObjs[e.indexQuestion].image),
                            (this.questionCropObjs[
                                o
                            ].metadata.ResultMediaIndex = e.indexQuestion);
                    }
                }
            }
        }
        correctTopImage(t, e, s) {
            for (
                var i = e.getContext("2d"),
                    n = e.width,
                    a = i.getImageData(0, 0, n, e.height),
                    r = t,
                    o = !0;
                o && r > s;

            ) {
                o = !1;
                for (let t = 0; t < n; t++) {
                    var l = 4 * (r * n + t);
                    if (
                        a.data[l] < 180 &&
                        a.data[l + 1] < 180 &&
                        a.data[l + 2] < 180
                    ) {
                        (o = !0), (r -= 1);
                        break;
                    }
                }
            }
            return Number(r <= s ? t : r);
        }
        b64toFile(t, e) {
            t = t.replace("data:image/png;base64,", "");
            for (var s = atob(t), i = [], n = 0; n < s.length; n += 512) {
                for (
                    var a = s.slice(n, n + 512), r = new Array(a.length), o = 0;
                    o < a.length;
                    o++
                )
                    r[o] = a.charCodeAt(o);
                var l = new Uint8Array(r);
                i.push(l);
            }
            return new File(i, e, {
                type: "image/png",
            });
        }
        updateIndexStatusFileExam(t, e) {
            (this.arrStatusFileExam[t] = e), this.showProcess(e);
        }
        showProcess(t) {
            $(".content-overlay").addClass("show"),
                $(".content-overlay .noti").text(t);
        }
        hideProcess() {
            var t = this;
            setTimeout(function () {
                $(".content-overlay").removeClass("show"),
                    $(".content-overlay .noti").text(""),
                    t.arrQuestions.length
                        ? t.renderQuestion()
                        : n.showError("HỆ THỐNG KHÔNG NHẬN DIỆN ĐƯỢC DỮ LIỆU.");
            }, 1e3);
        }
        renderQuestion() {
            var t,
                i = this.questionCropObjs,
                a = "";
            i.forEach(function (s, r) {
                e++,
                    (t = {
                        title: "CÂU " + (r + 1),
                        content:
                            s.image != ""
                                ? '<img src="' +
                                  s.image +
                                  '" class="img-fluid">'
                                : "",
                        answer: {
                            type: 1,
                            answer: s.answerConfig.answer,
                        },
                        point: parseFloat(10 / i.length).toFixed(2),
                        explain: "",
                        question_id: e,
                        level: 0,
                    }),
                    (a += n.itemquestion(t));
            }),
                $("#app .sectionQuiz").eq(s).html(a),
                n.refreshQuizs();
        }
    }
    class r {
        constructor(t, e, s, i, n, a, r, o, l) {
            (this.activeRoute = t),
                (this.router = e),
                (this.commonService = s),
                (this.localize = i),
                (this.localizeService = n),
                (this.apiService = a),
                (this.route = r),
                (this.renderer = o),
                (this.sanitizer = l),
                (this.version = "x1.0"),
                (this.cur_cateId = 0),
                (this.nameExamInp = "Nhập tên đề thi vào đây"),
                (this.questionCropObjs = []),
                (this.percentLeft = 0.6),
                (this.arrQuestions = []),
                (this.processPhase = 0),
                (this.keywordStartQuestion = "CÂU"),
                (this.keywordAnswers = ["A.", "B.", "C.", "D."]),
                (this.keywordEndExam = [
                    "Hết",
                    "HẾT",
                    "ĐÁPÁN",
                    "HƯỚNGDẪN",
                    "GIẢITHÍCH",
                    "LỜIGIẢI",
                    "BẢNGĐÁPÁN",
                    "MATRẬN",
                    "THEEND",
                    "HET",
                ]),
                (this.keywordExpalain = ["LỜIGIẢI", "HƯỚNGDẪNGIẢI"]),
                (this.keySearchTagNameQuestion = ["STRONG"]),
                (this.keySearchTagNameFill = ["SUP", "SUB", "U", "I", "B"]),
                (this.keySearchTagNameBr = ["P"]),
                (this.source_viewer_id = "docx_viewer"),
                (this.wmf = null),
                (this.isShowLoadingFileExam = !1),
                (this.arrStatusFileExam = []),
                (this.stringAnswer = ""),
                (this.oldAnswer = 64),
                (this.elementText = []),
                (this.elementTextResultIndex = []),
                (this.defaultShowResultMedia = !0),
                (this.imageAnswerExam = null),
                (this.imageResultExam = null),
                (this.sizeDefaultCanvas = 1024),
                (this.maxAnsHeightLineOld = 0),
                (this.maxResultHeightLineOld = 0),
                (this.marginWidth = 4),
                (this.urlDocxViewer = ""),
                (this.arrImageWmf = []),
                (this.isBindImageWmf = !1),
                (this.doneConvertImage = !0),
                (this.isActionSubmit = !1),
                (this.isChangeQuestion = !1),
                (this.totalPoint = 10),
                (this.isMixture = !0),
                (this.totalNumberQuestion = 0),
                (this.listKeys = ""),
                (this.other = {});
        }
        changePointQuestions() {
            for (let t = 0; t < this.arrQuestions.length; t++)
                this.arrQuestions[t].answers.length > 0 &&
                    (this.arrQuestions[t].point =
                        this.totalPoint / this.totalNumberQuestion);
            this.isChangeQuestion = !0;
        }
        b64toFile(t, e) {
            t = t.replace("data:image/png;base64,", "");
            for (var s = atob(t), i = [], n = 0; n < s.length; n += 512) {
                for (
                    var a = s.slice(n, n + 512), r = new Array(a.length), o = 0;
                    o < a.length;
                    o++
                )
                    r[o] = a.charCodeAt(o);
                var l = new Uint8Array(r);
                i.push(l);
            }
            return new File(i, e, {
                type: "image/png",
            });
        }
        setupCanvasBacground() {
            (this.imageAnswerExam = []),
                (this.imageResultExam = []),
                this.AddCanvasBackgroundAns(),
                this.AddCanvasBackgroundResult();
        }
        AddCanvasBackgroundAns() {
            var t = document.createElement("canvas");
            (t.width = this.sizeDefaultCanvas),
                (t.height = this.sizeDefaultCanvas),
                this.imageAnswerExam.push({
                    canvas: t,
                    x: 0,
                    y: 0,
                    index: [],
                });
        }
        AddCanvasBackgroundResult() {
            var t = document.createElement("canvas");
            (t.width = this.sizeDefaultCanvas),
                (t.height = this.sizeDefaultCanvas),
                this.imageResultExam.push({
                    canvas: t,
                    x: 0,
                    y: 0,
                    index: [],
                });
        }
        getImageQuestion(t, e) {
            this.convertAns(t, e), this.convertResult(t, e);
        }
        convertAns(t, e) {
            var s = jQuery(`#${t.idQuestionBox} .answer img`);
            for (let l = 0; l < s.length; l++) {
                var i = s[l],
                    n = this.imageAnswerExam[this.imageAnswerExam.length - 1],
                    a = jQuery(i).width(),
                    r = jQuery(i).height();
                n.x + a + this.marginWidth > this.sizeDefaultCanvas
                    ? ((n.x = this.marginWidth),
                      (n.y += this.maxAnsHeightLineOld + this.marginWidth),
                      (this.maxAnsHeightLineOld = 0))
                    : (n.x += this.marginWidth),
                    n.y + r > this.sizeDefaultCanvas &&
                        (this.AddCanvasBackgroundAns(),
                        (n =
                            this.imageAnswerExam[
                                this.imageAnswerExam.length - 1
                            ])),
                    (this.maxAnsHeightLineOld =
                        this.maxAnsHeightLineOld < r
                            ? r
                            : this.maxAnsHeightLineOld);
                var o = n.canvas.getContext("2d");
                (t.text = t.text.replace(
                    `<img src="${i.src}">`,
                    `ans_${this.imageAnswerExam.length - 1}_${
                        n.index.length
                    }_question`
                )),
                    n.index.push({
                        index: e,
                        id: `ans_${this.imageAnswerExam.length - 1}_${
                            n.index.length
                        }_question`,
                        data: {
                            x: n.x,
                            y: n.y,
                            width: a,
                            height: r,
                        },
                    });
                for (let s = 0; s < t.answers.length; s++)
                    (t.answers[s].text = t.answers[s].text.replace(
                        `<img src="${i.src}">`,
                        `ans_${this.imageAnswerExam.length - 1}_${
                            n.index.length
                        }_answers`
                    )),
                        n.index.push({
                            index: e,
                            id: `ans_${this.imageAnswerExam.length - 1}_${
                                n.index.length
                            }_answers`,
                            data: {
                                x: n.x,
                                y: n.y,
                                width: a,
                                height: r,
                            },
                        });
                try {
                    o.drawImage(i, n.x, n.y, a, r);
                } catch (t) {}
                n.x += a;
            }
        }
        convertResult(t, e) {
            var s = jQuery(`#${t.idQuestionBox} .result img`);
            for (let l = 0; l < s.length; l++) {
                var i = s[l],
                    n = this.imageResultExam[this.imageResultExam.length - 1],
                    a = jQuery(i).width(),
                    r = jQuery(i).height();
                n.x + a + this.marginWidth > this.sizeDefaultCanvas
                    ? ((n.x = this.marginWidth),
                      (n.y += this.maxResultHeightLineOld + this.marginWidth),
                      (this.maxResultHeightLineOld = 0))
                    : (n.x += this.marginWidth),
                    n.y + r > this.sizeDefaultCanvas &&
                        (this.AddCanvasBackgroundResult(),
                        (n =
                            this.imageResultExam[
                                this.imageResultExam.length - 1
                            ])),
                    (this.maxResultHeightLineOld =
                        this.maxResultHeightLineOld < r
                            ? r
                            : this.maxResultHeightLineOld);
                var o = n.canvas.getContext("2d");
                (t.resultContent = t.resultContent.replace(
                    `<img src="${i.src}">`,
                    `result_${this.imageResultExam.length - 1}_${
                        n.index.length
                    }_result`
                )),
                    n.index.push({
                        index: e,
                        id: `result_${this.imageResultExam.length - 1}_${
                            n.index.length
                        }_result`,
                        data: {
                            x: n.x,
                            y: n.y,
                            width: a,
                            height: r,
                        },
                    }),
                    o.drawImage(i, n.x, n.y, a, r),
                    (n.x += a);
            }
        }
        resetBoxFileNotConf() {
            jQuery("#" + this.source_viewer_id).empty(),
                (this.processPhase = 0),
                (this.arrStatusFileExam = []),
                (this.stringAnswer = ""),
                (this.isShowLoadingFileExam = !1),
                (this.arrQuestions = []),
                (this.isActionSubmit = !1),
                (this.oldAnswer = 64),
                (this.arrImageWmf = []),
                (this.isBindImageWmf = !1),
                (this.isChangeQuestion = !1),
                (this.doneConvertImage = !0),
                (this.totalPoint = 10),
                (this.isMixture = !0),
                (this.totalNumberQuestion = 0),
                jQuery("#box-left-file-drop").css("display", "flex"),
                jQuery("#box-left-file").css("width", "100%"),
                jQuery("#box-question-viewer").css("display", "none"),
                jQuery("#box-right-file-component").css("display", "none");
        }
        loadFileDocx(t) {
            try {
                if ("DOCX" === t.name.split(".").pop().toLocaleUpperCase()) {
                    (this.arrStatusFileExam = []),
                        (this.isShowLoadingFileExam = !0),
                        this.updateIndexStatusFileExam("Đang tải lên tệp tin");
                    var e = this,
                        s = new FileReader();
                    (s.onloadend = function (t) {
                        e.updateIndexStatusFileExam(
                            "Đang xử lý yêu cầu. Vui lòng chờ trong giây lát..."
                        );
                        var i = s.result,
                            a = document.getElementById(e.source_viewer_id);
                        (a.innerHTML = null),
                            setTimeout(async () => {
                                var t = {
                                        SECTION_PATTERN_LOWER: [
                                            "(^mark\\s*the\\s*letter)",
                                            "(^read\\s*the\\s*follow)",
                                            "(^reading\\s*the\\s*follow)",
                                            "(^read\\s*the\\s*text)",
                                            "(^read\\s*the\\s*passage)",
                                            "(^put\\s*these\\s*word)",
                                            "(^supply\\s*the\\s*correct)",
                                            "(^make\\s*questions?\\s*for)",
                                            "(^fill\\s*in\\s*the\\s*blank)",
                                            "(write\\s*the\\s*months\\s*in\\s*english)",
                                            "(write\\s*the\\s*telephone\\s*numbers\\s*in\\s*english)",
                                            "(^choose\\s*the\\s*word)",
                                            "(^choose\\s*the\\s*underlined\\s*word)",
                                            "(^combine\\s*two\\s*sentences)",
                                            "(^identify\\s*the\\s*underlined)",
                                            "(^circle\\s*the\\s*underlined)",
                                            "(^find\\s*the\\s*word)",
                                            "(^choose\\s*the\\s*best)",
                                            "(^choose\\s*the\\s*correct)",
                                            "(^put\\s*in\\s*the\\s*correct)",
                                            "(^complete\\s*the\\s*second\\s*sentence)",
                                            "(^mark\\s*a,\\s*b,)",
                                            "(^circle\\s*the\\s*letter)",
                                            "(^blacken\\s*the\\s*letter)",
                                            "(^section\\s*[0-9abcdefghivx]+)",
                                            "(^part[^a-z]+[0-9abcdefghivx]+\\s*[\\.:\\-])",
                                            "(^phần\\s*[0-9abcdefivx]+[\\.:])",
                                            "(^questions?\\s*\\d+\\s*[\\–\\-to]+\\s*\\d+)",
                                            "(^passage\\s*[0-9abcdefghivx]+)",
                                            "(^[ivx]+\\s*[\\.\\-\\–])",
                                        ],
                                        QUESTION_PATTERN: [
                                            "(^câu\\s*\\d{1,4}[^0-9])",
                                            "(^c©u\\s*\\d{1,4}[^0-9])",
                                            "(^ca‚u\\s*\\d{1,4}[^0-9])",
                                            "(^bài\\s*\\d{1,4}[^0-9])",
                                            "(^cau\\s*\\d{1,4}[^0-9])",
                                            "(^bai\\s*\\d{1,4}[^0-9])",
                                            "(^question\\s*\\d{1,4}[^0-9])",
                                            "(^\\d+\\s*\\(nb\\))",
                                            "(^\\d+\\s*\\(th\\))",
                                            "(^\\d+\\s*\\(vd\\))",
                                            "(^\\d+\\s*\\(vdc\\))",
                                            "(^câu\\s*\\d{1,4}[\\s\\.:]*$)",
                                            "(^c©u\\s*\\d{1,4}[\\s\\.:]*$)",
                                            "(^ca‚u\\s*\\d{1,4}[\\s\\.:]*$)",
                                            "(^bài\\s*\\d{1,4}[\\s\\.:]*$)",
                                            "(^cau\\s*\\d{1,4}[\\s\\.:]*$)",
                                            "(^bai\\s*\\d{1,4}[\\s\\.:]*$)",
                                            "(^question\\s*\\d{1,4}[\\s\\.:]*$)",
                                        ],
                                        tagQuestion: {},
                                        numbering: 0,
                                        findAnswer: {},
                                        number: 0,
                                        image: 0,
                                    },
                                    s = {
                                        markUnknownElementsWithClass: "unknown",
                                        styleMap: [
                                            "u => u",
                                            "b => b",
                                            "i => i",
                                        ],
                                        convertImage: mammoth.images.inline(
                                            function (s, i) {
                                                return s
                                                    .read("base64")
                                                    .then(function (i) {
                                                        var n =
                                                            "data:" +
                                                            s.contentType +
                                                            ";base64," +
                                                            i;
                                                        if (
                                                            s.contentType.indexOf(
                                                                "image/x-wmf"
                                                            ) > -1 ||
                                                            s.contentType.indexOf(
                                                                "image/x-emf"
                                                            ) > -1
                                                        )
                                                            try {
                                                                n =
                                                                    e.wmf.toPNG(
                                                                        n
                                                                    );
                                                            } catch (e) {
                                                                t.image++,
                                                                    (n =
                                                                        "ERROR");
                                                            }
                                                        return {
                                                            src: n,
                                                        };
                                                    });
                                            }
                                        ),
                                        transformDocument:
                                            mammoth.transforms.paragraph(
                                                function (e) {
                                                    e.numbering &&
                                                        (t.numbering++,
                                                        "0" ==
                                                            e.numbering.level &&
                                                            (e.children &&
                                                            e.children.length
                                                                ? (e.children[0].children[0].value =
                                                                      `Câu ${
                                                                          t.number +
                                                                          1
                                                                      }. ` +
                                                                      e
                                                                          .children[0]
                                                                          .children[0]
                                                                          .value)
                                                                : (e.children =
                                                                      [
                                                                          {
                                                                              children:
                                                                                  [
                                                                                      {
                                                                                          type: "text",
                                                                                          value: `Câu ${
                                                                                              t.number +
                                                                                              1
                                                                                          }.`,
                                                                                      },
                                                                                  ],
                                                                          },
                                                                      ]),
                                                            (e.numbering =
                                                                null)));
                                                    var s,
                                                        i = (e.children || [])
                                                            .map((t) =>
                                                                (
                                                                    t.children ||
                                                                    []
                                                                )
                                                                    .map(
                                                                        (t) =>
                                                                            t.value ||
                                                                            ""
                                                                    )
                                                                    .join("")
                                                            )
                                                            .join("");
                                                    if (
                                                        i
                                                            .toLowerCase()
                                                            .match(
                                                                t.SECTION_PATTERN_LOWER.join(
                                                                    "|"
                                                                )
                                                            )
                                                    ) {
                                                        var n = 0;
                                                        e.children.every(
                                                            (t, e) =>
                                                                "run" !=
                                                                    t.type ||
                                                                ((n = e),
                                                                (t.isUnderline =
                                                                    !1),
                                                                (t.isItalic =
                                                                    !1),
                                                                (t.isBold = !1),
                                                                !1)
                                                        ),
                                                            (e.children[
                                                                n
                                                            ].children[0].value =
                                                                "[SECTION]" +
                                                                e.children[n]
                                                                    .children[0]
                                                                    .value);
                                                    }
                                                    if (
                                                        ((s = i
                                                            .toLowerCase()
                                                            .match(
                                                                t.QUESTION_PATTERN.join(
                                                                    "|"
                                                                )
                                                            )) &&
                                                            ((t.number =
                                                                parseInt(
                                                                    /(\d{1,4})/g.exec(
                                                                        s[0]
                                                                    )[1]
                                                                )),
                                                            /^question/g.test(
                                                                i.toLowerCase()
                                                            ) &&
                                                                (t.tagQuestion[
                                                                    t.number
                                                                ] = 1)),
                                                        /(^\d+\s*(\.|\:))/.test(
                                                            i
                                                        ) && i.length > 10)
                                                    ) {
                                                        t.number = parseInt(
                                                            /^(\d{1,4})/g.exec(
                                                                i
                                                            )[1]
                                                        );
                                                        n = 0;
                                                        e.children.every(
                                                            (t, e) =>
                                                                "run" !=
                                                                    t.type ||
                                                                ((n = e), !1)
                                                        ),
                                                            (e.children[
                                                                n
                                                            ].children[0].value =
                                                                "Câu " +
                                                                e.children[n]
                                                                    .children[0]
                                                                    .value);
                                                    }
                                                    return (
                                                        (
                                                            e.children || []
                                                        ).forEach((e) => {
                                                            if (
                                                                e.isUnderline ||
                                                                e.isItalic ||
                                                                e.isBold
                                                            ) {
                                                                var s = (
                                                                    e.children ||
                                                                    []
                                                                ).findIndex(
                                                                    (t) =>
                                                                        t.value &&
                                                                        /^[A-D]/g.test(
                                                                            t.value
                                                                        )
                                                                );
                                                                s > -1 &&
                                                                    e.isUnderline &&
                                                                    (t
                                                                        .findAnswer[
                                                                        t.number
                                                                    ] ||
                                                                        (t.findAnswer[
                                                                            t.number
                                                                        ] = []),
                                                                    t.findAnswer[
                                                                        t.number
                                                                    ].push(
                                                                        /^([A-D])/g.exec(
                                                                            e
                                                                                .children[
                                                                                s
                                                                            ]
                                                                                .value
                                                                        )[1]
                                                                    ),
                                                                    (e.isUnderline =
                                                                        !1),
                                                                    (e.isItalic =
                                                                        !1),
                                                                    (e.isBold =
                                                                        !1));
                                                            }
                                                            (
                                                                e.children || []
                                                            ).forEach((s) => {
                                                                s.value &&
                                                                    (/^(question|C©u|Bài|Cau|Bai|ca‚u|Câu)/gi.test(
                                                                        s.value.trim()
                                                                    ) &&
                                                                        (/^question/gi.test(
                                                                            s.value.trim()
                                                                        ) &&
                                                                            (t.tagQuestion[
                                                                                t.number
                                                                            ] = 1),
                                                                        (s.value =
                                                                            s.value.replace(
                                                                                /^(question|C©u|Bài|Cau|Bai|ca‚u)/gi,
                                                                                "Câu"
                                                                            )),
                                                                        (e.isUnderline =
                                                                            !1),
                                                                        (e.isItalic =
                                                                            !1),
                                                                        (e.isBold =
                                                                            !1)),
                                                                    (s.value =
                                                                        s.value
                                                                            .replace(
                                                                                /(\\\[|\\\]|\\\(|\\\))/g,
                                                                                "$"
                                                                            )
                                                                            .replace(
                                                                                /\\end{align}/g,
                                                                                "\\end{matrix}"
                                                                            )
                                                                            .replace(
                                                                                /\\end{array}/g,
                                                                                "\\end{matrix}"
                                                                            )
                                                                            .replace(
                                                                                /\\begin{array}/g,
                                                                                "\\begin{matrix}"
                                                                            )
                                                                            .replace(
                                                                                /\\begin{align}/g,
                                                                                "\\begin{matrix}"
                                                                            )
                                                                            .replace(
                                                                                /\^\^/g,
                                                                                "^"
                                                                            )
                                                                            .replace(
                                                                                /\</g,
                                                                                "<  "
                                                                            )),
                                                                    (!s.value.trim() ||
                                                                        /^((\d+\s*(\.|\:|\,|))|(\.|\:|\,)|([A-D](\.|\:|\,|)))/g.test(
                                                                            s.value.trim()
                                                                        ) ||
                                                                        /^(lời giải|((\(|)(NB|TH|VD|VDC))|(hướng dẫn giải)|Hướng dẫn)/gi.test(
                                                                            s.value.trim()
                                                                        )) &&
                                                                        (e.isUnderline ||
                                                                            e.isItalic ||
                                                                            e.isBold) &&
                                                                        ((e.isUnderline =
                                                                            !1),
                                                                        (e.isItalic =
                                                                            !1),
                                                                        (e.isBold =
                                                                            !1))),
                                                                    "text" !=
                                                                        s.type &&
                                                                        ((e.isUnderline =
                                                                            !1),
                                                                        (e.isItalic =
                                                                            !1),
                                                                        (e.isBold =
                                                                            !1));
                                                            });
                                                        }),
                                                        e
                                                    );
                                                }
                                            ),
                                    };
                                if ("undefined" != typeof MAMMOTH_OPTIONS) {
                                    var r =
                                        "function" == typeof MAMMOTH_OPTIONS
                                            ? MAMMOTH_OPTIONS(mammoth)
                                            : MAMMOTH_OPTIONS;
                                    for (var o in r) s[o] = r[o];
                                }

                                /**
                                 * let _tmpAzota = function (buffer) {
                                    let arrayBuffer = new Uint8Array(buffer);
                                    return new Promise((resolve, reject) => {
                                        let a = (x, y) => {};
                                        azotaDocx
                                            .readDocx(arrayBuffer, a)
                                            .then(function (_) {
                                                resolve(_);
                                            });
                                    });
                                };
                                let azotaMath = await _tmpAzota(i);
                                 */

                                mammoth
                                    .convertToHtml(
                                        {
                                            arrayBuffer: i,
                                        },
                                        s
                                    )
                                    .then(function (s) {
                                        /**
                                         * _ADD_AZOTA.mergeAzota(s, azotaMath);
                                         */
                                        (e.other = t),
                                            (s.value = n.checkLatex(s.value)),
                                            (a.innerHTML = s.value);
                                        var i = e.getElementTextByNode(a);
                                        (e.elementText = i),
                                            e.processElements();
                                    });
                            }, 200);
                    }),
                        s.readAsArrayBuffer(t);
                } else this.errorParse(), this.resetBoxFileNotConf();
                // this.eventAddQuestion();
            } catch (t) {
                this.errorParse();
            }
        }

        parseListKey(t) {
            var e = this;
            (e.listKeys = ""),
                t &&
                    t.forEach(function (t) {
                        e.listKeys += t
                            .replace(/<u>([A-D][-\.]?)<\/u>/g, "$1")
                            .replace(/\./g, "");
                    });
        }
        errorParse() {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Không phân tích được đề thi",
                footer: '<a href="//hs.edu.vn">Xem thêm cách khắc phục</a>',
                customClass: {
                    confirmButton: "btn btn-primary",
                },
                buttonsStyling: !1,
            });
        }
        getElementTextByNode(t) {
            if (0 === t.childNodes.length) return [t];
            if (this.keySearchTagNameFill.includes(t.tagName))
                return document.createTextNode(t.outerHTML);
            this.keySearchTagNameBr.includes(t.tagName) &&
                t.appendChild(document.createTextNode(" <br/> "));
            var e = [],
                s = t.childNodes;
            for (let t = 0; t < s.length; t++)
                e = e.concat(this.getElementTextByNode(s[t]));
            return e;
        }
        processElementToText() {
            var t = [];
            this.elementTextResultIndex = [];
            for (let n = 0; n < this.elementText.length; n++) {
                var e = this.elementText[n];
                if ("IMG" !== e.tagName) {
                    if (null != e.data) {
                        var s = e.data.replaceAll("\t", " \t "),
                            i = s;
                        (s = s.split(" ")),
                            Array.isArray(s) &&
                                s.length > 0 &&
                                s.forEach((e, s) => {
                                    if (
                                        e.indexOf("sub") > -1 &&
                                        !i.includes("img")
                                    )
                                        var a = document.createTextNode(
                                            (e += "")
                                        );
                                    else
                                        a = document.createTextNode((e += " "));
                                    t.push(a),
                                        this.elementTextResultIndex.push(n);
                                });
                    }
                } else t.push(e), this.elementTextResultIndex.push(n);
            }
            return t;
        }
        processElements() {
            var t = this.processElementToText();
            this.processPhase = 0;
            var e = -1,
                s = !1;
            for (let h = 0; h < t.length; h++)
                if (0 === this.processPhase) {
                    var i = (r = this.isStartQuestion(h, t)) > 0,
                        n = null;
                    if (
                        (this.arrQuestions.length > 0 &&
                            i &&
                            (n =
                                this.arrQuestions[this.arrQuestions.length - 1])
                                .numberQuestion > r &&
                            (i = !1),
                        !0 === i)
                    )
                        this.arrQuestions.push({
                            keyStart: this.keywordStartQuestion,
                            numberQuestion: r,
                            questionMedia: [],
                            typeQuestion: 2,
                            text: t[h].data,
                            answers: [],
                            isShowAttach: !1,
                            isShowResultContent: this.defaultShowResultMedia,
                            point: 1,
                            resultAnswer: [],
                            resultContent: "",
                            colInLine: 4,
                            categoryId: 0,
                            typeNumber: 1,
                            idQuestionBox:
                                "question_item_box_" + this.arrQuestions.length,
                            isEdit: !1,
                            group: 1,
                        }),
                            (this.oldAnswer = 64),
                            (s = !1);
                    else if (!0 === this.isEndExam(h, t)) this.processPhase = 1;
                    else if (this.arrQuestions.length > 0) {
                        (n = this.arrQuestions[this.arrQuestions.length - 1]),
                            -1 !== this.isExplainQuestion(h, t) && (s = !0);
                        var a = this.isAnswersQuestion(h, t);
                        !s &&
                            -1 !== a &&
                            this.oldAnswer + 1 ===
                                a.replace(/\./g, "").charCodeAt() &&
                            (n.answers.push({
                                text: "",
                                key: a,
                            }),
                            (n.typeQuestion = 1),
                            (this.oldAnswer =
                                "D." === a
                                    ? 64
                                    : a.replace(/\./g, "").charCodeAt())),
                            s
                                ? (n.resultContent += this.getInnerText(t, h))
                                : 0 === n.answers.length
                                ? (n.text += this.getInnerText(t, h))
                                : (n.answers[n.answers.length - 1].text +=
                                      this.getInnerText(t, h));
                    } else this.isGroupQuestion(h, t);
                } else if (1 == this.processPhase) {
                    var r = this.isStartQuestion(h, t);
                    if (this.arrQuestions.length > 0) {
                        var o = !0;
                        if (
                            (r < this.arrQuestions[0].numberQuestion &&
                                (o = !1),
                            r >
                                this.arrQuestions[this.arrQuestions.length - 1]
                                    .numberQuestion && (o = !1),
                            o)
                        ) {
                            this.stringAnswer = this.stringAnswer.replaceAll(
                                "<br/>",
                                ""
                            );
                            var l = this.parseDapAnStr(this.stringAnswer);
                            this.bindAnswers(l),
                                -1 !==
                                    (e = this.arrQuestions.findIndex(
                                        (t) => t.numberQuestion === r
                                    )) &&
                                    (this.arrQuestions[e].resultContent +=
                                        this.getInnerText(t, h)),
                                (this.processPhase = 2);
                        } else
                            this.stringAnswer +=
                                void 0 === t[h].data ? "" : t[h].data + " ";
                    }
                } else if (2 === this.processPhase) {
                    r = this.isStartQuestion(h, t);
                    var d = this.arrQuestions.findIndex(
                        (t) => t.numberQuestion === r
                    );
                    -1 !== d
                        ? ((this.arrQuestions[d].resultContent +=
                              this.getInnerText(t, h)),
                          (e = d))
                        : (this.arrQuestions[e].resultContent +=
                              this.getInnerText(t, h));
                }
            1 === this.processPhase &&
                ((l = this.parseDapAnStr(this.stringAnswer)),
                this.bindAnswers(l)),
                !0 === this.isShowLoadingFileExam && this.startViewerQuestion(),
                this.replaceAllKey(),
                (this.totalNumberQuestion = this.arrQuestions.filter(
                    (t) => t.answers.length > 0
                ).length),
                0 === this.arrQuestions.length && this.resetBoxFileNotConf(),
                this.changePointQuestions();
        }
        isExplainQuestion(t, e) {
            var s = e[t].data,
                i = this;
            if (void 0 === s) return -1;
            if ("" !== (s = (s = s.replaceAll(" ", "")).trim())) {
                var n = -1;
                if (
                    (this.keywordExpalain.every(
                        (t, e) => s[0].toUpperCase() != t[0] || ((n = e), !1)
                    ),
                    n > -1)
                ) {
                    for (
                        var a = t + 1;
                        void 0 !== e[a].data &&
                            (s += e[a].data.replaceAll(" ", "")),
                            !(
                                ++a >= e.length ||
                                s.length >= i.keywordExpalain[n].length
                            );

                    );
                    if (s.toUpperCase().indexOf(i.keywordExpalain[n]) > -1)
                        return i.keywordExpalain[n];
                }
            }
            return -1;
        }
        isGroupQuestion(t, e) {
            var s = e[t].data;
            if (void 0 === s) return -1;
            if (!/^\[SECTION\]/.test(s)) return -1;
            var i = t + 1;
            if ("" !== s) {
                for (
                    ;
                    (s += e[i].data),
                        !(++i >= e.length || this.isStartQuestion(i, e) > 0);

                );
                return s.replace(/^\[SECTION\]/, "");
            }
            return -1;
        }
        replaceAllKey() {
            var t = /^[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                e = /^[-]*$/;
            for (let r = 0; r < this.arrQuestions.length; r++) {
                var s = 0,
                    i = this.arrQuestions[r],
                    n = i.text.replace("Câu " + i.numberQuestion, "");
                for (
                    n = n.trim();
                    n.split("").length > 0 && n.split("")[0].match(t);

                )
                    n = n.substring(1);
                i.text = n;
                var a = i.resultContent.replace("Câu " + i.numberQuestion, "");
                for (
                    0 === (a = a.trim()).indexOf("<br/>") &&
                    (a = a.substring(5));
                    a.split("").length > 0 && a.split("")[0].match(t);

                )
                    a = a.substring(1);
                if (((i.resultContent = a), i.answers.length > 0))
                    for (let t = 0; t < i.answers.length; t++) {
                        for (
                            i.answers[t].text = i.answers[t].text.replace(
                                /([A-D]) \./g,
                                "$1."
                            ),
                                i.answers[t].text = i.answers[t].text
                                    .replace(i.answers[t].key, "")
                                    .trim();
                            i.answers[t].text.split("").length > 0 &&
                            i.answers[t].text
                                .split("")
                                [i.answers[t].text.split("").length - 1].match(
                                    e
                                );

                        )
                            i.answers[t].text = i.answers[t].text.substring(
                                0,
                                i.answers[t].text.length - 2
                            );
                        s =
                            i.answers[t].text.length > s
                                ? i.answers[t].text.length
                                : s;
                    }
                i.colInLine = s > 15 ? (s > 200 ? 1 : 2) : 4;
            }
        }
        bindAnswers(t) {
            if (this.arrQuestions.length > 0 && t) {
                var e =
                    this.arrQuestions[this.arrQuestions.length - 1]
                        .numberQuestion;
                for (let i = this.arrQuestions[0].numberQuestion; i <= e; i++)
                    if (t[i] && "" != t[i]) {
                        var s = this.arrQuestions.findIndex(
                            (t) => t.numberQuestion === i
                        );
                        this.arrQuestions[s] &&
                            (this.arrQuestions[s].resultAnswer = [t[i]]);
                    }
            }
        }
        parseDapAnStr(t) {
            if ("" != t.trim() && 0 != this.arrQuestions.length) {
                for (
                    var e = this.arrQuestions[0].numberQuestion,
                        s =
                            this.arrQuestions[this.arrQuestions.length - 1]
                                .numberQuestion,
                        i = [],
                        n = e;
                    n <= s;
                    n++
                )
                    i[n] = "";
                var a = t.split(" "),
                    r = [],
                    o = [],
                    l = 0;
                for (let t = 0; t < a.length; t++)
                    if (isNaN(parseInt(a[t])))
                        0 == l && (o = []),
                            (l = 1),
                            o.length < r.length &&
                                ((a[t] = a[t].trim()),
                                (c = a[t].substr(a[t].length - 1)),
                                a[t].length <= 2 &&
                                    ("A" == c ||
                                        "B" == c ||
                                        "C" == c ||
                                        "D" == c) &&
                                    o.push(c));
                    else {
                        if (1 == l) {
                            for (var d = -1, h = o.length - 1; h >= 0; h--)
                                r.length > 0
                                    ? "" == i[(d = r.pop())] && (i[d] = o[h])
                                    : (i[d] = o[h]);
                            o = [];
                        }
                        l = 0;
                        var c,
                            u = parseInt(a[t]);
                        if (u >= e && u <= s)
                            if (
                                "A" == (c = a[t].substr(a[t].length - 1)) ||
                                "B" == c ||
                                "C" == c ||
                                "D" == c
                            ) {
                                if ("" == i[u]) {
                                    if (u == e)
                                        for (h = 0; h < i.length; h++)
                                            i[h] = "";
                                    i[u] = c;
                                }
                            } else {
                                if (u == e)
                                    for (h = 0; h < i.length; h++) i[h] = "";
                                0 == r.length
                                    ? r.push(u)
                                    : u == e
                                    ? (r = [u])
                                    : r[r.length - 1] + 1 == u
                                    ? r.push(u)
                                    : 1 == r.length && (r[0] = u);
                            }
                    }
                for (d = -1, h = o.length - 1; h >= 0; h--)
                    r.length > 0
                        ? "" == i[(d = r.pop())] && (i[d] = o[h])
                        : (i[d] = o[h]);
                for (o = [], r = [], n = e; n <= s; n++);
                return i;
            }
        }
        startViewerQuestion() {
            var t = 0;
            for (let e = 0; e <= 100; e += 5)
                setTimeout(() => {
                    this.updateIndexStatusFileExam(
                        "Đang phân tích tệp tin ... " + e + " %"
                    ),
                        100 === e &&
                            (setTimeout(() => {
                                this.updateIndexStatusFileExam(
                                    "Hoàn thành phân tích."
                                ),
                                    this.hideProcess();
                            }, 300),
                            setTimeout(() => {
                                (this.arrStatusFileExam = []),
                                    (this.isShowLoadingFileExam = !1);
                            }, 700));
                }, (t += 100));
        }
        isAnswersQuestion(t, e) {
            var s = e[t].data;
            if (void 0 === s) return -1;
            var i = t + 1;
            if ("" !== (s = (s = s.replaceAll(" ", "")).trim()))
                for (let t = 0; t < this.keywordAnswers.length; t++) {
                    for (; s.length < 10 && i < e.length; )
                        void 0 !== e[i].data &&
                            (s += e[i].data.replaceAll(" ", "")),
                            i++;
                    if (0 === (s = s.trim()).indexOf(this.keywordAnswers[t]))
                        return this.keywordAnswers[t];
                }
            return -1;
        }
        getInnerText(t, e) {
            var s = t[e];
            if (void 0 !== s.data) return s.data;
            if ("IMG" === s.tagName) {
                var i = s.getAttribute("src");
                return i.indexOf("image/x-wmf") >= 0 ||
                    i.indexOf("image/x-emf") >= 0
                    ? (this.arrImageWmf.push(s.getAttribute("src")),
                      (this.doneConvertImage = !1),
                      `<img class="wmf_${
                          this.arrImageWmf.length - 1
                      }" width="30" height="30" src="https://wewiin.nyc3.cdn.digitaloceanspaces.com/storage_public/azota_assets/images/waiting.gif">`)
                    : `<span class="img"><img src="${i}" class="img-fluid base64"></span>`;
            }
            return "";
        }
        isEndExam(t, e) {
            var s = e[t].data;
            if (void 0 === s) return !1;
            var i = t + 1;
            if ("" !== s)
                for (let t = 0; t < this.keywordEndExam.length; t++) {
                    for (
                        ;
                        s.length < this.keywordEndExam[t].length &&
                        i < e.length;

                    )
                        (s += e[i].data), i++;
                    if (
                        (s = (s = (s = (s = s.replace(/\./g, "")).replaceAll(
                            "-",
                            ""
                        )).replaceAll("_", "")).trim()).indexOf(
                            this.keywordEndExam[t]
                        ) >= 0
                    )
                        return !0;
                }
            return !1;
        }
        searchIndexToElement(t) {
            var e = !1;
            try {
                return (
                    0 ===
                        this.elementText[
                            this.elementTextResultIndex[t]
                        ].parentNode.innerText
                            .toLocaleUpperCase()
                            .trim()
                            .indexOf(this.keywordStartQuestion) && (e = !0),
                    !0 === e &&
                        this.keySearchTagNameQuestion.includes(
                            this.elementText[this.elementTextResultIndex[t]]
                                .parentNode.nodeName
                        ) &&
                        (e = !0),
                    e
                );
            } catch (t) {
                return console.log(t), e;
            }
        }
        isStartQuestion(t, e) {
            var s = e[t].data;
            if (void 0 === s) return -1;
            var i = t + 1;
            if ("" !== s) {
                for (
                    ;
                    s.length < this.keywordStartQuestion.length + 6 &&
                    i < e.length;

                )
                    (s += e[i].data), i++;
                if (
                    0 ===
                        (s = s.toLocaleUpperCase()).indexOf(
                            this.keywordStartQuestion
                        ) &&
                    !0 === this.searchIndexToElement(t)
                ) {
                    var n = s.substring(this.keywordStartQuestion.length);
                    if (!isNaN(parseInt(n))) return parseInt(n);
                }
            }
            return -1;
        }
        updateIndexStatusFileExam(t) {
            (this.arrStatusFileExam = []),
                this.arrStatusFileExam.push(t),
                this.showProcess(t);
        }
        showProcess(t) {
            $(".content-overlay").addClass("show"),
                $(".content-overlay .noti").text(t);
        }
        hideProcess() {
            var t = this;
            setTimeout(function () {
                $(".content-overlay").removeClass("show"),
                    $(".content-overlay .noti").text(""),
                    t.renderQuestion();
            }, 1e3);
        }
        parseExplain(t) {
            var e,
                s = "",
                i = "";
            return (
                t.forEach(function (i, n) {
                    (e = i.text.match(/LỜI GIẢI/gi)) &&
                        ((s = i.text.split(e[0])[1].trim()),
                        (i.text = i.text.split(e[0])[0].trim())),
                        i.text.replace(/\<br\/\>/g, "").trim() || delete t[n];
                }),
                (e = s.match(/CHỌN\s([A-D])\./gi)) &&
                    ((i = /CHỌN\s([A-D])\./gi.exec(e[0])[1]),
                    (s = (s = s.replace(e[0], "")).replace("<br/>", ""))),
                {
                    answers: t,
                    explain: s,
                    keys: i,
                }
            );
        }
        fixText(t) {
            t = (t = (t = (t = (t = (t = t
                .toString()
                .trim()
                .replace(/&nbsp;/gi, " "))
                .toString()
                .trim()
                .replace(/\s(\<(|\/)sub>)/gi, "$1")
                .replace(/(\<(|\/)sub>)\s(\W)/gi, "$1$3"))
                .toString()
                .trim()
                .replace(/^<(\/|)br(\/|)>/gi, "")
                .replace(/<(\/|)br(\/|)>$/gi, ""))
                .toString()
                .trim()
                .replace(/\s(\.|\:|\?)/gi, "$1"))
                .toString()
                .trim()
                .replace(/(\s|)(<(u)>.*?<\/\3>)(\s|)/g, "$2"))
                .toString()
                .trim()
                .replace(/^(\.|\:|\,|)(\s|)<br\/>/g, "");
            try {
                (t = (t = (t = (t = (t = t.replace(/\{.&.\}/g, "@")).replace(
                    /\\end{align}/g,
                    "\\end{matrix}"
                )).replace(/\\end{array}/g, "\\end{matrix}")).replace(
                    /\\begin{array}/g,
                    "\\begin{matrix}"
                )).replace(/\\begin{align}/g, "\\begin{matrix}"))
                    .split("$")
                    .forEach(function (e, s) {
                        if (s % 2) {
                            var i = $("<div>" + e + "</div>").text();
                            (i = (i = (i = i.replace(/\</g, "<  ")).replace(
                                /\n/g,
                                " "
                            )).replace(/\\begin/g, "\n \\begin")),
                                (t = t.replace(e, i));
                        }
                    });
            } catch (t) {
                console.log(t);
            }
            for (; /\s\s/g.test(t); ) t = t.replace(/\s\s/g, " ");
            return t.toString().trim();
        }
        findLevel(t) {
            var e = 0;
            /\[.+?\]/g.test(t) &&
                (/\[\w{1,5}\-\d{1,3}\.\d{1,3}\-(\d{1})\](\.|\:|)/gi.test(t) &&
                    ((e = /\[\w{1,5}\-\d{1,3}\.\d{1,3}\-(\d{1})\]/gi.exec(
                        t
                    )[1]),
                    (e = parseInt(e) - 1),
                    (t = t.replace(
                        /\[\w{1,5}\-\d{1,3}\.\d{1,3}\-(\d{1})\](\.|\:|)/gi,
                        ""
                    ))),
                /\[(NB|TH|VD|VDC)\](\.|\:|)/gi.test(t) &&
                    ((e = {
                        NB: 0,
                        TH: 1,
                        VD: 2,
                        VDC: 3,
                    }[(e = /\[(NB|TH|VD|VDC)\]/gi.exec(t)[1])]),
                    (t = t.replace(/\[(NB|TH|VD|VDC)\](\.|\:|)/gi, ""))));
            /\(.+\)/g.test(t) &&
                /\((NB|TH|VD|VDC)\)(\.|\:|)/gi.test(t) &&
                ((e = {
                    NB: 0,
                    TH: 1,
                    VD: 2,
                    VDC: 3,
                }[(e = /\((NB|TH|VD|VDC)\)/gi.exec(t)[1])]),
                (t = t.replace(/\((NB|TH|VD|VDC)\)(\.|\:|)/gi, "")));
            return {
                level: e,
                text: this.fixText(t),
            };
        }
        renderQuestion() {
            var t,
                i,
                a = this;
            a.arrQuestions.map((e) => {
                if (
                    ((e.resultContent = a.fixText(e.resultContent)),
                    /(^lời giải)/gi.test(e.resultContent))
                )
                    try {
                        (e.resultContent =
                            e.resultContent.split(/(^lời giải)/gi)[2]),
                            (e.resultContent = a.fixText(e.resultContent));
                    } catch (t) {}
                (e.text = a.fixText(e.text)),
                    (e.answers || []).forEach((t) => {
                        (t.text = a.fixText(t.text)),
                            t.key &&
                                /[a-d]/gi.test(t.key) &&
                                (t.key = /([a-d])/gi.exec(t.key)[1]);
                    }),
                    e.answers.length &&
                        ((t = e.answers[e.answers.length - 1].text),
                        /lời giải/gi.test(t) &&
                            ((i = t.split(/lời giải/gi)),
                            (e.answers[e.answers.length - 1].text = i[0]
                                .toString()
                                .trim()),
                            (e.resultContent += i[1].toString().trim()))),
                    (e.resultContent = a.fixText(e.resultContent)),
                    /^ch[ọo]n\s*([A-K])(\:|\.|)/gi.test(e.resultContent) &&
                        (e.resultAnswer.push(
                            /^ch[ọo]n\s*([A-K])(\:|\.|)/gi.exec(
                                e.resultContent
                            )[1]
                        ),
                        (e.resultContent = e.resultContent.replace(
                            /^ch[ọo]n\s*([A-K])(\:|\.|)/gi,
                            ""
                        ))),
                    /^ch[ọo]n(\s|)<br\/>(\s|)([A-D])/gi.test(e.resultContent) &&
                        (e.resultAnswer.push(
                            /^ch[ọo]n(\s|)<br\/>(\s|)([A-D])/gi.exec(
                                e.resultContent
                            )[3]
                        ),
                        (e.resultContent = e.resultContent.replace(
                            /^ch[ọo]n(\s|)<br\/>(\s|)([A-D])/gi,
                            ""
                        ))),
                    /ch[ọo]n\s*([A-K])(\:|\.|)$/gi.test(e.resultContent) &&
                        (e.resultAnswer.push(
                            /ch[ọo]n\s*([A-K])(\:|\.|)$/gi.exec(
                                e.resultContent
                            )[1]
                        ),
                        (e.resultContent = e.resultContent.replace(
                            /ch[ọo]n\s*([A-K])(\:|\.|)$/gi,
                            ""
                        ))),
                    (e.resultContent = a.fixText(e.resultContent)),
                    a.other.findAnswer[e.numberQuestion] &&
                        a.other.findAnswer[e.numberQuestion].length &&
                        (e.resultAnswer = e.resultAnswer.concat(
                            a.other.findAnswer[e.numberQuestion]
                        )),
                    (e.resultAnswer = e.resultAnswer.map((t) =>
                        t.toUpperCase()
                    ));
                e.resultAnswer = Array.from(new Set(e.resultAnswer));
                var s = a.findLevel(e.text);
                (e.level = s.level),
                    (e.text = s.text),
                    (s = a.findLevel(e.resultContent)),
                    (e.level = e.level || s.level),
                    (e.resultContent = s.text);
            });
            var r,
                o = parseFloat(10 / a.arrQuestions.length).toFixed(2),
                l = "";
            a.arrQuestions.map((t) => {
                e++,
                    (r = {
                        title: "CÂU " + t.numberQuestion,
                        content: t.text,
                        answer: {
                            type: 2,
                            answer: t.answers,
                        },
                        point: o,
                        explain: t.resultContent,
                        question_id: e,
                        level: t.level,
                        keys: t.resultAnswer.toString(),
                    }),
                    (l += n.itemquestion(r));
            }),
                a.other.numbering && a.other.image
                    ? Swal.fire({
                          icon: "warning",
                          title: "CHÚ Ý!!!",
                          text: `Hệ thống phát hiện có ${a.other.numbering} mục có sử dụng ĐÁNH SỐ TỰ ĐỘNG. Nếu hệ thống phân tích không chính xác thì hãy TẮT ĐÁNH SỐ TỰ ĐỘNG trong file và tiến hành thử lại.\n\t\t\t\t\tĐỒNG THỜI, Hệ thống phát hiện có ${a.other.image} hình ảnh bị lỗi. Hình ảnh lỗi đã được bôi đỏ. Hãy soát lại đề thi trước khi lưu để tránh tình trạng thiếu hình ảnh trong đề thi.`,
                      })
                    : a.other.numbering
                    ? Swal.fire({
                          icon: "warning",
                          title: "CHÚ Ý!!!",
                          text: `Hệ thống phát hiện có ${a.other.numbering} mục có sử dụng ĐÁNH SỐ TỰ ĐỘNG. Nếu hệ thống phân tích không chính xác thì hãy TẮT ĐÁNH SỐ TỰ ĐỘNG trong file và tiến hành thử lại.`,
                      })
                    : a.other.image &&
                      Swal.fire({
                          icon: "warning",
                          title: "CHÚ Ý!!!",
                          text: `Hệ thống phát hiện có ${a.other.image} hình ảnh bị lỗi. Hình ảnh lỗi đã được bôi đỏ. Hãy soát lại đề thi trước khi lưu để tránh tình trạng thiếu hình ảnh trong đề thi.`,
                      }),
                $("#app .sectionQuiz").eq(s).html(l),
                n.refreshQuizs(),
                a.ngAfterViewChecked(),
                updateMathContent();
            // typeof MathJax != "undefined" && MathJax.typesetPromise();
        }
        setWmfParameter() {
            this.wmf = new WMFConverter();
        }
        ngOnInit() {
            (this.arrStatusFileExam = ["Đang khởi tạo công cụ ..."]),
                (this.isShowLoadingFileExam = !0),
                this.setWmfParameter(),
                (this.isShowLoadingFileExam = !1);
        }
        // eventAddQuestion = () => {
        //     const buttonAddQuestionMore = document.querySelector(
        //         "[add-more-question]"
        //     );
        //     if (buttonAddQuestionMore) {
        //         buttonAddQuestionMore.classList.remove("hidden");
        //     }
        //     window.addEventListener("quiz.add.question", (e) => {
        //         this.arrQuestions.push({
        //             answers: [
        //                 { text: "", key: "A" },
        //                 { text: "", key: "B" },
        //                 { text: "", key: "C" },
        //                 { text: "", key: "D" },
        //             ],
        //             categoryId: 0,
        //             colInLine: 4,
        //             group: 1,
        //             idQuestionBox: "question_item_box_" + this.arrQuestions,
        //             isEdit: false,
        //             isShowAttach: false,
        //             isShowResultContent: true,
        //             keyStart: "CÂU",
        //             numberQuestion: this.arrQuestions.length + 1,
        //             point: 0,
        //             questionMedia: [],
        //             resultAnswer: [],
        //             resultContent: "",
        //             text: "",
        //             typeNumber: 1,
        //             typeQuestion: 2,
        //         });
        //         this.renderQuestion();
        //         window.dispatchEvent(new CustomEvent("quiz.refresh"));
        //     });
        // };
        ngAfterViewChecked() {
            this.arrImageWmf.length && this.convertWmfToPng(0);
        }
        convertWmfToPng(t) {
            var e = this,
                s = jQuery("#tracnghiem .wmf_" + t),
                i = this.wmf.toPNG(this.arrImageWmf[t]);
            s.attr("src", i),
                s.addClass("img-fluid base64"),
                s.removeAttr("width"),
                s.removeAttr("height"),
                setTimeout(() => {
                    t + 1 < e.arrImageWmf.length
                        ? e.convertWmfToPng(t + 1)
                        : t + 1 === e.arrImageWmf.length &&
                          ((e.doneConvertImage = !0), e.isActionSubmit);
                }, 8);
        }
    }
});
function updateMathContent() {
    try {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
    } catch (error) {}
}
function decode(str) {
    let txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}
