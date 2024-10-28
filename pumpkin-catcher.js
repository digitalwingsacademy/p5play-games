let pumpkins = [];
let pumpkinImage;
let score = 0;
let timeLeft = 10; // Tiempo en segundos

function preload() {
  pumpkinImage = loadImage('https://storage.googleapis.com/imagenes_digital_wings/calabaza-halloween-removebg-preview.png');
}

function setup() {
  createCanvas(800, 600);
  setInterval(spawnPumpkin, 500); // Aparece una calabaza cada 0.5 segundos
  setInterval(countdown, 1000); // Cuenta regresiva
}

function draw() {
  background(20, 20, 40);

  // Mostrar tiempo y puntuación
  fill(255);
  textSize(24);
  text('Puntuación: ' + score, 10, 30);
  text('Tiempo: ' + timeLeft, 10, 60);

  // Dibujar y mover calabazas
  for (let i = pumpkins.length - 1; i >= 0; i--) {
    let p = pumpkins[i];
    imageMode(CENTER);
    image(pumpkinImage, p.x, p.y, 80, 80);
    p.timer--;

    // Actualizar posición
    p.x += p.vx;
    p.y += p.vy;

    // Rebotar en los bordes
    if (p.x < 40 || p.x > width - 40) {
      p.vx *= -1;
    }
    if (p.y < 40 || p.y > height - 40) {
      p.vy *= -1;
    }

    if (p.timer <= 0) {
      pumpkins.splice(i, 1);
    }
  }

  // Verificar fin del juego
  if (timeLeft <= 0) {
    fill(255, 0, 0);
    textSize(48);
    textAlign(CENTER);
    text(`¡Tiempo Terminado. Puntuación: ${score}!`, width / 2, height / 2);
    noLoop();
  }
}

function mousePressed() {
  for (let i = pumpkins.length - 1; i >= 0; i--) {
    if (dist(mouseX, mouseY, pumpkins[i].x, pumpkins[i].y) < 40) {
      pumpkins.splice(i, 1);
      score += 1;
      break;
    }
  }
}

function spawnPumpkin() {
  let pumpkin = {
    x: random(50, width - 50),
    y: random(50, height - 50),
    vx: random(-3, 3),
    vy: random(-3, 3),
    timer: 60 // Duración en frames
  };
  pumpkins.push(pumpkin);
}

function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
  }
}
