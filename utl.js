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
    constructor(txt, parent, listener){
        super();
        //make element
        this.elm = document.createElement('button');
        this.elm.className = "btn";

        //setting
        if(txt){
            this.setText(txt);
        }
        if(listener){
            this.setListener(listener);
        }
        if(parent){
            this.addTo(parent);
        }
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

    resize(width,height){
        this.elm.style.margin = "1px"
        this.elm.style.width = width-2 + "px";
        this.elm.style.height = height-2 + "px";
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
    h -= document.getElementById("header").clientHeight;
    h -= document.getElementById("footer").clientHeight;
    return {width:w, height:h};
}

function resize(){
    let size = getMainareaSize();
    //console.log("size = ",size.width,size.height);

    //main
    main.style.height = size.height + "px";

    //c header
    cheader.style.height = size.height/10 + "px";

    //days area
    daysarea.style.height = size.height*9/10 + "px"

    //days
    let w = daysarea.clientWidth/7;
    let h = daysarea.clientHeight/6;
    for(let d of calender.days){
        d.resize(w,h);
    }
}