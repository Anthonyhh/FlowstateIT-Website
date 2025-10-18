import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002

// Initialize Payload
const start = async (): Promise<void> => {
  // Initialize Payload with config
  await payload.init({
    config: await import('./payload.config').then(mod => mod.default),
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Middleware
  app.use(payload.authenticate)

  // Add custom routes
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
  console.error('Failed to start server:', error)
  process.exit(1)
})
