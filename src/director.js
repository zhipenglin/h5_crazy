import findIndex from 'lodash/findIndex'
import Page from './Page.js'
export default function director(sequence){
    let promise=Promise.resolve(),index=0;
    let pageList=sequence.map((item)=>{
        item.options=Object.assign({},item.options);
        return new Page(item.name,Object.assign({},item.options,{
            callback(...args){
                promise=promise.then(()=>{
                    return new Promise((resolve)=>{
                        if(item.options.callback){
                            let res=item.options.callback(...args);
                            if(res&&typeof res.then==='function'){
                                res.then(()=>{
                                    resolve();
                                });
                                return;
                            }
                        }
                        setTimeout(()=>{
                            resolve();
                        },item.options.time||0);
                    });
                }).then(()=>{
                    start();
                });
            }
        }));
    });
    function start(name){
        if(name){
            let currentIndex=findIndex(pageList,(item)=>item.name===name);
            if(currentIndex>-1){
                index=currentIndex;
            }
        }
        var page=pageList[index];
        if(page){
            page.start();
            index+=1;
        }
    }
    return {
        start
    };
}