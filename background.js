var mnuParent = chrome.contextMenus.create({
  "title": "Typo Resolver",
    "contexts": ["all"]
});

chrome.contextMenus.create({
  "parentId": mnuParent,
  "title": "Fix it",
  "contexts": ["selection"],
  "onclick": fixClick
});
chrome.contextMenus.create({
  "parentId": mnuParent,
  "title": "Feedback",
  "contexts": ["all"],
  "onclick": feedbackClick
});

function fixClick(){
  chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
    chrome.tabs.executeScript({file: "fix.js"});
  });
}

function feedbackClick(){
  chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
    chrome.tabs.executeScript(null, {file: "html2canvas.js"}, function(){
      chrome.tabs.executeScript(null, {file: "Typo.js"}, function(){
        chrome.tabs.executeScript({file: "feedback.js"});
      });
    });
  });
}
