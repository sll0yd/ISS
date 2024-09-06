
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

      // Create a new marker and add it to the map
      marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup(`ISS Position: ${latitude}, ${longitude}`).openPopup();

      infoElement.textContent = `Updated: ${timestamp.toLocaleString()}`;
    })
    .catch((error) => {
      infoElement.textContent = `Error: ${error.message}`;
    });
}

let marker; // Variable pour stocker le marker

updateISSPosition();
setInterval(updateISSPosition, 5000);






// Exercice O'code pour l'heure
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
  const time = now.toTimeString();
  return `${date} / ${time} `;
}
