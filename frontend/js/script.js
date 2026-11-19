// ===================================
// FoodieHub - Restaurant Data
// ===================================

const restaurants = [
  {
    id: 1,
    name: "Burger House",
    cuisine: "Burgers, Fast Food",
    rating: 4.5,
    deliveryTime: "25-30 min",
    image: "🍔",
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Pizza, Italian",
    rating: 4.3,
    deliveryTime: "30-35 min",
    image: "🍕",
  },
  {
    id: 3,
    name: "Biryani House",
    cuisine: "Biryani, Indian",
    rating: 4.7,
    deliveryTime: "20-25 min",
    image: "🍛",
  },
  {
    id: 4,
    name: "Healthy Kitchen",
    cuisine: "Salads, Healthy Food",
    rating: 4.2,
    deliveryTime: "20-30 min",
    image: "🥗",
  },
];

// ===================================
// Food Categories Data
// ===================================

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "🍕",
  },
  {
    id: 2,
    name: "Burger",
    image: "🍔",
  },
  {
    id: 3,
    name: "Biryani",
    image: "🍛",
  },
  {
    id: 4,
    name: "Chinese",
    image: "🍜",
  },
  {
    id: 5,
    name: "Desserts",
    image: "🍰",
  },
  {
    id: 6,
    name: "Drinks",
    image: "🥤",
  },
];

// ===================================
// Display Restaurants Function
// ===================================

function displayRestaurants() {
  const restaurantsContainer = document.getElementById("restaurantsContainer");

  restaurantsContainer.innerHTML = "";

  restaurants.forEach(function (restaurant) {
    const restaurantCard = document.createElement("div");

    restaurantCard.classList.add("restaurant-card");

    restaurantCard.innerHTML = `
            <div class="restaurant-image">
                ${restaurant.image}
            </div>

            <div class="restaurant-info">
                <h3>${restaurant.name}</h3>

                <p>${restaurant.cuisine}</p>

                <div class="restaurant-details">
                    <span>⭐ ${restaurant.rating}</span>
                    <span>🕒 ${restaurant.deliveryTime}</span>
                </div>
            </div>
        `;

    restaurantsContainer.appendChild(restaurantCard);
  });
}

// ===================================
// Display Categories Function
// ===================================

function displayCategories() {
  const categoriesContainer = document.getElementById("categoriesContainer");

  categoriesContainer.innerHTML = "";

  categories.forEach(function (category) {
    const categoryCard = document.createElement("div");

    categoryCard.classList.add("category-card");

    categoryCard.innerHTML = `
            <div class="category-image">
                ${category.image}
            </div>

            <h3>${category.name}</h3>
        `;

    categoriesContainer.appendChild(categoryCard);
  });
}

// ===================================
// Load Website Data
// ===================================

displayRestaurants();
displayCategories();

// ===================================
// Food Items Data
// ===================================

const foods = [
  {
    id: 1,
    name: "Cheese Pizza",
    category: "Pizza",
    price: 249,
    image: "🍕",
    description: "Delicious cheese loaded pizza",
  },
  {
    id: 2,
    name: "Veg Burger",
    category: "Burger",
    price: 149,
    image: "🍔",
    description: "Fresh and tasty veg burger",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 299,
    image: "🍛",
    description: "Traditional spicy biryani",
  },
  {
    id: 4,
    name: "Noodles",
    category: "Chinese",
    price: 179,
    image: "🍜",
    description: "Hot and delicious noodles",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 199,
    image: "🍰",
    description: "Rich chocolate cake",
  },
  {
    id: 6,
    name: "Cold Coffee",
    category: "Drinks",
    price: 99,
    image: "🥤",
    description: "Chilled creamy cold coffee",
  },
];

// ===================================
// Display Food Items
// ===================================

