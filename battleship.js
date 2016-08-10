$(document).ready(function(){

  initializeTable();
  shipCount();

  //When user clicks a td box, add .miss to that td
  $("td").on("click", function(){
    $(this).addClass("miss").off("click");
    $("#torpedosLeft").text("Torpedos left: " + shoot());
    if (torpedoCounter===-1){
      $("td").off("click");
    }
  });

});

// var tr = [0,0,0,0,0,0,0,0,0,0];
var board = [[],[],[],[],[],[],[],[],[],[]];
var torpedoCounter = 24;
var ship = 0;

//Purpose: reduce torpedoCounter by 1
//Signature: nothing -> number
//Example: shoot() ->
function shoot(){
  return torpedoCounter--;
}

//Purpose: to create a table and assign an ID to each box within the table
//Signature: nothing --> nothing
//Example: initializeTable() --> nothing
function initializeTable(){
  for (var rowIndex = 0; rowIndex < 10; rowIndex++) {
    //Creates the rows within the table
    $("#table").append("<tr></tr>");

    for (var columnIndex = 0; columnIndex < 10; columnIndex++) {
      //Creates columns within the rows
      $("tr").last().append("<td></td>")
      //Adds a "coordinate" ID to each <td> (i.e. "0, 1" --> 0 indicates the row, 1 indicates the column)
      $("td").last().attr("id", rowIndex.toString() + columnIndex.toString());
    }
  }
}

//Function: create function to randomly assign boat onto board
//Signature: nothing -> nothing
//Example: shipCount() -> nothing
function shipCount(){
  var index1;
  var index2;
  do {
    index1 = Math.floor((Math.random()*10));
    console.log(index1);
    index2 = Math.floor((Math.random()*10));
    console.log(index2);
    board[index1][index2]=1;
    ship++;
  } while (ship < 5);
}
