import express from 'express'
import cors from 'cors'
import container from './config/inversify.config.js'
import IDENTIFIERS from './config/identifiers.js'
import { config } from 'dotenv'
import { router } from './routes/router.js'

config() // Load environment configuration at the beginning

const app = express()

const baseURL = process.env.BASE_URL || 'http://localhost' // Provide a default fallback
console.log(`CORS set for ${baseURL}`)
const PORT = process.env.PORT || 3000

app.use(cors({ origin: baseURL }))
app.use(express.json()) // Using built-in middleware
app.use(express.static('public'))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on ${baseURL}:${PORT}`)
})
