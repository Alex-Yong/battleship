$(document).ready(function(){

  initializeTable();
  shipCount();

  $("td").on("click", function(){
    //When user clicks a td box, add .miss to that td
    $(this).addClass("miss").off("click");
    //Tells the user how many torpedos they have left
    $("#torpedosLeft").text("Torpedos left: " + shoot());
    //Turns off the click after 25 tries and notifies user they've lost
    if (torpedoCounter===-1){
      $("td").off("click");
      $("#notification").text("You lose!!!");
    }
    //Declares variable, assigns it the ID of whatever td the user clicks
    var boxId = $(this).attr("id");
    //Using the first and second index of the ID, check if the board has a 1 on that specific [][]
    if ( 1 === (board[boxId[0]][boxId[1]])){
      //if board[][] === 1 then add class hit
      $(this).addClass("hit");
      $("#shipsSunk").text("Ships sunk: " + (shipsHit = shipsHit+1));
    }
    if (shipsHit===5){
      $("#notification").text("You win!!!");
      $("td").off("click");
    }
  });

//TRY TOMORROW: when user clicks button, reveal the ships on the board by addingClass("hit") to the td's = 1;
  // $("#revealShips").on("click", function(){
  //   board.forEach(function(){
  //     var shipId = $("td").attr("id");
  //     if ( 1 === (board[shipId[0]][shipId[1]])){
  //       $(this).addClass("hit");
  //     }
  //   });
  // });

});

var board = [[],[],[],[],[],[],[],[],[],[]];
var torpedoCounter = 24;
var ship = 0;
var shipsHit = 0;

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
      //Adds a "coordinate" ID to each <td> (i.e. "01" --> 0 indicates the row, 1 indicates the column)
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
    if (board[index1][index2] != 1){
      board[index1][index2]=1;
      ship++;
    }
  } while (ship < 5);
}
