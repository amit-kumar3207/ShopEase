# ShopEase – E-commerce Web Application

ShopEase is a responsive frontend e-commerce web application built using HTML, CSS, and JavaScript. Users can explore products, search and filter items, manage their shopping cart, save wishlist products, and complete a demo checkout process.

## Features

- Dynamic product listing using Fake Store API
- Product search functionality
- Category-based product filtering
- Product sorting by price (Low to High and High to Low)
- Product details page
- Add to Cart and Remove from Cart
- Increase and decrease product quantity
- Automatic cart total calculation
- Wishlist functionality
- Checkout form with input validation
- Demo order confirmation page
- LocalStorage for saving cart, wishlist, and order data
- Responsive design for desktop, tablet, and mobile

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- REST API
- Fetch API
- LocalStorage

## API Used

[Fake Store API](https://fakestoreapi.com/)

Used to fetch product information such as title, image, price, category, description, and rating.

## Project Structure

```text
ShopEase/
├── index.html
├── cart.html
├── product-details.html
├── wishlist.html
├── checkout.html
├── order-success.html
├── assets/
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── cart.js
│   ├── product-details.js
│   ├── wishlist.js
│   ├── checkout.js
│   └── order-success.js
└── README.md
```

## How to Run

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` using the Live Server extension.
4. Explore the products and test the available features.

## Important Note

This is a frontend demonstration project. Checkout and order confirmation are simulated using browser LocalStorage. No real payment or backend order processing is implemented.

## Author

Amit kumar

## Project Status

Completed – Frontend Demonstration Project

## Backend Setup

### 1. Open Backend Folder

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

Add your MongoDB connection string in `.env`. Do not share your password or connection string publicly.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Start Backend Server

```bash
node server.js
```

Backend runs at:

http://localhost:5000

### 5. API Endpoints

- GET `/api/orders` - Fetch all orders
- POST `/api/orders` - Create a new order
- PATCH `/api/orders/:orderId` - Update order status
