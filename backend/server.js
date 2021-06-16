import express from 'express'
import dotenv from 'dotenv'
import morgan from "morgan"
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import pinRoutes from './routes/pinRoutes.js'
import userRoutes from './routes/userRoutes.js'
//load env
dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

//routes
app.use('/api/pin', pinRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('API is running...')
})

//error middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))