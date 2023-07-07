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

class Calender extends MyElement{
    constructor(){
        super();

        this.days = [];

        //make element
        this.elm = document.createElement('div');
        this.elm.style.backgroundColor = "#0f0";
    }

    resize(size = {width:500,height:300}){
        this.elm.style.width = "90%";
        this.elm.style.height = "90%";
    }

    test(){
        this.days.push(
            new Day(1)
        );
    }
}


class Day{
    constructor(day){
        this.day = day;

        //make elment
        this.elm = document.createElement("div");
        this.elm.className = "day-box";

        let h = document.createElement("h3");
        h.innerText = day;
        this.elm.append(h);
    }
}

function getMainareaSize(){
    let w = window.innerWidth;
    let h = window.innerHeight;
    h -= document.getElementById("header").clientHeight;
    h -= document.getElementById("footer").clientHeight;
    return {width:w, height:h};
}

function resize(){
    let size = getMainareaSize();
    console.log("size = ",size.width,size.height);
    main.style.width = size.width + "px";
    main.style.height = size.height + "px";
}