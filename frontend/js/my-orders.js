const ordersContainer = document.getElementById("ordersContainer");

// Fetch Orders from Backend
async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders");

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Unable to fetch orders");
    }

    displayOrders(data.orders);
  } catch (error) {
    console.error("Orders Error:", error);

    ordersContainer.innerHTML = `
            <p>Unable to load orders. Please try again.</p>
        `;
  }
}

// Display Orders
function displayOrders(orders) {
  ordersContainer.innerHTML = "";

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
            <p>You have not placed any orders yet.</p>
        `;
    return;
  }

  orders.forEach(function (order) {
    const orderCard = document.createElement("div");

    orderCard.classList.add("order-card");

    const orderDate = new Date(order.orderDate);

    orderCard.innerHTML = `
            <h3>Order ID: ${order.orderId}</h3>

            <p>Total Items: ${order.totalItems}</p>

            <p>Total Amount: ₹${order.grandTotal.toFixed(2)}</p>
            <p>
    <strong>Order Status:</strong>
    <span class="status-badge status-${(order.status || "Pending").toLowerCase()}">
        ${order.status || "Pending"}
    </span>
</p>

            <p>Order Date: ${orderDate.toLocaleString("en-IN")}</p>

            <h4>Ordered Items</h4>

            <div class="ordered-items">
                ${order.items
                  .map(function (item) {
                    return `
                        <p>
                            ${item.image} ${item.name}
                            × ${item.quantity}
                            - ₹${item.price * item.quantity}
                        </p>
                    `;
                  })
                  .join("")}
            </div>
        `;

    ordersContainer.appendChild(orderCard);
  });
}

// Load Orders
fetchOrders();
