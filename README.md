# E-commerce Web App 🛒

## Screenshots 📸

### Hero Section ✨
![Hero Section](https://res.cloudinary.com/diufr72e9/image/upload/v1736195571/Screenshot_10_aetmpc.png)

### Women Clothes 👗
![Women Clothes](https://res.cloudinary.com/diufr72e9/image/upload/v1736195590/Screenshot_13_fuektv.png)

### Men Clothes 👕
![Men Clothes](https://res.cloudinary.com/diufr72e9/image/upload/v1736195584/Screenshot_12_qtr9iy.png)

### Admin 👩‍💻
![Admin](https://res.cloudinary.com/diufr72e9/image/upload/v1736195550/Screenshot_15_ilxxu6.png)

---

You can view and interact with the live app here: [E-commerce Web App](https://e-commerce-1-0fch.onrender.com/)

This e-commerce web app is built using various web technologies, including **Express.js**, **MongoDB**, and **JWT Authentication**. It allows users to manage products, user registration, login, and cart functionalities. The app provides endpoints for adding, removing, and retrieving products, as well as managing user data.

## Skills and Technologies Used 🛠️

- **Express.js**: A web framework for building RESTful APIs and server-side logic.
- **MongoDB**: A NoSQL database for storing user and product data.
- **Mongoose**: ODM (Object Document Mapping) library for interacting with MongoDB.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens for verifying and managing sessions.
- **Multer**: Middleware for handling file uploads, such as product images.
- **CORS**: Middleware to handle Cross-Origin Resource Sharing for allowing requests from different domains.
- **dotenv**: For managing environment variables securely.
- **Node.js**: JavaScript runtime for the server-side logic.
- **File System Operations**: Handling product image storage and serving them from the server.

## Features 🌟

- **User Registration and Login**: Users can sign up and log in to the app using email and password.
- **Product Management**: Admins can add, remove, and view products.
- **Cart Management**: Users can add and remove items from their shopping cart.
- **Image Upload**: Products can have images uploaded through the app.

## Setup Instructions ⚙️

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up a `.env` file to store your environment variables, including database credentials and JWT secret.
4. Run the server:
    ```bash
    npm start
    ```

## API Endpoints 🚀

- **POST /signup**: Register a new user.
- **POST /login**: User login and JWT token generation.
- **POST /addproduct**: Admin endpoint to add a new product.
- **POST /removeproduct**: Admin endpoint to remove a product.
- **POST /upload**: Upload product images.
- **POST /addtocart**: Add an item to the user's cart.
- **POST /removefromcart**: Remove an item from the user's cart.
- **POST /getcart**: Retrieve the user's cart data.
- **GET /allproducts**: Retrieve all products.
- **GET /newcollection**: Retrieve the latest products for a new collection.
- **GET /popularinwomen**: Retrieve popular products in the women category.

## License 📜

This project is open-source under the MIT License.
