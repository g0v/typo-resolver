$(function(){
  $("#btnModify").click(function(){
    chrome.tabs.executeScript({
      file: "modify.js"
    });
  });

  $("#btnSend").click(function(){
    chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
      chrome.tabs.executeScript(null, {file: "html2canvas.js"}, function(){
        chrome.tabs.executeScript({file: "send.js"});
      });
    });
  });
});
