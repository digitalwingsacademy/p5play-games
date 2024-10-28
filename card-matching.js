let cards = [];
let images = [];
let flippedCards = [];
let matches = 0;
let attempts = 0;
let isProcessing = false;

function preload() {
  // Carga de imágenes de monstruos
  for (let i = 1; i <= 8; i++) {
    images.push(loadImage(`https://storage.googleapis.com/imagenes_digital_wings/monster${i}.png`));
  }
}

function setup() {
  createCanvas(700, 750); // Aumentamos la altura del canvas a 750
  let positions = [];

  // Crear posiciones para las cartas en una cuadrícula de 4x4
  for (let x = 100; x <= 550; x += 150) {
    for (let y = 150; y <= 600; y += 150) { // Comenzamos en y = 150 en lugar de 100
      positions.push({ x: x, y: y });
    }
  }

  // Duplicar y mezclar imágenes
  let deck = images.concat(images);
  deck.sort(() => 0.5 - Math.random());

  // Crear cartas
  for (let i = 0; i < deck.length; i++) {
    let pos = positions[i];
    let card = {
      x: pos.x,
      y: pos.y,
      image: deck[i],
      flipped: false,
      matched: false
    };
    cards.push(card);
  }
}

function draw() {
  background(30, 30, 80);

  // Dibujar fondo para las puntuaciones
  fill(50, 50, 100);
  rect(0, 0, width, 80);

  // Mostrar puntuaciones
  textSize(24);
  fill(255);
  text('Intentos: ' + attempts, 10, 40);
  text('Pares Encontrados: ' + matches, 10, 70);

  // Dibujar cartas
  for (let card of cards) {
    if (card.flipped || card.matched) {
      imageMode(CENTER);
      image(card.image, card.x, card.y, 100, 100);
    } else {
      fill(200);
      rectMode(CENTER);
      rect(card.x, card.y, 100, 100, 10);
    }
  }

  // Verificar si todas las parejas fueron encontradas
  if (matches === images.length) {
    fill(0, 255, 0);
    textSize(48);
    textAlign(CENTER);
    text(`¡Has ganado en ${attempts} intentos!`, width / 2, height / 2);
    noLoop();
  }
}

function mousePressed() {
  if (isProcessing) {
    return; // No permite interacción mientras se procesan las cartas
  }

  for (let card of cards) {
    if (
      !card.flipped &&
      !card.matched &&
      mouseX > card.x - 50 &&
      mouseX < card.x + 50 &&
      mouseY > card.y - 50 &&
      mouseY < card.y + 50
    ) {
      card.flipped = true;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        isProcessing = true; // Comienza el procesamiento
        attempts++;

        if (flippedCards[0].image === flippedCards[1].image) {
          flippedCards[0].matched = true;
          flippedCards[1].matched = true;
          matches++;
          flippedCards = [];
          isProcessing = false; // Finaliza el procesamiento
        } else {
          let [firstCard, secondCard] = flippedCards; // Guardar referencias
          setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            flippedCards = [];
            isProcessing = false; // Finaliza el procesamiento
          }, 1000);
        }
      }

      break;
    }
  }
}