function displayFoods(foodList = foods) {
  const foodContainer = document.getElementById("foodContainer");

  foodContainer.innerHTML = "";

  foodList.forEach(function (food) {
    const foodCard = document.createElement("div");

    foodCard.classList.add("food-card");

    foodCard.innerHTML = `
            <div class="food-image">
                ${food.image}
            </div>

            <div class="food-info">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <span class="food-category">
                    ${food.category}
                </span>

                <div class="food-bottom">

                    <strong>₹${food.price}</strong>

                    <button onclick="addToCart(${food.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

    foodContainer.appendChild(foodCard);
  });
}

// Load Food Items
displayFoods();

// ===================================
// Shopping Cart
// ===================================

// Load saved cart data from LocalStorage
let cart = JSON.parse(localStorage.getItem("foodieHubCart")) || [];

// Add Food To Cart Function
function addToCart(foodId) {
  // Find selected food
  const selectedFood = foods.find(function (food) {
    return food.id === foodId;
  });

  // Check if food already exists in cart
  const existingItem = cart.find(function (item) {
    return item.id === foodId;
  });

  if (existingItem) {
    // Increase quantity
    existingItem.quantity++;
  } else {
    // Add new item
    cart.push({
      ...selectedFood,
      quantity: 1,
    });
  }

  saveCart();
  updateCartCount();
  displayCart();

  alert(selectedFood.name + " added to cart!");
}

// Save Cart Function
function saveCart() {
  localStorage.setItem("foodieHubCart", JSON.stringify(cart));
}

// Update Cart Count Function
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  const totalItems = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

// Display saved cart count when website loads
updateCartCount();

// ===================================
// Display Cart Items
// ===================================

function displayCart() {
  console.time("Cart Loading Time");

  const cartContainer = document.getElementById("cartContainer");

  cartContainer.innerHTML = "";

  // Check Empty Cart
  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty!
            </p>
        `;

    updateCartSummary();
    console.timeEnd("Cart Loading Time");
    return;
  }

  // Display Cart Items
  cart.forEach(function (item) {
    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `

            <div class="cart-item-info">

                <span class="cart-item-image">
                    ${item.image}
                </span>

                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>

            </div>

            <div class="quantity-control">

                <button onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

            <div class="cart-item-total">
                ₹${item.price * item.quantity}
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>

        `;

    cartContainer.appendChild(cartItem);
  });

  updateCartSummary();
}

// ===================================
// Change Quantity
// ===================================

function changeQuantity(foodId, change) {
  const item = cart.find(function (item) {
    return item.id === foodId;
  });

  if (!item) return;

  item.quantity += change;

  // Remove item if quantity becomes zero
  if (item.quantity <= 0) {
    removeFromCart(foodId);
    return;
  }

  saveCart();

  displayCart();

  updateCartCount();
}

// ===================================
// Remove Item From Cart
// ===================================

function removeFromCart(foodId) {
  cart = cart.filter(function (item) {
    return item.id !== foodId;
  });

  saveCart();

  displayCart();

  updateCartCount();
}

// ===================================
// Update Cart Summary
// ===================================

function updateCartSummary() {
  // Calculate total food quantity
  const totalItems = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  // Calculate food prices
  const subtotal = cart.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  // Delivery charges
  const deliveryFee = subtotal === 0 ? 0 : 40;

  // Final bill
  const grandTotal = subtotal + deliveryFee;

  // Show total items
  document.getElementById("totalItems").textContent = totalItems;

  // Show subtotal
  document.getElementById("subtotalAmount").textContent =
    "₹" + subtotal.toFixed(2);

  // Show delivery fee
  document.getElementById("deliveryFee").textContent =
    "₹" + deliveryFee.toFixed(2);

  // Show grand total
  document.getElementById("totalAmount").textContent =
    "₹" + grandTotal.toFixed(2);
}

// ===================================
// Initial Cart Display
// ===================================

displayCart();

// ===================================
// Place Order Functionality
// ===================================

const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", async function () {
  // Check Empty Cart
  if (cart.length === 0) {
    alert("Your cart is empty! Please add food first.");
    return;
  }

  // Calculate Total Items
  const totalItems = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  // Calculate Subtotal
  const subtotal = cart.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  // Calculate Delivery Fee
  const deliveryFee = subtotal === 0 ? 0 : 40;

  // Calculate Grand Total
  const grandTotal = subtotal + deliveryFee;

  // Create Order Object
  const order = {
    orderId: "FH" + Date.now(),
    items: [...cart],
    totalItems: totalItems,
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    grandTotal: grandTotal,
    orderDate: new Date().toISOString(),
  };

  try {
    // Send Order to Backend
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    // Check API Response
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Order could not be saved");
    }

    // Save Order Details for Success Page
    localStorage.setItem("foodieHubLatestOrder", JSON.stringify(data.order));

    // Empty Cart
    cart = [];

    saveCart();
    updateCartCount();
    displayCart();

    // Open Order Success Page
    window.location.href = "success.html";
  } catch (error) {
    console.error("Order Error:", error);

    alert("Order failed! Please check if backend server is running.");
  }
});

// ===================================
// Search Food Functionality
// ===================================

// Get Search Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Search Function
function searchFoods() {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredFoods = foods.filter(function (food) {
    return (
      food.name.toLowerCase().includes(searchValue) ||
      food.category.toLowerCase().includes(searchValue) ||
      food.description.toLowerCase().includes(searchValue)
    );
  });

  displayFoods(filteredFoods);

  if (filteredFoods.length === 0) {
    document.getElementById("foodContainer").innerHTML =
      "<p>No food items found!</p>";
  }

  document.getElementById("menu").scrollIntoView({
    behavior: "smooth",
  });
}

// Search Button Click
searchBtn.addEventListener("click", searchFoods);

// Enter Key Search
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchFoods();
  }
});
// Show All Foods When Search Is Cleared
searchInput.addEventListener("input", function () {
  if (searchInput.value.trim() === "") {
    displayFoods(foods);
  }
});
