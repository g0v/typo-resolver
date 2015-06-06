
var arrTypo = [];
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
    chrome.tabs.executeScript({file: "jquery.js"}, function(){
        chrome.tabs.executeScript({file: "Typo.js"}, function(){
            chrome.tabs.executeScript({file: "fix.js"});
        });
    });
}

function feedbackClick(){
    chrome.tabs.executeScript({file: "jquery.js"}, function(){
        chrome.tabs.executeScript({file: "imagesloaded.js"}, function(){
            chrome.tabs.executeScript({file: "html2canvas.js"}, function() {
                chrome.tabs.executeScript({file: "Typo.js"}, function(){
                    chrome.tabs.executeScript({code: "var arrTypo = JSON.parse('" + JSON.stringify(arrTypo) + "');"}, function(){
                        chrome.tabs.executeScript({file: "parse-1.3.4.min.js"});
                        chrome.tabs.executeScript({file: "feedback.js"});
                    });
                });
            })
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.action === "fix"){
        arrTypo.push(request.typo);

        sendResponse("OK");
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.action === "capture"){
        chrome.tabs.captureVisibleTab(function(dataUrl){
            sendResponse(dataUrl);
        });

        return true;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.clicked === "fixbtn"){
          fixClick();
          sendResponse("finish");
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.clicked === "fbbtn"){
        feedbackClick();
        sendResponse("finish");
    }
});
