"use strict";
var CART = (function () {
    var buyItemBoxs = document.querySelectorAll(".buy-item-box");
    var setUpBuyItemBox = function () {
        buyItemBoxs.forEach((buyItemBox) => {
            var btnBuyItems = buyItemBox.querySelectorAll(".btn-buy-item");
            btnBuyItems.forEach((btnBuyItem) => {
                btnBuyItem.addEventListener("click", function () {
                    _initButtonBuyItem(this);
                });
            });
        });
    };
    var _initButtonBuyItem = function (button) {
        BASE_GUI.disableButton(button);
        const formData = new FormData();
        formData.append("action", button.dataset.action);
        formData.append("id", button.dataset.id);
        XHR.send({
            url: "cart/add",
            method: "POST",
            formData: formData,
        }).then((res) => {
            BASE_GUI.enableButton(button);
            NOTIFICATION.toastrMessageRedirect(res);
        });
    };
    var initDeleteItemCart = function () {
        var listItembtnDeleteItemCart = document.querySelectorAll(
            ".btn-delete-item-cart"
        );
        listItembtnDeleteItemCart.forEach((itembtnDeleteItemCart) => {
            itembtnDeleteItemCart.addEventListener("click", function () {
                var _this = this;
                BASE_GUI.disableButton(_this);
                const formData = new FormData();
                formData.append("row", itembtnDeleteItemCart.dataset.row);
                formData.append(
                    "instance",
                    itembtnDeleteItemCart.dataset.instance
                );
                XHR.send({
                    url: "cart/delete-item",
                    method: "POST",
                    formData: formData,
                }).then((res) => {
                    BASE_GUI.enableButton(_this);
                    if (res.code == 200) {
                        window.location.reload();
                    } else {
                        NOTIFICATION.toastrMessage(res);
                    }
                });
            });
        });
    };
    var showContentPaymentMethod = function () {
        $(document).on("change", ".payment-method__item input", function () {
            $(".payment-method__item .method-des").slideUp(300);
            $(this)
                .closest(".payment-method__item")
                .find(".method-des")
                .slideDown(300);
        });
    };
    var sendOrderSuccess = function (res) {
        if (res.code == 200 && res.type == "megapay") {
            $(".megapayment-result").html(res.html);
            openPayment(1, "https://sandbox.megapay.vn/");
        } else {
            BASE_GUI.enableButton(button);
            NOTIFICATION.toastrMessageRedirect(res);
        }
    };
    return {
        _: function () {
            setUpBuyItemBox();
            initDeleteItemCart();
            showContentPaymentMethod();
        },
        sendOrderSuccess: function (res) {
            sendOrderSuccess(res);
        },
    };
})();
window.addEventListener("DOMContentLoaded", function () {
    CART._();
});
