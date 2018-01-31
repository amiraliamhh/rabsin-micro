const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    user_fk: {
        type: String,
        required: true
    },
    buying_digital_currency: {
        type: Boolean,
        required: true
    },
    digital_currency_type: {
        type: String,
        required: true
    },
    digital_currency_amount: {
        type: Number,
        required: true
    },
    dc_to_rial_amount: {
        type: Number,
        required: true
    },
    situation: {
        type: String,
        enum: [
            'pending',
            'waiting',
            'done',
            'canceledByUser',
            'canceledByServer'
        ],
        default: 'pending'
    }
})

module.exports = mongoose.model('Orders', OrdersSchema);