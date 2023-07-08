console.log("load js file");

let main = document.getElementById("main");
let cheader = document.getElementById("cheader");
let montharea = document.getElementById("ctitle");
let btnarea1 = document.getElementById("btnarea1");
let btnarea2 = document.getElementById("btnarea2");
let daysarea = document.getElementById("daysarea");

let prebtn = new Button("< PRE", btnarea1, testfnc);
let nextbtn = new Button("NEXT >", btnarea2, testfnc);

let calender = new Calender(2023, 7);
let month = new Month(2023,4);

//window size change
window.onresize = resize;
window.onload = resize;

//test
function testfnc(){
    console.log("test!");
}
