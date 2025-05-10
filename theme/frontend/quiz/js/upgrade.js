var UPGRADE = {
    showHistory:function(){
        var btnShow=Tech.$('.show-hidden__detail');
        if(typeof btnShow !=='undefined'){
            if(btnShow._element.length > 0){
                btnShow.forEach(function(elm){
                    elm._element.onclick=function(){
                        var id=Tech.$(this).attr('data-id');
                        var historyDetail=Tech.$('#' + id);
                        if(typeof historyDetail !=='undefined'){
                            Tech.$(this).toggleClass('active');
                            historyDetail.toggleSlide(300);
                            if(Tech.$(this).hasClass('active') == true){
                                Tech.$(this).html('Ẩn')
                            }else{
                                Tech.$(this).html('Xem chi tiết')

                            }
                        }
                    }
                })
            }else{
                btnShow._element.onclick=function(){
                    var id=Tech.$(this).attr('data-id');
                    var historyDetail=Tech.$('#' + id);
                    if(typeof historyDetail !=='undefined'){
                        Tech.$(this).toggleClass('active');
                        historyDetail.toggleSlide(300);
                        if(Tech.$(this).hasClass('active') == true){
                            Tech.$(this).html('Ẩn')
                        }else{
                            Tech.$(this).html('Xem chi tiết')

                        }
                    }
                }
            }
        }
    },
   
  
    init: function () {
        UPGRADE.showHistory();

    },
}
Tech.Query.ready(function () {
    setTimeout(function () {
        UPGRADE.init();
    }, 100);
    // BackToTop.create('.back-to-top', {
    //     threshold: 300,
    // })

});

