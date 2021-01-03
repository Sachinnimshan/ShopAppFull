import jwt from 'jsonwebtoken';


export const GenerateToken=(user)=>{
    return jwt.sign({
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
        IsAdmin: user.IsAdmin
    }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
};