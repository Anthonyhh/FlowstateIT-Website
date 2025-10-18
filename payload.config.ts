import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'

// Import collections
import { Users } from './collections/Users'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002',
  
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- FlowState IT CMS',
    },
  },

  collections: [
    Users,
  ],

  globals: [
    // Globals will be added in Phase 5
  ],

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  editor: slateEditor({}),

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  cors: [
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3002',
  ].filter(Boolean),

  csrf: [
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3002',
  ].filter(Boolean),

  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },

  // Rate limiting
  rateLimit: {
    max: 500,
    trustProxy: true,
  },
})
