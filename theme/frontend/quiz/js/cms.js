var QUIZ_CMS = (() => {
    const selectTeacher = () => {
        const selectUser = document.querySelector('select[id="quiz_user_id"]');
        const selectSubject = document.querySelector(
            'select[id="quiz_subject_id"]'
        );

        if (!selectUser || !selectSubject) return;
        selectUser.onchange = () => {
            loadClassTeacher(selectUser, selectSubject);
        };

        selectSubject.onchange = () => {
            loadClassTeacher(selectUser, selectSubject);
        };
    };

    var loadClassTeacher = (selectUser, selectSubject) => {
        const listClassTeacherEl = document.querySelector(".check_class");
        if (selectUser.value == "") {
            return;
        }
        if (selectSubject.value == "") {
            return;
        }
        $.ajax({
            url: "quiz-data/get-user-of-class-teacher",
            method: "POST",
            data: {
                id: selectUser.value,
                subject_id: selectSubject.value,
            },
            beforeSend: () => {
                listClassTeacherEl &&
                    (listClassTeacherEl.innerHTML = `<style>.rs-loading-main{display: flex; justify-content: center; align-items: center;} .rsl-wave {font-size: var(--rs-l-size, 2rem); color: var(--rs-l-color, #ee4d2d); display: inline-flex; align-items: center; width: 1.25em; height: 1.25em; } .rsl-wave--icon { display: block; background: currentColor; border-radius: 99px; width: 0.25em; height: 0.25em; margin-right: 0.25em; margin-bottom: -0.25em; -webkit-animation: rsla_wave .56s linear infinite; animation: rsla_wave .56s linear infinite; -webkit-transform: translateY(.0001%); transform: translateY(.0001%); } @-webkit-keyframes rsla_wave { 50% { -webkit-transform: translateY(-0.25em); transform: translateY(-0.25em); } } @keyframes rsla_wave { 50% { -webkit-transform: translateY(-0.25em); transform: translateY(-0.25em); } } .rsl-wave--icon:nth-child(2) { -webkit-animation-delay: -.14s; animation-delay: -.14s; } .rsl-wave--icon:nth-child(3) { -webkit-animation-delay: -.28s; animation-delay: -.28s; margin-right: 0; }</style><div class="rs-loading-main"><div class="rsl-wave"> <span class="rsl-wave--icon"></span> <span class="rsl-wave--icon"></span> <span class="rsl-wave--icon"></span> </div></div>`);
            },
        }).done((res) => {
            listClassTeacherEl.innerHTML = res;
        });
    };
    var init = () => {
        selectTeacher();
    };
    return {
        _: () => {
            init();
        },
    };
})();
window.addEventListener("DOMContentLoaded", function () {
    QUIZ_CMS._();
});
