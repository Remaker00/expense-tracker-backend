const Razorpay = require('razorpay');
const Order  = require('../models/orders');
require('dotenv').config();

exports.getpayment = async (req, res) => {
    try {
        var instance = new Razorpay({
            key_id: process.env.RZP_API_ID,
            key_secret: process.env.RZP_API_SEC
        });

        const amount = 1500;

        instance.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : instance.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })    
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "An error occurred while creating the order." });
    }
};

exports.updatepayment = (req, res ) => {
    try {
        const { orderId} = req.body;
        Order.findOne({where : {orderid : orderId}}).then(order => {
            order.update({  status: 'SUCCESSFUL'}).then(() => {
                req.user.update({ispremiumuser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
};
