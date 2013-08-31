function Typo(){
  this.x = 0;
  this.y = 0;
  this.oldText = "";
  this.newText = "";
};

Typo.prototype.setPosition = function(x, y){
  this.x = x;
  this.y = y;
};

Typo.prototype.setText = function(oldText, newText){
  this.oldText = oldText;
  this.newText = newText;
};
