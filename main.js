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


//test
function testfnc(evt){
    console.log(evt);
}

function showDays(days){
    daysarea.innerHTML = "";
    for(let d in days){
        d.addTo(daysarea);
    }
}