import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002

// Initialize Payload
const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add custom routes before payload middleware
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Redirect root to admin panel
  app.get('/', (req, res) => {
    res.redirect('/admin')
  })

  // Start Express server
  app.listen(PORT, () => {
    payload.logger.info(`Server listening on port ${PORT}`)
    payload.logger.info(`Admin panel: http://localhost:${PORT}/admin`)
  })
}

start().catch((error) => {
  payload.logger.error('Failed to start server')
  payload.logger.error(error)
  process.exit(1)
})
