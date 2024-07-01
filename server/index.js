    const express = require('express')
    const mongoose = require('mongoose')
    const User = require('./model/user')
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')
    const cookieParser = require('cookie-parser')
    const auth = require('./middleware/auth')
    const cors = require('cors')

    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use(cors())

    mongoose.connect("mongodb://127.0.0.1:27017/AgriMart")

app.get('/', (req, res) => {
    res.send('<h1>Server is working</h1>')
})

app.post('/register', async (req, res) => {
    try {
        // get all data from body
        const { name, mobile, address, email, password, role } = req.body

        // all the data should exist
        if (!(name && mobile && address && email && password && role)) {
            return res.status(400).send('All fields are compulsory')
        }

        // check if user already exists - email
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).send('User already exists with this Email')
        }

        // encrypt the password
        const myEncPassword = await bcrypt.hash(password, 10)

        // save the user in DB
        const user = await User.create({
            name,
            mobile,
            address,
            email,
            password: myEncPassword,
            role
        })

        // generate a token for user and send it
        const token = jwt.sign(
            { id: user._id, email },
            'shhhh', //process.env.jwtsecret
            {
                expiresIn: '2h'
            }
        )

        user.token = token
        user.password = undefined

        return res.status(201).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})

app.post('/login', async (req, res) => {
    try {
        // get all data from frontend
        const { email, password } = req.body

        // validation
        if (!(email && password)) {
            return res.status(400).send('Send all data')
        }

        // find user in DB
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send('User not found')
        }

        // match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id },
                'shhhh', //process.env.jwtsecret
                {
                    expiresIn: '2h'
                }
            )

            user.token = token
            user.password = undefined

            // send a token in user cookie
            // cookie section
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                // httpOnly: true 
            }

            return res.status(200).cookie('token', token, options).json({
                success: true,
                token,
                user
            })
        } else {
            return res.status(401).send('Invalid credentials')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})

app.get('/dashboard',auth, (req, res) => {
    res.send('Welcome to Dashboard')
})

app.listen(3001, () => {
    console.log("Server is running")
})
