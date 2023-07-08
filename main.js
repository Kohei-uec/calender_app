console.log("load js file");

let main = document.getElementById("main");
let btnarea = document.getElementById("btnarea");
let daysarea = document.getElementById("daysarea");

let nextbtn = new Button();
nextbtn.setText("NEXT");
nextbtn.setListener(testfnc);
nextbtn.addTo(btnarea);

let calender = {
    year    : 2023,
    month   : 1,
    days : []
}
calender.days.push(new Day(12));
calender.days.push(new Day(13));
showDays(calender.days);

//test
function testfnc(evt){
    console.log(evt);
}

function showDays(days){
    daysarea.innerHTML = "@";
    for(let d of days){
        //console.log(d);
        d.addTo(daysarea);
    }
}