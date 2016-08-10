$(document).ready(function(){

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
        $("td").last().attr("id", rowIndex.toString() + ", " + columnIndex.toString());
      }
    }
  }
  initializeTable();
});

var tr = [];
var board = [];
