// conditions.js
import "../css/style.css";       // Global CSS
import "../css/conditions.css";  // Page-specific CSS

import { getParkData, getParkAlerts, getParkVisitorCenters } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

// -----------------------------
// Alerts
// -----------------------------
function setAlerts(alerts) {
  const container = document.querySelector(".alerts > ul");
  container.innerHTML = "";
  const html = alerts.map(alertTemplate);
  container.insertAdjacentHTML("afterbegin", html.join(""));
}

// -----------------------------
// Visitor Centers
// -----------------------------
function setVisitorCenters(centers) {
  const container = document.querySelector(".visitor details ul");
  container.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  container.insertAdjacentHTML("afterbegin", html.join(""));
}

// -----------------------------
// Activities
// -----------------------------
function setActivities(activities) {
  const container = document.querySelector(".activities details ul");
  container.innerHTML = "";
  const html = activities.map(activityTemplate);
  container.insertAdjacentHTML("afterbegin", html.join(""));
}

// -----------------------------
// Initialize Page
// -----------------------------
async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const alerts = await getParkAlerts(parkData.parkCode);
  setAlerts(alerts);

  const visitorCenters = await getParkVisitorCenters(parkData.parkCode);
  setVisitorCenters(visitorCenters);

  setActivities(parkData.activities); // Already in parkData
}

init();
