let dragon;
let dragonX, dragonY;
let score = 0;
let timer = 15;

function preload() {
  // Carga la imagen del dragón
  dragon = loadImage('https://cdn.pixabay.com/photo/2017/01/03/17/04/dragon-1949993_1280.png'); // Reemplaza con tu sprite
}

function setup() {
  createCanvas(400, 400);
  dragonX = random(width);
  dragonY = random(height);
  textAlign(CENTER, CENTER);
  frameRate(60);
}

function draw() {
  background(200);

  // Dibuja el dragón
  image(dragon, dragonX, dragonY, 60, 60); // Tamaño del dragón: 60x60

  // Dibuja la puntuación y el temporizador
  fill(0);
  textSize(16);
  text(`Puntos: ${score}`, width / 2, 20);
  text(`Tiempo: ${timer}`, width / 2, 40);

   // Actualiza el temporizador
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }

  if (timer == 0) {
    textSize(32);
    fill(0);
    text("¡Juego Terminado!", width / 2, height / 2);
    noLoop(); // Detiene el juego cuando el tiempo se acaba
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, dragonX + 30, dragonY + 30); // Centrado en el dragón
  if (d < 30 && timer > 0) {
    score++;
    dragonX = random(width - 60); // Mueve el dragón a una nueva posición
    dragonY = random(height - 60);
  }
}