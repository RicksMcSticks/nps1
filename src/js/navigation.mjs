// // navigation.mjs

// // Handles the main global menu toggle
// function mainMenuHandler(ev) {
//   let target = ev.target;

//   const globalNav = document.querySelector(".global-nav");
//   if (!globalNav) return;

//   // toggle the show class on the global nav
//   globalNav.classList.toggle("show");

//   // make sure target is the button itself
//   if (target.tagName !== "BUTTON") {
//     target = target.closest("button");
//   }

//   if (!target) return;

//   // set aria-expanded attribute based on menu state
//   const isOpen = globalNav.classList.contains("show");
//   target.setAttribute("aria-expanded", isOpen);
// }

// // Handles submenu toggles in the global nav
// function subMenuHandler(ev) {
//   const li = ev.currentTarget.closest("li");
//   if (!li) return;

//   const submenu = li.querySelector(".global-nav__submenu");
//   if (submenu) submenu.classList.toggle("show");

//   const icon = ev.currentTarget.querySelector(".icon");
//   if (icon) icon.classList.toggle("rotate");
// }

// // Initialize navigation event listeners
// export default function enableNavigation() {
//   const menuButton = document.querySelector("#global-nav-toggle");
//   const subMenuToggles = document.querySelectorAll(
//     ".global-nav__split-button__toggle"
//   );

//   if (menuButton) menuButton.addEventListener("click", mainMenuHandler);

//   subMenuToggles.forEach((toggle) => {
//     toggle.addEventListener("click", subMenuHandler);
//   });
// }
function mainMenuHandler(ev) {
  let target = ev.target;
  // toggle the show class on the global-nav
  document.querySelector(".global-nav").classList.toggle("show");
  // check to see if ev.target is the button or something inside the button
  if (target.tagName != "BUTTON") {
    target = target.closest("button");
  }
  // check to see if we just opened or closed the menu
  if (document.querySelector(".global-nav").classList.contains("show")) {
    // if we opened it then set the aria-expanded attribute to true
    target.setAttribute("aria-expanded", true);
  } else {
    // if we closed it then set the aria-expanded attribute to false
    target.setAttribute("aria-expanded", false);
  }

  console.log("toggle");
}

function subMenuHandler(ev) {
  // find the closest li ancestor, then find the submenu inside of that li and toggle the show class
  ev.currentTarget
    .closest("li")
    .querySelector(".global-nav__submenu")
    .classList.toggle("show");
  // toggle the rotate class on the button icon that was clicked
  ev.currentTarget.querySelector(".icon").classList.toggle("rotate");
}

export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );
  // when the main menu button is clicked:
  menuButton.addEventListener("click", mainMenuHandler);
  subMenuToggles.forEach((toggle) => {
    //for each submenu toggle
    toggle.addEventListener("click", subMenuHandler);
  });
}