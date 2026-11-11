// 1. GET CART PRODUCTS

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 2. DISPLAY CART PRODUCTS

function displayCart() {
  const cartContainer = document.getElementById("cartContainer");

  // Clear Container
  cartContainer.innerHTML = "";

  // Calculate Total Price
  const totalPrice = cart.reduce(function (total, product) {
    return total + product.price * (product.quantity || 1);
  }, 0);

  // Display Total Price
  document.getElementById("cartTotal").textContent =
    "₹" + (totalPrice * 83).toFixed(2);

  // Check Empty Cart
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='no-products'>Your Cart is Empty!</p>";

    return;
  }

  // Loop Through Cart Products
  cart.forEach(function (product, index) {
    const cartCard = `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                </div>

                <div class="product-info">

                    <h3>${product.title}</h3>

                    <div class="product-price">

                        <span class="current-price">
    ₹${(product.price * 83).toFixed(2)}
</span>
                        <div class="quantity-control">

    <button class="decrease-qty" data-index="${index}">
        -
    </button>

    <span>${product.quantity || 1}</span>

    <button class="increase-qty" data-index="${index}">
        +
    </button>

</div>

                    <button
    class="remove-from-cart"
    data-index="${index}">
    Remove
</button>

                    </div>

                </div>

            </div>

        `;

    cartContainer.innerHTML += cartCard;
  });
}
// REMOVE PRODUCT FROM CART

function removeFromCart(index) {
  // Remove Selected Product
  cart.splice(index, 1);

  // Update localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Refresh Cart Display
  displayCart();
}

// Remove Button Click Event

document
  .getElementById("cartContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      const index = Number(event.target.dataset.index);

      removeFromCart(index);
    }
  });

// 3. LOAD CART

displayCart();

// PLACE ORDER

// Go to Checkout Page
document.getElementById("placeOrderBtn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your Cart is Empty!");

    return;
  }

  window.location.href = "checkout.html";
});

// UPDATE PRODUCT QUANTITY

function updateQuantity(index, action) {
  if (action === "increase") {
    cart[index].quantity++;
  } else if (action === "decrease") {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    }
  }

  // Save Updated Cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // Refresh Cart
  displayCart();
// QUANTITY BUTTON EVENTS

document
  .getElementById("cartContainer")
  .addEventListener("click", function (event) {
    const index = Number(event.target.dataset.index);

    if (event.target.classList.contains("increase-qty")) {
      updateQuantity(index, "increase");
    }

    if (event.target.classList.contains("decrease-qty")) {
      updateQuantity(index, "decrease");
    }
  });

// CLEAR ENTIRE CART

document.getElementById("clearCartBtn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your Cart is already empty!");
    return;
  }

  const confirmClear = confirm("Are you sure you want to clear your cart?");

  if (confirmClear) {
    // Empty Cart
    cart = [];

    // Remove Cart from localStorage
    localStorage.removeItem("cart");

    // Update Cart Display
    displayCart();

    updateCartCount();

    alert("Cart cleared successfully!");
  }
});
