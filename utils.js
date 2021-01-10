import jwt from 'jsonwebtoken';


export const GenerateToken=(user)=>{
    return jwt.sign({
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
        IsAdmin: user.IsAdmin,
    }, process.env.JWT_SECRET || 'SomethingSecret',
    {
        expiresIn: '30d'
    });
};

export const IsAuth=(req, res, next)=>{
    const authorization = req.headers.authorization;
    if(authorization){
        const Token = authorization.slice(7, authorization.length);
        jwt.verify(Token, process.env.JWT_SECRET || 'SomethingSecret', (err, decode)=>{
            if(err){
                res.status(401).send({message: 'Invalid Token'});
            }else{
                req.user= decode;
                next();
            }
        })
    }else{
        res.status(401).send({message: "No Token"});
    }
}