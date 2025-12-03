import { createEngine } from "../_shared/engine.js";
import { Spring } from "../_shared/spring.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;

// Charger l'image
const arrowImage = new Image();
arrowImage.src = "./arrow.png";

// Taille de l'image pour les points
const imageSize = 70;

const fixedPoints = [
  { x: 330, y: 430, radius: 5, magnetPower: 200 },
  { x: 330, y: 270, radius: 5, magnetPower: 200 },
  { x: 760, y: 130, radius: 5, magnetPower: 200 },
  { x: 1130, y: 130, radius: 5, magnetPower: 200 },
  { x: 1275, y: 270, radius: 5, magnetPower: 200 },
  { x: 1275, y: 490, radius: 5, magnetPower: 200 },
  { x: 1010, y: 760, radius: 5, magnetPower: 200 },
  { x: 1275, y: 760, radius: 5, magnetPower: 200 },
  { x: 1275, y: 970, radius: 5, magnetPower: 200 },
  { x: 330, y: 970, radius: 5, magnetPower: 200 },
  { x: 1070, y: 400, radius: 5, magnetPower: 200 },
  { x: 1070, y: 350, radius: 5, magnetPower: 200 },
  { x: 1025, y: 310, radius: 5, magnetPower: 200 },
  { x: 890, y: 310, radius: 5, magnetPower: 200 },
  { x: 850, y: 350, radius: 5, magnetPower: 200 },
  { x: 850, y: 440, radius: 5, magnetPower: 200 },
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
    fixedPointIndex: 0, // Associé au premier point fixe
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
  },
];

function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner la forme créée par les points déplaçables
  if (draggablePoints.length > 0) {
    ctx.beginPath();
    ctx.moveTo(draggablePoints[0].x, draggablePoints[0].y);

    for (let i = 1; i < draggablePoints.length; i++) {
      ctx.lineTo(draggablePoints[i].x, draggablePoints[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = "rgba(255, 0, 0, 1)";
    ctx.fill();
    ctx.strokeStyle = "#fff";
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
    if (arrowImage.complete) {
      // Calculer l'angle vers le point fixe associé
      const associatedFixed = fixedPoints[point.fixedPointIndex];
      const dx = associatedFixed.x - point.x;
      const dy = associatedFixed.y - point.y;
      // Calculer l'angle en radians et ajouter 180 degrés (Math.PI)
      const angle = Math.atan2(dy, dx) + Math.PI;

      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(angle);
      ctx.drawImage(
        arrowImage,
        -imageSize / 2,
        -imageSize / 2,
        imageSize,
        imageSize
      );
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    }
  });
}

function animate() {
  draggablePoints.forEach((point) => {
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

  draw();
  requestAnimationFrame(animate);
}

function isMouseOverPoint(mouseX, mouseY, point) {
  const dx = mouseX - point.x;
  const dy = mouseY - point.y;
  return Math.sqrt(dx * dx + dy * dy) <= imageSize / 2;
}

canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  for (let i = draggablePoints.length - 1; i >= 0; i--) {
    const point = draggablePoints[i];
    if (isMouseOverPoint(mouseX, mouseY, point)) {
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
      point.x = e.clientX;
      point.y = e.clientY;
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

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draggablePoints.forEach((point, i) => {
    point.initialX = canvas.width / 2 - 450 + i * 60;
    point.initialY = canvas.height / 2;
    point.x = point.initialX;
    point.y = point.initialY;
  });

  draw();
});

draw();
animate();

arrowImage.onload = () => {
  draw();
};
