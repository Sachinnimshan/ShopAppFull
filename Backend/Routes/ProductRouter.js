import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Data from '../Data.js';
import Product from '../Models/ProductModel.js';


const ProductRouter = express.Router();


ProductRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    await Product.remove({});
    const CreatedProducts = await Product.insertMany(Data.ProductData);
    res.send({CreatedProducts});
}));

ProductRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.send(products);
}));

ProductRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Product Not Found"});
    }

}));

export default ProductRouter;