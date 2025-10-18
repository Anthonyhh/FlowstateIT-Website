'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function AIAutomationCostReduction() {
  return (
    <div className="min-h-screen bg-[#14141C] text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 border-b border-white/10">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <Link href="/blog">
            <Button variant="ghost" className="text-[#6C2BD9] hover:text-[#FF7A1A] mb-8 p-0">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4 bg-[#6C2BD9]/10 text-[#6C2BD9] border-[#6C2BD9]/30">
              Case Study
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              How AI Automation Cut Operational Costs by 60%: A Real-World Case Study
            </h1>
            <div className="flex items-center gap-6 text-white/70 mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 15, 2024
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                8 min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="prose prose-lg prose-invert max-w-none">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
              alt="AI Automation Dashboard"
              className="w-full h-[400px] object-cover rounded-xl mb-12"
            />

            <h2 className="text-3xl font-bold mb-6 text-white">The Challenge: Rising Operational Costs</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              In today's competitive business landscape, operational efficiency is no longer optional—it's a necessity for survival. When a mid-sized logistics company approached us in early 2023, they were facing a critical challenge: their operational costs had increased by 35% over the previous two years, while revenue growth remained stagnant at just 8%.
            </p>
            
            <p className="text-white/90 leading-relaxed mb-6">
              The company employed 250+ staff members, with a significant portion dedicated to repetitive tasks: data entry, invoice processing, customer inquiry responses, and shipment tracking updates. These manual processes weren't just costly—they were also error-prone, leading to customer dissatisfaction and additional costs from corrections and refunds.
            </p>

            <Card className="bg-[#6C2BD9]/10 border-[#6C2BD9]/30 my-8">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Initial State Analysis</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>15-20 hours weekly spent on manual data entry across departments</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Average response time to customer inquiries: 4-6 hours</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Manual error rate: 12% requiring costly corrections</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Customer satisfaction score: 72/100</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">The Solution: Strategic AI Automation</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              After conducting a comprehensive AI Readiness Audit, we identified three key areas where AI automation could deliver immediate impact: customer service, document processing, and operational workflow optimization.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Phase 1: Customer Service Automation (Months 1-2)</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              We implemented an AI-powered chatbot using GPT-4 for natural language understanding, integrated with their existing CRM system. The chatbot was trained on their specific business processes, common customer queries, and company policies.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              The implementation included voice AI capabilities using Vapi and ElevenLabs for phone support, allowing customers to get instant answers to tracking queries, delivery updates, and basic account information 24/7.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              <strong className="text-white">Results after 8 weeks:</strong> The AI system handled 73% of customer inquiries without human intervention, reducing average response time from 4-6 hours to under 2 minutes. Customer satisfaction scores improved from 72 to 89 out of 100.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Phase 2: Document Processing Automation (Months 2-3)</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              The second phase focused on automating invoice processing, purchase orders, and shipment documentation. We deployed custom-trained AI models to extract data from documents, validate information against their database, and automatically populate their ERP system.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              Using advanced OCR combined with GPT-4 Vision, the system could process various document formats, including scanned PDFs, photos, and digital documents. The AI was trained to handle exceptions and flag unusual patterns for human review.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              <strong className="text-white">Results after 6 weeks:</strong> Document processing time reduced from 15-20 hours per week to under 2 hours (mostly for exception handling). Error rate dropped from 12% to 0.8%. The company saved approximately £45,000 annually in processing costs alone.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Phase 3: Workflow Optimization with n8n (Months 3-4)</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              The final phase connected all systems using n8n workflow automation. We created intelligent workflows that automatically triggered actions based on specific conditions, eliminating manual handoffs between departments.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              For example, when a shipment was delayed, the system would automatically notify customers via their preferred channel (email, SMS, or app notification), update the tracking system, and if necessary, initiate a refund process without any human intervention.
            </p>

            <Card className="bg-[#FF7A1A]/10 border-[#FF7A1A]/30 my-8">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Final Results After 6 Months</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-[#FF7A1A] mb-2">60%</p>
                    <p className="text-white/90">Reduction in operational costs</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#FF7A1A] mb-2">89/100</p>
                    <p className="text-white/90">Customer satisfaction score</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#FF7A1A] mb-2">73%</p>
                    <p className="text-white/90">Queries handled by AI</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#FF7A1A] mb-2">£180K</p>
                    <p className="text-white/90">Annual cost savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Key Lessons Learned</h2>
            
            <h3 className="text-2xl font-bold mb-4 text-white mt-8">1. Start with High-Impact, Low-Complexity Tasks</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              The customer service chatbot delivered immediate value and built confidence in AI technology among the team. Starting with complex processes would have created resistance and potentially derailed the entire initiative.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">2. Invest in Proper Training Data</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              We spent three weeks gathering and organizing historical customer interactions, documents, and workflow data. This upfront investment was crucial for achieving high accuracy rates and minimizing errors.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">3. Human Oversight Remains Essential</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              While AI handled the majority of routine tasks, having human experts available for complex cases and continuous improvement was critical. The company maintained a small team focused on AI oversight and optimization.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">4. Change Management is as Important as Technology</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              We conducted regular training sessions and created clear documentation for staff. Emphasizing that AI was augmenting their capabilities rather than replacing them helped gain buy-in from the entire organization.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">ROI Breakdown</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              The total investment for the complete AI automation implementation was £85,000, including consultation, development, integration, and training. With annual savings of £180,000, the company achieved full ROI in just 5.7 months.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              Beyond direct cost savings, the company experienced several additional benefits:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>24/7 customer support without additional staffing costs</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Improved employee satisfaction as staff focused on higher-value tasks</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Competitive advantage through faster service and lower prices</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Scalability without proportional cost increases</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Your Path to AI Automation Success</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Every business has unique challenges and opportunities for AI automation. The key is identifying the right starting point and implementing solutions strategically rather than trying to automate everything at once.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              Our AI Readiness Audit helps businesses identify their highest-impact automation opportunities, estimate potential ROI, and create a phased implementation roadmap. We analyze your current processes, identify bottlenecks, and recommend specific AI solutions tailored to your needs.
            </p>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-[#6C2BD9]/20 to-[#FF7A1A]/20 border-[#6C2BD9]/30 mt-12">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Discover Your AI Automation Potential
              </h3>
              <p className="text-white/90 mb-6 max-w-[600px] mx-auto">
                Get a comprehensive AI Readiness Audit and discover how much you could save with strategic AI automation. Delivered in 24 hours.
              </p>
              <Link href="/#quiz">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A] hover:opacity-90 text-white font-semibold"
                >
                  Get Your AI Readiness Audit - £97
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
