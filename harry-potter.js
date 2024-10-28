let harry;
let dementors = [];
let pumpkins = [];
let score = 0;
let gameOver = false;

let harryImg, dementorImg, pumpkinImg, bgImg;

function preload() {
  // Cargar imágenes actualizadas
  harryImg = loadImage('https://storage.googleapis.com/imagenes_digital_wings/Harry_Potter_character_poster-removebg-preview.png'); // Imagen de Harry Potter
  dementorImg = loadImage('https://storage.googleapis.com/imagenes_digital_wings/figura-articulada-dementor-star-ace-16-cm-harry-potter-removebg-preview.png'); // Imagen de Dementor
  pumpkinImg = loadImage('https://storage.googleapis.com/imagenes_digital_wings/calabaza-halloween-removebg-preview.png'); // Imagen de calabaza
  bgImg = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv9aIhhMJfbZhIt7-hnrbcFwjfCd5wzVE7Ow&s'); // Fondo de Halloween
}

function setup() {
  let canvas = createCanvas(600, 400);
  //canvas.parent('gameContainer');
  
  // Crear a Harry Potter
  harry = createSprite(300, height - 40);
  harry.addImage(harryImg);
  harry.scale = 0.3; // Ajuste de escala para que se vea bien
  
  // Crear dementores
  for (let i = 0; i < 4; i++) {
    let dementor = createSprite(random(50, width - 50), random(-200, -50));
    dementor.addImage(dementorImg);
    dementor.scale = 0.15;
    dementor.velocity.y = 4;
    dementors.push(dementor);
  }
  
  // Crear calabazas
  for (let i = 0; i < 5; i++) {

    let pumpkin = createSprite(random(50, width - 50), random(-200, -50));
    pumpkin.addImage(pumpkinImg);
    pumpkin.scale = 0.1; // Tamaño adecuado para que sea visible
    pumpkin.velocity.y = random(2, 5);
    pumpkins.push(pumpkin);
  }
}

function draw() {
  background(bgImg); // Fondo de Halloween
  
  if (!gameOver) {
    // Mostrar el puntaje
    textSize(24);
    fill(255);
    text('Puntos: ' + score, 10, 30);
    
    // Mover a Harry Potter con las flechas del teclado
    if (keyIsDown(LEFT_ARROW)) {
      harry.position.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      harry.position.x += 5;
    }
    
    // Evitar que Harry salga de la pantalla
    harry.position.x = constrain(harry.position.x, 20, width - 20);
    
    // Mover dementores y calabazas
    for (let dementor of dementors) {
      dementor.position.y += dementor.velocity.y;
      if (dementor.position.y > height + 20) {
        dementor.position.y = random(-200, -50);
        dementor.position.x = random(50, width - 50);
      }
      
      // Fin del juego si Harry toca un dementor
      if (harry.overlap(dementor)) {
        gameOver = true;
      }
    }
    
    for (let pumpkin of pumpkins) {
      pumpkin.position.y += pumpkin.velocity.y;
      if (pumpkin.position.y > height + 20) {
        pumpkin.position.y = random(-200, -50);
        pumpkin.position.x = random(50, width - 50);
      }
      
      // Si Harry toca una calabaza, suma puntos y desaparece
      if (harry.overlap(pumpkin)) {
        score += 1;
        pumpkin.position.y = random(-200, -50);
        pumpkin.position.x = random(50, width - 50);
      }
    }

  } else {
    // Mostrar mensaje de Game Over
    textSize(36);
    fill(255, 0, 0);
    text('   ¡GAME OVER!', width / 2 - 100, height / 2);
    textSize(24);
    text('Tu puntuación final: ' + score, width / 2 - 70, height / 2 + 50);
  }
}
