// conditions.js
import "../css/style.css";       // Global CSS
import "../css/conditions.css";  // Page-specific CSS

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

// Insert alerts into the DOM
function setAlerts(alerts) {
  const container = document.querySelector(".alerts > ul");
  container.innerHTML = "";
  const html = alerts.map(alertTemplate);
  container.insertAdjacentHTML("beforeend", html.join(""));
}

// Insert visitor centers into the DOM
function setVisitorCenters(centers) {
  const container = document.querySelector(".visitor details ul");
  container.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  container.insertAdjacentHTML("beforeend", html.join(""));
}

// Insert activities into the DOM
function setActivities(activities) {
  const container = document.querySelector(".activities details ul");
  container.innerHTML = "";
  const html = activities.map(activityTemplate);
  container.insertAdjacentHTML("beforeend", html.join(""));
}

// Initialize the page
async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const alerts = await getParkAlerts(parkData.parkCode);
  setAlerts(alerts);

  const centers = await getVisitorCenterData(parkData.parkCode);
  setVisitorCenters(centers);

  setActivities(parkData.activities); // Already in parkData from static/fallback
}

init();
