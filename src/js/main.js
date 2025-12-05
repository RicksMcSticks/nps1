import "../css/style.css"; // from instructor (optional, only if using Vite)
import "../css/home.css"; // optional, can remove if not using
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import enableNavigation from "./navigation.mjs";


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
// Weather, Directions, Gallery
// -----------------------------
function setExtraSections(data) {
  document.querySelector(".weather").innerHTML = `<h2>Weather</h2><p>${data.weatherInfo}</p>`;
  document.querySelector(".directions").innerHTML = `<h2>Directions</h2><p>${data.directionsInfo} <a href="${data.directionsUrl}" target="_blank">More directions</a></p>`;

  const galleryTemplate = (img) => `<figure><img src="${img.url}" alt="${img.altText}"><figcaption>${img.caption}</figcaption></figure>`;
  document.querySelector(".gallery").innerHTML = data.images.map(galleryTemplate).join("");
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
  setExtraSections(parkData);
}

init();

enableNavigation();

//nav bar 
  // <button id="">Go to New Page</button>
  // const button = document.getElementById("myButton");
  // button.addEventListener("click", function() {
  //   window.location.href = "newpage.html"; // goes to new page
  // });

// <li><a href="#global-nav-toggle">Skip to global NPS navigation</a></li>
 //     <li><a href="#local-nav">Skip to this park navigation</a></li>
  //    <li><a href="#main">Skip to the main content</a></li>
  //    <li><a href="#park-footer"></a>
