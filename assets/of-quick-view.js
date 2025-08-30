document.addEventListener("DOMContentLoaded", function () {
  console.log("Quick view script loaded");
  const hotspot = document.getElementById("of-hotspot-icon");
  const overlay = document.getElementById("of-overlay");
  const closeBtn = document.getElementById("of-quick-view-close");

  document.querySelectorAll(".of-hotspot-icon").forEach((hotspot) => {
    hotspot.addEventListener("click", function (event) {
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden"; // disable scroll
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto"; // enable scroll back
  });

  // Close if clicking outside popup
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
