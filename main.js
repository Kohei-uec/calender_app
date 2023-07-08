console.log("load js file");

let main = document.getElementById("main");
let cheader = document.getElementById("cheader");
let montharea = document.getElementById("ctitle");
let btnarea1 = document.getElementById("btnarea1");
let btnarea2 = document.getElementById("btnarea2");
let daysarea = document.getElementById("daysarea");

let prebtn = new Button("< PRE", btnarea1, testfnc);
let nextbtn = new Button("NEXT >", btnarea2, testfnc);

let calender = {
    year    : 2023,
    month   : 1,
    days : []
}
for (let i=0;i<37; i++){
    calender.days.push(new Day(i));
}

showDays(calender.days);
showCalenderTitle(calender.year,calender.month);

//test
function testfnc(){
    console.log("test!");
}

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


function showDays(days){
    //daysarea.innerHTML = "@";
    for(let d of days){
        //console.log(d);
        d.addTo(daysarea);
    }
}


function showCalenderTitle(y,m,option){
    let str = y+"年" + m+"月" + (option??"");
    montharea.innerText = str;
}