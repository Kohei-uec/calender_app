class MyElement{
    constructor(){
        this.elm = null;
    }
    setText(v){
        this.elm.innerText = v;
    }

    setListener(fnc){
        this.elm.addEventListener("click",()=>{
            fnc();
        });
    }

    addTo(elm_id){
        let prt;
        if(typeof(elm_id) === "string"){
            prt = document.getElementById(elm_id);
        }else if(elm_id != null){
            prt = elm_id
        }
        //console.log(typeof(elm_id));

        prt.append(this.elm);
    }
}
class Button extends MyElement{
    constructor(){
        super();
        //make element
        this.elm = document.createElement('button');
        this.elm.className = "btn";
    }
}


class Day extends MyElement{
    constructor(day){
        super();
        this.day = day;

        //make elment
        this.elm = document.createElement("div");
        this.elm.className = "day-box";

        let h = document.createElement("h3");
        h.innerText = day;
        this.elm.append(h);
    }
}

class Calender{
    
}

//window size change
window.onresize = resize;
window.onload = resize;

function getMainareaSize(){
    let w = window.innerWidth;
    let h = window.innerHeight;
    h -= document.getElementById("header").offsetHeight;
    h -= document.getElementById("footer").offsetHeight;
    console.log(document.getElementById("header").offsetHeight,document.getElementById("footer").offsetHeight);
    return {width:w, height:h};
}

function resize(){
    let size = getMainareaSize();
    console.log("size = ",size.width,size.height);
    main.style.width = size.width + "px";
    main.style.height = size.height + "px";
}