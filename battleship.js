$(document).ready(function(){
  initializeTable();//creates the table
  placeShips();//places the ships on the view and model

  //WHEN USER CLICKS ON TD, EXECUTE FOLLOWING:
  $("td").on("click", function(){
    //add .miss to clicked td & turn off click
    $(this).addClass("miss").off("click");
    //tells user # of torpedos left
    $("#torpedosLeft").text("Torpedos left: " + shoot());
    //turns off td click after 25 tries and notifies user they've lost
    if (torpedoCounter===-1){
      //turns off all the td's after losing
      $("td").off("click");
      //tells user they've lost
      $("#notification").text("You lose!!!");
      //shows the previously hidden button that will reveal all the ships upon click
      $("#revealShips").show();
    }

    //whichever td user clicks, get its id and assign it to variable boxId
    var boxId = $(this).attr("id");
    //IF BOARD[boxId:INDEX1][boxId:INDEX2]=1, EXECUTE FOLLOWING:
    if ( 1 === (board[boxId[0]][boxId[1]])){
      //if board[boxId:index1][boxId:index2]===1, add .hit to clicked td
      $(this).addClass("hit");
      //notifies user they've sunk x number of ships when they hit a ship
      $("#shipsSunk").text("Hits: " + (shipsHit = shipsHit+1));
    }

    //IF # SHIPS HIT = 9 (one5block+four1blockships), EXECUTE FOLLOWING:
    if (shipsHit===9 && torpedoCounter>= -1){
      //notifies user they've won
      $("#notification").text("You win!!!");
      //turns off the entire board
      $("td").off("click");
    }
  }); //closes td on click function

  //hidden button that reveals ships
  $("#revealShips").hide().on("click", function(){
    //idCreator(0,1) --> cycle through answerKey[], make ids out of all coordinates beginning with answerKey[0][1]
    idCreator(0,1);
  });
});//closes document ready

//used to model the gameboard
var board = [[],[],[],[],[],[],[],[],[],[]];
//used to count how many shots user has fired
var torpedoCounter = 24;
//used when making more than 1 of a ship type
var ship = 0;
//used when counting number of ships hit
var shipsHit = 0;
//used to hold all the ship "coordinates"
var answerKey = [];

//Purpose: reduce torpedoCounter by 1
//Signature: nothing -> number
//Example: shoot() -> nothing
function shoot(){
  return torpedoCounter--;
}

//Purpose: create a table and assign an ID to each box within the table
//Signature: nothing --> nothing
//Example: initializeTable() --> nothing
function initializeTable(){
  //creates 10 rows
  for (var rowIndex = 0; rowIndex < 10; rowIndex++) {
    //appends rows into table
    $("#table").append("<tr></tr>");
    //creates 10 columns
    for (var columnIndex = 0; columnIndex < 10; columnIndex++) {
      //appends columns within row
      $("tr").last().append("<td></td>")
      //adds a "coordinate" ID to each <td> (i.e. "01" --> 0=the row, 1=the column)
      $("td").last().attr("id", rowIndex.toString() + columnIndex.toString());
    }//closes column for loop
  }//closes row for loop
}//closes function initializeTable
// DUSTIN'S SUGGESTION FOR CREATING TABLE - doesn't add id's though
// $("table").append(createRowsCols());
// function createRowsCols(){
//   var row = "";
//   for (var rowIndex = 0; rowIndex < 10; rowIndex++) {
//     row += "<tr>";
//     for (var columnIndex = 0; columnIndex < 10; columnIndex++) {
//       row += "<td></td>";
//     }
//     row += "</tr>";
//   }
//   return row;
// }

//Purpose: create function to randomly assign boat onto board
//Signature: nothing -> nothing
//Example: placeShips() -> nothing
function placeShips(){
  //var y increases and decreases horizontally (column#)
  var y;
  //var x increases and decreases vertically (row#)
  var x;
  fiveBlock(x,y);//creates 5 block ship
  //while the # of ships created is less than 4, execute the following:
  while(ship < 4){
    //creating random number, assign its value to x
    x = Math.floor((Math.random()*10));
    //creating random number, assign its value to y
    y = Math.floor((Math.random()*10));
    //if spaceAvailable() returns true, execute the following:
    if (spaceAvailable(x, y)===true){
      //place 1 in board at specified location [x][y]
      board[x][y]=1;
      //add one to global var ship
      ship++;
      //push (x,y) into answerKey array
      answerKey.push(x, y);
    }//closes if statement
  }//closes while loop
}//closes function placeShips


