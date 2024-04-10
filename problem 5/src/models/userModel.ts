import {model, Schema} from "mongoose";

interface IUser {
    name: string;
    email: string;
    age: number;
    gender: string,
    createdAt: Date;
};

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const User = model<IUser>('User', userSchema);

export default User;
