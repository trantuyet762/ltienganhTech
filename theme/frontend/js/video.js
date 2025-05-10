var YOUTUBE_PLAYER = (() => {
    var player
    function onYouTubeIframeAPIReady(videoId) {
        return new Promise(resolve => {
            player = new window.YT.Player('ytplayer', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    playsinline: 1,
                },
                events: {
                    onStateChange: changeStatusVideo
                },
            })
            resolve('ok');
        }).catch($err =>{
            setTimeout(() => {
                return onYouTubeIframeAPIReady(videoId);
            },1000);
        });
    }

    function changeStatusVideo(event){
        const media = document.querySelector('#ytplayer');
        if (event.data == window.YT.PlayerState.PLAYING && !media.hasAttribute('watched') || event.type === 'play') {
            var id = media.dataset.id;
            XHR.send({
                url:"danh-dau-da-xem",
                method:"POST",
                data:{
                    id: id
                }
            }).then(res =>{
                media.setAttribute('watched',true);
                document.querySelector(`.click-change-video[data-id="${id}"]`).classList.add('watched');
            });
        }
    }

    async function initVideo(){
        var main = document.querySelector('#ytplayer');
        var type = main.getAttribute('data-type');
        // Kiểm tra nếu là loại video bình thường
        var tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        var firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        if(Number(type) === 2){
            const params = main.getAttribute('data-href');
            const video = document.createElement('video');
            const paramData = JSON.parse(params);
            video.src = paramData.path + paramData.file_name;
            video.controls = true;
            video.setAttribute('controlsList',"nodownload");
            Object.assign(video.style,{
                width:"100%",
                height:"100%"
            });
            main.append(video);
            video.onplay = changeStatusVideo
            await playVideo();
        }else{
            await onYouTubeIframeAPIReady(youtube_parser(main.dataset.href));
            await playVideo();
        }
    }

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    function playVideo() {
        var buttonPlayVideo = Tech.$('.click-change-video');
        var timeoutClick;
        if (typeof buttonPlayVideo != 'undefined') {
            buttonPlayVideo._element.forEach(function (elm) {
                elm._element.onclick = function (event) {
                    event.preventDefault();
                    if(event.target.classList.contains('lock')){
                        toastr['error']('Bạn vui lòng mua khóa học để có thể xem video này!')
                        return false;
                    }
                    if(event.target.parentElement.classList.contains('active')){
                        return false;
                    }
                    clearTimeout(timeoutClick);
                    timeoutClick = setTimeout(() => {
                        var link = Tech.$(this).attr('data-link');
                        var _this = Tech.$(this);
                        var type = _this.attr('data-type');
                        var chapter_id = _this.attr('data-chapter');
                        var video_id = _this.attr('data-id');
                        // document.querySelector('.md-title-video').innerText = _this.innerText;
                        XHR.send({
                            url:'change-video-get-comment',
                            method: "POST",
                            data:{chapter_id,video_id}
                        }).then((res) => {
                            document.querySelector('.video-list__link li.active').classList.remove('active');
                            event.target.parentElement.classList.add('active');
                            var pathname = window.location.pathname.split('/')
                            pathname[2] = chapter_id;
                            pathname[3] = video_id;
                            if(Number(type) !== 2){
                                var main = document.querySelector('#ytplayer')
                                if(player){
                                    player.cueVideoById(youtube_parser(link));
                                }else{
                                    if(!main){
                                        var main = document.querySelector('.video');
                                        main.innerHTML = `<div class="video-lesson__main position-relative c-img" id="ytplayer" watched=${res.watched}" data-id="${video_id}"></div>`
                                    }
                                    onYouTubeIframeAPIReady(youtube_parser(link))

                                }
                            }else{
                                var main = document.querySelector('.video');
                                if(main.querySelector('video')){
                                    var video = main.querySelector('video')
                                }else{
                                    player = undefined;
                                    main.innerHTML = `<div class="video-lesson__main position-relative c-img" id="ytplayer" watched=${res.watched}"></div>`;
                                    var playVideo = document.querySelector('#ytplayer');
                                    var video = document.createElement('video');
                                    Object.assign(video.style,{
                                        width:"100%",
                                        height:"100%"
                                    });
                                    playVideo.append(video);
                                }
                                const paramData = JSON.parse(link);
                                video.src = paramData.path + paramData.file_name;
                                video.controls = true;
                                video.onplay = changeStatusVideo
                            }
                            main.dataset.id = video_id;
                            if(res.watched){
                                main.setAttribute('watched',true);
                            }else{
                                main.hasAttribute('watched') ? main.removeAttribute('watched') : '';
                            }
                            var newUrl = window.location.origin + pathname.join('/');
                            window.history.pushState({}, '', newUrl);
                            document.querySelector('.comment-box').innerHTML = res.comment
                            document.querySelector('.link-document').href = res.link_exercise !== null ? res.link_exercise : "javascript:void(0)"
                            const btnDocument = document.querySelector('.btn-download-document');
                            btnDocument.dataset.id = video_id;
                            VIDEO_DOWNLOAD.refresh();
                            FORM_VALIDATION.refresh();
                        })
                    },500)
                }
            })
        }
    }

    return {
        _:() =>{
            initVideo();
        },
        init:(videoId)=>{
            onYouTubeIframeAPIReady(videoId);
        }
    }
})()
YOUTUBE_PLAYER._();

