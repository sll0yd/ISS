// Récupérer l'élement HTML
const mapElement = document.getElementById("map");

// initialiser la carte avec un zoom de 2
const map = L.map("map").setView([0, 0], 2);

// Ajout de la couche OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function updateISSPosition() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.latitude;
      const longitude = data.longitude;
      const timestamp = new Date(data.timestamp * 1000);

      // enleve les precedents marker
      if (marker) {
        map.removeLayer(marker);
      }

      // Créer un marker avec la position de l'ISS
      marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup(`🚀 ISS Position 🧭`).openPopup();
    });
}

let marker; // Variable pour stocker le marker

//Appel de la fonction
updateISSPosition();

// Appel de la fonction toutes les 5 secondes
setInterval(updateISSPosition, 5000);

// Exercice O'code pour afficher l'heure
setInterval(setTime, 1000);

function setTime() {
  document.getElementById("clock").innerText = getTime();
}

function getTime() {
  const now = new Date();
  const date = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toTimeString().substring(0, 18);
  return ` ${date} ⏱️ ${time} `;
}
