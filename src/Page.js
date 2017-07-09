import $ from 'jquery'
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
    render(){
        Promise.all([import(`./pages/${this.name}.ejs`),import(`./style/${this.name}.scss`)]).then(([tpl])=>{
            if(this.options.selfAdaption){
                window.lib.flexible.refreshRem();
            }else{
                document.documentElement.style.fontSize='32px';
            }
            let $page=$(`<div class="c-page">${tpl(this.data)}</div>`);
            $('.root').html($page);
            this.options.callback&&this.options.callback($page);
        });
    }
}