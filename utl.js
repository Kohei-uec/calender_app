class Button {
    constructor(){
        //make element
        this.elm = document.createElement('button');
        this.elm.className = "btn";
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
        console.log(typeof(elm_id));

        prt.append(this.elm);
    }
}

class Calender{
    constructor(){

    }

}

class Day{
    constructor(year, month, day){
        this.day = day;
    }
}