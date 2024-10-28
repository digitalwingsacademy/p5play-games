// Declaración de variables
let player;
let hiddenObjects;
let score = 0;
let playerImage;
let hiddenObjectImage1; // Imagen de calabaza
let hiddenObjectImage2; // Imagen de caramelo
let flashlightRadius = 60; // Radio reducido de la linterna
let timeLimit = 20; // Tiempo límite en segundos
let startTime;

function preload() {
  // Cargar imágenes antes de que inicie el programa
  playerImage = loadImage('https://cdn.pixabay.com/photo/2021/02/09/13/33/flashlight-5998564_640.png'); // Linterna
  hiddenObjectImage1 = loadImage('https://cdn.pixabay.com/photo/2012/04/01/16/39/halloween-23439_640.png'); // Calabaza
  hiddenObjectImage2 = loadImage('https://cdn.pixabay.com/photo/2014/03/25/15/18/candy-296443_640.png'); // Caramelo
}

function setup() {
  createCanvas(800, 600);
  // Crear el sprite del jugador (linterna)
  player = createSprite(width / 2, height / 2, 50, 50);
  player.addImage(playerImage);
  player.scale = 0.15; // Ajustar el tamaño de la linterna

  // Crear un grupo para los objetos ocultos
  hiddenObjects = new Group();

  // Crear el primer conjunto de objetos ocultos
  for (let i = 0; i < 5; i++) {
    generarNuevoObjeto();
  }

  startTime = millis(); // Iniciar el contador de tiempo
}

function draw() {
  background(0); // Noche oscura

  // Calcular tiempo restante
  let elapsedTime = (millis() - startTime) / 1000;
  let remainingTime = Math.max(0, timeLimit - floor(elapsedTime));

  // Si se acaba el tiempo, detener el juego
  if (remainingTime <= 0) {
    endGame();
    return;
  }

  // Movimiento de la linterna
  if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    player.position.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.position.y += 5;
  }

  // Mantener la linterna dentro de los límites del canvas
  player.position.x = constrain(player.position.x, 0 + flashlightRadius, width - flashlightRadius);
  player.position.y = constrain(player.position.y, 0 + flashlightRadius, height - flashlightRadius);

  // Dibujar un círculo que representa la linterna y que sigue al jugador
  fill(255, 255, 0, 100); // Luz amarillenta semitransparente
  noStroke();
  ellipse(player.position.x, player.position.y, flashlightRadius * 2); // Linterna como un círculo de luz

  // Ocultar los objetos excepto cuando están dentro del área de la linterna
  hiddenObjects.forEach(hiddenObject => {
    let d = dist(player.position.x, player.position.y, hiddenObject.position.x, hiddenObject.position.y);
    if (d < flashlightRadius) {
      hiddenObject.visible = true; // Mostrar el objeto cuando está dentro del área de la linterna
      if (!hiddenObject.found) { // Si aún no ha sido encontrado
        hiddenObject.found = true; // Marcar como encontrado
        score++;  // Aumentar la puntuación
        // Dejar el objeto visible por un tiempo corto antes de eliminarlo
        setTimeout(() => {
          hiddenObject.remove();  // Eliminar el objeto
          generarNuevoObjeto();  // Generar un nuevo objeto en un lugar aleatorio
        }, 500);  // Eliminar el objeto después de 0.5 segundos
      }
    } else {
      hiddenObject.visible = false; // Ocultar el objeto si no está dentro del área de la linterna
    }
  });

  //drawSprites();

  // Mostrar puntuación y tiempo restante
  fill(255);
  textSize(24);
  text('Objetos encontrados: ' + score, 10, 30);
  text('Tiempo restante: ' + remainingTime + 's', 10, 60);
}

// Función para generar un nuevo objeto oculto en una posición aleatoria
function generarNuevoObjeto() {
  let hiddenObject = createSprite(random(50, width - 50), random(50, height - 50), 30, 30);
  
  // Alternar entre calabaza y caramelo
  if (random() > 0.5) {
    hiddenObject.addImage(hiddenObjectImage1); // Calabaza
    hiddenObject.scale = 0.07; // Tamaño más pequeño de la calabaza
  } else {
    hiddenObject.addImage(hiddenObjectImage2); // Caramelo
    hiddenObject.scale = 0.1; // Tamaño del caramelo
  }
  
  hiddenObject.found = false;  // Establecer como no encontrado
  hiddenObjects.add(hiddenObject);
}

// Función para terminar el juego
function endGame() {
  background(0);
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('¡Se acabó el tiempo!', width / 2, height / 2 - 20);
  text('Puntuación total: ' + score, width / 2, height / 2 + 20);
}
