import { createEngine } from "../_shared/engine.js";
import { Spring } from "../_shared/spring.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;

// Charger l'image
const arrowImage = new Image();
arrowImage.src = "./arrow.png";

// Taille de l'image pour les points
let imageSize = 400;
let mini = 0.3; // Facteur de scale (0 = invisible, 1 = taille normale)

const fixedPoints = [
  { x: 660, y: 860, radius: 5, magnetPower: 200 },
  { x: 660, y: 540, radius: 5, magnetPower: 200 },
  { x: 1520, y: 260, radius: 5, magnetPower: 200 },
  { x: 2260, y: 260, radius: 5, magnetPower: 200 },
  { x: 2550, y: 540, radius: 5, magnetPower: 200 },
  { x: 2550, y: 980, radius: 5, magnetPower: 200 },
  { x: 2020, y: 1520, radius: 5, magnetPower: 200 },
  { x: 2550, y: 1520, radius: 5, magnetPower: 200 },
  { x: 2550, y: 1940, radius: 5, magnetPower: 200 },
  { x: 660, y: 1940, radius: 5, magnetPower: 200 },
  { x: 2140, y: 800, radius: 5, magnetPower: 200 },
  { x: 2140, y: 700, radius: 5, magnetPower: 200 },
  { x: 2050, y: 620, radius: 5, magnetPower: 200 },
  { x: 1780, y: 620, radius: 5, magnetPower: 200 },
  { x: 1700, y: 700, radius: 5, magnetPower: 200 },
  { x: 1700, y: 880, radius: 5, magnetPower: 200 },
];

const draggablePoints = [
  {
    x: canvas.width / 2 - 450,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 450,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 0,
    // Propriétés pour l'animation d'apparition
    introScale: 0,
    introDelay: 0,
    introStarted: false,
    // Propriétés pour l'animation de sortie
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 390,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 390,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 1,
    introScale: 0,
    introDelay: 0.05,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 330,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 330,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 2,
    introScale: 0,
    introDelay: 0.1,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 270,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 270,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 3,
    introScale: 0,
    introDelay: 0.15,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 210,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 210,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 4,
    introScale: 0,
    introDelay: 0.2,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 150,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 150,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 5,
    introScale: 0,
    introDelay: 0.25,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 90,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 90,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 6,
    introScale: 0,
    introDelay: 0.3,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 - 30,
    y: canvas.height / 2,
    initialX: canvas.width / 2 - 30,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 7,
    introScale: 0,
    introDelay: 0.35,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 30,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 30,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 8,
    introScale: 0,
    introDelay: 0.4,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 90,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 90,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 9,
    introScale: 0,
    introDelay: 0.45,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 150,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 150,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 10,
    introScale: 0,
    introDelay: 0.5,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 210,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 210,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 11,
    introScale: 0,
    introDelay: 0.55,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 270,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 270,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 12,
    introScale: 0,
    introDelay: 0.6,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 330,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 330,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 13,
    introScale: 0,
    introDelay: 0.65,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 390,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 390,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 14,
    introScale: 0,
    introDelay: 0.7,
    introStarted: false,
    outroScale: 1,
  },
  {
    x: canvas.width / 2 + 450,
    y: canvas.height / 2,
    initialX: canvas.width / 2 + 450,
    initialY: canvas.height / 2,
    vx: 0,
    vy: 0,
    radius: 5,
    isDragging: false,
    isAnimating: false,
    isMagnetized: false,
    fixedPointIndex: 15,
    introScale: 0,
    introDelay: 0.75,
    introStarted: false,
    outroScale: 1,
  },
];

let startTime = Date.now();
let allMagnetized = false;
let outroStartTime = null;
let shapeOpacity = 1;

