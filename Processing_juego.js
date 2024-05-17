let circuloRojo, circuloAzul;

let rojoColor, azulColor, violetaColor, negroColor, blancoColor;

let colision = false;
let tiempoColision = 0;

function setup() {
  createCanvas(600, 600);
  
  rojoColor = color(255, 0, 0);
  azulColor = color(0, 0, 255);
  violetaColor = color(148, 0, 211);
  negroColor = color(0);
  blancoColor = color(255);

  circuloRojo = new Circulo(50, height / 2, 30, rojoColor, 8); 
  circuloAzul = new Circulo(550, height / 2, 30, azulColor, 4); 
}

function draw() {
  background(220);


  if (colision) {
  
    circuloRojo.color = violetaColor;
    circuloAzul.color = violetaColor;

   
    if (millis() - tiempoColision > 1500) {
      colision = false;
      circuloRojo.color = rojoColor;
      circuloAzul.color = azulColor;
    }
  }


  circuloRojo.update();
  circuloAzul.update();
  circuloRojo.display();
  circuloAzul.display();

  
  if (circuloRojo.y - circuloRojo.radius <= 0) {
    circuloRojo.color = blancoColor; 
  }

  
  if (circuloAzul.y + circuloAzul.radius >= height) {
    circuloAzul.color = negroColor; 
  }

 
  if (circuloRojo.intersects(circuloAzul)) {
    colision = true;
    tiempoColision = millis(); 
  }
}

class Circulo {
  constructor(x, y, radius, color, velocidad) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocidad = velocidad;
    this.velocidadX = random(-this.velocidad, this.velocidad);
    this.velocidadY = random(-this.velocidad, this.velocidad);
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

  intersects(otro) {
    let d = dist(this.x, this.y, otro.x, otro.y);
    return d < this.radius + otro.radius;
  }
}
