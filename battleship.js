$(document).ready(function(){
  //creates the table
  initializeTable();
  //places the ships on the view and model
  placeShip();
  //when user clicks a td, execute the following:
  $("td").on("click", function(){
    //when user clicks a td box, add .miss to that td
    $(this).addClass("miss").off("click");
    //tells the user how many torpedos they have left
    $("#torpedosLeft").text("Torpedos left: " + shoot());
    //turns off the click after 25 tries and notifies user they've lost
    if (torpedoCounter===-1){
      //turns off all the td's
      $("td").off("click");
      //tells the user that they've lost
      $("#notification").text("You lose!!!");
      //shows the previously hidden button that will reveal all the ships upon click
      $("#revealShips").show();
    }
    //whichever td the user clicks on, get the id of that td and assign it to variable boxId
    var boxId = $(this).attr("id");
    //check if board[boxId:index1][boxId:index2]=1
    if ( 1 === (board[boxId[0]][boxId[1]])){
      //if board[boxId:index1][boxId:index2]===1 then add class hit to that td (css will turn box red)
      $(this).addClass("hit");
      //notifies the user that they've sunk x number of ships whenever they hit a ship
      $("#shipsSunk").text("Ships sunk: " + (shipsHit = shipsHit+1));
    }
    //check if the number of ships they've hit = 5
    if (shipsHit===9){
      //notifies the user they've won
      $("#notification").text("You win!!!");
      //turns off the entire board
      $("td").off("click");
    }
  }); //closes td on click function

  //hidden button that reveals ships
  $("#revealShips").on("click", function(){
    idCreator(0,1);
  });//closes button on click
});//closes document ready

var board = [[],[],[],[],[],[],[],[],[],[]];
var torpedoCounter = 24;
var ship = 0;
var shipsHit = 0;
var answerKey = [];

//Purpose: reduce torpedoCounter by 1
//Signature: nothing -> number
//Example: shoot() -> nothing
function shoot(){
  return torpedoCounter--;
}//closes function shoot

//Purpose: to create a table and assign an ID to each box within the table
//Signature: nothing --> nothing
//Example: initializeTable() --> nothing
function initializeTable(){
  //creates 10 rows
  for (var rowIndex = 0; rowIndex < 10; rowIndex++) {
    //creates rows within the table
    $("#table").append("<tr></tr>");
    //creates 10 columns
    for (var columnIndex = 0; columnIndex < 10; columnIndex++) {
      //creates columns within the rows
      $("tr").last().append("<td></td>")
      //adds a "coordinate" ID to each <td> (i.e. "01" --> 0 indicates the row, 1 indicates the column)
      $("td").last().attr("id", rowIndex.toString() + columnIndex.toString());
    }//closes column for loop
  }//closes row for loop
}//closes function initializeTable

//Function: create function to randomly assign boat onto board
//Signature: nothing -> nothing
//Example: placeShip() -> nothing
function placeShip(){
  //var y increases and decreases horizontally
  var y;
  //var x increases and decreases vertically
  var x;
  //while the # of ships created is less than 5, execute the following:
  fiveBlock(x,y);
  while(ship < 4){
    //creating random number, assign its value to x
    x = Math.floor((Math.random()*10));
    //creating random number, assign its value to y
    y = Math.floor((Math.random()*10));
    //if function spaceAvailable returns true, execute the following:
    if (spaceAvailable(x, y)===true){
      //place 1 in board at specified location [x][y]
      board[x][y]=1;
      //add one to ship var (starts at 0)
      ship++;
      //push (x,y) into answerKey array
      answerKey.push(x, y);
    }//closes if statement
  }//closes while loop
}//closes function placeShip


//Purpose: create a function that tests if we can place a ship at a given location
//Signature: (x,y)-->boolean
//Example: spaceAvailable(1,2)-->true
function spaceAvailable(x,y){
  //if statement for all middle squares
  if(y !=0 && y!= 9 && x!= 0 && x!=9){
    if (board[x][y] !=1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x-1][y+1] !=1 && board[x+1][y-1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for left column, middle 8 squares
  if(y===0 && (x!=0 && x!=9)){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x-1][y+1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for right column, middle 8 squares
  if(y===9 && (x!=0 && x!=9)){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x+1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for top row, middle 8 squares
  if(x===0 && (y!=0 && y!=9)){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x+1][y-1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for bottom row, middle 8 squares
  if(x===9 && (y!=0 && y!=9)){
    if (board[x][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x-1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for top left corner
  if(x===0 && y===0){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y+1] != 1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for top right corner
  if(x===0 && y===9){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y-1] != 1 && board[x+1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for bottom right corner
  if(x===9 && y===9){
    if (board[x][y] != 1 && board[x-1][y] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for bottom left corner
  if(x===9 && y===0){
    if (board[x][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x-1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
}//closes spaceAvailable function

//Purpose: create a function to make one 5 block ship that will be horizontal or vertical // changing the array to have a block of 1's //
//Signature: fiveBlock(x,y) --> nothing // but the array will change
//Example: fiveBlock(0,0) --> nothing // but board[] will change

function fiveBlock(x,y){
  //creating random number, assign its value to x
  x = Math.floor((Math.random()*10));
  //creating random number, assign its value to y
  y = Math.floor((Math.random()*10));
  var randomFive = Math.floor(Math.random()*2);
  //creates a vertical "ship"
  if(randomFive === 0){
    while(x>=6){
      x = Math.floor((Math.random()*10));
    }
    board[x][y] = 1;
    board[x+1][y] = 1;
    board[x+2][y] = 1;
    board[x+3][y] = 1;
    board[x+4][y] = 1;
    for (var i = 0; i < 5; i++) {
      answerKey.push(x,y);
      x=x+1;
    }
  }
  //creates a horizontal "ship"
  if(randomFive === 1){
    while(y>=6){
      y = Math.floor((Math.random()*10));
    }
    board[x][y] = 1;
    board[x][y+1] = 1;
    board[x][y+2] = 1;
    board[x][y+3] = 1;
    board[x][y+4] = 1;
    for (var j = 0; j < 5; j++) {
      answerKey.push(x,y);
      y=y+1;
    }
  }
}

//Purpose: create a function that cycles through answerKey[], pairs up every two elements, to create an id, and adds class .hit
function idCreator(x,y){
  var shipId;
  for (var i = 0; i < ((answerKey.length)/2); i++) {
    shipId = "#"+answerKey[x]+answerKey[y];
    x = x + 2;
    y = y + 2;
    $(shipId).addClass("hit");
  }
}
