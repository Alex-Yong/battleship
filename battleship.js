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
      $("#revealShips").show();
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

  //hidden button that reveals ships
  $("#revealShips").on("click", function(){
    // board.forEach(function(){
    //   var shipId = $("td").attr("id");
      $(ship1).addClass("hit");
      $(ship2).addClass("hit");
      $(ship3).addClass("hit");
      $(ship4).addClass("hit");
      $(ship5).addClass("hit");
    // });
  });//closes button on click
});//closes document ready

var board = [[],[],[],[],[],[],[],[],[],[]];
var torpedoCounter = 24;
var ship = 0;
var shipsHit = 0;
var answerKey = [];
var ship1;
var ship2;
var ship3;
var ship4;
var ship5;

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
  var y;
  var x;
  while(ship < 5){
    x = Math.floor((Math.random()*10));//x
    console.log(x);
    y = Math.floor((Math.random()*10));//y
    console.log(y);
    if (spaceAvailable(x, y)===true){
      board[x][y]=1;
      ship++;
      answerKey.push(x, y);
      ship1 = "#" + answerKey[0] + answerKey[1];
      ship2 = "#" + answerKey[2] + answerKey[3];
      ship3 = "#" + answerKey[4] + answerKey[5];
      ship4 = "#" + answerKey[6] + answerKey[7];
      ship5 = "#" + answerKey[8] + answerKey[9];
    }
  } //while (ship < 5);
}


// purpose: create a function that tests if we can place a ship at a given location
// signature: (x,y)-->boolean
// example: spaceAvailable(1,2)-->true;
function spaceAvailable(x,y){
  if(y !=0 && y!= 9 && x!= 0 && x!=9){
    console.log("border control");
    if (board[x][y] !=1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x-1][y+1] !=1 && board[x+1][y-1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }

  if(y===0 && (x!=0 && x!=9)){
    console.log("top border");
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x-1][y+1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(y===9 && (x!=0 && x!=9)){
    console.log("bottom");
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x+1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(x===0 && (y!=0 && y!=9)){
    console.log("left");
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x+1][y-1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(x===9 && (y!=0 && y!=9)){
    console.log("right");
    if (board[x][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x-1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(x===0 && y===0){
    console.log("top left corner");
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y+1] != 1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(x===0 && y===9){
    console.log("top right corner");
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y-1] != 1 && board[x+1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(x===9 && y===9){
    console.log("bottom right corner");
    if (board[x][y] != 1 && board[x-1][y] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  if(x===9 && y===0){
    console.log("bottom left corner");
    if (board[x][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x-1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
}
