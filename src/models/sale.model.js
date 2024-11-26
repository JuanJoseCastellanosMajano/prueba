import { Schema, model } from 'mongoose';

const saleSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    services: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],         default: 'Pending'
    }
});

const Sales = model('Sales', saleSchema);

export default Sales;
