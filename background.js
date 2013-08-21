var mnuParent = chrome.contextMenus.create({
  "title": "Typo Resolver",
    "contexts": ["all"]
});

chrome.contextMenus.create({
  "parentId": mnuParent,
  "title": "Modify",
  "contexts": ["selection"],
  "onclick": modifyClick
});
chrome.contextMenus.create({
  "parentId": mnuParent,
  "title": "Send",
  "contexts": ["all"],
  "onclick": sendClick
});

function modifyClick(){
  chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
    chrome.tabs.executeScript({file: "modify.js"});
  });
}

function sendClick(){
  chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
    chrome.tabs.executeScript(null, {file: "html2canvas.js"}, function(){
      chrome.tabs.executeScript({file: "send.js"});
    });
  });
}
