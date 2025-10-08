'use client'

import { motion, useMotionValue } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, VitaeHealth',
    company: 'VitaeHealth',
    quote:
      'FlowstateIT transformed our vision into a production-ready website in just 2 days. The attention to detail and performance is unmatched.',
    rating: 5,
    metric: '10x faster deployment',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO, ForeverFly',
    company: 'ForeverFly',
    quote:
      'The infrastructure is incredible. Security, monitoring, caching - everything we needed was already built-in. Our team saved months of development time.',
    rating: 5,
    metric: '100/100 Lighthouse',
  },
  {
    name: 'Emily Watson',
    role: 'Founder, Robolabs',
    company: 'Robolabs',
    quote:
      'Beautiful design system, flawless animations, and enterprise-grade code. This is the blueprint we wish we had when we started.',
    rating: 5,
    metric: '15min to production',
  },
  {
    name: 'David Kim',
    role: 'Product Lead, TechVentures',
    company: 'TechVentures',
    quote:
      'The AI-powered workflows and Payload CMS integration made content management effortless. Our marketing team is thrilled.',
    rating: 5,
    metric: '95% dev time saved',
  },
]

export default function CaseStudyCarousel() {
  const dragX = useMotionValue(0)

  return (
    <section className="section-padding overflow-hidden">
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
            variants={fadeInUp}
            className="text-fluid-4xl md:text-fluid-5xl heading-primary text-gradient-violet mb-4"
          >
            Trusted by Innovators
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-fluid-lg text-foreground/70 max-w-2xl mx-auto"
          >
            See how forward-thinking teams are shipping faster with FlowstateIT
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          variants={fadeInUp}
          className="relative -mx-4 px-4"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            style={{ x: dragX }}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </motion.div>
        </motion.div>

        {/* Drag Hint */}
        <motion.p
          variants={fadeInUp}
          className="text-center mt-8 text-sm text-foreground/50"
        >
          ← Drag to explore →
        </motion.p>
      </motion.div>
    </section>
  )
}

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  metric: string
}

function TestimonialCard({ name, role, company, quote, rating, metric }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative flex-shrink-0 w-[90vw] md:w-[500px] p-8 rounded-2xl bg-card border-2 border-primary/20 hover:border-primary/50 transition-all"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-16 h-16 text-primary" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6 relative z-10">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-foreground">{name}</div>
          <div className="text-sm text-foreground/60">{role}</div>
          <div className="text-sm text-primary/80">{company}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gradient-violet">{metric}</div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
    </motion.div>
  )
}
