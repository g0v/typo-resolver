window.onload=function(){
  document.getElementById("fixbtn").addEventListener("click",function() {
    chrome.runtime.sendMessage({clicked: "fixbtn"}, function(response) {
      console.log(response);
    });
  });

  document.getElementById("fbbtn").addEventListener("click",function() {
    chrome.runtime.sendMessage({clicked: "fbbtn"}, function(response) {
      console.log(response);
    });
  });
}
