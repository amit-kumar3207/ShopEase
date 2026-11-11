
// 1. STORE ALL API PRODUCTS

let allProducts = [];

// Load Cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// 2. API URL

const API_URL = "https://fakestoreapi.com/products";

console.log("ShopEase Project Started!");
console.log("JavaScript Connected Successfully");

// 3. FETCH PRODUCTS FUNCTION

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    // Check API Response
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    // Convert Response into JSON
    const products = await response.json();

    // Store All Products
    allProducts = products;

    console.log("All Products:", allProducts);

    // Display All Products
    displayProducts(allProducts);
  } catch (error) {
    console.error("API Error:", error);

    document.getElementById("productsContainer").innerHTML =
      "<p class='no-products'>Something went wrong. Please try again.</p>";
  }
}

// 4. DISPLAY PRODUCTS FUNCTION

function displayProducts(products) {
  const productsContainer = document.getElementById("productsContainer");

  // Clear Previous Products
  productsContainer.innerHTML = "";

  // Check Empty Products
  if (products.length === 0) {
    productsContainer.innerHTML =
      "<p class='no-products'>No products found!</p>";

    return;
  }

  // Loop Through Products
  products.forEach(function (product) {
    const productCard = `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                </div>

                <div class="product-info">

                    <h3>${product.title}</h3>

                    <p class="product-rating">
                        ⭐ ${product.rating.rate}
                        (${product.rating.count} reviews)
                    </p>

                    <div class="product-price">

                  <span class="current-price">
                    ₹${(product.price * 83).toFixed(2)}
                    </span>

                    </div>
       <button class="view-details"
    data-product-id="${product.id}">
    View Details
</button>

<button class="add-to-cart"
    data-product-id="${product.id}">
    Add to Cart
</button>

<button
    class="add-to-wishlist"
    data-product-id="${product.id}">
    ♡ Wishlist
</button>

                </div>

            </div>

        `;

    // Add Product Card
    productsContainer.innerHTML += productCard;
  });
}
// ADD PRODUCT TO CART

function addToCart(productId) {
  const product = allProducts.find(function (item) {
    return item.id === productId;
  });

  if (!product) {
    return;
  }

  // Check if Product Already Exists
  const existingProduct = cart.find(function (item) {
    return item.id === product.id;
  });

  if (existingProduct) {
    // Increase Existing Product Quantity
    existingProduct.quantity++;
  } else {
    // Add New Product with Quantity 1
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  // Save Cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update Cart Count
  updateCartCount();

  console.log("Cart Products:", cart);

  alert(product.title + " added to cart!");
}
// Update Wishlist Count
function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlistCount");

  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
  }
}
// Update Cart Count Function
function updateCartCount() {
  const totalItems = cart.reduce(function (total, product) {
    return total + (product.quantity || 1);
  }, 0);

  document.getElementById("cartCount").textContent = totalItems;
}

// 5. SEARCH PRODUCTS FUNCTION

function searchProducts() {
  const searchInput = document.getElementById("productSearch");

  const searchValue = searchInput.value.toLowerCase().trim();

  // Filter Products
  const filteredProducts = allProducts.filter(function (product) {
    return (
      product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
  });

  // Display Search Results
  displayProducts(filteredProducts);
}

// 6. SEARCH BUTTON EVENT

document.getElementById("searchBtn").addEventListener("click", searchProducts);

// 7. ENTER KEY SEARCH

document
  .getElementById("productSearch")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchProducts();
    }
  });

// 8. FETCH PRODUCTS ON PAGE LOAD

fetchProducts();

// 9. CATEGORY FILTER

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(function (card) {
  card.addEventListener("click", function () {
    // Get clicked category
    const selectedCategory = card.dataset.category;

    // Filter products
    const filteredProducts = allProducts.filter(function (product) {
      if (selectedCategory === "all") {
        return true;
      }

      if (selectedCategory === "clothing") {
        return (
          product.category === "men's clothing" ||
          product.category === "women's clothing"
        );
      }

      return product.category === selectedCategory;
    });

    // Display filtered products
    displayProducts(filteredProducts);

    // Scroll to products
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    });
  });
});

fetchProducts();
updateCartCount();
updateWishlistCount();
// ADD TO CART BUTTON EVENT

document
  .getElementById("productsContainer")
  .addEventListener("click", function (event) {
    // View Product Details
    if (event.target.classList.contains("view-details")) {
      const productId = event.target.dataset.productId;

      window.location.href = "product-details.html?id=" + productId;
    }

    if (event.target.classList.contains("add-to-cart")) {
      const productId = Number(event.target.dataset.productId);

      addToCart(productId);
    }
    // Add Product to Wishlist
    if (event.target.classList.contains("add-to-wishlist")) {
      const productId = Number(event.target.dataset.productId);

      const product = allProducts.find(function (item) {
        return item.id === productId;
      });

      if (!product) {
        return;
      }

      const alreadyExists = wishlist.some(function (item) {
        return item.id === productId;
      });

      if (alreadyExists) {
        alert("Product is already in Wishlist!");
        return;
      }

      wishlist.push(product);

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      updateWishlistCount();

      alert("Product added to Wishlist!");
    }
  });
// Product Sorting

const sortProducts = document.getElementById("sortProducts");

sortProducts.addEventListener("change", function () {
  let sortedProducts = [...allProducts];

  if (sortProducts.value === "low-to-high") {
    sortedProducts.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortProducts.value === "high-to-low") {
    sortedProducts.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  displayProducts(sortedProducts);
});
