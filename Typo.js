function Typo(){
  this.x = 0;
  this.y = 0;
  this.height = 0;
  this.width = 0;
  this.url = "";
  this.oldText = "";
  this.newText = "";
};

Typo.prototype.setPosition = function(x, y){
  this.x = x;
  this.y = y;
};

Typo.prototype.setSize = function(height, width){
  this.height = height;
  this.width = width;
};

Typo.prototype.setUrl = function(url){
  this.url = url;
};

Typo.prototype.setText = function(oldText, newText){
  this.oldText = oldText;
  this.newText = newText;
};
