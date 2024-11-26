import {Schema, model} from 'mongoose';

const ClientSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Client = model('Client', ClientSchema);

export default Client;