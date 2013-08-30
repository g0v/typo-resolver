var newText = prompt("Input new text");
var sel = window.getSelection();
var range = sel.getRangeAt(0);
var selectionContents = range.extractContents();
var newStyle = "background-color: green; font-weight: bold; color: white";
var oldStyle = "background-color: red; text-decoration: line-through";
var newSpan = $.parseHTML("<span style='" + newStyle + "'>" + newText + "</span>");
var oldSpan = $.parseHTML("<span style='" + oldStyle + "'></span>");
var typo = new Typo();

oldSpan[0].appendChild(selectionContents);

//mark old text
range.insertNode(oldSpan[0]);

//insert new text
range.insertNode(newSpan[0]);

typo.setPosition($(oldSpan[0]).offset().left, $(oldSpan[0]).offset().top);

//pass typo object to background.js
chrome.runtime.sendMessage({"typo": typo}, function(response){
  alert("response: " + response);
});
