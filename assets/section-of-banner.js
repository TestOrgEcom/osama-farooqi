const menu = document.getElementById("of-menu");
const dropdown = document.getElementById("of-dropdown");
const header = document.getElementById("of-header");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  menu.addEventListener("click", function () {
    console.log("Menu clicked");
    header.classList.toggle("open");
  });
});
