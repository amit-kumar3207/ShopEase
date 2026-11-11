// Load Orders Function

async function loadOrders() {
  // Get Orders from MongoDB Backend
  let orders = [];
  // Get Orders Container
  const ordersContainer = document.getElementById("ordersContainer");

  try {
    const response = await fetch("http://localhost:5000/api/orders");

    if (!response.ok) {
      throw new Error("Orders could not be loaded");
    }

    orders = await response.json();
  } catch (error) {
    console.error("Orders Fetch Error:", error);

    ordersContainer.innerHTML = "<h3>Unable to Load Orders!</h3>";

    return;
  }

  // Check Empty Orders
  if (orders.length === 0) {
    ordersContainer.innerHTML = "<h3>No Orders Found!</h3>";

    return;
  }

  // Display All Orders

  ordersContainer.innerHTML = orders
    .map((order) => {
      return `
        <div class="admin-order-card">

            <h3>Order ID: ${order.orderId}</h3>

            <p><strong>Customer:</strong> ${order.customer.fullName}</p>

            <p><strong>Email:</strong> ${order.customer.email}</p>

            <p><strong>Phone:</strong> ${order.customer.phone}</p>

            <p><strong>Address:</strong> ${order.customer.address}, ${order.customer.city}, ${order.customer.pincode}</p>

            <p><strong>Total Items:</strong> ${order.totalItems}</p>


<div class="ordered-products">

    <h4>Ordered Products:</h4>

    ${order.products
      .map(
        (product) => `
        <p>
            ${product.title} -
            Quantity: ${product.quantity || 1}
        </p>
    `,
      )
      .join("")}

</div>


            <p><strong>Total Amount:</strong> ₹${(order.totalPrice * 83).toFixed(2)}</p>

            <p><strong>Order Date:</strong> ${order.orderDate}</p>

            
<p>
    <strong>Status:</strong>

    <select class="order-status" data-order-id="${order.orderId}">

        <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>

        <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>

        <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>

        <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>

        <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>

    </select>
</p>


        </div>
    `;
    })
    .join("");
}
// Call Load Orders Function
loadOrders();

// Update Order Status

document.addEventListener("change", async function (event) {
  if (event.target.classList.contains("order-status")) {
    const orderId = event.target.dataset.orderId;
    const newStatus = event.target.value;

    try {
      // Update Status in MongoDB
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Order Status Updated Successfully!");
    } catch (error) {
      console.error("Status Update Error:", error);

      alert("Order Status Update Failed!");

      // Reload Orders
      loadOrders();
    }
  }
});
