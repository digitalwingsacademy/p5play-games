let player;
let dementors = [];
let pumpkins = [];
let score = 0;
let gameOver = false;

let harryImg, dementorImg, pumpkinImg, bgImg;

function preload() {
  // Cargar imágenes
  harryImg = loadImage('https://storage.googleapis.com/imagenes_digital_wings/Harry_Potter_character_poster-removebg-preview.png'); // Imagen de Harry Potter
  dementorImg = loadImage('https://storage.googleapis.com/imagenes_digital_wings/figura-articulada-dementor-star-ace-16-cm-harry-potter-removebg-preview.png'); // Imagen de Dementor
  pumpkinImg = loadImage('https://storage.googleapis.com/imagenes_digital_wings/calabaza-halloween-removebg-preview.png'); // Imagen de calabaza
  bgImg = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv9aIhhMJfbZhIt7-hnrbcFwjfCd5wzVE7Ow&s'); // Fondo de Halloween
}

function setup() {
  createCanvas(600, 400);
  
  // Crear a Harry Potter
  player = createSprite(300, height - 40);
  player.addImage(harryImg);
  player.scale = 0.3; // Ajuste de escala para que se vea bien
  
  // Crear dementores
  for (let i = 0; i < 1; i++) {
    let dementor = createSprite(random(50, width - 50), random(-200, -50));
    dementor.addImage(dementorImg);
    dementor.scale = 0.1;
    dementor.velocity.y = 4;
    dementors.push(dementor);
  }
  
  // Crear calabazas
  for (let i = 0; i < 4; i++) {
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
    
    // Mover a Harry Potter al hacer clic en la parte izquierda o derecha
    if (mouseIsPressed) {
      if (mouseX < width / 2) {
        player.position.x -= 5; // Mover a la izquierda
      } else {
        player.position.x += 5; // Mover a la derecha
      }
    }
    
    // Evitar que Harry salga de la pantalla
    player.position.x = constrain(player.position.x, 20, width - 20);
    
    // Mover dementores y calabazas
    for (let dementor of dementors) {
      dementor.position.y += dementor.velocity.y;
      if (dementor.position.y > height + 20) {
        dementor.position.y = random(-200, -50);
        dementor.position.x = random(50, width - 50);
      }
      
      // Fin del juego si Harry toca un dementor
      if (player.overlap(dementor)) {
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
      if (player.overlap(pumpkin)) {
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
