
# 🍔 FoodieHub – Food Ordering Website

FoodieHub is a full-stack food ordering website where users can explore food items, add food to their cart, place orders, and track their order status.

## 🚀 Features

- Browse food items and categories
- Search food items
- Add items to cart
- Increase or decrease item quantity
- Calculate subtotal, delivery fee, and total amount
- Place food orders
- View all orders
- Track orders using Order ID
- Admin dashboard to manage orders
- Update order status (Pending, Preparing, Delivered)
- Responsive user interface

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

## 📁 Project Structure

```text
FoodieHub/
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── success.html
│   ├── my-orders.html
│   ├── track-order.html
│   └── admin.html
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open Backend Folder

```bash
cd FoodieHub/backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/foodiehub
```

### 5. Start the Backend Server

```bash
npm start
```

### 6. Run the Frontend

Open `frontend/index.html` using VS Code Live Server.

## 🗄️ Database

MongoDB is used to store customer orders and order details.

## 👨‍💻 Developer

Developed as a full-stack web development practice project.

**Project Name:** FoodieHub
