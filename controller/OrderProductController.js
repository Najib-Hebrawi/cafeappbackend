const Order = require('../model/OrderProduct')

createOrder = (req,res) =>{
    const body =req.body
    if (!body){
        return res.status(400).json({
            success:false,
            error:'you must provide a product'
        })
    }

    const order = new Order(body)
    if (!order){
        return res.status(400).json({
            success:false,
            error:'err'
        })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'order not created!',
            })
        })
}

module.exports = {
    createOrder
}