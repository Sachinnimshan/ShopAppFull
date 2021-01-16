import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { GenerateToken, IsAuth  } from '../../utils.js';
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

UserRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send({message: 'User Not Found'});
    }
}))

UserRouter.get('/', IsAuth, expressAsyncHandler(async(req,res)=>{
    const users = await User.find({});
    if(users){
        res.send(users);
    }else{
        res.status(404).send({message: 'Users Not Found'});
    }
}))

UserRouter.put('/profile', IsAuth, expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.Name = req.body.Name || user.Name;
        user.Email = req.body.Email || user.Email;
        if(req.body.Password){
            user.Password = bcrypt.hashSync(req.body.Password, 8);
        }
    const UpdatedUser = await user.save();
    res.send({
        _id: UpdatedUser._id,
        Name: UpdatedUser.Name,
        Email: UpdatedUser.Email,
        IsAdmin: UpdatedUser.IsAdmin,
        Token: GenerateToken(UpdatedUser),
    });
    }
}))

export default UserRouter;