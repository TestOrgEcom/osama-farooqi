async function addProductToCart(cartButton) {
  try {
    // 1. Get user-selected options
    const productId = cartButton.getAttribute("data-product-id");
    const ofQuickViewModal = document.getElementById(
      "of-quick-view-modal-" + productId
    );

    const selectedColor = ofQuickViewModal
      .querySelector(".of-color-swatch.selected")
      .getAttribute("data-value");
    const selectedSize = ofQuickViewModal
      .querySelector(".of-size-values-items.selected")
      .getAttribute("data-value");
    const productHandle = ofQuickViewModal.getAttribute("data-handle");

    console.log("Selected Color:", selectedColor.toLowerCase());
    console.log("Selected Size:", selectedSize.toLowerCase());

    // 2. Add main product
    await getProduct(productHandle, selectedColor, selectedSize);

    // 3. Conditionally add soft winter jacket
    const productHandleSoftWinterJecket = "dark-winter-jacket";
    if (
      selectedColor.toLowerCase() === "black" &&
      selectedSize.toLowerCase() === "m"
    ) {
      await getProduct(
        productHandleSoftWinterJecket,
        selectedColor,
        selectedSize
      );
    }

    alert("Products added to cart!");
  } catch (err) {
    console.error("Error adding products:", err);
  }
}

async function getProduct(handle, selectedColor, selectedSize) {
  try {
    const res = await fetch(`/products/${handle}.js`);
    const product = await res.json();
    await addToCartWithVariant(product, selectedColor, selectedSize);
  } catch (err) {
    console.error("Error fetching product:", err);
  }
}

async function addToCartWithVariant(product, selectedColor, selectedSize) {
  const matchedVariant = product.variants.find(
    (v) => v.option2 === selectedColor && v.option1 === selectedSize
  );

  if (!matchedVariant) {
    alert("This combination is not available.");
    return;
  }

  try {
    const res = await fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id: matchedVariant.id, quantity: 1 }),
    });
    const data = await res.json();
    console.log("Added to cart:", data);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Quick view script loaded");
  const ofSizeValuesItems = document.querySelectorAll(".of-size-values-items");

  ofSizeValuesItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = item.getAttribute("data-value");
      const productId = item.getAttribute("data-product-id");
      const dropdown = document.getElementById("of-size-select-" + productId);
      const title = dropdown.querySelector(".of-size-dropdown-title-text");
      ofSizeValuesItems.forEach((innerItem) => {
        innerItem.classList.remove("selected");
      });
      item.classList.add("selected");

      dropdown.classList.remove("open");

      console.log("selectedValue");
      console.log(selectedValue);
      title.textContent = selectedValue;
    });
  });
});

function ofShowQuickView(quickViewModel) {
  console.log("ofShowQuickView clicked");
  const productId = quickViewModel.getAttribute("data-product-id");
  const overlay = document.getElementById("of-overlay-" + productId);
  const closeBtn = document.getElementById("of-quick-view-close-" + productId);

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden"; // disable scroll

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
}

function selectColorSwatch(swatch) {
  const productId = swatch.getAttribute("data-product-id");
  const swatches = document.querySelectorAll(".of-color-swatch");

  swatches.forEach((item) => {
    item.addEventListener("click", function () {
      swatches.forEach((innerItem) => {
        innerItem.classList.remove("selected");
      });
      item.classList.add("selected");
    });
  });

  swatch.classList.add("selected");
}

function showSelectionDropdown(downarrow) {
  const productId = downarrow.getAttribute("data-prodcut-id");
  const dropdownSelect = document.getElementById("of-size-select-" + productId);
  const dropdown = document.getElementById("of-size-select-" + productId);
  const title = dropdown.querySelector(".of-size-dropdown-title-text");
  console.log("ofShowQuickView title", title.textContent);
  title.textContent = "Choose your size";

  // Toggle visibility
  dropdownSelect.classList.toggle("open");
}
