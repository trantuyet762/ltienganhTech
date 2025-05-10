const config = {
    apiKey: "AIzaSyDMoVSOZMt2eMB5YSkkry16iDw-p3NCdDo",
    authDomain: "onthi123-c2504.firebaseapp.com",
    projectId: "onthi123-c2504",
    storageBucket: "onthi123-c2504.appspot.com",
    messagingSenderId: "867542787718",
    appId: "1:867542787718:web:30f628d01ff12a73d39307",
    measurementId: "G-0X35FHECBD"
};
firebase.initializeApp(config);
function alertDanger(content){
	$.alert({
        icon: 'fa fa-warning',  
        closeIcon: true,
        type: 'red',
        columnClass: 'col-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6',
        typeAnimated: true,
        title: content,
        content: ' '
	});
}
var REGISTER_PHONE = (function() {
    var render = () => {
        firebase.auth().useDeviceLanguage();
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
    }
    var sendOTP = () => {
        const phoneNumber = getPhoneNumberFromUserInput();
        if(phoneNumber.length < 12 || phoneNumber.indexOf('+84') !== 0){
            alertDanger('Số điện thoại không chính xác');
            return false;
        }
        if (document.getElementById('g-recaptcha-response').value == "") {
            alertDanger('Vui lòng xác nhận captcha!');
            return false;
        }
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            $('.verification-register').slideDown(300);
            $('#recaptcha-container').slideUp(300);
        }).catch((error) => {
            grecaptcha.reset(window.recaptchaWidgetId);
            window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
            });
        	if (error.code == 400) {
        		alertDanger('Bạn đã bị chặn do lấy mã quá nhiều lần. Vui lòng quay lại sau!');
        		return;
        	}
        	if (error.code == 'auth/too-many-requests') {
        		alertDanger('Bạn đã bị chặn do lấy mã quá nhiều lần. Vui lòng quay lại sau!');
        		return;
        	}
            alertDanger('Không thể gửi được mã xác minh!');
        });
    }
    var getPhoneNumberFromUserInput = () =>{
        return document.querySelector('#phone_number_register').value.replace('0','+84');
    }
    var getCodeFromUserInput = () => {
        return document.querySelector('#verification-register').value;
    }
    var verifyCode = () => {
        const code = getCodeFromUserInput();
        if (typeof window.confirmationResult == 'undefined') {
        	alertDanger('Vui lòng xác nhận mã otp');
            return false;
        }
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            $('.form-register-otp').removeAttr('plus');
            FORM_VALIDATION.refresh();
            $('.content-validate-otp').slideUp(300);
            setTimeout(function(){ 
                $('.form-register-otp').submit();
            }, 300);
        }).catch((error) => {
            alertDanger('Mã xác nhận không chính xác');
        });
    }
    return {
        _: function() {
            render();
        },
        sendOTP:()=>{
            sendOTP();
        },
        verifyCode:()=>{
            verifyCode();
        }
    }
})();
REGISTER_PHONE._();