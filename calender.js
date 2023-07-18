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
    constructor(year, month, date, day){
        super();
        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;

        //make elment
        this.elm = document.createElement("div");
        this.elm.className = "day-box";
        this.elm.onclick = ()=>{this.setNote();};
        //number
        this.h = document.createElement("h3");
        this.h.innerText = date;
        this.elm.append(this.h);
        //holidayname
        this.dayname = document.createElement("div");
        this.elm.append(this.dayname);
        //note
        this.note = document.createElement("div");
        this.note.className = "day-note";
        this.elm.append(this.note);

        if(this.day == 0){//日曜は赤字
            this.color = "#d22"
        }
    }

    resize(width,height){
        let margin = 1;
        this.elm.style.margin =  margin + "px"
        this.elm.style.width = width-margin*2 + "px";
        this.elm.style.height = height-margin*2 + "px";
    }

    setNote(txt){
        if(!txt){txt = prompt(this.date + "日の予定", this.note.innerText);}
        if(txt !== null){
            let d = notes.find((n)=>{n.year == this.year && n.month == this.month && n.date == this.date});
            if(!d){
                d = notes.push(new Note(this.year, this.month, this.date, txt))
            }else{
                d.txt = txt;
            }
            this.note.innerText = txt;
            save_notes();
        }
    }

    set Dayname(txt){
        this.dayname.innerText = txt;
    }
    set color(clr){
        this.elm.style.color = clr;
    }

}
class DayHead extends Day {
    static names = ["日","月","火","水","木","金","土"];
    constructor(day){
        super(null,null,DayHead.names[day],day);
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

        this.dates = [];

        let i=1;
        let date = new Date(year,month-1,i);//1月がmonth=0
        while(date.getMonth() == month-1){
            this.dates.push(
                new Day(year, month, date.getDate(),date.getDay())
            );
            date.setDate(++i);
        }

        this.setHolidays();
    }

    get befordays() {
        return this.dates[0].day;
    }
    get afterdays() {
        return 6 - this.dates[this.dates.length - 1].day;
    }

    
    //祝日の取得と反映
    setHolidays(){
        getHolidays(this.year,this.month,(days)=>{
            for(let holiday of days){
                //console.log(holiday);
                let date = new Date(holiday.date);
                let d = this.dates[date.getDate() - 1];
                d.Dayname = holiday.name;
                d.color = "#d22";
            }
            //calender.show();
        });
    }

}

class Calender{
    constructor (year, month, date) {
        this.year = year;
        this.months = [];
        this.month = this.getMonth(year,month);

        this.days = [];
        for(let i=0; i<7; i++){
            this.days.push(new DayHead(i));
        }

        this.dates = [];
        this.setToday(year, month, date);
        this.setDates();
    }

    setDates() {
        this.dates = []; //clear

        //前月で埋める
        if(this.month.befordays != 0){
            this.dates.push(...this.premonth.dates.slice(-this.month.befordays))
        }

        //今月
        this.dates.push(...this.month.dates);

        //来月で埋める
        this.dates.push(...this.nextmonth.dates.slice(0,this.month.afterdays))
    }
    setToday(y,m,d){
        let date = this.getMonth(y,m).dates[d-1];
        date.elm.className += " today-box";
    }

    show(){
        this.showCalenderTitle();
        this.showDays();
        this.showDates();
    }
    showDays(){
        daysarea.innerHTML = null;//clear
        for(let d of this.days){
            d.addTo(daysarea);
        }
    }
    showDates(){
        //clear weeks
        for(let w of weekareas){
            w.innerHTML = null;
        }
        let i = 0;
        for(let d of this.dates){
            d.addTo(weekareas[parseInt((i++)/7)]);
        }
    }
    showCalenderTitle(){
        let str = this.year+"年" + this.month.month+"月";
        montharea.innerText = str;
    }

    //指定月のMonthを取得。無ければ生成する。
    get premonth(){
        //調べる前の月
        let m = this.month.month - 1;
        let y = this.year;
        if(m == 0){
            m = 12;
            y -= 1; 
        }
        return this.getMonth(y,m);
    }
    get nextmonth(){
        //調べる次の月
        let m = this.month.month + 1;
        let y = this.year;
        if(m == 13){
            m = 1;
            y += 1; 
        }
        return this.getMonth(y,m);
    }
    getMonth(year,month){
        let m = this.months.find(e=>{
            return e.month == month && e.year == year
        });
        if(!m){//無ければ新たに生成して追加
            m = new Month(year,month);
            this.months.push(m);
        }
        return m;
    }
    getDate(year,month,date){
        return this.getMonth(year,month).dates[date-1];
    }

    //月の変更
    changeTo(year, month){
        this.year = year;
        this.month = this.getMonth(year,month);
        this.setDates();
        this.show();
        resize()
    }

}

// Holidays API
// https://national-holidays.jp/
function getHolidays(y,m,callback){
    if(m<10){//MMに変換
        m = "0" + m;
    }
    let url = "https://api.national-holidays.jp/" + y + m;

    const req = new XMLHttpRequest();
    req.addEventListener("load", function () {
        holidays = JSON.parse(this.response);
        if(holidays[0]){
            callback(holidays);
        }
    });
    req.open("GET", url);
    req.send();
}
let holidays;



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

    //days and dates
    let w = daysarea.clientWidth/7;
    let h = size.height*9/10/6.5;
    for(let d of calender.days){
        d.resize(w,h/2);
    }
    for(let d of calender.dates){
        d.resize(w,h);
    }
}