function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Fonction d'easing simple (ease out)
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner la forme créée par les points déplaçables
  if (draggablePoints.length > 0 && shapeOpacity > 0) {
    ctx.beginPath();
    ctx.moveTo(draggablePoints[0].x, draggablePoints[0].y);

    for (let i = 1; i < draggablePoints.length; i++) {
      ctx.lineTo(draggablePoints[i].x, draggablePoints[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = `rgba(255, 0, 0, ${shapeOpacity})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 255, 255, ${shapeOpacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Dessiner les points fixes (transparents)
  fixedPoints.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0)"; // Transparent
    ctx.fill();
  });

  // Dessiner les points déplaçables avec rotation vers leur point fixe
  draggablePoints.forEach((point) => {
    if (arrowImage.complete && point.introScale > 0 && point.outroScale > 0) {
      // Calculer l'angle vers le point fixe associé
      const associatedFixed = fixedPoints[point.fixedPointIndex];
      const dx = associatedFixed.x - point.x;
      const dy = associatedFixed.y - point.y;
      // Calculer l'angle en radians et ajouter 180 degrés (Math.PI)
      const angle = Math.atan2(dy, dx) + Math.PI;

      const scaledSize = imageSize * mini * point.introScale * point.outroScale;
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(angle);
      ctx.drawImage(
        arrowImage,
        -scaledSize / 2,
        -scaledSize / 2,
        scaledSize,
        scaledSize
      );
      ctx.restore();
    }
  });
}

function animate() {
  const elapsed = (Date.now() - startTime) / 1000;

  // Animer l'apparition des points
  draggablePoints.forEach((point) => {
    const timeSinceDelay = elapsed - point.introDelay;

    if (timeSinceDelay > 0 && point.introScale < 1) {
      const duration = 0.6; // Durée de l'animation en secondes
      const progress = Math.min(timeSinceDelay / duration, 1);
      point.introScale = easeOutCubic(progress);

      // Fixer à exactement 1 quand l'animation est terminée
      if (progress >= 1) {
        point.introScale = 1;
      }
    }

    if (point.isAnimating) {
      // Récupérer le point fixe associé à ce point déplaçable
      const associatedFixed = fixedPoints[point.fixedPointIndex];

      let targetX, targetY;

      // Calculer la distance avec le point fixe associé
      const dist = getDistance(
        point.x,
        point.y,
        associatedFixed.x,
        associatedFixed.y
      );
      const currentMagnetDistance = associatedFixed.magnetPower;

      if (dist < currentMagnetDistance && !point.isMagnetized) {
        point.isMagnetized = true;
        targetX = associatedFixed.x;
        targetY = associatedFixed.y;
      } else if (point.isMagnetized) {
        targetX = associatedFixed.x;
        targetY = associatedFixed.y;
      } else {
        targetX = point.initialX;
        targetY = point.initialY;
      }

      const dx = targetX - point.x;
      const dy = targetY - point.y;

      point.vx += dx * 0.01;
      point.vy += dy * 0.01;

      point.vx *= 0.9;
      point.vy *= 0.9;

      point.x += point.vx;
      point.y += point.vy;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        point.x = targetX;
        point.y = targetY;
        point.vx = 0;
        point.vy = 0;
        point.isAnimating = false;
      }
    }
  });

  // Vérifier si tous les points sont magnétisés
  const allPointsMagnetized = draggablePoints.every(
    (point) => point.isMagnetized
  );

  if (allPointsMagnetized && !allMagnetized) {
    allMagnetized = true;
    outroStartTime = Date.now();
  }

  // Animation de sortie si tous les points sont magnétisés
  if (allMagnetized && outroStartTime) {
    const outroElapsed = (Date.now() - outroStartTime) / 1000;
    const delayBeforeOutro = 4; // Délai de 4 secondes
    const outroDuration = 0.8;

    if (outroElapsed > delayBeforeOutro) {
      const animationTime = outroElapsed - delayBeforeOutro;

      if (animationTime < outroDuration) {
        const progress = animationTime / outroDuration;
        const easeProgress = easeOutCubic(progress);

        // Réduire le scale des images
        draggablePoints.forEach((point) => {
          point.outroScale = 1 - easeProgress;
        });

        // Réduire l'opacité de la forme
        shapeOpacity = 1 - easeProgress;
      } else {
        // Animation terminée
        draggablePoints.forEach((point) => {
          point.outroScale = 0;
        });
        shapeOpacity = 0;
      }
    }
  }

  draw();
  requestAnimationFrame(animate);
}

function isMouseOverPoint(mouseX, mouseY, point) {
  const dx = mouseX - point.x;
  const dy = mouseY - point.y;
  return Math.sqrt(dx * dx + dy * dy) <= imageSize / 2;
}

canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.clientX * 2;
  const mouseY = e.clientY * 2;

  for (let i = draggablePoints.length - 1; i >= 0; i--) {
    const point = draggablePoints[i];
    if (isMouseOverPoint(mouseX, mouseY, point)) {
      console.log(mouseX, mouseY, point);
      point.isDragging = true;
      point.isAnimating = false;
      point.isMagnetized = false;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  draggablePoints.forEach((point) => {
    if (point.isDragging) {
      point.x = e.clientX * 2;
      point.y = e.clientY * 2;
      draw();
    }
  });
});

canvas.addEventListener("mouseup", () => {
  draggablePoints.forEach((point) => {
    if (point.isDragging) {
      point.isDragging = false;
      point.isAnimating = true;
    }
  });
});

function moveAllPointsToTargets() {
  draggablePoints.forEach((point) => {
    point.isDragging = false;
    point.isMagnetized = true;
    point.isAnimating = true;
    point.vx = 0;
    point.vy = 0;
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "a") {
    moveAllPointsToTargets();
  }
});

draw();
animate();

arrowImage.onload = () => {
  draw();
};
