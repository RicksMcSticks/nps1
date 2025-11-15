// navigation.mjs

// Handles the main global menu toggle
function mainMenuHandler(ev) {
  let target = ev.target;

  const globalNav = document.querySelector(".global-nav");
  if (!globalNav) return;

  // toggle the show class on the global nav
  globalNav.classList.toggle("show");

  // make sure target is the button itself
  if (target.tagName !== "BUTTON") {
    target = target.closest("button");
  }

  if (!target) return;

  // set aria-expanded attribute based on menu state
  const isOpen = globalNav.classList.contains("show");
  target.setAttribute("aria-expanded", isOpen);
}

// Handles submenu toggles in the global nav
function subMenuHandler(ev) {
  const li = ev.currentTarget.closest("li");
  if (!li) return;

  const submenu = li.querySelector(".global-nav__submenu");
  if (submenu) submenu.classList.toggle("show");

  const icon = ev.currentTarget.querySelector(".icon");
  if (icon) icon.classList.toggle("rotate");
}

// Initialize navigation event listeners
export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  if (menuButton) menuButton.addEventListener("click", mainMenuHandler);

  subMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", subMenuHandler);
  });
}
