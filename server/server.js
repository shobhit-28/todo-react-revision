import express from "express";

import routes from './routes/routes.js'

import cors from "cors"

const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())


app.use('/todo', routes)



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})