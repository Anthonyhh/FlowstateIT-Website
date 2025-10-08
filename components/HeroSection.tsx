'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, gradientWave, viewportOptions } from '@/lib/animations'

interface HeroSectionProps {
  id?: string
}

export default function HeroSection({ id = 'hero' }: HeroSectionProps) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Background */}
      <motion.div
        variants={gradientWave}
        animate="animate"
        className="absolute inset-0 bg-gradient-primary opacity-20"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial-violet" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        viewport={viewportOptions}
        className="container-custom relative z-10 text-center px-4 py-20"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4 text-cyan-accent" />
            <span className="text-sm font-medium text-foreground/90">
              AI Website Factory
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-fluid-6xl md:text-fluid-7xl heading-display text-gradient mb-6"
        >
          Build Websites
          <br />
          at the Speed of{' '}
          <span className="text-gradient-full">Thought</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeInUp}
          className="text-fluid-lg md:text-fluid-xl text-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          A self-deploying, keyword-adaptive platform that merges enterprise-grade headless
          architecture with cinematic design. Any brand can clone, configure, and go live in{' '}
          <span className="text-primary font-semibold">15 minutes</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="group bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 glow-gradient"
            asChild
          >
            <a href="#contact">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-lg px-8 py-6"
            asChild
          >
            <a href="#features">
              Explore Features
              <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-violet mb-2">
              15min
            </div>
            <div className="text-sm text-foreground/60">Setup Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-violet mb-2">
              100/100
            </div>
            <div className="text-sm text-foreground/60">Lighthouse Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-violet mb-2">
              ∞
            </div>
            <div className="text-sm text-foreground/60">Customizable</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
