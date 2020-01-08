





function Popup (args) {

  var args = args || {};
  this.id = args.id || "popup-" + Math.round(Math.random() * 100000);
  this.title = args.title || "";
  this.text = args.text || "";
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
      document.body.appendChild(el);

    }

  }



  this.createElement = function () {

    // modal div
    var e = document.createElement("div");

    e.style.setProperty("width", "100%");
    e.style.setProperty("height", "100%");
    e.style.setProperty("background-color", "rgba(51,51,51,0.5)");
    e.style.setProperty("position", "fixed");
    e.style.setProperty("left", "0");
    e.style.setProperty("top", "0");
    e.style.setProperty("z-index", "1");

    e.id = this.id + "-modal";
    var myThis = this;
    e.onclick = function () { myThis.close(); };
    document.body.appendChild(e);

    // dialog
    var el = document.createElement("div");
    el.id = this.id;

    el.style.setProperty("width", "300px");
    el.style.setProperty("padding", "10px");
    el.style.setProperty("position", "absolute");
    el.style.setProperty("left", "50%");
    el.style.setProperty("top", "100px");
    el.style.setProperty("margin-left", "-150px");
    el.style.setProperty("border-radius", "4px");
    el.style.setProperty("background-color", "#fffff6");
    el.style.setProperty("color", "#666666");
    el.style.setProperty("z-index", "9999");

    // add title
    if (this.title) {

      var titleContainer = document.createElement("div");

      titleContainer.style.setProperty("font-size", "14px");
      titleContainer.style.setProperty("font-weight", "bold");
      titleContainer.style.setProperty("margin-bottom", "10px");

      titleContainer.innerHTML = this.title;
      el.appendChild(titleContainer);

    }

    // add text?
    if (this.text) {

      var textContainer = document.createElement("div");

      textContainer.style.setProperty("font-size", "12px");
      textContainer.style.setProperty("margin-bottom", "20px");

      textContainer.innerHTML = this.text;
      el.appendChild(textContainer);

    }


    // add fields
    var fieldContainer = document.createElement("div");
    fieldContainer.style = "";

    for (var i = 0; i < this.fields.length; i++) {
      var f = this.fields[i].createElement();
      fieldContainer.appendChild(f);
    }

    el.appendChild(fieldContainer);


    // add buttons
    var buContainer = document.createElement("div");
    buContainer.style.setProperty("margin-top", "20px");

    for (var i = 0; i < this.buttons.length; i++) {
      var b = this.buttons[i].createElement();
      buContainer.appendChild(b);
    }

    el.appendChild(buContainer);

    return el;

  }


  this.close = function () {
    var m = document.getElementById(this.id + "-modal");
    var d = document.getElementById(this.id);
    document.body.removeChild(m);
    document.body.removeChild(d);
  }


  this.getData = function() {

    var data = [];

    for (var i = 0; i < this.fields.length; i++) {

      var f = this.fields[i];
      var v = {};
      v.label = f.label;
      v.id = f.id;
      v.label = f.label;
      v.value = $("#" + f.id).val();

      if (f.type == "radio" || f.type == "checkbox") { v.value = document.getElementById(f.id).checked }

      data.push(v);

    }

    return data;

  }


  /*
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
  */


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
    this.label = args.label || "My Field";
    this.value = args.value || '';
    this.type = args.type || "text";
    this.min = args.min || false;
    this.max = args.max || false;

    if (typeof(args.id) === "undefined") {
      this.id = this.parentID + "-Field-" + Math.round(Math.random() * 1000000);
    } else {
      this.id = this.parentID + "-" + args.id;
    }

    this.createElement = function () {

      var thisContainer = document.createElement("div");
      thisContainer.style.setProperty("margin-bottom", "4px");

      var thisLabel = document.createElement("div");

      thisLabel.style.setProperty("font-size", "11px");
      thisLabel.style.setProperty("font-weight", "bold");

      thisLabel.innerHTML = this.label;
      thisContainer.appendChild(thisLabel);

      var thisInput = document.createElement("input");

      thisInput.style.setProperty("font-size", "12px");
      thisInput.style.setProperty("margin-bottom", "4px");

      var fullWidthElements = ["text", "range", "password", "search"];
      if (fullWidthElements.indexOf(this.type) >= 0) { thisInput.style.setProperty("width", "96%"); }

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

      el.style.setProperty("border", "none");
      el.style.setProperty("color", "666666");
      el.style.setProperty("background-color", "#d4d4d4");
      el.style.setProperty("font-size", "12px");
      el.style.setProperty("padding", "4px");
      el.style.setProperty("margin", "2px");
      el.style.setProperty("cursor", "pointer");

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
