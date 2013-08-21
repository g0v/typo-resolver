var newText = prompt("input new text");
var sel = window.getSelection();
var range = sel.getRangeAt(0);
/*
var span = document.createElement("span");
var node = document.createTextNode(newText);
*/
var $span = $("<span></span>");

$span.html(newText);
$span.css("background-color", "red");
$span.css("font-weight", "bold");

alert($span.get());

//span.appendChild(node);

//span.style.backgroundColor = "red";
//span.style.fontWeight = "bold";

range.deleteContents();
range.insertNode($span.get());
