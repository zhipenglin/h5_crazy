import './lib/flexible'
import $ from 'jquery'
import FastClick from 'fastclick'
import director from './director'

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
            time:3000
        }
    },{
        name:'girl',
        options:{
            callback($page){
                return new Promise((resolve)=>{
                    $page.on('touchend touchcancel',(e)=>{
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
}

start();


