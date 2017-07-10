import './lib/flexible'
import $ from 'jquery'
import FastClick from 'fastclick'
import director from './director'
import setTitle from './lib/setTitle'
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);


function start(){
    director([{
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
                    $page.find('.J_friends').click(()=>{
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
                    $page.on('touchstart',(e)=>{
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
                function go(targetClass){
                    $page.find('.p-activity.active').removeClass('active');
                    $page.find(targetClass).addClass('active');
                    animate();
                }
                $page.find('.page-01').click(()=>{
                    go('.page-02');
                    $page.find('.page-02 .button').click(function(){
                        go(`.p-activity.${$(this).data('index')}`);
                    });
                    $page.find('.back-btn').click(()=>{
                        go('.page-02');
                    });
                });
            }
        }
    }]);

    let video=document.getElementById('p-video');
    video.pause();
    document.addEventListener("WeixinJSBridgeReady", function () {
        video.play();
        video.pause();
    }, false);
}

start();


