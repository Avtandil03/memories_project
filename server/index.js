import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb+srv://avtandil:YDuF8umJ@cluster0.xs2pvt6.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000

console.log(CONNECTION_URL)

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log('listenint port -' + PORT) ))
  .catch((error) => console.log(error.message))
