// templates.mjs
import spritePath from '../images/sprite.symbol.svg'; // Vite will handle this path

export function alertTemplate(alert) {
  let alertType = "";

  // Map the API category to the icon ID
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase().replace(/\s+/g, "-"); // handles multi-word categories
  }

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

export function visitorCenterTemplate(center) {
  const openStatus = center.operatingHours?.length
    ? center.operatingHours[0].description
    : "Hours not available";

  return `<li class="visitor-center">
    <h3>${center.name}</h3>
    <p>${center.description || "No description available"}</p>
    <p><strong>Directions:</strong> ${center.directionsInfo || "No directions available"}</p>
    <p><strong>Hours:</strong> ${openStatus}</p>
  </li>`;
}

export function activityTemplate(activity) {
  return `<li>${activity.name}</li>`;
}
