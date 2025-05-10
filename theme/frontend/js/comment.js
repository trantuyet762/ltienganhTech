"use strict";
var COMMENT = (function () {
    var _urlLoadmore, _urlLoadMoreChild, _hasFilter, _urlFilter, _urlLikeUnLike;
    function setUrl(urls) {
        (_urlLoadmore = urls.loadmore),
            (_urlLoadMoreChild = urls.loadmoreChild),
            (_hasFilter = urls.hasFilter),
            (_urlFilter = urls.filter),
            (_urlLikeUnLike = urls.likeUnLike);
    }

    // REPLY COMMENT
    function repComment() {
        const repComment = document.querySelectorAll(".rep-comment button");
        if (repComment.length > 0) {
            repComment.forEach(function (element,index) {
                element.onclick = function () {
                    const form = element.parentElement;
                    const formGroup = form.querySelector(".group-form");
                    if (element.type == "submit") {
                        let isTrue = validateFormRepComment(form, element);
                        if (isTrue) {
                            submitFormRepComment(formGroup, form, element);
                        }
                    } else {
                        repComment.forEach(function(elementRep,indexRep){
                            if(indexRep !== index) return;
                            elementRep.previousElementSibling.style.overflow = 'hidden';
                            const groupFormAnimate = elementRep.previousElementSibling.animate([{opacity:0}],{
                                duration: 200,
                                fill:"forwards"
                            });
                            groupFormAnimate.onfinish = function(){
                                elementRep.type = 'button';
                                elementRep.previousElementSibling.innerHTML = '';
                                elementRep.previousElementSibling.removeAttribute('style');
                                groupFormAnimate.cancel();
                                showFormRepComment(formGroup, element);
                            }
                        });
                    }
                };
            });
        }
    }

    function submitFormRepComment(formGroup, form, element) {
        const data = {
            isForm: true,
            form: form,
        };

        XHR.send(data)
            .then((response) => {
                if (response.code == 100) {
                    notification(response);
                    if (response.redirect_url) {
                        window.location.href = response.redirect_url;
                    }
                } else {
                    if (response.html) {
                        pushComment(formGroup, response);
                    }
                    notification(response);
                    element.type = "button";
                    formGroup.innerHTML = "";
                    return true;
                }
            })
            .then((response) => loadAll());
    }

    function validateFormRepComment(form, element) {
        let isTrue = true;
        const inputs = form.querySelectorAll("[name]:not([type='hidden'])");
        inputs.forEach(function (inputElement,index) {
            if (
                inputElement.value.trim() == "" &&
                inputElement.parentElement.className == "group-form"
            ) {
                isTrue = false;
                if (
                    inputElement.nextElementSibling?.className !==
                    "errorMessage"
                ) {
                    const span = document.createElement("span");
                    inputElement.parentElement.border =
                        "1px solid #fb4f4f";
                    span.innerHTML = inputElement.placeholder;
                    span.style.color = "#fb4f4f";
                    span.className = "errorMessage";
                    inputElement.parentElement.append(span);
                }
                inputElement.style.border = "1px solid #fb4f4f";
                inputs[index].focus();
            }

            inputElement.oninput = function(){
                if(inputElement.parentElement.querySelector("span")) {
                    inputElement.parentElement.querySelector("span").remove();
                    inputElement.removeAttribute('style');
                }
            }
        });
        return isTrue;
    }

    function showFormRepComment(formGroup, element) {
        var key = [];
        element.closest(".comment-action").style.display = "block";
        const div = document.createElement('div');
        div.className = "group-form";
        const textArea = document.createElement("textarea");
        textArea.name = "content";
        textArea.placeholder = element.dataset.placeholder;
        textArea.style.width = "100%";
        textArea.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 400,
            fill: "forwards",
        });
        textArea.oninput = function () {
            textArea.style.border = "1px solid var(--color-star-evalue);";
            if (textArea.parentElement.querySelector("span")) {
                textArea.parentElement.querySelector("span").remove();
            }
        };
        div.append(textArea);
        formGroup.append(div);
        textArea.focus();
        element.type = "submit";

        textArea.addEventListener("keydown", function (e) {
            const arrayKey = [13, 16, 17];
            if (
                arrayKey.find((value) => {
                    return value == e.which;
                })
            ) {
                key.push(e.which);
            }
            if (key[0] == 13) {
                e.preventDefault();
                formGroup.nextElementSibling.click();
                key = [];
            }
            if (key[0] == 17 || key[0] == 16) {
                if (key[0] !== 16 && key[1] == 13 && key.length <= 2) {
                    textArea.value += "\n";
                    key = [];
                } else if (key[1] == 65) {
                    key = [];
                } else if (key.length >= 2) {
                    key = [];
                }
            } else {
                key = [];
            }
        });

        textArea.addEventListener("keyup", function (e) {
            key = [];
        });
    }

    function pushComment(formGroup, response) {
        let commentChild;
        if (
            !formGroup.closest(".comment-item").querySelector(".comment-childs")
        ) {
            commentChild = document.createElement("div");
            commentChild.className = "comment-childs";
            formGroup.closest(".comment-item").appendChild(commentChild);
        } else {
            commentChild = formGroup
                .closest(".comment-item")
                .querySelector(".comment-childs");
        }
        commentChild.insertAdjacentHTML("beforeend", response.html);
    }

    // LOADMORE COMMENT CHILD
    function loadMoreChild() {
        const btnMore = document.querySelectorAll(".more-comment--child");
        btnMore.forEach(function (btn) {
            btn.onclick = function () {
                const parentId = btn.parentElement
                    .querySelector(".rep-comment")
                    .querySelector('[name="parent"]').value;
                var main = btn.previousElementSibling;
                var pagenumber = btn.getAttribute("page-current");
                pagenumber++;
                const options = {
                    url: _urlLoadMoreChild,
                    method: "POST",
                    data: {
                        parent_id: parentId,
                        page: pagenumber,
                        _token: document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                };
                XHR.send(options)
                    .then(function (response) {
                        if (pagenumber == response.lastPage) {
                            btn.remove();
                        } else {
                            btn.setAttribute("page-current", pagenumber);
                        }
                        return response.html;
                    })
                    .then(function (response) {
                        main.insertAdjacentHTML("beforeend", response);
                        return true;
                    })
                    .then(function () {
                        loadMoreChild();
                    });
            };
        });
    }

    // LOADMORE COMMENT
    function loadMore() {
        const btnMore = document.querySelector(".more-comment");
        if (btnMore) {
            btnMore.onclick = function () {
                var main = btnMore.previousElementSibling;
                const map_table = btnMore.getAttribute("page-table");
                const map_id = btnMore.getAttribute("page-id");
                var pagenumber = btnMore.getAttribute("page-current");
                pagenumber++;
                const datas = {};
                datas.map_table = map_table;
                (datas.map_id = map_id),
                    (datas.page = pagenumber),
                    (datas._token = document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"));
                if (_hasFilter) {
                    var input = document.querySelector(
                        ".comment-filter__lists input:checked"
                    );
                    if (input) {
                        datas.filter = input.value;
                    }
                }
                const options = {
                    url: _urlLoadmore,
                    method: "POST",
                    data: datas,
                };
                XHR.send(options)
                    .then(function (response) {
                        if (pagenumber == response.lastPage) {
                            btnMore.remove();
                        } else {
                            btnMore.setAttribute("page-current", pagenumber);
                        }
                        return response.html;
                    })
                    .then(function (response) {
                        main.insertAdjacentHTML("beforeend", response);
                        return true;
                    })
                    .then(function (response) {
                        loadAll();
                    });
            };
        }
    }

    // CALLBACK
    function receivedComment(
        response,
        dataForm,
        hasNotification = true,
        insertType = "item"
    ) {
        if (hasNotification) {
            notification(response);
            if (typeof tinyMCE !== "undefined") {
                tinyMCE.activeEditor.setContent("");
            }
        }
        var main = document.querySelector(".comment-box__list");
        // Kiểm tra có lastPage
        if (response.lastPage) {
            processingButtonLoadMore(response, {
                table: dataForm.map_table,
                id: dataForm.map_id,
            });
        }
        if (response.html) {
            if (insertType == "item") {
                main.insertAdjacentHTML(main.hasAttribute("after") ? "afterbegin" : "beforeend", response.html);
            } else {
                main.innerHTML = response.html;
            }
        }
        loadAll();
    }

    // NOTIFICATION
    function notification(response) {
        if (response.code == 200) {
            return toastr.success(response.message);
        } else {
            return toastr.error(response.message);
        }
    }

    // FILLTER
    function processingButtonLoadMore(res, data) {
        const buttonLoadMore = document.querySelector("button.more-comment");
        if (res.lastPage == 1) {
            if (buttonLoadMore) {
                buttonLoadMore.remove();
            }
        } else {
            if (!buttonLoadMore) {
                const buttonLoadMore = document.createElement("button");
                buttonLoadMore.className = "more-comment";
                buttonLoadMore.setAttribute("page-table", data.table);
                buttonLoadMore.setAttribute("page-id", data.id);
                buttonLoadMore.setAttribute("page-current", 1);
                buttonLoadMore.innerText = "Xem thêm";
                document
                    .querySelector(".comment-box__list")
                    .insertAdjacentElement("afterend", buttonLoadMore);
            }
        }
    }

    function filter() {
        const filterLists = document.querySelector(".comment-filter__lists");
        const inputs = document.querySelectorAll("[filter='rating']");
         
        inputs.forEach(function (input, index) {
            input.onchange = function (e) {
                const data = XHR.buildData(inputs);
                data['map_table'] = filterLists.dataset.table;
                data['map_id'] = filterLists.dataset.id;
                XHR.send({
                    url: _urlFilter,
                    method: "POST",
                    data: data,
                })
                .then((res) => {
                    processingButtonLoadMore(res, {
                        table: filterLists.dataset.table,
                        id: filterLists.dataset.id,
                    });
                    return res;
                })
                .then((res) => {
                    receivedComment(
                        res,
                        {
                            map_table: filterLists.dataset.table,
                            map_table: filterLists.dataset.id,
                        },
                        false,
                        "list"
                    );
                });
            };
        });
    }

    // LIKE
    function likeComment() {
        var buttons = document.querySelectorAll(".btn-like-comment");
        buttons.forEach(function (button) {
            button.onclick = function () {
                XHR.send({
                    method: "POST",
                    url: _urlLikeUnLike,
                    data: {
                        id: button.dataset.id,
                    },
                }).then(function (res) {
                    notification(res);
                    if (res.code !== 100) {
                        const count = button.querySelector("span");
                        if (button.classList.contains("like")) {
                            button.classList.remove("like");
                            count.innerText = Number(count.innerText) - 1;
                        } else {
                            button.classList.add("like");
                            count.innerText = Number(count.innerText) + 1;
                        }
                    }
                });
            };
        });
    }

    // keyDownEvent
    function triggerKeyDown(elContent = undefined, elform = undefined) {
        if (!elform) {
            var elform = document.querySelector(".formComment");
        }
        if (!elform) return;
        if (!elContent) {
            var elContent = elform.querySelector("textarea");
        }
        var key = [];

        elContent.addEventListener("keydown", function (e) {
            const arrayKey = [13, 16, 17];
            if (
                arrayKey.find((value) => {
                    return value == e.which;
                })
            ) {
                key.push(e.which);
            }

            if (key[0] == 13) {
                e.preventDefault();
                elform.querySelector('button[type="submit"]').click();
                key = [];
            }

            if (key[0] == 17 || key[0] == 16) {
                if (key[0] !== 16 && key[1] == 13 && key.length <= 2) {
                    elContent.value += "\n";
                    key = [];
                } else if (key[1] == 65) {
                    key = [];
                } else if (key.length >= 2) {
                    key = [];
                }
            } else {
                key = [];
            }
        });

        elContent.addEventListener("keyup", function (e) {
            key = [];
        });
    }

    function loadAll() {
        repComment();
        loadMore();
        loadMoreChild();
        likeComment();
    }

    return {
        load: (function () {
            window.addEventListener("DOMContentLoaded", (event) => {
                repComment();
                loadMore();
                loadMoreChild();
                likeComment();
                triggerKeyDown();
                if (_hasFilter) {
                    filter();
                }
            });
        })(),
        receivedComment: function (response, dataForm) {
            receivedComment(response, dataForm);
        },
        setUrl: function (urls) {
            setUrl(urls);
        },
        notification: function (res) {
            notification(res);
        },
    };
})();

