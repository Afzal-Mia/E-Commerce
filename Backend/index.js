// Import the required modules
import express from 'express';//express is the web framework for nodejs
const app = express();
import mongoose from 'mongoose';// A library that helps interact with MongoDB (for creating schemas, models, etc.)
import jwt from 'jsonwebtoken';
//Login: A user sends login credentials (like username and password) to the server.
// Generate Token: If the credentials are valid, the server generates a JWT and sends it back to the cli.ent.
// Client Stores Token: The client stores the token (e.g., in localStorage or cookies) and includes it in the Authorization header for future requests.
// Server Verifies Token: For each incoming request, the server verifies the token to check the user’s identity and grants access if the token is valid

import multer from 'multer';//Middleware for handling file uploads.
import path from 'path';
import cors from 'cors';//Middleware to allow cross-origin requests (important for handling requests from different origins like a frontend and backend).
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const port =process.env.PORT||4000; // Define the port number

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
// The absolute path of the current file.e.g., /home/user/projects/Backend/index.js
const __dirname = dirname(__filename);
//  The absolute directory of the current file./home/user/projects/Backend


// Middleware to parse JSON data
app.use(express.json());
//When an incoming request with a Content-Type header of application/json is received, express.json() automatically parses the JSON data in the request body.
// The parsed JSON data is then made available in the req.body object, allowing you to access it within your route handlers
app.use(cors());

// Data Base Connection with MongoDB
mongoose.connect("mongodb+srv://mohammedafzal1213:qwerty1220@e-com-2-cluster.fk3kn.mongodb.net/e-commerce");

// Root route Handler APIs
app.get('/', (req, res) => {
    res.send('TumHara App Running KaR rAha hai');
});
// Serve static files from the upload/images directory for the client
app.use('/images', express.static(path.join(__dirname, 'upload/images')));//is setting up a static file server to client to access
//Here '/images' is route

// Setting Up Multer for Image Uploads
const mystorage = multer.diskStorage({
    destination: path.join(__dirname, 'upload/images'),
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: mystorage });

// Creating Upload EndPoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    //here product is the field name of the input file
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Product Schema
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

// Creating the Product model
const Product = mongoose.model('Product', productSchema);
//If you create a model named Product, MongoDB will create a collection named products to store the documents.
// The model is not the collection, but it gives you a way to interact with the collection.

//creating api end point to add the product in the database
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    // When you call Product.find(), Mongoose uses the model to execute a database query on the associated collection (products) and retrieve the data
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    // if database has no product
    else {
        id = 1;
    }
    try {
        //here,product is the model instance
        //creating the document 
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        const insertedProduct = await product.save();//afterpersisting the data in dbms it returns the newly added document
        console.log("Product is saved in the database!", insertedProduct);
        console.log(product);
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error saving the product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//Creating API For deleting the Products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product is removed!");
    res.json({
        success: 1,
        name: req.body.name
    })
})
//Creating Api For getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    res.send(products);
})

//Schema Creating for  user 
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        cartData: {
            type: Object,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    })
//user Model creating with the userSchema
const Users = mongoose.model('Users', userSchema);

//Creating Endpoint for registeering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "existing User"
        })
    }
    //An empty cart for specific user
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    
    //creating  a individual  user document
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id//The id is the unique identifier that MongoDB automatically generates for each document.
        }
    }

    const token = jwt.sign('data', 'secret_ecom');
    res.json({ success: true, token })
})

//Creating Endpoint for the user Login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else{
        res.json({success:false,errors:"Incorrect Email Id"});
    }
})

//Creating endpoint for new Collection Data
app.get("/newcollection",async (req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    res.send(newcollection);
})

//Popular in Women section
app.get("/popularinwomen",async (req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(5,9);
    res.send(popular_in_women);
})

//creating Custome middleware to fetch the user
const fetchUser=async (req,res,next)=>{
    const token =req.header('auth-token');
    if(!token)
    {
        res.status(401).send({errors:"Please authenticate with valid token"});

    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(e){
            res.status(401).send({errors:"Invalid Token...."});
        }
    }
}
//creating endpoint for adding data in cartData;
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log(req.body,req.user);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");

})

//Creating endpoint to remove product from cartData
app.post('/removefromcart',fetchUser,async (req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -=1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Removed");
    }
    else{
        res.send("cart is already Empty")
    }
}) 

//Creating endpoint to get CartData
app.post("/getcart", fetchUser, async (req, res) => {
    try {
        // console.log("Fetching cart for user...");
        
        // Fetch user data based on the authenticated user's ID
        const userData = await Users.findOne({ _id: req.user.id });

        // Check if the user exists
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with the user's cart data
        res.status(200).json(userData.cartData);

        // console.log("Cart items retrieved successfully.");
    } catch (error) {
        console.error("Error retrieving cart items:", error.message);

        // Respond with an error if something goes wrong
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Start the servers
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on http://localhost:${port}`);
    } else {
        console.log("Error:" + error);
    }
});

