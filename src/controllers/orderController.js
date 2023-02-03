
const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')

const createOrder = async (req, res) => {

    const { user_id, sub_total } = req.body

    findUser = await userModel.findById(user_id)

    if (!findUser) {
        return res.status(400).send({ status: false, message: "user not found" })
    }

    req.body.phone_number = findUser.phone_number

    let orderData = await orderModel.create(req.body)
    return res.status(201).send({ status: true, data: orderData })
}

const orderDatails = async (req, res) => {

    try {
        let user_id = req.params.user_id

        let orderDatails = await orderModel.findOne({ user_id: user_id }).populate('user_id').select({ password: 0 })

        return res.status(200).send({ status: true, data: orderDatails })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createOrder, orderDatails }



