const adminOrders = document.getElementById("adminOrders");

// Fetch Orders from Backend
async function fetchAdminOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders");

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Unable to fetch orders");
    }

    // Update Dashboard Statistics
    updateAdminStats(data.orders);

    // Display All Orders
    displayAdminOrders(data.orders);
  } catch (error) {
    console.error("Admin Error:", error);

    adminOrders.innerHTML = `
            <p>Unable to load orders. Please try again.</p>
        `;
  }
}

// Update Dashboard Statistics
function updateAdminStats(orders) {
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(function (total, order) {
    return total + order.grandTotal;
  }, 0);

  document.getElementById("totalOrders").textContent = totalOrders;

  document.getElementById("totalRevenue").textContent =
    "₹" + totalRevenue.toFixed(2);
}

// Display Orders
function displayAdminOrders(orders) {
  adminOrders.innerHTML = "";

  if (orders.length === 0) {
    adminOrders.innerHTML = "<p>No orders available.</p>";
    return;
  }

  orders.forEach(function (order) {
    const orderCard = document.createElement("div");

    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
            <h3>Order ID: ${order.orderId}</h3>

            <p>Total Items: ${order.totalItems}</p>

            <p>Total Amount: ₹${order.grandTotal.toFixed(2)}</p>

            <p>Order Date:
                ${new Date(order.orderDate).toLocaleString("en-IN")}
            </p>

            <h4>Ordered Items</h4>

            ${order.items
              .map(function (item) {
                return `
                    <p>
                        ${item.image} ${item.name}
                        × ${item.quantity}
                    </p>
                `;
              })
              .join("")}

            <p>
    Current Status:
    <strong>${order.status || "Pending"}</strong>
</p>

            <select class="order-status"
                id="status-${order._id}">

                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Delivered">Delivered</option>

            </select>

            <button onclick="updateOrderStatus('${order._id}')">
                Update Status
            </button>
        `;
    const statusSelect = orderCard.querySelector(".order-status");

    statusSelect.value = order.status || "Pending";
    adminOrders.appendChild(orderCard);
  });
}

// Update Order Status
async function updateOrderStatus(orderId) {
  const statusSelect = document.getElementById(`status-${orderId}`);

  const selectedStatus = statusSelect.value;

  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: selectedStatus,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Status update failed");
    }

    alert("Order Status Updated Successfully!");

    // Refresh Orders
    await fetchAdminOrders();
  } catch (error) {
    console.error("Status Update Error:", error);

    alert("Unable to update order status!");
  }
}

// Load Orders
fetchAdminOrders();
