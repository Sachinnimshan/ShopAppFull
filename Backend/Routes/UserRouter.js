import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { GenerateToken } from '../../utils.js';
import Data from '../Data.js';
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';


const UserRouter = express.Router();

UserRouter.get('/seed', expressAsyncHandler(async(req,res)=>{
    await User.remove({});
    const CreatedUsers = await User.insertMany(Data.UserData);
    res.send({CreatedUsers});
}));


UserRouter.post('/signin', expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({Email: req.body.Email});
    if(user){
        if(bcrypt.compareSync(req.body.Password, user.Password)){
            res.send({
                _id: user._id,
                Name: user.Name,
                Email: user.Email,
                IsAdmin: user.IsAdmin,
                Token: GenerateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid Email or Password'});
}))

 UserRouter.post('/register', expressAsyncHandler(async(req,res)=>{
     const user = new User({
         Name: req.body.Name,
         Email: req.body.Email,
         Password: bcrypt.hashSync(req.body.Password, 8)
     });

     const CreatedUser = await user.save();
     res.send({
         _id: CreatedUser._id,
         Name: CreatedUser.Name,
         Email: CreatedUser.Email,
         IsAdmin: CreatedUser.IsAdmin,
         Token: GenerateToken(CreatedUser)
     });

 }))

export default UserRouter;