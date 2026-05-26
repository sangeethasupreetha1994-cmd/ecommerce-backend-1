const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },

            quantity: {
                type: Number
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }

},

{ 
    timestamps: true 
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;