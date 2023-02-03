const express = require("express")
const router = express.Router()
const { createUser, userLogin } = require('../controllers/userController')
const { createOrder, orderDatails } = require('../controllers/orderController')


router.post('/add-user', createUser)
router.post('/login-user', userLogin)


router.post('/add-order', createOrder)
router.get('/get-order/:user_id', orderDatails)


module.exports = router