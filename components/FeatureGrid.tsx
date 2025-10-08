'use client'

import { motion } from 'framer-motion'
import { Zap, Sparkles, Rocket, Shield, Code2, Layers } from 'lucide-react'
import { staggerContainer, scaleUp, viewportOptions } from '@/lib/animations'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on Next.js 15 with edge runtime. Achieve 100/100 Lighthouse scores with server components and streaming.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description:
      'Keyword-adaptive content, smart SEO optimization, and automated deployment workflows powered by Claude.',
  },
  {
    icon: Rocket,
    title: '15-Minute Setup',
    description:
      'Clone, configure, and deploy. From git clone to production in under 15 minutes with automated scripts.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'XSS protection, rate limiting, CSP headers, and sanitization built-in. Production-ready from day one.',
  },
  {
    icon: Code2,
    title: 'Headless CMS',
    description:
      'Payload CMS 3.0 with MongoDB. Type-safe collections, rich text editor, and media management included.',
  },
  {
    icon: Layers,
    title: 'Full Stack',
    description:
      'Monitoring, caching, compression, logging. All infrastructure pre-configured for scalable production.',
  },
]

export default function FeatureGrid() {
  return (
    <section className="section-padding bg-background-dark/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainer}
        className="container-custom"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={scaleUp}
            className="text-fluid-4xl md:text-fluid-5xl heading-primary text-gradient-violet mb-4"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            variants={scaleUp}
            className="text-fluid-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Production-ready infrastructure meets cinematic design. Build stunning websites without
            the complexity.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  index: number
}

function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      variants={scaleUp}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 },
      }}
      className="group relative p-8 rounded-2xl bg-card border border-white/10 hover:border-primary/50 transition-all cursor-pointer hover-lift"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Gradient Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />

      {/* Icon */}
      <div className="relative mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        <Icon className="w-8 h-8" />
      </div>

      {/* Content */}
      <h3 className="relative text-2xl font-heading font-semibold mb-3 group-hover:text-gradient-violet transition-all">
        {title}
      </h3>
      <p className="relative text-foreground/70 leading-relaxed">{description}</p>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
    </motion.div>
  )
}
