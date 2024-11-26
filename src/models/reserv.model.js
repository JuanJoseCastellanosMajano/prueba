import { Schema, model } from 'mongoose';

const reservSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    sale: {
        type: Schema.Types.ObjectId,
        ref: 'Sale',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    room: {
        type: Number,
        required: true
    }
});

const Reservation = model('Reservation', reservSchema);

export default Reservation;

