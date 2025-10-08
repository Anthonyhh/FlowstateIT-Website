import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'flowstate_it'

let cachedClient = null
let cachedDb = null

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGO_URL)
  const db = client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

// Helper function to handle CORS
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

// GET handler
export async function GET(request) {
  try {
    const { pathname } = new URL(request.url)
    const path = pathname.replace('/api/', '')

    const { db } = await connectToDatabase()

    // Get all services
    if (path === 'services') {
      const services = await db.collection('services').find({ isActive: true }).sort({ order: 1 }).toArray()
      return NextResponse.json({ success: true, data: services }, { headers: corsHeaders() })
    }

    // Get all testimonials
    if (path === 'testimonials') {
      const testimonials = await db.collection('testimonials').find({ isActive: true }).sort({ order: 1 }).toArray()
      return NextResponse.json({ success: true, data: testimonials }, { headers: corsHeaders() })
    }

    // Get all FAQs
    if (path === 'faqs') {
      const faqs = await db.collection('faqs').find({ isActive: true }).sort({ order: 1 }).toArray()
      return NextResponse.json({ success: true, data: faqs }, { headers: corsHeaders() })
    }

    // Get audit product
    if (path === 'products/audit') {
      const product = await db.collection('products').findOne({ isActive: true, name: 'AI Readiness Audit' })
      return NextResponse.json({ success: true, data: product }, { headers: corsHeaders() })
    }

    return NextResponse.json(
      { success: false, error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders() }
    )
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders() }
    )
  }
}

// POST handler
export async function POST(request) {
  try {
    const { pathname } = new URL(request.url)
    const path = pathname.replace('/api/', '')
    const body = await request.json()

    const { db } = await connectToDatabase()

    // Contact form submission
    if (path === 'contact') {
      const submission = {
        id: uuidv4(),
        name: body.name,
        email: body.email,
        company: body.company || '',
        message: body.message,
        status: 'new',
        source: 'Contact Form',
        submittedAt: new Date().toISOString(),
      }

      await db.collection('contact_submissions').insertOne(submission)

      return NextResponse.json(
        { success: true, message: 'Contact submission received' },
        { headers: corsHeaders() }
      )
    }

    // AI Audit quiz submission + Stripe checkout (MOCKED)
    if (path === 'stripe/create-session') {
      const { quizAnswers, email, companyName } = body

      // Create audit submission
      const auditSubmission = {
        id: uuidv4(),
        email,
        companyName: companyName || '',
        quizAnswers,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      }

      await db.collection('audit_submissions').insertOne(auditSubmission)

      // Create order (mocked)
      const order = {
        id: uuidv4(),
        auditSubmissionId: auditSubmission.id,
        productId: 'ai-readiness-audit',
        amount: 97,
        currency: 'GBP',
        status: 'pending',
        customerEmail: email,
        createdAt: new Date().toISOString(),
      }

      await db.collection('orders').insertOne(order)

      // MOCK: Return fake Stripe session URL
      return NextResponse.json(
        {
          success: true,
          message: 'Stripe integration is mocked. In production, this would redirect to Stripe Checkout.',
          sessionUrl: '/audit/success?session_id=mock_session_123',
          sessionId: 'mock_session_123',
          orderId: order.id,
        },
        { headers: corsHeaders() }
      )
    }

    // Stripe webhook handler (MOCKED)
    if (path === 'webhooks/stripe') {
      // In production, verify Stripe signature here
      const { type, data } = body

      if (type === 'checkout.session.completed') {
        const sessionId = data.object.id
        const metadata = data.object.metadata || {}

        // Update order status
        await db.collection('orders').updateOne(
          { id: metadata.orderId },
          {
            $set: {
              status: 'paid',
              paidAt: new Date().toISOString(),
              stripeSessionId: sessionId,
            },
          }
        )

        // Update audit submission status
        await db.collection('audit_submissions').updateOne(
          { id: metadata.auditSubmissionId },
          { $set: { status: 'paid' } }
        )

        // MOCK: Trigger n8n webhook (in production, make actual HTTP request)
        console.log('MOCK: Would trigger n8n webhook with audit data')

        return NextResponse.json(
          { success: true, received: true },
          { headers: corsHeaders() }
        )
      }

      return NextResponse.json(
        { success: true, message: 'Webhook received' },
        { headers: corsHeaders() }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders() }
    )
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders() }
    )
  }
}

// PUT handler
export async function PUT(request) {
  try {
    return NextResponse.json(
      { success: false, error: 'PUT not implemented yet' },
      { status: 501, headers: corsHeaders() }
    )
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders() }
    )
  }
}

// DELETE handler
export async function DELETE(request) {
  try {
    return NextResponse.json(
      { success: false, error: 'DELETE not implemented yet' },
      { status: 501, headers: corsHeaders() }
    )
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders() }
    )
  }
}