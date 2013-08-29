function Typo(){
  this.x = 0;
  this.y = 0;
};

Typo.prototype.getPosition = function(){
  return {"x": this.x, "y": this.y};
};

Typo.prototype.setPosition = function(x, y){
  this.x = x;
  this.y = y;
};
