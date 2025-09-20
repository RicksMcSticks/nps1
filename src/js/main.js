// First, we import the function from parkService.mjs so we can get the park data
import { getParkData } from "./parkService.mjs";

// Call the function and save the returned park object into a variable
const parkData = getParkData();

// ------------------------------
// 1. Update the disclaimer link at the top
// ------------------------------
// Select the <a> inside the disclaimer paragraph
const disclaimer = document.querySelector(".disclaimer > a");

// Set the link to the official park website
disclaimer.href = parkData.url;

// Update the text inside the link to show the park's full name
disclaimer.innerHTML = parkData.fullName;

// ------------------------------
// 2. Update the page title
// ------------------------------
// This changes the <title> in the browser tab dynamically
document.title = parkData.fullName;

// ------------------------------
// 3. Update the hero image for the park
// ------------------------------
// Select the hero section (where the big park image goes)
const hero = document.querySelector("#park-header");

// Instead of the <img>, we are using the background of the hero section
hero.style.backgroundImage = `url(${parkData.images[0].url})`;

// Make sure the background image covers the section and stays centered
hero.style.backgroundSize = "cover";
hero.style.backgroundPosition = "center";

// ------------------------------
// 4. Update hero content: name, designation, states
// ------------------------------
// Function to build the HTML for the hero banner dynamically
function parkInfoTemplate(info) {
  return `
    <!-- Park title -->
    <a href="/" class="hero-banner__title">${info.fullName}</a>
    <!-- Park subtitle with designation and states -->
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

// Insert the hero content into the hero section
// 'beforeend' means it will go inside the hero-banner__content div
const heroContent = document.querySelector(".hero-banner__content");
heroContent.insertAdjacentHTML("beforeend", parkInfoTemplate(parkData));

//
