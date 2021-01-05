import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    Name: {type: String, required: true, unique: true},
    Email: {type: String, required: true, unique: true},
    Password: {type: String, required: true},
    IsAdmin: {type: Boolean, default: false, required: true}
    },
    {
        timestamps: true
    });

    const User = mongoose.model("User", UserSchema);

    export default User;