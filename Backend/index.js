import express from "express"
import dotenv from "dotenv"
import cors from "cors"
 

import connection from "./config/db.js"
import problemRoute from "./routes/problemRoute.js"

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()

// connection 

connection()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use('/api/problems',problemRoute)
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})