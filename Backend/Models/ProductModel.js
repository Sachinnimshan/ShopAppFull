import express from 'express';
import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    Title: {type: String, required: true, unique: true},
    Image: {type: String, required: true},
    Description: {type: String, required: true},
    Category: {type: String, required: true},
    Price: {type: Number, required: true},
    AvailableSize: {type: [String], required: true},
    Rating: {type: Number, required: true},
    NumReviews: {type: Number, required: true},
    CountInStock: {type: Number, required: true}

}, {
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);


export default Product;
