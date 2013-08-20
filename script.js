var newText = prompt("input new text");
var selection = window.getSelection().getRangeAt(0);
var span = document.createElement("span");
var node = document.createTextNode(newText);

span.appendChild(node);

selection.insertNode(span);
