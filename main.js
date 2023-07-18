console.log("load main.js");

let main = document.getElementById("main");
let cheader = document.getElementById("cheader");
let montharea = document.getElementById("ctitle");
let btnarea1 = document.getElementById("btnarea1");
let btnarea2 = document.getElementById("btnarea2");
let daysarea = document.getElementById("daysarea");
let weekareas = [
    document.getElementById("week1"),
    document.getElementById("week2"),
    document.getElementById("week3"),
    document.getElementById("week4"),
    document.getElementById("week5"),
    document.getElementById("week6"),
]

let today = new Date();
let calender = new Calender(today.getFullYear(), today.getMonth()+1, today.getDate());
calender.show();

let prebtn = new Button("< PRE MON", btnarea1, ()=>{
    let y = calender.year;
    let m = calender.month.month-1;
    if(m == 0){
        m = 12;
        y--;
    }
    calender.changeTo(y,m);    
});
let nextbtn = new Button("NEXT MON>", btnarea2, ()=>{
    let y = calender.year;
    let m = calender.month.month+1;
    if(m == 13){
        m = 1;
        y++;
    }
    calender.changeTo(y,m);
});


//window size change
window.onresize = resize;
window.onload = resize;


//Notes
//スケジュールをローカルストレージに保存、読み込み

let Note = function(y,m,d,txt){
    this.year = y;
    this.month = m;
    this.date = d;
    this.txt = txt;
}
let notes = [];

function save_notes(){
    let str = JSON.stringify(notes);
    localStorage.setItem("notes",str);
    console.log("save");
}

function load_notes(){
    let dat = localStorage.getItem("notes");
    if(dat === null){return;}
    dat = JSON.parse(dat);

    //apply the txt in days
    for(let n of dat){
        calender.getDate(n.year, n.month, n.date).setNote(n.txt);
    }
}

load_notes();//ページ読み込み時

//test
/*
let test = new Button("save", btnarea2, ()=>{
    save_notes();
});
let test2 = new Button("load", btnarea2, ()=>{
    load_notes();
});
let test3 = new Button("clear", btnarea2, ()=>{
    localStorage.clear();
});
*/