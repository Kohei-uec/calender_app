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
    constructor(date, day){
        super();
        this.date = date;
        this.day = day;

        //make elment
        this.elm = document.createElement("div");
        this.elm.className = "day-box";

        let h = document.createElement("h3");
        h.innerText = date;
        this.elm.append(h);
    }

    resize(width,height){
        let margin = 1;
        this.elm.style.margin =  margin + "px"
        this.elm.style.width = width-margin*2 + "px";
        this.elm.style.height = height-margin*2 + "px";
    }
}
class DayHead extends Day {
    static names = ["日","月","火","水","木","金","土"];
    constructor(day){
        super(DayHead.names[day],day);
        if(day == 0){
            this.elm.style.backgroundColor = "#fdd";
        }else if(day == 6){
            this.elm.style.backgroundColor = "#cdf";
        }else{
            this.elm.style.backgroundColor = "#ddd";
        }
    }
}

class Month{
    constructor(year ,month){
        this.month = month;
        this.year = year;

        this.days = [];

        let i=1;
        let date = new Date(year,month-1,i);//1月がmonth=0
        while(date.getMonth() == month-1){
            this.days.push(
                new Day(date.getDate(),date.getDay())
            );
            date.setDate(++i);
        }
    }

    get befordays() {
        return this.days[0].day;
    }
    get afterdays() {
        return 6 - this.days[this.days.length - 1].day;
    }
}

class Calender{
    constructor (year, month) {
        this.year = year;
        this.month = new Month(year,month);
        this.days = [];
        for(let i=0; i<7; i++){
            this.days.push(new DayHead(i));
        }

        this.dates = [];
        this.setDates();

        this.showCalenderTitle();
        this.showDays();
        this.showDates();
    }

    setDates() {
        for(let i=0; i<this.month.befordays; i++){
            this.dates.push(new Day(0,0)); //dammy
        }
        this.dates.push(...this.month.days);
        for(let i=0; i<this.month.afterdays; i++){
            this.dates.push(new Day(0,0)); //dammy
        }
    }
    
    showDays(){
        for(let d of this.days){
            d.addTo(daysarea);
        }
    }
    showDates(){
        for(let d of this.dates){
            d.addTo(daysarea);
        }
    }

    showCalenderTitle(){
        let str = this.year+"年" + this.month+"月";
        montharea.innerText = str;
    }
}

// Holidays API
// https://api.national-holidays.jp/
function getHolidays(y,m,callback){
    if(m<10){//MMに変換
        m = "0" + m;
    }
    let url = "https://api.national-holidays.jp/" + y + m;

    const req = new XMLHttpRequest();
    req.addEventListener("load", function () {
        holidays = JSON.parse(this.response);
        console.log(holidays);
        callback();
    });
    req.open("GET", url);
    req.send();
}

let holidays;
getHolidays(2023,5,()=>{
    for(let holiday of holidays){
        console.log(holiday);
    }
});


//window size change
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
    let h = daysarea.clientHeight/6.5;
    for(let d of calender.days){
        d.resize(w,h/2);
    }
    for(let d of calender.dates){
        d.resize(w,h);
    }
}