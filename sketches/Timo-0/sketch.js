import { createEngine } from "../_shared/engine.js";
import { createSpringSettings, Spring } from "../_shared/spring.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

const spring = new Spring({
  position: 0,
});

const settings = createSpringSettings({
  frequency: 1.5,
  halfLife: 0.1,
});

spring.settings = settings;

// Carré qui se déplace
const squareSize = 450;
let visitedPoints = new Set(); // Points déjà visités
let previousIndex = 0; // Pour tracer le chemin continu
let audioEnabled = true; // Audio activé par défaut
let lastSoundTime = 0; // Pour gérer le délai entre les sons
const soundDelay = 50; // Délai en ms entre chaque son (ajustable)

// Variables pour l'intro
let introStartTime = null;
let waitDuration = 2000; // 2 secondes d'attente (écran noir)
let scaleDuration = 500; // 0.5 seconde pour le scale
let introComplete = false;
let imageScale = 0; // Scale de l'image pendant l'intro
let introSoundPlayed = false; // Pour jouer le son une seule fois

// Charger l'image
const scrollImage = new Image();
scrollImage.src = "./POPUP.png";

// Fonction pour jouer le son (crée une nouvelle instance à chaque fois)
function playErrorSound() {
  const now = Date.now();
  if (now - lastSoundTime < soundDelay) return; // Respecter le délai

  lastSoundTime = now;
  const sound = new Audio("./ERROR.mp3");
  sound.volume = 0.15; // Volume à 15% pour éviter la saturation
  sound.play().catch((e) => {
    console.log("Audio play failed:", e);
  });
}

// Fonction pour jouer le son de l'intro (sans délai)
function playIntroSound() {
  const sound = new Audio("./ERROR.mp3");
  sound.volume = 0.15;
  sound.play().catch((e) => {
    console.log("Audio play failed:", e);
  });
}

// Créer le chemin du "0"
function createZeroPath(centerX, centerY, radius) {
  const points = [];
  const numPoints = 1000;

  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius * 1.3; // Ellipse
    points.push({ x, y });
  }

  return points;
}

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(canvas.width, canvas.height) * 0.3;
const zeroPath = createZeroPath(centerX, centerY, radius);

// Fonction pour marquer tous les points entre deux indices (en gérant le parcours circulaire)
function markPointsBetween(startIndex, endIndex, pathLength, isHovering) {
  if (startIndex === endIndex) {
    if (!visitedPoints.has(startIndex)) {
      visitedPoints.add(startIndex);
    }
    if (isHovering) {
      playErrorSound(); // Son si on survole
    }
    return;
  }

  // Calculer la distance dans les deux directions
  const forwardDist = (endIndex - startIndex + pathLength) % pathLength;
  const backwardDist = (startIndex - endIndex + pathLength) % pathLength;

  // Choisir le chemin le plus court
  if (forwardDist <= backwardDist) {
    // Aller en avant
    let current = startIndex;
    while (current !== endIndex) {
      visitedPoints.add(current);
      if (isHovering) {
        playErrorSound(); // Son pour chaque point si on survole
      }
      current = (current + 1) % pathLength;
    }
    visitedPoints.add(endIndex);
    if (isHovering) {
      playErrorSound(); // Son pour le dernier point
    }
  } else {
    // Aller en arrière
    let current = startIndex;
    while (current !== endIndex) {
      visitedPoints.add(current);
      if (isHovering) {
        playErrorSound(); // Son pour chaque point si on survole
      }
      current = (current - 1 + pathLength) % pathLength;
    }
    visitedPoints.add(endIndex);
    if (isHovering) {
      playErrorSound(); // Son pour le dernier point
    }
  }
}

