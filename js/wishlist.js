// Get Wishlist from LocalStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Display Wishlist Products
function displayWishlist() {
  const wishlistContainer = document.getElementById("wishlistContainer");

  // Check Empty Wishlist
  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your Wishlist is Empty!</p>";

    return;
  }

  // Clear Container
  wishlistContainer.innerHTML = "";

  // Display Each Product
  wishlist.forEach(function (product, index) {
    wishlistContainer.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>

                <div class="product-info">

                    <h3>${product.title}</h3>

                   <p>₹${(product.price * 83).toFixed(2)}</p>

                    <button
    class="wishlist-add-to-cart"
    data-index="${index}">
    Add to Cart
</button>

                    <button
                        class="remove-wishlist"
                        data-index="${index}">
                        Remove from Wishlist
                    </button>

                </div>

            </div>
        `;
  });
}

// Initial Display
displayWishlist();

// Remove Product from Wishlist
document
  .getElementById("wishlistContainer")
  .addEventListener("click", function (event) {
    // Add Wishlist Product to Cart
    if (event.target.classList.contains("wishlist-add-to-cart")) {
      const index = Number(event.target.dataset.index);

      const product = wishlist[index];

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find(function (item) {
        return item.id === product.id;
      });

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product added to Cart!");
    }

    if (event.target.classList.contains("remove-wishlist")) {
      const index = Number(event.target.dataset.index);

      wishlist.splice(index, 1);

      // Update LocalStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // Refresh Wishlist
      displayWishlist();
    }
  });
