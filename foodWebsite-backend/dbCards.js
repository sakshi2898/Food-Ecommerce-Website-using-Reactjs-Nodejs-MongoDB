import mongoose from "mongoose";

// Define Database Schema
const shoppingCartSchema = mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
});

// Here, we define collection name inside quotes
export default mongoose.model("Products", shoppingCartSchema);
