
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

// -----------------------------
// Park Intro
// -----------------------------
function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
    <p>${data.description}</p>`;
}

// -----------------------------
// Park Info Cards
// -----------------------------
function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

// -----------------------------
// Initialize Page
// -----------------------------
async function init() {
  const parkData = await getParkData();
  const infoLinks = getInfoLinks(parkData.images);

  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(infoLinks);

  // WEATHER
  document.querySelector(".weather").innerHTML = `<h2>Weather</h2><p>${parkData.weatherInfo}</p>`;

  // DIRECTIONS
  document.querySelector(".directions").innerHTML = `<h2>Directions</h2><p>${parkData.directionsInfo} <a href="${parkData.directionsUrl}" target="_blank">More directions</a></p>`;

  // GALLERY
  const galleryTemplate = (img) => `<figure><img src="${img.url}" alt="${img.altText}"><figcaption>${img.caption}</figcaption></figure>`;
  document.querySelector(".gallery").innerHTML = parkData.images.map(galleryTemplate).join("");
}

init();
