import express from "express";
import mongoose from "mongoose";
// step5
import Cors from "cors";

import Products from "./dbCards.js";

// App Config
const app = express(); //1. create instance
const port = process.env.PORT || 8001; //2. listen on port 8001

// Connection
// Step1
const connection_url =
  "mongodb+srv://FoodData01:CFlN6QcsUJFRZ4qZ@cluster0.qgsqxgj.mongodb.net/?retryWrites=true&w=majority";

// Middlewares
// step6
app.use(express.json());
app.use(Cors());

// DB config -- database connection
// step2
mongoose
  .connect(connection_url)
  .then(() => {
    console.log("Connection succcesful");
  })
  .catch((err) => console.log("No connection"));

// API Endpoints
// 3. Add callback function to pass status code in response and send some message and this message will display on screen
app.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

// // Endpoint to add data in database
// step3
app.post("/FoodData/Meals", (req, res) => {
  const dbCard = req.body;

  Products.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err); //500- Internal server error
    } else {
      res.status(201).send(data); //201 - Data successfully created
    }
  });
});

// // Endpoint to download the data from database or fetch the data from the database
// step4
app.get("/FoodData/Meals", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data); // 200 - status ok
    }
  });
});

// Listener

app.listen(port, () => console.log(`Listensing on localhost: ${port}`));
