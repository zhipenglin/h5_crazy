import Page from './Page.js'
export default function director(sequence){
    let promise=Promise.resolve();
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
    function start(){
        var page=pageList.shift();
        page.start();
    }
    /*sequence.forEach((item)=>{
        item.options=Object.assign({},item.options);
        promise=promise.then(()=>{
            return new Promise((resolve,reject)=>{
                new Page(item.name,Object.assign({},item.options,{
                    callback(...args){
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
                    }
                }));
            });
        });
    });*/
    start();
    return promise;
}