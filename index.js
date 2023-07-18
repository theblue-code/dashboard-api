import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { getUsers, getUser, loginUser, registerUser } from './controllers/user.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => res.send("Welcome To The Dashboard API App!"))
app.get("/users", getUsers)
app.get("/users/:id", getUser)

app.post("/users/login", loginUser)
app.post("/users/register", registerUser)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
    .catch((err) => console.log("Error:", err))