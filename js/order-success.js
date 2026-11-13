// Get Order Details from LocalStorage
const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

// Check Order Details
if (orderDetails) {
  // Display Customer Name
  document.getElementById("customerName").textContent =
    orderDetails.customer.fullName;

  // Display Total Items
  document.getElementById("successTotalItems").textContent =
    orderDetails.totalItems;

  // Display Total Price
  document.getElementById("successTotalPrice").textContent = (
    orderDetails.totalPrice * 83
  ).toFixed(2);

  // Display Order Date
 document.getElementById("orderDate").textContent =
  new Date(orderDetails.orderDate).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short"
  });
} else {
  document.querySelector(".order-details").innerHTML =
    "<p>No order details found.</p>";
}
