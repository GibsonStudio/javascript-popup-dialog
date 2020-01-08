


//TODO: var p has infinite references to the Popup object class
//TODO: remove popup from DOM when closed?



var p;

function init ()
{

  /*
  p = new Popup();
  p.addField({ label:"Firstname", id:"firstname", value:"Jon" });
  p.addField({ label:"Lastname", id:"lastname", value:"Williams" });
  p.addField({ label:"Age", id:"age", type:"number", value:45, type:"number", min:40, max:50 });
  //p.addButton({ type:"submit" });
  //p.addButton({ type:"cancel", text:"QUIT" });

  p.show();
  */

}




function openPopupOne ()
{

  p = new Popup();
  p.addField({ label:"Firstname", id:"firstname", value:"Jon" });
  p.addField({ label:"Lastname", id:"lastname", value:"Williams" });
  p.addField({ label:"Age", id:"age", type:"number", value:45, min:40, max:50 });
  p.show();

}



function openPopupTwo ()
{

  p = new Popup();
  p.addField({ label:"Make", id:"make", value:"Gibson" });
  p.addField({ label:"Model", id:"model", value:"Les Paul" });
  p.addField({ label:"Year Bought", id:"yearbought", type:"number", value:2010, min:1990, max:2030 });
  p.addButton({ type:"submit", callback:"popupTwoSubmit" });
  p.addButton({ type:"cancel" });
  p.show();

}



function popupSubmit (args)
{

  console.log("SUBMIT");
  var args = args || {};
  console.dir(args);
  p.close();

}


function popupTwoSubmit (args)
{
  console.log("Popup TWO");
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
