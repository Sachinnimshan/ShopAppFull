import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    OrderItems : [{
        Title: {type: String, required: true},
        qty: {type: Number, required: true},
        Image: {type: String, required: true},
        Price: {type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true}
    }],
    ShippingAddress :{
        FullName: {type: String, required: true},
        Address: {type: String, required: true},
        Postalcode: {type: Number, required: true},
        City: {type: String, required: true},
        Country: {type: String, required: true},
    },
    PaymentMethod: {type: String, required: true},
    PaymentResults: {
        id: String,
        Status: String,
        Update_Time: String,
        Email_Address: String,
    },
    ItemsPrice: {type: Number, required: true},
    ShippingPrice: {type: Number, required: true},
    TaxPrice: {type: Number, required: true},
    TotalPrice: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    IsPaid: {type: Boolean, default: false},
    PaidAt: {type: Date},
    IsDelivered: {type: Boolean, default: false},
    DeliveredAt: {type: Date},
    },
    {
        timestamps: true,
    });

    const Order = mongoose.model("Order", OrderSchema);

    export default Order;