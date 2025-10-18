# FlowState IT - Enterprise AI Solutions Website

A high-performance, conversion-optimized single-page web application for FlowState IT, featuring AI Readiness Audit product with Stripe integration.

## 🚀 Features

### Core Landing Page
- ✅ **Hero Section** with animated AI workflow visualization
- ✅ **Trust Signals** section with AI technology partners
- ✅ **Services Section** (6 service cards)
- ✅ **Process Section** (4-step methodology)
- ✅ **Solutions Section** (3 real-world applications)
- ✅ **Testimonials Section** (customer reviews)
- ✅ **Pricing Section** (AI Partner & Fractional CAIO tiers)
- ✅ **AI Readiness Audit Quiz** (8-question interactive form)
- ✅ **FAQ Section** (accordion with 6 FAQs)
- ✅ **Contact Form Section**
- ✅ **Responsive Footer**

### Technical Features
- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** + **shadcn/ui** components
- ✨ **Framer Motion** animations
- 🗄️ **MongoDB** database integration
- 💳 **Stripe** payment integration (ready for API keys)
- 🔄 **n8n** automation webhook (ready for configuration)
- 📱 **Fully Responsive** design
- ♿ **Accessible** with ARIA labels and semantic HTML
- 🎯 **Performance Optimized** for Lighthouse 100 scores

## 📋 Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend Framework | Next.js 14 (React 18) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Database | MongoDB |
| Payment Processing | Stripe Checkout |
| Automation | n8n Webhooks |
| Hosting | Vercel (recommended) |

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Configure Environment Variables

Edit `/app/.env` and add your API keys:

```env
# Database (already configured)
MONGO_URL=mongodb://localhost:27017
DB_NAME=flowstate_it

# Your domain
NEXT_PUBLIC_BASE_URL=https://flowstateit.co.uk

# Stripe API Keys (REQUIRED for payment processing)
STRIPE_SECRET_KEY=sk_test_... # Get from https://dashboard.stripe.com/apikeys
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Get from https://dashboard.stripe.com/webhooks

# n8n Webhook URL (REQUIRED for audit fulfillment)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/audit-fulfillment
```

### 3. Start Development Server

```bash
yarn dev
```

Visit: `http://localhost:3000`

### 4. Build for Production

```bash
yarn build
yarn start
```

## 🔌 Integration Setup

### Stripe Integration

1. **Create Stripe Account**: https://dashboard.stripe.com/register
2. **Get API Keys**: Dashboard → Developers → API Keys
3. **Create Product**:
   - Dashboard → Products → Add Product
   - Name: "AI Readiness Audit"
   - Price: £97
   - Save Product ID and Price ID
4. **Setup Webhook**:
   - Dashboard → Developers → Webhooks → Add Endpoint
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: Select `checkout.session.completed`
   - Copy webhook signing secret

### n8n Automation Setup

1. **Create n8n Workflow**:
   - Add Webhook node (trigger)
   - Add nodes for: Email sending, PDF generation, follow-up sequences
2. **Configure Webhook URL**:
   - Copy webhook URL from n8n
   - Add to `.env` as `N8N_WEBHOOK_URL`
3. **Test Integration**:
   - Submit test audit form
   - Verify webhook receives data

## 📊 Database Collections

The following MongoDB collections are used:

### Core Collections
- **services** - Service card data
- **testimonials** - Customer testimonials
- **faqs** - Frequently asked questions
- **products** - Audit product details

### Transactional Collections
- **audit_submissions** - Quiz responses before payment
- **orders** - Payment transaction records
- **contact_submissions** - Contact form messages

### Collection Schemas

#### audit_submissions
```javascript
{
  id: "uuid",
  email: "string",
  companyName: "string",
  quizAnswers: {}, // Object with all quiz responses
  status: "pending" | "paid" | "completed" | "failed",
  submittedAt: "ISO date"
}
```

