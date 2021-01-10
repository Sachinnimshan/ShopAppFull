import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { IsAuth } from '../../utils.js';
import Order from '../Models/OrderModel.js';

const OrderRouter = express.Router();


OrderRouter.post('/', IsAuth, expressAsyncHandler(async(req,res)=>{
    if(req.body.OrderItems.length === 0){
        res.status(400).send({message: 'Cart is Empty'});
    }else{
        const order = new Order({
            OrderItems: req.body.OrderItems,
            ShippingAddress: req.body.ShippingAddress,
            PaymentMethod: req.body.PaymentMethod,
            ItemsPrice: req.body.ItemsPrice,
            TaxPrice: req.body.TaxPrice,
            ShippingPrice: req.body.ShippingPrice,
            TotalPrice: req.body.TotalPrice,
            user: req.user._id,
        });

        const CreatedOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order: CreatedOrder});
    }
}));


OrderRouter.get('/:id', IsAuth, expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: "Order Not Found"});
    }
}));

export default OrderRouter;