function update(dt) {
  // Initialiser le temps de début de l'intro
  if (introStartTime === null) {
    introStartTime = Date.now();
  }

  const elapsedTime = Date.now() - introStartTime;

  // Gérer l'intro
  if (!introComplete) {
    // Phase 1: Écran noir pendant 2 secondes
    if (elapsedTime < waitDuration) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Phase 2: Animation de scale pendant 0.5 seconde
    const scaleElapsed = elapsedTime - waitDuration;
    if (scaleElapsed < scaleDuration) {
      const progress = scaleElapsed / scaleDuration;
      imageScale = easeOutCubic(progress);

      // Jouer le son au début du scale
      if (!introSoundPlayed) {
        playIntroSound();
        introSoundPlayed = true;
      }

      // Dessiner l'écran noir
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner l'image au centre avec scale
      const pos = zeroPath[0];
      const scaledSize = squareSize * imageScale;

      if (scrollImage.complete) {
        ctx.drawImage(
          scrollImage,
          pos.x - scaledSize / 2,
          pos.y - scaledSize / 2,
          scaledSize,
          scaledSize
        );
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(
          pos.x - scaledSize / 2,
          pos.y - scaledSize / 2,
          scaledSize,
          scaledSize
        );
      }

      return;
    } else {
      // Intro terminée
      introComplete = true;
      imageScale = 1;
      visitedPoints.add(0); // Marquer le premier point comme visité
    }
  }

  // Vérifier si on a visité tous les points
  if (visitedPoints.size >= zeroPath.length - 1) {
    // Tout est rempli, affichage final
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner tous les points visités
    for (let pointIndex of visitedPoints) {
      const visitedPos = zeroPath[pointIndex];
      if (scrollImage.complete) {
        ctx.drawImage(
          scrollImage,
          visitedPos.x - squareSize / 2,
          visitedPos.y - squareSize / 2,
          squareSize,
          squareSize
        );
      }
    }
    return; // Ne plus continuer l'update
  }

  // Récupérer la position de la souris
  const mouseX = input.getX();
  const mouseY = input.getY();

  // Position actuelle du carré
  let progress = spring.position % 1;
  if (progress < 0) progress += 1; // Gérer les valeurs négatives
  const currentPointIndex = Math.floor(progress * (zeroPath.length - 1));
  const pos = zeroPath[currentPointIndex];

  // Vérifier si la souris survole le carré
  const isHoveringSquare =
    mouseX >= pos.x - squareSize / 2 &&
    mouseX <= pos.x + squareSize / 2 &&
    mouseY >= pos.y - squareSize / 2 &&
    mouseY <= pos.y + squareSize / 2;

  if (isHoveringSquare) {
    // Déterminer de quel côté vient la souris
    const nextIndex = (currentPointIndex + 1) % zeroPath.length;
    const prevIndex =
      (currentPointIndex - 1 + zeroPath.length) % zeroPath.length;

    const nextPos = zeroPath[nextIndex];
    const prevPos = zeroPath[prevIndex];

    // Distance de la souris au point suivant vs point précédent
    const distToNext = Math.sqrt(
      (mouseX - nextPos.x) ** 2 + (mouseY - nextPos.y) ** 2
    );
    const distToPrev = Math.sqrt(
      (mouseX - prevPos.x) ** 2 + (mouseY - prevPos.y) ** 2
    );

    // Fuir dans la direction opposée à la souris
    if (distToNext < distToPrev) {
      // La souris vient du côté "suivant", donc fuir vers l'arrière
      spring.target = spring.position - 0.3;
    } else {
      // La souris vient du côté "précédent", donc fuir vers l'avant
      spring.target = spring.position + 0.3;
    }
  } else {
    // Garder la position actuelle
    spring.target = spring.position;
  }

  spring.step(dt);

  // Marquer tous les points entre la dernière position et la position actuelle
  markPointsBetween(
    previousIndex,
    currentPointIndex,
    zeroPath.length,
    isHoveringSquare
  );

  // Mettre à jour l'index précédent
  previousIndex = currentPointIndex;

  // Dessiner le fond noir
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessiner tous les carrés laissés derrière
  for (let pointIndex of visitedPoints) {
    const visitedPos = zeroPath[pointIndex];
    if (scrollImage.complete) {
      ctx.drawImage(
        scrollImage,
        visitedPos.x - squareSize / 2,
        visitedPos.y - squareSize / 2,
        squareSize,
        squareSize
      );
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(
        visitedPos.x - squareSize / 2,
        visitedPos.y - squareSize / 2,
        squareSize,
        squareSize
      );
    }
  }

  // Dessiner l'image actuelle (par-dessus)
  if (scrollImage.complete) {
    ctx.drawImage(
      scrollImage,
      pos.x - squareSize / 2,
      pos.y - squareSize / 2,
      squareSize,
      squareSize
    );
  } else {
    ctx.fillStyle = "white";
    ctx.fillRect(
      pos.x - squareSize / 2,
      pos.y - squareSize / 2,
      squareSize,
      squareSize
    );
  }
}

// Fonction easing pour l'animation de scale
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
