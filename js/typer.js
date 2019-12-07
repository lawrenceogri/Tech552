var Typer = function(element) {
  this.element = element;
  var delim = element.dataset.delim || ",";
  var words = element.dataset.words || "override these,sample typing";
  this.words = words.split(delim).filter((v) => v); // non empty words
  this.delay = element.dataset.delay || 200;
  this.loop = element.dataset.loop || "true";
  if (this.loop === "false" ) { this.loop = 1 }
  this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;

  this.progress = { word: 0, char: 0, building: true, looped: 0 };
  this.typing = true;

  var colors = element.dataset.colors || "black";
  this.colors = colors.split(",");
  this.element.style.color = this.colors[0];
  this.colorIndex = 0;

  this.doTyping();
};

Typer.prototype.start = function() {
  if (!this.typing) {
    this.typing = true;
    this.doTyping();
  }
};
Typer.prototype.stop = function() {
  this.typing = false;
};
Typer.prototype.doTyping = function() {
  var e = this.element;
  var p = this.progress;
  var w = p.word;
  var c = p.char;
  var currentDisplay = [...this.words[w]].slice(0, c).join("");
  var atWordEnd;
  if (this.cursor)