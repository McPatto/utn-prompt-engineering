import express from "express"
import { mattressFileRoutes } from "./routes/mattressFileRoutes.js"
import { mattressMongoRoutes } from "./routes/mattressMongoRoutes.js"
import { connectDB } from "./services/mongoConnection.js"
import cors from "cors"

process.loadEnvFile()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
const APP_MODE = process.env.APP_MODE
console.log(APP_MODE)

const router = APP_MODE === "file" ? mattressFileRoutes : mattressMongoRoutes

app.use("/api/mattress", router)

app.listen(PORT, () => {
  console.log("Servidor en escucha en el puerto http://localhost:" + PORT)
  connectDB()
})