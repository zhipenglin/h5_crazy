import $ from 'jquery'
import activity from './pages/activity.ejs'
import friends from './pages/friends.ejs'
import girl from './pages/girl.ejs'
import index from './pages/index.ejs'
import video from './pages/video.ejs'
import './style/activity.scss'
import './style/friends.scss'
import './style/girl.scss'
import './style/index.scss'
import './style/video.scss'

const tplList={
    activity,friends,girl,index,video
};

var video_=document.createElement('video');
video_.setAttribute('src','../image/video.mp4');
video_.load();

export default class Page{
    constructor(name,options={}){
        this.name=name;
        this.data=options.data||{};
        this.options=Object.assign({
            selfAdaption:true
        },options);
        this.init();
    }
    init(){
        this.render();
    }
    start(){
        if(this.$page){
            $('.c-page').hide();
            this.$page.show();
        }
        this.options.callback&&this.options.callback(this.$page);
    }
    render(){
        if(this.options.selfAdaption){
            window.lib.flexible.refreshRem();
        }else{
            document.documentElement.style.fontSize='32px';
        }
        let tpl=tplList[this.name];
        if(tpl){
            this.$page=$(`<div class="c-page" style="display: none;">${tpl(this.data)}</div>`);
            $('.root').append(this.$page);
        }
    }
}