import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
})

const User = model('User', UserSchema);
export default User;