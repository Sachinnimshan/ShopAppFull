import express, { urlencoded } from 'express';
// import Data from './Data.js';
import mongoose from 'mongoose';
import UserRouter from './Routes/UserRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/snshop',{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.get('/', (req, res)=>{
    res.send("Server is Ready"); 
});

// app.get('/api/products/:id', (req,res)=>{
//  const product = Data.ProductData.find((x)=> x._id === req.params.id);
//  if(product){
//      res.send(product);
//  }else{
//      res.status(404).send({message: "Product Not Found"});
//  }
// });

// app.get('/api/products', (req, res)=>{
//     res.send(Data.ProductData);
// });

app.use('/api/users', UserRouter);
app.use('/api/products', ProductRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {console.log(`Server @ http://localhost:${PORT}`)});
