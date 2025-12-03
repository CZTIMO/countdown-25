const wrapper = document.getElementById("wrapper");

// Affiche la grille immédiatement
wrapper.classList.add("show");

// Gestion de la rotation des images
const images = document.querySelectorAll(".grid img");
const rotations = []; // Stocke les rotations actuelles

images.forEach((img, index) => {
  // Rotation aléatoire initiale (0°, 90°, 180° ou 270°)
  const randomRotation = Math.floor(Math.random() * 4) * 90;
  rotations[index] = randomRotation;
  img.style.transform = `rotate(${rotations[index]}deg)`;

  img.addEventListener("click", () => {
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
        }, 500);
      }, 1000);
    }
  });
});
