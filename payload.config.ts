import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

// Import all collections
import { Users } from './collections/Users'
import { AuditSubmissions } from './collections/AuditSubmissions'
import { BlogAuthors } from './collections/BlogAuthors'
import { BlogPosts } from './collections/BlogPosts'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { FAQs } from './collections/FAQs'
import { Media } from './collections/Media'
import { Navigation } from './collections/Navigation'
import { Orders } from './collections/Orders'
import { PricingTiers } from './collections/PricingTiers'
import { ProcessSteps } from './collections/ProcessSteps'
import { Products } from './collections/Products'
import { Services } from './collections/Services'
import { Solutions } from './collections/Solutions'
import { Testimonials } from './collections/Testimonials'

// Import globals
import { HeroSection } from './globals/HeroSection'
import { SiteSettings } from './globals/SiteSettings'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-min-32-characters',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- FlowState IT CMS',
    },
  },

  collections: [
    Users,
    AuditSubmissions,
    BlogAuthors,
    BlogPosts,
    ContactSubmissions,
    FAQs,
    Media,
    Navigation,
    Orders,
    PricingTiers,
    ProcessSteps,
    Products,
    Services,
    Solutions,
    Testimonials,
  ],

  globals: [
    HeroSection,
    SiteSettings,
  ],

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  editor: lexicalEditor({}),

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  // Cloudflare R2 storage configuration (S3-compatible)
  plugins: process.env.S3_ENABLED === 'true' ? [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        region: process.env.S3_REGION || 'auto',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ] : [],

  cors: [
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    'http://localhost:3000',
  ].filter(Boolean),

  csrf: [
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    'http://localhost:3000',
  ].filter(Boolean),

  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
