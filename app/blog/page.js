'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const blogArticles = [
  {
    slug: 'ai-automation-cost-reduction',
    title: 'How AI Automation Cut Operational Costs by 60%',
    excerpt: 'Discover the real-world case study of how businesses reduced operational costs by 60% through strategic AI automation implementation.',
    category: 'Case Study',
    readTime: '8 min read',
    date: 'January 15, 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  },
  {
    slug: 'prompt-engineering-guide',
    title: 'Complete Prompt Engineering Guide for Business 2024',
    excerpt: 'Master prompt engineering techniques to maximize AI performance and reduce costs. Comprehensive guide with business applications.',
    category: 'Guide',
    readTime: '12 min read',
    date: 'January 10, 2024',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    slug: 'fractional-caio-benefits',
    title: 'Why Your Business Needs a Fractional CAIO in 2024',
    excerpt: 'Explore the strategic advantages of hiring a Fractional Chief AI Officer and when it makes sense for your business.',
    category: 'Strategy',
    readTime: '10 min read',
    date: 'January 5, 2024',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984'
  },
  {
    slug: 'voice-ai-implementation',
    title: 'Voice AI Implementation Guide: Vapi & ElevenLabs',
    excerpt: 'Step-by-step guide to implementing voice AI solutions using Vapi and ElevenLabs with real use cases and technical details.',
    category: 'Technical',
    readTime: '13 min read',
    date: 'December 28, 2023',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008'
  },
  {
    slug: 'n8n-workflow-automation',
    title: 'Building AI Workflows with n8n: Best Practices',
    excerpt: 'Learn how to build powerful AI-powered workflows with n8n, including best practices, common pitfalls, and real examples.',
    category: 'Technical',
    readTime: '14 min read',
    date: 'December 20, 2023',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#14141C] text-white">
      {/* Header */}
      <section className="relative py-16 md:py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-[#6C2BD9]/10 text-[#6C2BD9] border-[#6C2BD9]/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Blog & Resources
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              AI Insights & Best Practices
            </h1>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Expert insights, case studies, and practical guides to help you navigate AI transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <Card className="bg-neutral-800/30 border-neutral-700/50 hover:border-[#6C2BD9]/50 transition-all h-full group cursor-pointer">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#6C2BD9] text-white border-0">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl mb-2 text-white group-hover:text-[#6C2BD9] transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-white text-sm leading-relaxed">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="mt-4 text-[#6C2BD9] hover:text-[#FF7A1A] p-0 h-auto"
                      >
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-neutral-900/30">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-white mb-8">
            Get your AI Readiness Audit and discover how AI can transform your operations
          </p>
          <Link href="/#quiz">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A] hover:opacity-90 text-white font-semibold text-lg px-8 py-6"
            >
              Get Your AI Readiness Audit - £97
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
