const API_URL = "https://fakestoreapi.com/products";

// Get Product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch Selected Product
async function fetchProductDetails() {
  const productContainer = document.getElementById("productDetails");

  try {
    // Fetch Product from API

    if (!productId || !/^\d+$/.test(productId)) {
      throw new Error("Invalid Product ID");
    }

    const response = await fetch(`${API_URL}/${productId}`);

    if (!response.ok) {
      throw new Error("Product not found. Status: " + response.status);
    }

    // Read API Response
    const responseText = await response.text();

    if (!responseText.trim()) {
      throw new Error("API returned an empty response");
    }

    // Convert Response into JSON
    const product = JSON.parse(responseText);

    if (!product || !product.id) {
      throw new Error("Invalid product data");
    }

    // Display Product Details
    productContainer.innerHTML = `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                </div>

                <div class="product-info">

                    <h2>${product.title}</h2>

                    <p>
                        Category: ${product.category}
                    </p>

                    <p>
                        ⭐ ${product.rating.rate}
                        (${product.rating.count} Reviews)
                    </p>

                   <h3>₹${(product.price * 83).toFixed(2)}</h3>

                    <p>${product.description}</p>

                    <button class="add-to-cart"
    id="detailsAddToCart">
    Add to Cart
</button>
                </div>

            </div>

        `;
    // Add Product to Cart
    document
      .getElementById("detailsAddToCart")
      .addEventListener("click", function () {
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

        alert(product.title + " added to cart!");
      });
  } catch (error) {
    console.error(error);

    productContainer.innerHTML =
      "<p class='no-products'>Unable to load product details.</p>";
  }
}

// Load Product
fetchProductDetails();
