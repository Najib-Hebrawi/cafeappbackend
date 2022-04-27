const express = require('express')
const OrderController = require('../controller/OrderProductController')

const router = express.Router()
router.post('/orders',OrderController.createOrder)

module.exports = router