console.log("load js file");
let nextbtn = new Button();
nextbtn.setText("NEXT");
nextbtn.setListener(testfnc);
let wrapper = document.getElementById("wrapper");
nextbtn.addTo(wrapper)


//test
function testfnc(evt){
    console.log(evt);
}