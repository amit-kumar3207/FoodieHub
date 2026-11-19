// Get HTML Elements
const orderIdInput = document.getElementById("orderIdInput");

const trackOrderBtn = document.getElementById("trackOrderBtn");

const trackingResult = document.getElementById("trackingResult");

// Track Order Function
async function trackOrder() {
  // Get Order ID
  const orderId = orderIdInput.value.trim();

  // Check Empty Order ID
  if (orderId === "") {
    trackingResult.textContent = "Please enter your Order ID.";
    return;
  }

  try {
    // Fetch Order From Backend
    const response = await fetch(
      `http://localhost:5000/api/orders/track/${encodeURIComponent(orderId)}`,
    );

    const data = await response.json();

    // Check Order
    if (!response.ok || !data.success) {
      trackingResult.textContent =
        "Order not found. Please check your Order ID.";
      return;
    }

    const order = data.order;

    // Display Order Details
    trackingResult.innerHTML = `
            <h3>Order Found!</h3>

            <p><strong>Order ID:</strong> ${order.orderId}</p>

            <p><strong>Order Status:</strong> ${order.status}</p>

            <p><strong>Total Items:</strong> ${order.totalItems}</p>

            <p><strong>Total Amount:</strong> ₹${order.grandTotal.toFixed(2)}</p>

            <p><strong>Order Date:</strong>
                ${new Date(order.orderDate).toLocaleString("en-IN")}
            </p>
        `;
  } catch (error) {
    console.error("Tracking Error:", error);

    trackingResult.textContent = "Unable to track order. Please try again.";
  }
}

// Button Click Event
trackOrderBtn.addEventListener("click", trackOrder);
