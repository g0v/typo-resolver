var newText = prompt("input new text");
var sel = window.getSelection();
var range = sel.getRangeAt(0);
var style = "background-color: red; font-weight: bold";
var span = $.parseHTML("<span style='" + style + "'>" + newText + "</span>");
var selectionContents = range.extractContents();
var old = document.createElement("span");

//mark old text
old.style.textDecoration = "line-through";
old.appendChild(selectionContents);
range.insertNode(old);

//insert new text
range.insertNode(span[0]);
