"use strict";

var SEARCH = (function(){
    var search = document.querySelector('[search="search"]');
    var _timeOut = 300,
    _hasHighlight = true,
    _colorChange = '#ff4575',
    _changeHTML = true,
    _waiting,
    _showNote,
    _colorLoading = '#f0a4b8',
    _showResult = true,
    _urlSearch = 'tim-kiem',
    _mainResult = document.querySelector('.search-results'),
    _classItem = '.search-item',
    _classNeedHighLight = '.item-info__name';

    var setConfig = function(options){
        _timeOut = options.timeOut ?? 300;
        _colorLoading = options.colorLoading ?? '#f0a4b8';
        _urlSearch = options.urlSearch ?? '/tim-kiem';
        _hasHighlight = options.highlight ?? true;
        _colorChange = options.colorChange ?? 'red';
        _mainResult = document.querySelector(options.mainResult) ?? _mainResult;
        _classItem = options.classItem ?? '.search-item';
        _classNeedHighLight = options.classNeedHighLight ?? '.item-info__name';
    }

    var searchItems = function(){
        search.addEventListener('input',searchNow);
    }

    function searchNow(){
        clearTimeout(_waiting);
        clearTimeout(_showNote);
        if(search.value.length == 0){
            _showResult = false;
            styleResultWait(_showResult);
            return;
        }
        if(search.value.length < 3){
            _showResult = true;
            styleResultWait(_showResult);
            _showNote = setTimeout(function(){
                _mainResult.innerHTML = '<p class="text-center cl-gold p-2">Vui lòng nhập từ khóa có ít nhất 3 kí tự</p>';
            },_timeOut);
            return;
        }
        _showResult = true;
        styleResultWait(_showResult);
        _waiting = setTimeout(function(){
            XHR.send({
                method:'POST',
                url: _urlSearch,
                data:{
                    q:search.value,
                }
            }).then((res) => {
                _mainResult.innerHTML = res.html;
                if(_hasHighlight){
                    hightlightResult(search.value);
                }
            });
        },_timeOut);
    }

    var styleResultWait = function(showResult){
    if(_changeHTML){
            _mainResult.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="98px" height="98px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="rotate(0 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(30 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(60 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(90 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(120 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(150 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(180 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(210 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(240 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(270 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(300 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
        </rect>
        </g><g transform="rotate(330 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${_colorLoading}">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
        </rect>
        </g>
        </svg>`
    }

    if(showResult){
        Object.assign(_mainResult.style,{
            visibility:"visible",
            pointerEvents: "all",
            opacity: 1,
        });
    }else{
        Object.assign(_mainResult.style,{
            visibility:"hidden",
            pointerEvents: "none",
            opacity: 0,
        });
    }
}

var hightlightResult = function (name) {
    const items = document.querySelectorAll(_classItem);
    Array.from(items).filter(function (current) {
        var titles = current.querySelectorAll(_classNeedHighLight);
        var keywordRaw = name;
        var keyword = nonAccentVietnamese(keywordRaw);
        var keys = keyword.split(" ");
        keys.forEach(function (key) {
            key = key.trim();
            if (key.length == 0) return;
            var re = new RegExp("(" + key + ")", "ig");
            for (var i = 0; i < titles.length; i++) {
                var titleRawText = titles[i].innerHTML;
                titleRawText = titleRawText.replace(re,`<b>$&</b>`);
                titles[i].innerHTML = titleRawText;
            }
        });
        current.querySelectorAll('b').forEach(function(el){
            el.style.color = _colorChange;
        })
    });


};

function nonAccentVietnamese(keyword) {
    keyword = keyword.toLowerCase();
    keyword = keyword.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    keyword = keyword.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    keyword = keyword.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    keyword = keyword.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    keyword = keyword.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    keyword = keyword.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    keyword = keyword.replace(/đ/g, "d");
        keyword = keyword.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        keyword = keyword.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return keyword;
    }

    function clickOutside(){
      window.onclick = function(e){
        if(!e.target.closest('form')){
          Object.assign(_mainResult.style,{
            visibility:"hidden",
            pointerEvents: "none",
            opacity: 0,
        });
      }
  }
}
return{
    load:(function(){
        searchItems();
        clickOutside();
    })(),
    setConfig:function(options){
        setConfig(options);
    }
}
})()
SEARCH.setConfig({
    timeOut: 300, //Thời gian gõ
    colorLoading: '#ffdc73', // Màu hiệu ứng loading
    urlSearch: '/tim-kiem', // Đường dẫn tìm kiếm
    highlight: true, // HighLight từ tìm kiếm
    colorChange:'#ff4575', //Màu muốn thay đổi
    mainResult: '.search-results', // Box kết quả
    classItem: '.search-item', // Item
    classNeedHighLight: '.item-info__name', //Phần muốn highlight
    highlight: false
})