const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        let data = req.body
        const { name, phone_number, password } = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send('Fill the registration information ')
        }

        if (!name) {
            return res.status(400).send('Enter name ')
        }

        if (!phone_number) {
            return res.status(400).send('Enter phone_Number ')
        }
        if (!password) {
            return res.status(400).send('Enter password ')
        }
        if (password) {
            let hashPassword = await bcrypt.hash(password, 10)
            data.password = hashPassword
        }

        let result = await userModel.create(data)
        return res.status(201).send({ status: true, data: result })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const userLogin = async (req, res) => {

    try {

        let loginData = req.body
        const { phone_number, password } = loginData

        let userdata = await userModel.findOne({ phone_number: phone_number })

        if (!userdata) {
            return res.status(404).send({ status: false, message: "User not found" })
        }

        let passwordCheck = await bcrypt.compare(password, userdata.password)

        if (!passwordCheck) {
            return res.status(400).send({ status: false, message: "Invalid Password" })
        }

        let token = jwt.sign(
            {
                phone_number: phone_number,
                password: password
            },
            "sdfghjujnwefg",
            { expiresIn: "24h" }
        )
        res.setHeaders = token
        return res.status(200).send({ status: true, token: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { createUser, userLogin }


