console.log("load js file");

let main = document.getElementById("main");
let montharea = document.getElementById("ctitle");
let btnarea = document.getElementById("btnarea");
let daysarea = document.getElementById("daysarea");

let prebtn = new Button("< PRE", btnarea, testfnc);
let nextbtn = new Button("NEXT >", btnarea, testfnc);

let calender = {
    year    : 2023,
    month   : 1,
    days : []
}
for (let i=0;i<30; i++){
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