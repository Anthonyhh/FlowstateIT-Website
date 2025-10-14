'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function PromptEngineeringGuide() {
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
              Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Complete Prompt Engineering Guide for Business 2024
            </h1>
            <div className="flex items-center gap-6 text-white/70 mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 10, 2024
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                12 min read
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
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995" 
              alt="AI Prompt Engineering"
              className="w-full h-[400px] object-cover rounded-xl mb-12"
            />

            <h2 className="text-3xl font-bold mb-6 text-white">Why Prompt Engineering Matters for Your Business</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              In 2024, prompt engineering has emerged as one of the most valuable skills for businesses leveraging AI. The difference between a poorly crafted prompt and a well-engineered one can mean the difference between spending thousands on API calls while getting mediocre results, or achieving exceptional output at a fraction of the cost.
            </p>
            
            <p className="text-white/90 leading-relaxed mb-6">
              Our clients have reported cost reductions of 40-70% simply by implementing better prompt engineering practices. Beyond cost savings, well-crafted prompts deliver more accurate, consistent, and useful outputs that directly translate to business value.
            </p>

            <Card className="bg-[#6C2BD9]/10 border-[#6C2BD9]/30 my-8">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Learn in This Guide</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Core principles of effective prompt engineering</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Advanced techniques for business applications</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Cost optimization strategies</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                    <span>Real-world examples and templates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">The Foundation: Understanding AI Model Behavior</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Before diving into specific techniques, it's crucial to understand how large language models (LLMs) process and respond to prompts. Modern AI models like GPT-4, Claude, and Gemini are trained on vast amounts of text data and learn to predict what comes next based on patterns.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              The key insight: these models are highly sensitive to how you structure your requests. A well-structured prompt can guide the model toward producing exactly what you need, while a poorly structured one might lead to generic, off-target, or unnecessarily verbose responses.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">The Temperature Parameter</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              One critical setting often overlooked is the temperature parameter. Temperature controls randomness in the model's output:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">Low temperature (0.0-0.3):</strong> Best for factual, consistent outputs like data extraction or classification</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">Medium temperature (0.4-0.7):</strong> Balanced creativity and consistency for most business use cases</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">High temperature (0.8-1.0):</strong> Maximum creativity for brainstorming or creative content</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Core Principles of Effective Prompts</h2>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">1. Be Specific and Detailed</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Vague prompts produce vague results. Instead of asking "Write about AI," specify exactly what you need:
            </p>

            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/70 text-sm mb-2">❌ Poor prompt:</p>
                <p className="text-white/90 mb-4">"Write about AI for my business website."</p>
                
                <p className="text-white/70 text-sm mb-2">✅ Better prompt:</p>
                <p className="text-white/90">"Write a 300-word introduction for a B2B SaaS company's AI automation services page. Target audience: Operations Directors at mid-sized manufacturing companies. Focus on cost reduction and efficiency gains. Tone: Professional but accessible. Include a compelling statistic about AI ROI."</p>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">2. Provide Context and Background</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              The more relevant context you provide, the better the model can tailor its response. Include information about your business, audience, goals, and constraints.
            </p>

            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/90">"You are a customer service expert for a UK-based logistics company. Our average customer is a small business owner shipping 10-50 packages monthly. When responding to inquiries, always: 1) Acknowledge the concern, 2) Provide a clear solution, 3) Include relevant policy references, 4) End with next steps. Maintain a friendly, professional tone."</p>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">3. Use Clear Formatting and Structure</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Break down complex prompts into clearly labeled sections. Use delimiters like triple quotes, XML tags, or markdown headers to separate different parts of your prompt.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">4. Specify Output Format</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Always tell the model exactly how you want the output structured. This is especially important for automation workflows where you need consistent formatting.
            </p>

            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/90">"Analyze the following customer feedback and return your response in JSON format with these fields: sentiment (positive/negative/neutral), key_themes (array), priority_level (1-5), suggested_action (string)."</p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Advanced Techniques</h2>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Chain-of-Thought Prompting</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              For complex reasoning tasks, explicitly ask the model to show its thinking process. This dramatically improves accuracy for tasks involving calculations, logic, or multi-step analysis.
            </p>

            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/90">"Before providing your final recommendation, walk through your reasoning step-by-step: 1) What are the key factors to consider? 2) What are the pros and cons of each option? 3) What criteria matter most in this scenario? 4) Based on this analysis, what do you recommend?"</p>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Few-Shot Learning</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Provide 2-3 examples of the exact output you want. This is incredibly powerful for tasks where consistency matters.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">System Messages for Consistent Behavior</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Most AI APIs support "system" messages that set persistent context for all interactions. Use these to define role, constraints, and output preferences that apply across multiple requests.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Cost Optimization Strategies</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              AI API costs can add up quickly, especially at scale. Here are proven techniques to reduce costs by 40-70%:
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">1. Right-Size Your Model</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Don't always use the largest, most expensive model. GPT-4 is powerful but costs 10-30x more than GPT-3.5-turbo. Many tasks—like classification, simple extraction, or formatting—work perfectly well with smaller models.
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-white/90">
                <Lightbulb className="w-5 h-5 text-[#FF7A1A] mt-1 flex-shrink-0" />
                <span>Use GPT-4 for: Complex reasoning, nuanced content creation, ambiguous classification</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Lightbulb className="w-5 h-5 text-[#FF7A1A] mt-1 flex-shrink-0" />
                <span>Use GPT-3.5-turbo for: Simple classification, data extraction, formatting, basic Q&A</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">2. Reduce Token Usage</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Tokens (roughly 4 characters) are the unit of pricing for most AI APIs. Every character in your prompt and the model's response counts.
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Remove unnecessary words and examples from prompts</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Set max_tokens limits to prevent unnecessarily long responses</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Use abbreviations where context is clear</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Compress long documents before feeding them to models</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">3. Implement Caching</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              For repeated queries or common questions, cache responses instead of making new API calls each time. This alone can reduce costs by 60-80% for high-traffic applications.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">4. Batch Processing</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              When processing multiple items, batch them into a single API call rather than making individual requests. This reduces overhead and can cut costs by 30-40%.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Business Use Case Examples</h2>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Customer Service Automation</h3>
            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/70 text-sm mb-2">Prompt Template:</p>
                <p className="text-white/90">"You are a customer service agent for [COMPANY]. Analyze this customer message and provide: 1) Sentiment (positive/negative/neutral/urgent), 2) Category (billing/technical/general), 3) Priority (1-5), 4) Suggested response (professional, empathetic, solution-focused), 5) Required actions (array). Customer message: {{MESSAGE}}"</p>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Content Generation for Marketing</h3>
            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/70 text-sm mb-2">Prompt Template:</p>
                <p className="text-white/90">"Create a LinkedIn post for [COMPANY] about [TOPIC]. Target audience: [AUDIENCE]. Goals: [GOALS]. Brand voice: [VOICE]. Length: 150-200 words. Include: 1 compelling hook, 2-3 key points, 1 call-to-action. Format with line breaks for readability. Do not use emojis."</p>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4 text-white mt-8">Data Extraction from Documents</h3>
            <Card className="bg-neutral-900/50 border-neutral-700/50 my-6">
              <CardContent className="pt-6">
                <p className="text-white/70 text-sm mb-2">Prompt Template:</p>
                <p className="text-white/90">"Extract the following information from the invoice below and return as JSON: {invoice_number, date, vendor_name, total_amount, line_items: [{description, quantity, unit_price, total}]}. If any field is not found, use null. Be precise with numbers. Invoice text: {{INVOICE_TEXT}}"</p>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Common Pitfalls to Avoid</h2>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-[#FF7A1A] font-bold mt-1 flex-shrink-0">1.</span>
                <div>
                  <strong className="text-white block mb-2">Prompt Injection Vulnerabilities</strong>
                  <span>If your prompts include user input, malicious users can manipulate the AI's behavior. Always sanitize inputs and use clear delimiters.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-[#FF7A1A] font-bold mt-1 flex-shrink-0">2.</span>
                <div>
                  <strong className="text-white block mb-2">Over-Engineering</strong>
                  <span>Start simple. Many developers create overly complex prompts that confuse the model and increase costs unnecessarily.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-[#FF7A1A] font-bold mt-1 flex-shrink-0">3.</span>
                <div>
                  <strong className="text-white block mb-2">Not Testing Enough</strong>
                  <span>Test your prompts with edge cases, unusual inputs, and varying data quality. What works 90% of the time might fail catastrophically on edge cases.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-[#FF7A1A] font-bold mt-1 flex-shrink-0">4.</span>
                <div>
                  <strong className="text-white block mb-2">Ignoring Version Changes</strong>
                  <span>AI models get updated regularly. A prompt that worked perfectly might behave differently with a new model version. Implement version control and testing.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Building Your Prompt Library</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Create a centralized repository of tested, optimized prompts for common tasks in your organization. Include:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>The prompt template with placeholders for variables</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Recommended model and parameters (temperature, max_tokens)</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Expected output format and examples</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Performance metrics (accuracy, cost per call, average tokens)</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span>Version history and changelog</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Measuring Success</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Track these metrics to continuously improve your prompt engineering:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">Accuracy:</strong> Percentage of outputs that meet quality standards without human correction</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">Cost per task:</strong> Total API costs divided by number of successful completions</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">Time saved:</strong> Hours of human work replaced by automation</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-1 flex-shrink-0" />
                <span><strong className="text-white">User satisfaction:</strong> For customer-facing applications, track satisfaction scores</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Next Steps</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Prompt engineering is both an art and a science. The techniques in this guide provide a strong foundation, but mastery comes through experimentation and iteration.
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              Start with one high-value use case in your business. Apply these principles, measure results, and iterate. As you build expertise and a library of proven prompts, you'll be able to tackle increasingly sophisticated automation challenges.
            </p>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-[#6C2BD9]/20 to-[#FF7A1A]/20 border-[#6C2BD9]/30 mt-12">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get Expert Help with Your AI Implementation
              </h3>
              <p className="text-white/90 mb-6 max-w-[600px] mx-auto">
                Our AI Readiness Audit includes custom prompt templates and optimization strategies tailored to your specific business needs.
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
