import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../Models/OrderModel';

const OrderRouter = express.Router();


OrderRouter.post('/', expressAsyncHandler(async(req,res)=>{
    if(req.body.OrderItems.length ===0){
        res.status(404).send({message: 'Cart is Empty'});
    }else{
        const order = new Order({
            OrderItems: req.body.OrderItems,
            ShippingAddress: req.body.ShippingAddress,
            PaymentMethod: req.body.PaymentMethod,
            ItemsPrice: req.body.ItemsPrice,
            TaxPrice: req.body.ItemPrice,
            ShippingPrice: req.body.ShippingPrice,
            TotalPrice: req.body.TotalPrice
        });
    }
}))