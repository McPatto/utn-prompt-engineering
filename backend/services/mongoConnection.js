import mongoose from "mongoose"

const connectDB = async () => {
  process.loadEnvFile()
  const URI_DB = process.env.URI_DB
  try {
    await mongoose.connect(URI_DB)
    console.log("Conexión exitosa a la base de datos")
  } catch (error) {
    console.error("Error al conectarse a MongoDB:", error)
    process.exit(1) // Terminate the app
  }
}

export { connectDB }