import { createEngine } from "../_shared/engine.js";
import { Spring } from "../_shared/spring.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;

let mini = 0.3; // Facteur de scale

run(update);

let sketchStarted = false;
function update() {
  if (!sketchStarted) {
    sketchStarted = true;
    animate();
  }
}

window.addEventListener("keypress", (e) => {
  if (e.key === "f" || e.key === "F") {
    finish();
  }
});

const fixedPoints = [
  { x: 660, y: 860, radius: 5, magnetPower: 500 },
  { x: 660, y: 540, radius: 5, magnetPower: 500 },
  { x: 1520, y: 260, radius: 5, magnetPower: 500 },
  { x: 2260, y: 260, radius: 5, magnetPower: 500 },
  { x: 2550, y: 540, radius: 5, magnetPower: 500 },
  { x: 2550, y: 980, radius: 5, magnetPower: 500 },
  { x: 2020, y: 1520, radius: 5, magnetPower: 500 },
  { x: 2550, y: 1520, radius: 5, magnetPower: 500 },
  { x: 2550, y: 1940, radius: 5, magnetPower: 500 },
  { x: 660, y: 1940, radius: 5, magnetPower: 500 },
  { x: 2140, y: 800, radius: 5, magnetPower: 500 },
  { x: 2140, y: 700, radius: 5, magnetPower: 500 },
  { x: 2050, y: 620, radius: 5, magnetPower: 500 },
  { x: 1780, y: 620, radius: 5, magnetPower: 500 },
  { x: 1700, y: 700, radius: 5, magnetPower: 500 },
  { x: 1700, y: 880, radius: 5, magnetPower: 500 },
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
    introScale: 0,
    introDelay: 0,
    introStarted: false,
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

let startTime = null;
let allMagnetized = false;
let outroStartTime = null;
let shapeOpacity = 1;

function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

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
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  // Dessiner les points fixes (transparents)
  fixedPoints.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fill();
  });

  // Dessiner les points déplaçables avec le texte de distance
  draggablePoints.forEach((point) => {
    if (point.introScale > 0 && point.outroScale > 0) {
      const associatedFixed = fixedPoints[point.fixedPointIndex];
      const dx = associatedFixed.x - point.x;
      const dy = associatedFixed.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Formater le texte avec les coordonnées
      const distanceText = `${Math.round(distance)}px`;

      // Calculer l'opacité finale
      const finalOpacity = point.introScale * point.outroScale;

      ctx.save();
      ctx.translate(point.x, point.y);

      // Configuration du texte
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Ombre du texte pour meilleure visibilité
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Dessiner le texte avec opacité
      ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
      ctx.fillText(distanceText, 0, 0);

      ctx.restore();
    }
  });
}

function animate() {
  if (!startTime) startTime = Date.now();
  const elapsed = (Date.now() - startTime) / 1000;

  // Animer l'apparition des points
  draggablePoints.forEach((point) => {
    const timeSinceDelay = elapsed - point.introDelay;

    if (timeSinceDelay > 0 && point.introScale < 1) {
      const duration = 0.6;
      const progress = Math.min(timeSinceDelay / duration, 1);
      point.introScale = easeOutCubic(progress);

      if (progress >= 1) {
        point.introScale = 1;
      }
    }

    if (point.isAnimating) {
      const associatedFixed = fixedPoints[point.fixedPointIndex];

      let targetX, targetY;

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

  // Animation de sortie
  if (allMagnetized && outroStartTime) {
    const outroElapsed = (Date.now() - outroStartTime) / 1000;
    const delayBeforeOutro = 4;
    const outroDuration = 0.8;
    finish();

    if (outroElapsed > delayBeforeOutro) {
      const animationTime = outroElapsed - delayBeforeOutro;

      if (animationTime < outroDuration) {
        const progress = animationTime / outroDuration;
        const easeProgress = easeOutCubic(progress);

        draggablePoints.forEach((point) => {
          point.outroScale = 1 - easeProgress;
        });

        shapeOpacity = 1 - easeProgress;
      } else {
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
  return Math.sqrt(dx * dx + dy * dy) <= 50; // Zone de clic plus petite pour le texte
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
