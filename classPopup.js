


//TODO use popup ID in callback names

function Popup (args) {

  var args = args || {};
  this.id = args.id || "popup-" + Math.round(Math.random() * 100000);
  this.fields = args.fields || [];
  this.buttons = args.buttons || [];
  this.callback = args.callback || false;


  this.show = function () {

    if (this.buttons.length < 1) {
      this.addButton({ type:"submit" });
      this.addButton({ type:"cancel" });
    }

    if (document.getElementById(this.id)) {

      $("#" + this.id + "-modal").show();
      $("#" + this.id).show();

    } else {

      var el = this.createElement();
      //document.getElementById("my-container").appendChild(el);
      document.body.appendChild(el);

    }

  }



  this.createElement = function () {

    // modal div
    var e = document.createElement("div");
    e.style = "width:100%; height:100%; background-color:#66666633; position:fixed; left:0; top:0; z-index:1;";
    e.id = this.id + "-modal";
    document.body.appendChild(e);


    // dialog
    var el = document.createElement("div");
    el.id = this.id;
    var s = 'width:300px;';
    s += 'position:fixed;left:100px;top:100px;';
    s += 'background-color:#f9423a; z-index:9999;';
    el.style = s;

    // add fields
    var fieldContainer = document.createElement("div");
    fieldContainer.style = "background-color:#005eb8;";

    for (var i = 0; i < this.fields.length; i++) {
      var f = this.fields[i].createElement();
      fieldContainer.appendChild(f);
    }

    el.appendChild(fieldContainer);


    // add buttons
    var buContainer = document.createElement("div");
    buContainer.style = "background-color:#aaffcc;";

    for (var i = 0; i < this.buttons.length; i++) {
      var b = this.buttons[i].createElement();
      buContainer.appendChild(b);
    }

    el.appendChild(buContainer);

    return el;

  }



  //this.clickedMe = function () {
  //  console.log("CLICKED ME");
  //}


  this.cancelOLD = function () {
    $("#" + this.id + "-modal").hide();
    $("#" + this.id).hide();
  }


  this.close = function () {
    document.getElementById(this.id + "-modal").remove();
    document.getElementById(this.id).remove();
  }


  this.getData = function() {

    var data = [];

    for (var i = 0; i < this.fields.length; i++) {

      var v = {};
      v.id = this.fields[i].id;
      v.label = this.fields[i].label;
      v.value = $("#" + this.fields[i].id).val();
      data.push(v);

    }

    return data;

  }



  this.submit = function () {

    if (!this.callback) { return false; }

    var vars = [];

    for (var i = 0; i < this.fields.length; i++) {

      var v = {};
      v.id = this.fields[i].id;
      v.label = this.fields[i].label;
      v.value = $("#" + this.fields[i].id).val();
      vars.push(v);

    }

    window[this.callback](vars);

  }



  // ******** fields

  this.addField = function (args) {

    var args = args || {};
    args.parentID = this.id;
    var f = new this.Field(args);
    this.fields.push(f);

  }

  this.Field = function (args) {

    var args = args || {};
    this.parentID = args.parentID;
    this.id = args.id || this.parentID + "-Field-" + Math.round(Math.random() * 1000000);
    this.label = args.label || "My Field";
    this.value = args.value || 0;
    this.type = args.type || false;
    this.min = args.min || false;
    this.max = args.max || false;

    this.createElement = function () {

      var thisContainer = document.createElement("div");
      thisContainer.style = "margin-bottom:4px;";
      var thisLabel = document.createElement("div");
      thisLabel.style = "width:30%; background-color:#f9f9f9; font-size:11px; display:inline-block;";
      thisLabel.innerHTML = this.label;
      thisContainer.appendChild(thisLabel);
      var thisInput = document.createElement("input");
      thisInput.style = "font-size:11px; width:65%; display:inline-block;";
      thisInput.value = this.value;
      if (this.type) { thisInput.type = this.type; }
      if (this.min) { thisInput.min = this.min; }
      if (this.max) { thisInput.max = this.max; }
      thisInput.id = this.id;
      thisContainer.appendChild(thisInput);

      return thisContainer;

    }

  }




  // ******** buttons

  this.addButton = function (args) {

    var args = args || {};
    args.parent = this;
    var b = new this.Button(args);
    this.buttons.push(b);

  }

  this.Button = function (args) {

    var args = args || {};
    this.parent = args.parent;
    this.type = args.type || false; // submit OR cancel for default actions
    this.text = args.text || "";
    this.callback = args.callback || "";

    if (this.type == "submit") {
      if (!this.text) { this.text = "Submit"; }
      if (!this.callback) { this.callback = "popupSubmit"; }
    }

    if (this.type == "cancel") {
      if (!this.text) { this.text = "Cancel"; }
      if (!this.callback) { this.callback = "close"; }
    }

    this.createElement = function () {

      var el = document.createElement("button");
      var myThis = this;
      el.innerHTML = this.text;
      el.onclick = function () { myThis.buttonClicked(); };
      return el;

    }


    this.buttonClicked = function () {

      if (this.callback == "close") { this.parent.close(); }
      else { window[this.callback](this.parent.getData()); }

    }

  }


}


/*
function Button (args) {

  var args = args || {};
  this.text = args.text || "Cancel";
  this.action = args.action || 'p.close()';

  this.HTML = function () {

    var html = '<button onclick="' + this.action + '">' + this.text + '</button>';
    return html;

  }


  this.createElement = function () {

    var el = document.createElement("button");
    var myThis = this;
    el.innerHTML = this.text;
    el.onclick = function () { myThis.buttonClicked(); };
    return el;

  }


  this.buttonClicked = function () {
    eval(this.action);
  }



}
*/
