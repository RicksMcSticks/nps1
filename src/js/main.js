import { getParkDataStatic, getParkData } from "./parkService.mjs";

async function initPage() {
  // Try API first, fallback to static
  const parkData = await getParkData().catch(() => getParkDataStatic());

  // DISCLAIMER
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = parkData.url;
  disclaimer.textContent = parkData.fullName;

  // PAGE TITLE
  document.title = parkData.fullName;

  // HERO
  const heroImg = document.querySelector(".hero-banner > img");
  heroImg.src = parkData.images[0].url;

  const heroContent = document.querySelector(".hero-banner__content");
  heroContent.innerHTML = `
    <a href="${parkData.url}" class="hero-banner__title">${parkData.fullName}</a>
    <p class="hero-banner__subtitle">
      <span>${parkData.designation}</span>
      <span>${parkData.states}</span>
    </p>
  `;

  // INTRO
  document.querySelector(".intro").innerHTML = `
    <h1>${parkData.fullName}</h1>
    <p>${parkData.description}</p>
  `;

  // INFO CARDS
  const infoLinks = [
    { name: "Current Conditions ›", link: "conditions.html", image: parkData.images[2]?.url || "", description: "See what conditions to expect in the park before leaving on your trip!" },
    { name: "Fees and Passes ›", link: "fees.html", image: parkData.images[3]?.url || "", description: "Learn about the fees and passes that are available." },
    { name: "Visitor Centers ›", link: "visitor_centers.html", image: parkData.images[9]?.url || "", description: "Learn about the visitor centers in the park." }
  ];

  function mediaCardTemplate(info) {
    return `
      <div class="media-card">
        <a href="${info.link}">
          <img src="${info.image}" alt="${info.name}" class="media-card__img">
          <h3 class="media-card__title">${info.name}</h3>
        </a>
        <p>${info.description}</p>
      </div>
    `;
  }
  document.querySelector(".info").innerHTML = infoLinks.map(mediaCardTemplate).join("");

  // WEATHER
  document.querySelector(".weather").innerHTML = `
    <h2>Weather</h2>
    <p>${parkData.weatherInfo}</p>
  `;

  // DIRECTIONS
  document.querySelector(".directions").innerHTML = `
    <h2>Directions</h2>
    <p>${parkData.directionsInfo} <a href="${parkData.directionsUrl}" target="_blank">More directions</a></p>
  `;

  // GALLERY
  const galleryTemplate = (img) => `
    <figure>
      <img src="${img.url}" alt="${img.altText}">
      <figcaption>${img.caption}</figcaption>
    </figure>
  `;
  document.querySelector(".gallery").innerHTML = parkData.images.map(galleryTemplate).join("");

  // FOOTER
  const mailing = parkData.addresses.find(a => a.type === "Mailing");
  const voice = parkData.contacts.phoneNumbers.find(p => p.type === "Voice")?.phoneNumber || "N/A";

  document.querySelector("#park-footer").innerHTML = `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

initPage();
