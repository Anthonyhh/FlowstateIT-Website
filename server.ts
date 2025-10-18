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
    onInit: async (payload) => {
      payload.logger.info(`Payload initialized successfully`)
      payload.logger.info(`Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Start Express server
  app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`)
    console.log(`📍 Admin panel: http://localhost:${PORT}/admin`)
    console.log(`🔗 API: http://localhost:${PORT}/api`)
  })
}

start().catch((error) => {
  console.error('❌ Failed to start server:', error)
  process.exit(1)
})
