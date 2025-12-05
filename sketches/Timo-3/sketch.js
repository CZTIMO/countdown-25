const wrapper = document.getElementById("wrapper");
import { createEngine } from "../_shared/engine.js";

const { finish } = createEngine();

// Charge le son de rotation
const rotateSound = new Audio("./click.mp3");
rotateSound.volume = 0.2; // Baisse le volume à 30%

// Affiche la grille immédiatement
wrapper.classList.add("show");

// Gestion de la rotation des images
const images = document.querySelectorAll(".grid img");
const rotations = []; // Stocke les rotations actuelles
let canInteract = false; // Bloque l'interaction pendant l'animation d'entrée

window.addEventListener("keypress", (e) => {
  if (e.key === "f" || e.key === "F") {
    finish();
  }
});

// Fonction pour animer l'entrée des images une par une
function animateImagesEntry() {
  // Définit quelle image vient de quel côté selon sa position dans la grille 3x3
  // Index: 0 1 2
  //        3 4 5
  //        6 7 8
  const directions = [
    "left", // 0 - colonne gauche
    "top", // 1 - colonne centre
    "right", // 2 - colonne droite
    "left", // 3 - colonne gauche
    "bottom", // 4 - centre (bas)
    "right", // 5 - colonne droite
    "left", // 6 - colonne gauche
    "top", // 7 - colonne centre
    "right", // 8 - colonne droite
  ];

  images.forEach((img, index) => {
    // Rotation aléatoire initiale (0°, 90°, 180° ou 270°)
    const randomRotation = Math.floor(Math.random() * 4) * 90;
    rotations[index] = randomRotation;

    // Définit la variable CSS pour la rotation finale
    img.style.setProperty("--rotation", `${randomRotation}deg`);

    // Délai progressif pour chaque image (200ms entre chaque)
    setTimeout(() => {
      img.classList.add(`enter-${directions[index]}`);
    }, index * 200);
  });

  // Permet l'interaction après que toutes les images soient entrées
  setTimeout(() => {
    canInteract = true;
    // Supprime les classes d'animation et applique la transformation finale
    images.forEach((img, index) => {
      img.classList.remove(`enter-${directions[index]}`);
      img.style.animation = "none";
      img.style.opacity = "1";
      img.style.transform = `rotate(${rotations[index]}deg)`;
    });
  }, images.length * 200 + 600); // 600ms = durée de l'animation
}

// Lance l'animation d'entrée
animateImagesEntry();

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    // Ne permet pas l'interaction tant que l'animation d'entrée n'est pas terminée
    if (!canInteract) return;

    // Joue le son de rotation
    rotateSound.currentTime = 0; // Remet le son au début pour pouvoir le rejouer rapidement
    rotateSound.play();

    rotations[index] += 90;
    img.style.transform = `rotate(${rotations[index]}deg)`;

    // Vérifie si toutes les images sont à 0° (ou multiples de 360°)
    const allCorrect = rotations.every((rotation) => rotation % 360 === 0);

    if (allCorrect) {
      // Attend 1 seconde avant de faire disparaître
      setTimeout(() => {
        // Toutes les images sont correctes - fade out smooth
        wrapper.style.opacity = "0";

        // Après l'animation, cache complètement la grille
        setTimeout(() => {
          wrapper.style.display = "none";
        }, 6000);
        setTimeout(() => {
          finish();
        }, 3000);
      }, 3000);
    }
  });
});
