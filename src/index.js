import './lib/flexible'
import $ from 'jquery'
import debounce from 'lodash/debounce'
import FastClick from 'fastclick'
import director from './director'
import setTitle from './lib/setTitle'
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);


function start(){
    let api=director([{
        name:'index',
        options:{
            selfAdaption:false,
            time:3000
        }

    },{
        name:'friends',
        options:{
            selfAdaption:false,
            callback($page){
                setTitle('发现');
                return new Promise((resolve)=>{
                    let sum=2;
                    let timer=setInterval(()=>{
                        $page.find('.w-red-tips').text(sum);
                        if(++sum>5){
                            clearInterval(timer);
                            resolve();
                        }
                    },1000);
                    $page.find('.J_friends').off('click').click(()=>{
                        clearInterval(timer);
                        resolve();
                    });
                });
            }
        }
    },{
        name:'video',
        options:{
            callback($page){
                return new Promise((reslove)=>{
                    let video=$page.find('video')[0];
                    video.play();
                    let timer=setTimeout(()=>{
                        reslove();
                    },30000);
                    video.onload=function(){
                        clearTimeout(timer);
                    };
                    video.onended=function(){
                        reslove();
                    }
                });

            }
        }
    },{
        name:'girl',
        options:{
            callback($page){
                return new Promise((resolve)=>{
                    $page.off('touchstart touchend touchcancel click').on('touchstart',(e)=>{
                        e.preventDefault();
                    }).on('touchend touchcancel click',(e)=>{
                        e.preventDefault();
                        return resolve();
                    });
                });
            }
        }
    },{
        name:'activity',
        options:{
            callback($page){
                function animate(){
                    $page.addClass('animate');
                    setTimeout(()=>{
                        $page.removeClass('animate')
                    },50);
                }
                animate();
                renderHash();
                window.addEventListener('hashchange',renderHash);

                function renderHash(){
                    let args=location.hash.match(/activity\/(.*)/);
                    args&&args[1]&&render(args[1].replace(/_/g,'.'));
                }

                function render(targetClass){
                    $page.find('.p-activity.active').removeClass('active');
                    $page.find(targetClass).addClass('active');
                    animate();
                }

                function go(targetClass){
                    location.hash=`activity/${targetClass.replace(/\./g,'_')}`;
                }

                $page.off('click').on('click','.page-01',()=>{
                    go('.page-02');
                }).on('click','.page-02 .button',function(){
                    go(`.p-activity.${$(this).data('index')}`);
                }).on('click','.back-btn',()=>{
                    go('.page-02');
                });

                (function(){
                    var startX=0,startY=0,$target;
                    $page.off('touchstart touchmove').on('touchstart','.content-page',(e)=>{
                        startX=e.targetTouches[0].clientX,startY=e.targetTouches[0].clientY;
                    }).on('touchmove','.content-page',(e)=>{
                        var deltaX=e.targetTouches[0].clientX-startX,deltaY=e.targetTouches[0].clientY-startY;
                        if(Math.abs(deltaY)<20){
                            return;
                        }
                        if(Math.abs(deltaX)>Math.abs(deltaY)){
                            return;
                        }
                        $target=$page.find('.active')[deltaY>0?'prev':'next']('.content-page');
                    }).on('touchend','.content-page',()=>{
                        if($target&&$target.length){
                            go('.'+$target.data('target'));
                        }
                    });
                })();
            }
        }
    }]);

    api.start(/activity\//.test(location.hash)&&'activity');
    let video=document.getElementById('p-video');
    video.pause();
    document.addEventListener("WeixinJSBridgeReady", function () {
        video.play();
        video.pause();
    }, false);
}

start();