#### orders
```javascript
{
  id: "uuid",
  auditSubmissionId: "uuid",
  productId: "string",
  amount: 97,
  currency: "GBP",
  status: "pending" | "paid" | "failed" | "refunded",
  customerEmail: "string",
  stripeSessionId: "string",
  paidAt: "ISO date",
  createdAt: "ISO date"
}
```

## 🎨 Design System

### Colors
- **Primary Brand**: `#6C2BD9` (Purple)
- **CTA Accent**: `#FF7A1A` (Orange)
- **Background**: `#14141C` (Near-Black)
- **Text Primary**: `#F5F5F5` (Off-White)
- **Text Secondary**: `#A3A3A3` (Medium Gray)

### Typography
- **Font**: Inter (variable font)
- **H1**: 5xl - 7xl, bold
- **H2**: 4xl - 5xl, bold
- **H3**: 2xl - 3xl, semibold
- **Body**: base - lg, regular

## 🚦 Current Status

### ✅ Completed Features
- [x] Complete landing page with all sections
- [x] Hero section with animated AI workflow visualization
- [x] Interactive AI Readiness Audit quiz (8 questions)
- [x] Contact form with MongoDB storage
- [x] Responsive design for all screen sizes
- [x] Framer Motion animations
- [x] Dark mode theme with purple/orange accents
- [x] Backend API routes for data handling
- [x] Mocked Stripe checkout flow
- [x] Mocked n8n webhook trigger

### 🔄 Ready for Integration
- [ ] Add real Stripe API keys
- [ ] Add real n8n webhook URL
- [ ] Test complete payment flow
- [ ] Setup Payload CMS (optional for content management)

### 📝 Future Enhancements
- [ ] Payload CMS for content management
- [ ] Blog section
- [ ] Case studies page
- [ ] Admin dashboard for viewing submissions
- [ ] Email notification system
- [ ] Advanced analytics tracking

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Max Content Width**: 1400px

## 🧪 Testing

### Manual Testing Checklist
- [ ] Hero section animations work smoothly
- [ ] All navigation links scroll to correct sections
- [ ] Service cards display properly
- [ ] Quiz form validates correctly
- [ ] Contact form submits successfully
- [ ] Mobile menu works (if added)
- [ ] All images load correctly
- [ ] Page loads under 2 seconds

### API Endpoints to Test

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'

# Test audit submission (mocked)
curl -X POST http://localhost:3000/api/stripe/create-session \\
  -H "Content-Type: application/json" \\
  -d '{"quizAnswers":{},"email":"test@example.com","companyName":"Test Co"}'
```

## 🎯 Performance Optimization

### Implemented Optimizations
- Next.js Image component for optimized images
- Framer Motion with reduced motion support
- Code splitting with dynamic imports
- Static site generation (SSG) where possible
- Tailwind CSS purging for minimal CSS bundle
- MongoDB connection pooling

### Target Lighthouse Scores
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 📄 Project Structure

```
/app
├── app/
│   ├── api/
│   │   └── [[...path]]/
│   │       └── route.js          # API routes (contact, stripe, webhooks)
│   ├── page.js                   # Main landing page
│   ├── layout.js                 # Root layout with fonts
│   └── globals.css               # Global styles
├── components/
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── utils/                    # Utility functions
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
└── README.md                     # This file
```

## 🔒 Security Considerations

- ✅ All sensitive operations handled server-side
- ✅ Environment variables for API keys
- ✅ CORS headers configured
- ✅ Input validation on forms
- ⚠️ **TODO**: Add Stripe webhook signature verification
- ⚠️ **TODO**: Implement rate limiting on API routes
- ⚠️ **TODO**: Add CSRF protection

## 🚀 Deployment

### Recommended: Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Alternative: Any Node.js hosting

```bash
yarn build
yarn start
```

Make sure MongoDB is accessible and environment variables are set.

## 📞 Support

For questions or issues:
- Email: hello@flowstateit.co.uk
- Documentation: Check this README

## 📝 License

Proprietary - FlowState IT © 2025

---

**Built with ❤️ using Next.js, Tailwind CSS, and cutting-edge AI technologies**
