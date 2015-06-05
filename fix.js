var newText = prompt("Input new text");
var sel = window.getSelection();
var range = sel.getRangeAt(0);
var selectionContents = range.extractContents();
var newStyle = "background-color: green; font-weight: bold; color: white";
var oldStyle = "background-color: red; text-decoration: line-through";
var newSpan = $.parseHTML("<span class='typo-resolver-newtext' style='" + newStyle + "'>" + newText + "</span>");
var oldSpan = $.parseHTML("<span class='typo-resolver-oldtext' style='" + oldStyle + "'></span>");
var typo = new Typo();

oldSpan[0].appendChild(selectionContents);

//mark old text
range.insertNode(oldSpan[0]);

//insert new text
range.insertNode(newSpan[0]);

typo.setSize($(oldSpan[0]).height(), $(oldSpan[0]).width());
typo.setPosition($(oldSpan[0]).offset().left, $(oldSpan[0]).offset().top);
typo.setText($(oldSpan[0]).text(), $(newSpan[0]).text());
typo.setUrl(window.location.href);


//pass typo object to background.js
chrome.runtime.sendMessage({"action": "fix", "typo": typo}, function(response){
  alert("response: " + response);
});
