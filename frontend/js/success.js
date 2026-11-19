// ===================================
// FoodieHub Order Success Page
// ===================================

// Get saved order details
const order = JSON.parse(localStorage.getItem("foodieHubLatestOrder"));

// Check if order exists
if (order) {
  // Display Order ID
  document.getElementById("orderId").textContent = order.orderId;

  // Display Total Items
  document.getElementById("successItems").textContent = order.totalItems;

  // Display Total Amount
  document.getElementById("successAmount").textContent =
    "₹" + order.grandTotal.toFixed(2);

  // Display Order Date
  document.getElementById("orderDate").textContent = new Date(
    order.orderDate,
  ).toLocaleString("en-IN");
} else {
  document.querySelector(".success-card").innerHTML = `
        <h2>No Order Found</h2>
        <p>Please place an order first.</p>
        <a href="index.html" class="home-btn">
            Go to Home
        </a>
    `;
}