var onlyRating = (function () {
    var rating = function () {
        const els = document.querySelectorAll('.star[name="rate"]');
        els.forEach(function (el, id) {
            el.onchange = function (e) {
                el.pre;
                els.forEach(function (elo, key) {
                    if (key !== id) {
                        elo.disabled = true;
                    }
                });
                const options = {
                    method: "POST",
                    url: "danh-gia/",
                    data: {
                        rate: el.value,
                        map_id: el.closest(".rating-now").dataset.id,
                        map_table: el.closest(".rating-now").dataset.table,
                        _token: document.querySelector(
                            'meta[name="csrf-token"]'
                        ).content,
                    },
                };

                XHR.send(options).then(function (res) {
                    COMMENT.notification(res);
                });
            };
        });
    };
    return {
        load: (function () {
            rating();
        })(),
    };
})();

var Tiny = (function () {
    const textarea = document.querySelector("#comment");
    if (typeof tinymce == "undefined") {
        return;
    }
    tinymce.init({
        selector: "#comment",
        menubar: false,
        statusbar: false,
        toolbar_location: "bottom",
        setup: function (editor) {
            editor.on("input", function (e) {
                tinyMCE.triggerSave();
                textarea.dispatchEvent(new Event("change"));
            }),
                editor.on("keyup", function (e) {
                    tinyMCE.triggerSave();
                    textarea.dispatchEvent(new Event("change"));
                });
        },
    });

    textarea.addEventListener("change", function () {
        if (textarea.value.trim == "") {
            tinyMCE.activeEditor.setContent("");
        }
    });
})();


if (document.querySelector(".comment-box")) {
    COMMENT.setUrl({
        loadmore: "/comment-other",
        loadmoreChild: "/comment-child-other",
        hasFilter: true,
        filter: "/filter-rating",
        likeUnLike: "/like-or-unlike",
    });
}