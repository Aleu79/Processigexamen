let circulo1, circulo2;
let rojoColor, azulColor, violetaColor;
let coloVioleta = false;
let colision = false;

function setup() {
  createCanvas(600, 600);
  rojoColor = color(255, 0, 0);
  azulColor = color(0, 0, 255);
  violetaColor = color(148, 0, 211);
  
  circulo1 = new Circulo(50, height / 2, 30, rojoColor, 6);
  circulo2 = new Circulo(550, height / 2, 30, azulColor, 4);
}

function draw() {
  background(220);
  
  if (colision) {
    fill(violetaColor);
    circulo1.display();
    circulo2.display();
    if (coloVioleta) {
      violetaColor.setAlpha(255);
      coloVioleta = false;
    } else {
      violetaColor.setAlpha(100);
      coloVioleta = true;
    }
    setTimeout(() => {
      colision = false;
      circulo1.color = rojoColor;
      circulo2.color = azulColor;
    }, 1500);
  } else {
    circulo1.update();
    circulo2.update();
    circulo1.display();
    circulo2.display();
  }
  
  if (circulo1.y - circulo1.radius <= 0 || circulo1.y + circulo1.radius >= height) {
    circulo1.changeColor();
  }
  
  if (circulo2.y - circulo2.radius <= 0 || circulo2.y + circulo2.radius >= height) {
    circulo2.changeColor();
  }
  
  if (circulo1.intersects(circulo2)) {
    colision = true;
  }
}

class Circulo {
  constructor(x, y, radius, color, rapidez) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.rapidez = rapidez;
    this.velocidadX = random(-this.rapidez, this.rapidez);
    this.velocidadY = random(-this.rapidez, this.rapidez);
  }
  
  update() {
    this.x += this.velocidadX;
    this.y += this.velocidadY;
    
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.velocidadX *= -1;
    }
    
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.velocidadY *= -1;
    }
  }
  
  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  changeColor() {
    if (this.color === rojoColor) {
      this.color = color(255, 165, 0);
    } else {
      this.color = color(0, 0, 255);
    }
  }
  
  intersects(otro) {
    let d = dist(this.x, this.y, otro.x, otro.y);
    return d < this.radius + otro.radius;
  }
}
