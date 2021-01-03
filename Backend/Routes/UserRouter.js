import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Data from '../Data.js';
import User from '../Models/UserModel.js';


const UserRouter = express.Router();

UserRouter.get('/seed', expressAsyncHandler(async(req,res)=>{
    await User.remove({});
    const CreatedUsers = await User.insertMany(Data.UserData);
    res.send({CreatedUsers});
}));

export default UserRouter;