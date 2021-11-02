import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {ProductModel} from './schemas/product.schema.js'
import { UserModel} from './schemas/user.schema.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from 'path'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
const __dirname = path.resolve()
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
const PORT = process.env.PORT || 3002;
const app = express();

const saltRounds = 10;

mongoose
  .connect("mongodb://localhost:27017/amazon-clone")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

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
app.get('/', function(req, res) {
  res.json({test: 'test'})
});


app.post("/create-product", function(req, res) {
  const {title, price, image, description, quantity} = req.body;
  const product = new ProductModel({
price,
title,
image,
description,
quantity
  });
  product 
  .save()
  .then((data) => {
  res.json({data})
  })
  .catch((err) => {
    console.log(err)
    res.status(501);
    res.json({errors: err})
  })
})

app.get("/products", function(req, res) {
  ProductModel.find()
  .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
})
app.post("/create-user", function (req, res) {
  const { name, email, username, password} = req.body
  console.log(req.body);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (error, hash) {
      const user = new UserModel({
        name,
        username,
        email,
        password: hash,
      });
      user
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
  });
    app.get("/users", authHandler, function (req:any, res) {
      UserModel.find({ email: req.user.email }, "-password")
      .then((data) => res.json({ data }))
      .catch((err) => {
        res.status(501);
        res.json({ errors: err });
      });
  });
    app.delete("/delete-user/:id", function (req, res) {
      const _id = req.params.id;
      ProductModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({ data });
      });
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
    app.post("/login", function (req, res) {
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
              res.json({ message: "Successfully Logged In" });
            } else {
              res.sendStatus(403);
            }
          });
        })
        .catch((err) => {
          return res.sendStatus(404);
        });
    });
  })
app.listen(PORT, function () {
      console.log(`running at localhost http://localhost:${PORT}`);
    });



