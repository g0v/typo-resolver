var newText = prompt("input new text");
var sel = window.getSelection();
var range = sel.getRangeAt(0);
var span = document.createElement("span");
var node = document.createTextNode(newText);

span.appendChild(node);

span.style.backgroundColor = "red";
span.style.fontWeight = "bold";

range.deleteContents();
range.insertNode(span);
