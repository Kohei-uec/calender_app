console.log("load js file");

let main = document.getElementById("main");
let btnarea = document.getElementById("btnarea");

let nextbtn = new Button();
nextbtn.setText("NEXT");
nextbtn.setListener(testfnc);
nextbtn.addTo(btnarea);

let calender = new Calender();
calender.addTo(main);
calender.resize();

//window size change
window.onresize = resize;
window.onload = resize;

//test
function testfnc(evt){
    console.log(evt);
}