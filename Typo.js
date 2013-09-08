function Typo(){
  this.x = 0;
  this.y = 0;
  this.url = "";
  this.oldText = "";
  this.newText = "";
};

Typo.prototype.setPosition = function(x, y){
  this.x = x;
  this.y = y;
};

Typo.prototype.setUrl = function(url){
  this.url = url;
};

Typo.prototype.setText = function(oldText, newText){
  this.oldText = oldText;
  this.newText = newText;
};
