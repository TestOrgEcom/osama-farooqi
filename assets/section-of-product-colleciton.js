document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".of-hotspot-icon").forEach((el) => {
    el.style.setProperty("--top-mobile", el.dataset.topMobile + "%");
    el.style.setProperty("--left-mobile", el.dataset.leftMobile + "%");
  });
});
