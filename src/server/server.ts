import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ProductModel } from "./schemas/product.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import { CartModel } from "./schemas/cart.schema.js";
import { OrderModel } from "./schemas/order.schema.js";
import { RateModel } from "./schemas/rating.schema.js";
import bodyParser from "body-parser";
import Stripe from "stripe";
import * as orderProcess from "./middleware/order.middleware.js";
import { AdressModel } from "./schemas/adress.schema.js";
const __dirname = path.resolve();
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
const PORT = process.env.PORT || 3002;
const app = express();
const publishable = process.env.PUBLISHABLE_KEY;
const secret = process.env.SECRETE_KEY!;
export const stripe = new Stripe(secret, {
  apiVersion: "2020-08-27",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/create-payment", function (req, res) {
  stripe.charges
    .create({
      amount: 7000,
      description: "Web dev",
      currency: "USD",
      source: req.body.token,
    })
    .then((charge) => {
      console.log(charge);
      res.send("Success");
    })
    .catch((err) => {
      res.send(err);
    });
});

const saltRounds = 10;

mongoose
  .connect("mongodb://localhost:27017/amazon-clone2")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4200",
      "http://localhost:3002",
      "http://localhost:8080",
    ],
  })
);
app.use(express.json());
app.get("/", function (req, res) {
  res.json({ test: "test" });
});
app.use(express.json());

app.post("/create-product", function (req, res) {
  const { title, price, image, description, rating } = req.body;
  const product = new ProductModel({
    price,
    title,
    image,
    description,
    rating,
  });
  product
    .save()
    .then((data) => {
      res.json({ data });
    })

    .catch((err) => {
      console.log(err);
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-adress",authHandler, function (req:any, res) {
  const user = req.user._id
  const {
    
    firstName,
    lastName,
    adressLineOne,
    adressLineTwo,
    zipCode,
    state,
    city,
    phoneNumber,
    email,
  } = req.body;
  const adress = new AdressModel({
    user,
    firstName,
    lastName,
    adressLineOne,
    adressLineTwo,
    zipCode,
    state,
    city,
    phoneNumber,
    email,
  });
  adress
    .save()
    .then((data) => {
      res.json({ data });
    })

    .catch((err) => {
      console.log(err);
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/adress", authHandler, function (req:any, res) {
  AdressModel.find({ user: req.user._id })
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-rating", function (req: any, res) {
  const { comment, product, rating } = req.body;
  const newRating = new RateModel({
    comment,
    rating,
  });

  newRating
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/rating", function (req, res) {
  RateModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/products", function (req, res) {
  ProductModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});
app.post("/create-user", function (req, res) {
  const { name, email, username, password } = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (error, hash) {
      const new_user = new UserModel({
        name,
        username,
        email,
        password: hash,
      });
      new_user
        .save()
        .then((data) => {
          res.json({ data });
        })
        .then(() => {
          const cart = new CartModel({
            user: new_user._id,
          });
          cart.save();
        })

        .catch((err) => {
          console.log(err);
          res.status(501);
          res.json({ errors: err });
        });
    });
  });
});
app.get("/users", authHandler, function (req: any, res) {
  UserModel.find({ email: req.user.email }, "-password")
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.put("/delete-from-cart/:id", authHandler, function (req: any, res) {
  console.log("Delete product from cart");
  CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { items: { product: req.params.id } },
    },
    {
      new: true,
    },
    function (err, deleteFromCart) {
      if (err) {
        res.send("Error deleting product from cart");
      } else {
        res.json(deleteFromCart);
        console.log("deleted prodct", deleteFromCart);
      }
    }
  ).populate("items.product");
});

app.put("/update-user/:id", function (req, res) {
  console.log("Update user");
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name, email: req.body.email },
    },
    {
      new: true,
    },
    function (err, updateUser) {
      if (err) {
        res.send("Error updating user");
      } else {
        res.json(updateUser);
      }
    }
  );
});

app.put("/update-cart", authHandler, function (req: any, res) {
  CartModel.findOne({ user: req.user._id })
    .populate("items.product")
    .then((cart) => {
      console.log(cart, "Cart");
      if (cart) {
        console.log(req.body, req.body._id, cart.items[0]);
        const item = cart.items.find(
          (item) => item.product._id == req.body._id
        );
        console.log(item, "item");
        if (item) {
          item.quantity++;
        } else {
          cart.items.push({ product: req.body._id, quantity: 1 });
        }
        cart.save().then((updatedCart) => res.json(cart));
      }
    });
});

app.put("/remove-cart-item", authHandler, function (req: any, res) {
  console.log("remove from cart Cart", req.user);
  CartModel.findOne({ user: req.user._id }).then((cart) => {
    if (cart) {
      const item = cart.items.find((item) => item.product == req.body._id);
      if (item) {
        item.quantity--;
        if (item.quantity < 1) {
          cart.items.splice(
            cart.items.findIndex((ii) => ii == item),
            1
          );
        }
      }
      cart?.save().then((updatedCart) => {
        CartModel.populate(updatedCart, "items.product").then(
          (populatedCart) => {
            res.json(populatedCart);
          }
        );
      });
    }
  });
});

app.get("/cart", authHandler, function (req: any, res) {
  CartModel.findOne({ user: req.user._id })
    .populate("items.product user")
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/order", authHandler, function (req: any, res) {
  OrderModel.find({ user: req.user._id })
    .populate("items.product user")
    .populate({path:"items", populate:{path:"product"}})
    .then((data) => {
      console.log("Order from server", data) 
      res.json({ data })})

    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-order", orderProcess.createOrder, orderProcess.emptyCart);

app.post("/login", function (req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) {
          console.log("It matches!");
          const accessToken = jwt.sign({ user }, access_secret);
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
          });
          res.json({ data: user });
        } else {
          res.sendStatus(403);
        }
      });
    })

    .catch((err) => {
      return res.sendStatus(404);
    });
});
app.get("/logout", authHandler, function (req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.json({ message: "Successfully Logged out" });
});
app.listen(PORT, function () {
  console.log(`running at localhost http://localhost:${PORT}`);
});
