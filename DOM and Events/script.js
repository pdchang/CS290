//Philip Chang - CS 290 - Week 5 - DOM and Events
//this is script.js

//create 4x4 table - top row is header says header 1-4
//each cell should be marked with 1, 1 upper left
// cell to the right is 2,1 and cell below is 1,2
function tableMaker(){
  var nRows = 4
  var nCols = 4

  //create table with border, and set document body to body make it easier
  var body = document.body;
  var nTable = document.createElement("table");
  nTable.setAttribute("border", "1");

  var nHead = document.createElement("thead");//create thead
  var nRow = document.createElement("tr");//create the row
  for(var i = 0; i < nRows; i++){
    var nth = document.createElement("th");
    nth.innerHTML = "Header " + (i+1); //1-4
    nRow.appendChild(nth);
  }
  nHead.appendChild(nRow);
  nTable.appendChild(nHead);

  var tBody = document.createElement("tbody")
  for (var j = 0; j < (nRows - 1); j++){ //already have a row for headers in table
    var nRow = document.createElement("tr");
    for(var k = 0; k < nCols; k++){
      var ntd = document.createElement("td");
      var key = (k+1) + ", " + (j+1);
      ntd.innerHTML = (k+1) + ", " + (j+1); //colum # then row
      ntd.id = key

      nRow.appendChild(ntd);
    }
    tBody.appendChild(nRow);
  }
  nTable.appendChild(tBody);
  body.appendChild(nTable);
}

tableMaker();
var buttons = ["up", "down", "left", "right", "Mark Cell"];
function buttonMaker(){
  for (var i = 0; i < buttons.length; i++){
    var nbut = document.createElement("button");
    nbut.textContent = buttons[i];
    nbut.id = buttons[i];
    document.getElementsByTagName("body")[0].appendChild(nbut);
  }

  document.getElementById(buttons[0]).addEventListener("click", function(){moveb(buttons[0])});
  document.getElementById(buttons[1]).addEventListener("click", function(){moveb(buttons[1])});
  document.getElementById(buttons[2]).addEventListener("click", function(){moveb(buttons[2])});
  document.getElementById(buttons[3]).addEventListener("click", function(){moveb(buttons[3])});

  document.getElementById(buttons[4]).addEventListener("click", function(){mark(buttons[4])});
}

function selected(num){
  document.getElementById(num).style.border = "thick solid black";
}
selected("1, 1");
var cell = document.getElementById("1, 1");
var y = 1 //positions columns first
var x = 1 //positions row second

function moveb(direction){
  var currentID = x + ", " + y;
  var currentCell = document.getElementById(currentID);
  currentCell.style.border = "thin solid black";
  console.log(currentCell)
  switch (direction) {
    case "up":
       if (y !== 1) {
          y--;
       }
       break;
    case "down":
       if (y !== 3) {
          y++;
       }
       break;
    case "left":
       if (x !== 1) {
          x--;
       }
       break;
    case "right":
       if (x !== 4) {
          x++;
       }
       break;
  }
  var currentID = x + ", " + y;
  console.log(currentCell)
  selected(currentID);
}
function mark() {
  var currentID = x + ", " + y;
  var currentCell = document.getElementById(currentID);
  currentCell.style.background = "yellow";
}

buttonMaker();
