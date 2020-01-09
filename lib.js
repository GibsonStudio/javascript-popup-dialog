

var p;

function init ()
{
}




function testCallback ()
{
  console.log("TEST 42");
  p.close();
}


function openPopupOne ()
{

  p = new Popup({ title:"Personal Details" });
  p.text = "Please enter your details:<br /><br />(be honest)";

  p.addField({ label:"Some Text", id:"myText", type:"textarea" });
  p.addField({ label:"Radio Test", id:"radio", type:"radio" });
  p.addField({ label:"Checkbox Test", id:"checkbox", type:"checkbox" });
  //p.addField({ label:"Date Test", id:"date", type:"date" });
  //p.addField({ label:"Color Test", id:"color", type:"color" });
  p.addField({ label:"Password Test",  type:"password" });
  p.addField({ label:"Range Test", type:"range", min:0, max:100, value:20 });
  p.addField({ label:"Search Test", type:"search" });
  //p.addField({ label:"Time Test", type:"time" });

  p.addField({ label:"Firstname", id:"firstname", value:"Jon" });
  p.addField({ label:"Lastname", id:"lastname", value:"Williams" });
  p.addField({ label:"Age", id:"age", type:"number", value:45, min:40, max:50 });
  p.show();

}



function openPopupTwo ()
{

  p = new Popup({ id:"guitar", title:"Guitar:", closeOnSubmit:false });
  p.addField({ label:"Make", id:"make", value:"Gibson" });
  p.addField({ label:"Model", id:"model", value:"Les Paul" });
  p.addField({ label:"Year Bought", id:"yearbought", type:"number", value:2010, min:1990, max:2030 });
  p.addField({ label:"Age", type:"number", value:45 });
  p.addButton({ type:"submit", callback:"popupTwoSubmit" });
  p.addButton({ type:"cancel" });
  p.addButton({ text:"TEST", callback:"testCallback" });
  p.show();

}



function popupSubmit (args)
{
  console.log("ONE");
  console.dir(args);
}


function popupTwoSubmit (args)
{
  console.log("TWO");
  console.dir(args);
}






/*
function addModal ()
{

  console.log("adding....");

  var e = document.createElement("div");
  e.style = "width:100%; height:100%; background-color:#66666633; position:fixed; left:0; top:0; z-index:1;";
  e.id = "my-modal";
  e.innerHTML = "WTF?";
  document.body.appendChild(e);
}
*/
