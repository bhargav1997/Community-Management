const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
// const bodyParser = require("body-parser")
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5001;

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const ORIGIN = process.env.ORIGIN;

// Use CORS middleware
app.use(
   cors({
      origin: ORIGIN, // Allow requests from this origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
      credentials: true, // Allow credentials (e.g., cookies)
   }),
);

app.use(express.json({ limit: "10mb" }));

mongoose
   .connect(process.env.MONGO_URL)
   .then(console.log("Connected to MongoDB"))
   .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use("/", Routes);

app.listen(PORT, () => {
   console.log(`Server started at port no. ${PORT}`);
});
