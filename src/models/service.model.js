import {Schema, models} from 'mongoose';

const ServiceSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: Image,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    max_capacity: {
        type: Number,
        required: true
    },
    isExtra: {
        type: String,
        required: true
    }
})

const Service = models('Service');
export default Service;