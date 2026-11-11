// Get Cart from LocalStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Check Empty Cart
if (cart.length === 0) {
  alert("Your Cart is Empty!");

  window.location.href = "cart.html";
}

// Calculate Total Items
const totalItems = cart.reduce(function (total, product) {
  return total + (product.quantity || 1);
}, 0);

// Calculate Total Price
const totalPrice = cart.reduce(function (total, product) {
  return total + product.price * (product.quantity || 1);
}, 0);

// Display Order Summary
document.getElementById("checkoutTotalItems").textContent = totalItems;

document.getElementById("checkoutTotalPrice").textContent = (
  totalPrice * 83
).toFixed(2);
// Get Checkout Form
const checkoutForm = document.getElementById("checkoutForm");

// Handle Form Submission
checkoutForm.addEventListener("submit", async function (event) {
  // Stop Page Reload
  event.preventDefault();

  // Get Input Values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  // Check Empty Fields
  if (!fullName || !email || !phone || !address || !city || !pincode) {
    alert("Please fill all fields!");
    return;
  }

  // Check Phone Number
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number!");
    return;
  }

  // Check PIN Code
  if (!/^[0-9]{6}$/.test(pincode)) {
    alert("Please enter a valid 6-digit PIN code!");
    return;
  }

  // Save Customer Details
  const customerDetails = {
    fullName,
    email,
    phone,
    address,
    city,
    pincode,
  };

  localStorage.setItem("customerDetails", JSON.stringify(customerDetails));

  // Save Order Details

  const orderDetails = {
    orderId: "ORD" + Date.now(),
    customer: customerDetails,
    products: cart,
    totalItems: totalItems,
    totalPrice: totalPrice,
    orderDate: new Date().toISOString(),
    status: "Pending",
  };

  try {
    // Send Order to MongoDB Backend
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Order could not be saved");
    }

    // Save Latest Order for Success Page
    localStorage.setItem("orderDetails", JSON.stringify(result.order));
  } catch (error) {
    console.error("Order Error:", error);
    alert("Order could not be saved. Please try again.");
    return;
  }

  // Clear Cart
  localStorage.removeItem("cart");

  // Go to Order Confirmation Page
  window.location.href = "order-success.html";
});