//Purpose: create a function that tests if we can place a ship at a given location
//Signature: (x,y)-->boolean
//Example: spaceAvailable(1,2)-->true
function spaceAvailable(x,y){
  //if statement for all middle squares, condition: true if no border coordinates
  if(y !=0 && y!= 9 && x!= 0 && x!=9){
    if (board[x][y] !=1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x-1][y+1] !=1 && board[x+1][y-1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for left column's middle 8 squares
  if(y===0 && (x!=0 && x!=9)){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y+1] != 1 && board[x-1][y+1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for right column's middle 8 squares
  if(y===9 && (x!=0 && x!=9)){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x-1][y] != 1 && board[x][y-1] != 1 && board[x-1][y-1] !=1 && board[x+1][y-1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for top row's middle 8 squares
  if(x===0 && (y!=0 && y!=9)){
    if (board[x][y] != 1 && board[x+1][y] != 1 && board[x][y+1] != 1 && board[x][y-1] != 1 && board[x+1][y-1] !=1 && board[x+1][y+1] !=1){
      return true;
    } else {
      return false;
    }
  }
  //if statement for bottom row's middle 8 squares
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

//Purpose: make one 5 block ship that will be horizontal or vertical & adding a 5 block of 1's to answerKey[]
//Signature: fiveBlock(x,y) --> nothing // but board[] & answerKey[] will change
//Example: fiveBlock(0,0) --> nothing // but board[] & answerKey[] will change
function fiveBlock(x,y){
  //create random x coordinate (b/t 0 and 9)
  x = Math.floor((Math.random()*10));
  //create random y coordinate (b/t 0 and 9)
  y = Math.floor((Math.random()*10));
  //randomFive = either 0 or 1 (0 for vertical, 1 for horizontal)
  var randomFive = Math.floor(Math.random()*2);
  //creates a vertical 5"ship"
  if(randomFive === 0){
    //x/row border control for the 5"ship"
    while(x>=6){
      //keep changing x to different random number
      x = Math.floor((Math.random()*10));
    }
    //places 1's in board where vertical 5"ship" will be
    board[x][y] = 1;
    board[x+1][y] = 1;
    board[x+2][y] = 1;
    board[x+3][y] = 1;
    board[x+4][y] = 1;
    //for loop that repeats 5 times
    for (var i = 0; i < 5; i++) {
      //push x and y into answerKey
      answerKey.push(x,y);
      //change value of x by 1
      x=x+1;
    }//closes for loop
  }//closes vertical 5"ship" if statement

  //creates a horizontal 5"ship"
  if(randomFive === 1){
    //y/column border control for the 5"ship"
    while(y>=6){
      //keep changing y to different random number
      y = Math.floor((Math.random()*10));
    }
    //places 1's in board where horizontal 5"ship" will be
    board[x][y] = 1;
    board[x][y+1] = 1;
    board[x][y+2] = 1;
    board[x][y+3] = 1;
    board[x][y+4] = 1;
    //for loop that repeats 5 times
    for (var j = 0; j < 5; j++) {
      //push x and y into answerKey
      answerKey.push(x,y);
      //change value of y by 1
      y=y+1;
    }
  }//closes horizontal 5"ship" if statement
}//closes fiveBlock function

//Purpose: cycle through answerKey[], pairs up every two elements, concate pairs into id's, and adds class .hit to element w/ that id
//Signature: x,y --> nothing
//Example: idCreator(1,2)-->nothing//but adds class .miss to (td id="#12")
function idCreator(x,y){
  //keep repeating if (answerKey.length)/2) b/c we pair answerKey elements up
  for (var i = 0; i < ((answerKey.length)/2); i++) {
    //shipId = concates "#"+answerKey[x]+answerKey[y]
    var shipId = "#"+answerKey[x]+answerKey[y];
    //go to the next "x" coordinate in answerKey[]
    x = x + 2;
    //go to the next "y" coordinate in answerKey[]
    y = y + 2;
    //add .hit to (td id="#XY")
    $(shipId).addClass("hit");
  }//closes for loop
}//closes idCreator function
