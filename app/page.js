'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Sparkles, 
  Zap, 
  Brain, 
  Workflow, 
  Mic, 
  Code, 
  Target, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Check,
  Plus,
  Minus,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useToast } from '@/components/ui/use-toast'

// Animated Counter Component
function CountUp({ end, duration, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    
    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function FlowStateIT() {
  const { toast } = useToast()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate particles on client side only to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      randomX: Math.random() * 100,
      randomY: Math.random() * 100,
      randomEndX: Math.random() * 100,
      randomEndY: Math.random() * 100,
      duration: 10 + Math.random() * 20
    }))
    setParticles(generatedParticles)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // AI Technology Logos for visualization
  const aiTechnologies = [
    { name: 'ChatGPT', icon: Brain, color: 'text-green-400' },
    { name: 'Gemini', icon: Sparkles, color: 'text-blue-400' },
    { name: 'Vapi', icon: Mic, color: 'text-purple-400' },
    { name: 'ElevenLabs', icon: Zap, color: 'text-orange-400' },
    { name: 'n8n', icon: Workflow, color: 'text-pink-400' },
    { name: 'Claude', icon: Code, color: 'text-indigo-400' },
  ]

  const services = [
    {
      icon: Brain,
      title: 'Prompt Engineering Consulting',
      description: 'Expert prompt design and optimization for maximum AI performance and cost-efficiency.',
      features: ['Custom prompt templates', 'Performance optimization', 'Cost reduction strategies']
    },
    {
      icon: Workflow,
      title: 'AI Automation Workflows',
      description: 'End-to-end automation solutions that transform manual processes into intelligent systems.',
      features: ['Process automation', 'Integration design', 'Workflow optimization']
    },
    {
      icon: Code,
      title: 'Custom AI Integration',
      description: 'Seamless integration of cutting-edge AI models into your existing infrastructure.',
      features: ['API integration', 'Custom development', 'System architecture']
    },
    {
      icon: Mic,
      title: 'Voice AI Solutions',
      description: 'Advanced voice AI implementations using Vapi, ElevenLabs, and custom models.',
      features: ['Voice assistants', 'Call automation', 'Speech synthesis']
    },
    {
      icon: Target,
      title: 'Enterprise AI Strategy',
      description: 'Strategic roadmaps for AI adoption, transformation, and competitive advantage.',
      features: ['AI readiness assessment', 'Implementation roadmap', 'Change management']
    },
    {
      icon: Rocket,
      title: 'Fractional CAIO Services',
      description: 'Chief AI Officer expertise on-demand, guiding your AI transformation journey.',
      features: ['Strategic leadership', 'Team mentorship', 'Technology selection']
    }
  ]

  const processSteps = [
    {
      number: 1,
      icon: Target,
      title: 'Discovery & Analysis',
      description: 'Deep dive into your operations to identify high-impact automation opportunities.'
    },
    {
      number: 2,
      icon: Brain,
      title: 'Strategy & Design',
      description: 'Custom AI strategy aligned with your business goals and technical requirements.'
    },
    {
      number: 3,
      icon: Code,
      title: 'Implementation',
      description: 'Expert development and integration with rigorous testing and optimization.'
    },
    {
      number: 4,
      icon: Rocket,
      title: 'Launch & Optimize',
      description: 'Seamless deployment with ongoing support and continuous improvement.'
    }
  ]

  const solutions = [
    {
      title: 'Customer Service Automation',
      description: 'AI-powered chatbots and voice assistants that handle customer inquiries 24/7.',
      benefits: ['Reduce support costs by 70%', '24/7 availability', 'Improved customer satisfaction'],
      icon: Mic
    },
    {
      title: 'Document Processing',
      description: 'Intelligent document analysis, extraction, and processing at scale.',
      benefits: ['Process 1000x faster', 'Extract key insights', 'Eliminate manual data entry'],
      icon: Brain
    },
    {
      title: 'Sales & Lead Generation',
      description: 'AI-driven lead qualification, outreach automation, and sales intelligence.',
      benefits: ['Qualify leads automatically', 'Personalized outreach', 'Increase conversion rates'],
      icon: Target
    },
    {
      title: 'Machine Learning & LLM Fine-tuning',
      description: 'Custom model training and fine-tuning for domain-specific AI applications.',
      benefits: ['Domain-specific accuracy', 'Proprietary model development', 'Reduced inference costs'],
      icon: Brain
    }
  ]

  const statistics = [
    { value: 500, label: 'Projects Completed', suffix: '+' },
    { value: 98, label: 'Client Satisfaction', suffix: '%' },
    { value: 40, label: 'Average Cost Reduction', suffix: '%' },
    { value: 24, label: 'Average Delivery Time', suffix: 'hr' }
  ]

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO',
      company: 'TechCorp Solutions',
      content: 'FlowState IT transformed our customer service operations. We reduced response times by 80% and improved satisfaction scores significantly.',
      rating: 5
    },
    {
      name: 'James Chen',
      role: 'CTO',
      company: 'DataFlow Inc',
      content: 'Their prompt engineering expertise helped us cut AI costs by 60% while improving output quality. Absolutely game-changing.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Operations Director',
      company: 'Global Logistics Ltd',
      content: 'The AI automation workflows FlowState built saved us 40 hours per week. Their team is incredibly knowledgeable and responsive.',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'What industries do you serve?',
      answer: 'We work with businesses across all industries including SaaS, e-commerce, healthcare, finance, manufacturing, and professional services. Our AI solutions are customized to your specific industry needs and compliance requirements.'
    },
    {
      question: 'How long does implementation typically take?',
      answer: 'Timeline varies based on project scope. Simple automation workflows can be deployed in 2-4 weeks, while comprehensive AI transformation projects typically take 3-6 months. We provide detailed timelines during the discovery phase.'
    },
    {
      question: 'Do I need technical expertise to work with you?',
      answer: 'Not at all! We handle all technical aspects and explain everything in business terms. Our goal is to make AI accessible and valuable for your business, regardless of your technical background.'
    },
    {
      question: 'What is the AI Readiness Audit?',
      answer: 'Our AI Readiness Audit is a comprehensive assessment of your business operations to identify automation opportunities, potential ROI, and implementation roadmap. You receive a detailed report with actionable recommendations within 24 hours.'
    },
    {
      question: 'What is a Fractional CAIO?',
      answer: 'A Fractional Chief AI Officer provides executive-level AI leadership and strategy on a part-time basis. You get C-suite expertise without the full-time cost, perfect for businesses scaling their AI capabilities.'
    },
    {
      question: 'How do you ensure data security?',
      answer: 'We implement enterprise-grade security measures including data encryption, secure API connections, compliance with GDPR/CCPA, and regular security audits. Your data privacy is our top priority.'
    }
  ]

  const quizQuestions = [
    {
      id: 'company-size',
      question: 'What is your company size?',
      type: 'single',
      options: ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees']
    },
    {
      id: 'current-ai',
      question: 'Are you currently using any AI tools?',
      type: 'single',
      options: ['No AI tools yet', 'Basic AI tools (ChatGPT, etc.)', 'Some custom AI solutions', 'Advanced AI integration']
    },
    {
      id: 'priority',
      question: 'What is your top priority for AI?',
      type: 'single',
      options: ['Reduce operational costs', 'Improve customer experience', 'Increase productivity', 'Gain competitive advantage']
    },
    {
      id: 'timeline',
      question: 'When do you want to implement AI solutions?',
      type: 'single',
      options: ['Immediately', 'Within 3 months', 'Within 6 months', 'Just exploring']
    },
    {
      id: 'budget',
      question: 'What is your estimated monthly budget for AI?',
      type: 'single',
      options: ['Under £5,000', '£5,000 - £15,000', '£15,000 - £50,000', '£50,000+']
    },
    {
      id: 'processes',
      question: 'Which processes do you want to automate? (Select all)',
      type: 'multiple',
      options: ['Customer service', 'Sales & marketing', 'Data processing', 'Operations', 'HR & recruitment']
    },
    {
      id: 'pain-points',
      question: 'What are your biggest operational pain points?',
      type: 'text',
      placeholder: 'Describe your challenges...'
    },
    {
      id: 'contact',
      question: 'Contact information',
      type: 'contact',
      fields: ['email', 'company', 'name']
    }
  ]

  const handleQuizAnswer = (questionId, value) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleQuizSubmit = async () => {
    try {
      // Mock Stripe checkout for now
      toast({
        title: "Redirecting to checkout...",
        description: "You'll be redirected to Stripe to complete your payment.",
      })
      
      // Simulate redirect delay
      setTimeout(() => {
        toast({
          title: "Payment Integration Coming Soon",
          description: "Stripe integration will be added once you provide the API keys.",
        })
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        })
        e.target.reset()
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    }
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-[#14141C] text-neutral-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#14141C]/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-[#6C2BD9]" />
              <span className="text-2xl font-bold">FlowState IT</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-white transition">
                Services
              </button>
              <button onClick={() => scrollToSection('process')} className="text-white hover:text-white transition">
                Process
              </button>
              <button onClick={() => scrollToSection('solutions')} className="text-white hover:text-white transition">
                Solutions
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-white transition">
                Pricing
              </button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-[#FF7A1A] hover:bg-[#FF7A1A]/90 text-white"
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C2BD9]/20 via-transparent to-[#FF7A1A]/10" />
          <img 
            src="https://images.pexels.com/photos/8728386/pexels-photo-8728386.jpeg" 
            alt="AI Technology" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#6C2BD9]/30 bg-[#6C2BD9]/10 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-[#6C2BD9]" />
                <span className="text-sm font-medium">AI Readiness Audit - £97</span>
              </motion.div>
              
              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A]">
                  Helping Businesses
                </span>{' '}
                scales successfully through the power of AI
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white leading-relaxed max-w-[600px]">
                Transform your workflows with custom AI automation no technical expertise required. 
                Get audit results in 24 hours.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => scrollToSection('quiz')}
                  size="lg"
                  className="bg-[#FF7A1A] hover:bg-[#FF7A1A]/90 text-white px-8 py-6 text-lg font-semibold rounded-lg hover:-translate-y-0.5 transition-all shadow-[0_8px_24px_rgba(255,122,26,0.4)]"
                >
                  Get Your AI Readiness Audit - £97
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-[#14141C] transition-all px-8 py-6 text-lg font-semibold rounded-lg"
                >
                  View Services
                </Button>
              </div>
            </motion.div>
            
            {/* Right Column - AI Workflow Visualization */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] md:h-[600px] hidden md:block"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Hub */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-32 h-32 rounded-2xl bg-gradient-to-br from-[#6C2BD9] to-[#FF7A1A] flex items-center justify-center shadow-2xl"
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>
                
                {/* Orbiting Technology Cards */}
                {aiTechnologies.map((tech, index) => {
                  const angle = (index / aiTechnologies.length) * 360
                  const radius = 200
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius
                  
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        opacity: { delay: index * 0.1 },
                        y: { 
                          duration: 2 + index * 0.2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-4 shadow-xl hover:border-[#6C2BD9]/50 transition-all">
                        <tech.icon className={`w-8 h-8 ${tech.color}`} />
                      </div>
                      
                      {/* Connection Line */}
                      <svg 
                        className="absolute inset-0 pointer-events-none"
                        style={{ 
                          width: Math.abs(x) * 2, 
                          height: Math.abs(y) * 2,
                          left: x < 0 ? 'auto' : '100%',
                          right: x < 0 ? '100%' : 'auto',
                          top: y < 0 ? 'auto' : '100%',
                          bottom: y < 0 ? '100%' : 'auto'
                        }}
                      >
                        <motion.line
                          x1={x < 0 ? Math.abs(x) * 2 : 0}
                          y1={y < 0 ? Math.abs(y) * 2 : 0}
                          x2={x < 0 ? Math.abs(x) : Math.abs(x)}
                          y2={y < 0 ? Math.abs(y) : Math.abs(y)}
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6C2BD9" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-[#6C2BD9]/20"
            style={{ left: `${particle.randomX}%`, top: `${particle.randomY}%` }}
            animate={{
              y: [`0%`, `${particle.randomEndY - particle.randomY}%`],
              x: [`0%`, `${particle.randomEndX - particle.randomX}%`],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Statistics Section */}
      <section className="relative py-12 md:py-16 border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6C2BD9]/5 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A] mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  </motion.div>
                  <p className="text-white text-sm md:text-base font-medium">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="bg-neutral-900/50 py-10 md:py-12 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h3 className="text-center text-xl md:text-2xl font-semibold mb-8 text-white">
            Powered by Leading AI Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {[
              { name: 'OpenAI', icon: Brain },
              { name: 'ElevenLabs', icon: Mic },
              { name: 'n8n', icon: Workflow },
              { name: 'Vapi', icon: Zap },
              { name: 'Anthropic', icon: Code },
              { name: 'Google AI', icon: Sparkles }
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-neutral-800/30 backdrop-blur-sm p-6 rounded-xl border border-neutral-700/50 hover:border-[#6C2BD9]/50 transition-all flex flex-col items-center gap-3"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <partner.icon className="w-10 h-10 text-[#6C2BD9]" />
                <span className="text-sm font-medium text-white">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#6C2BD9]/10 text-[#6C2BD9] border-[#6C2BD9]/30">
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Transform Your Business with AI
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Comprehensive AI solutions tailored to your unique business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 2, z: 50 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="bg-neutral-800/30 border-neutral-700/50 hover:border-[#6C2BD9]/50 transition-all h-full backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C2BD9] to-[#FF7A1A] flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2 text-white">{service.title}</CardTitle>
                    <CardDescription className="text-white text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#6C2BD9] mt-0.5 flex-shrink-0" />
                          <span className="text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-12 md:py-16 bg-neutral-900/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/30">
              Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              From Vision to Reality
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              A proven methodology for successful AI implementation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line (hidden on last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#6C2BD9] to-transparent z-0" />
                )}
                
                <div className="relative bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-6 hover:border-[#6C2BD9]/50 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C2BD9] to-[#FF7A1A] flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-[#6C2BD9]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-white">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1656703306407-88adf9044949" 
            alt="Enterprise Technology" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#6C2BD9]/10 text-[#6C2BD9] border-[#6C2BD9]/30">
              Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Real-World AI Applications
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Proven solutions delivering measurable business impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 2, z: 50 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="bg-neutral-800/80 backdrop-blur-sm border-neutral-700/50 hover:border-[#6C2BD9]/50 transition-all h-full">
                  <CardHeader>
                    <solution.icon className="w-12 h-12 text-[#FF7A1A] mb-4" />
                    <CardTitle className="text-2xl mb-2 text-white">{solution.title}</CardTitle>
                    <CardDescription className="text-white text-base">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#6C2BD9] mt-0.5 flex-shrink-0" />
                          <span className="text-white">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-neutral-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1557180491-4c2f503222d9" 
            alt="Business Meeting" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/30">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              See Why Customers Love FlowState IT
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Real results from real businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-neutral-800/50 backdrop-blur-sm border-neutral-700/50 h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-[#FF7A1A] fill-[#FF7A1A]" />
                      ))}
                    </div>
                    <p className="text-white mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t border-neutral-700 pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-white">{testimonial.role}</p>
                      <p className="text-sm text-[#6C2BD9]">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Flexible engagement models for businesses at every stage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
            {/* AI Partner Tier */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="bg-neutral-800/50 border-neutral-700/50 hover:border-[#6C2BD9]/50 transition-all h-full backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl md:text-4xl mb-4 text-white">
                    AI Partner
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg text-white leading-relaxed">
                    Ideal for businesses exploring AI possibilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl md:text-6xl font-bold">$~</span>
                      <span className="text-lg md:text-xl text-white">/month (custom)</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A] hover:opacity-90 text-white font-semibold text-lg px-8 py-6 rounded-lg hover:-translate-y-0.5 transition-all shadow-[0_8px_24px_rgba(108,43,217,0.4)]"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <div>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider mb-4">
                      What's included:
                    </p>
                    <ul className="space-y-3">
                      {['Adaptive pricing', 'Use case discovery', 'Access to AI Expert Network'].map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#6C2BD9] mt-0.5 flex-shrink-0" />
                          <span className="text-base text-white leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fractional CAIO Tier */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-neutral-800/50 border-[#6C2BD9]/50 hover:border-[#6C2BD9] transition-all h-full backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-br from-[#6C2BD9] to-[#FF7A1A] text-white text-xs font-bold px-4 py-2 rounded-bl-lg">
                  POPULAR
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl md:text-4xl mb-4 text-white">
                    Fractional CAIO
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg text-white leading-relaxed">
                    Designed for forward-looking businesses needing Chief AI Officer-level expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl md:text-6xl font-bold">$17,000</span>
                      <span className="text-lg md:text-xl text-white">/month</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A] hover:opacity-90 text-white font-semibold text-lg px-8 py-6 rounded-lg hover:-translate-y-0.5 transition-all shadow-[0_8px_24px_rgba(108,43,217,0.4)]"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <div>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider mb-4">
                      What's included:
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Dedicated AI Officer',
                        'Strategic AI roadmap',
                        'Full integration support',
                        'Change management',
                        'Ongoing optimization'
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#6C2BD9] mt-0.5 flex-shrink-0" />
                          <span className="text-base text-white leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Readiness Audit Quiz Section */}
      <section id="quiz" className="py-12 md:py-16 bg-neutral-900/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/30 text-base px-4 py-2">
              £97 - 24 Hour Delivery
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get Your AI Readiness Audit
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Discover your AI automation potential in 3 minutes. Receive a comprehensive report with actionable recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[800px] mx-auto"
          >
            <Card className="bg-neutral-800/50 backdrop-blur-sm border-neutral-700/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl text-white">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </CardTitle>
                  <span className="text-sm text-white">{Math.round(progress)}% complete</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#6C2BD9] to-[#FF7A1A]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{currentQuestion.question}</h3>
                  
                  {currentQuestion.type === 'single' && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleQuizAnswer(currentQuestion.id, option)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            quizAnswers[currentQuestion.id] === option
                              ? 'border-[#6C2BD9] bg-[#6C2BD9]/10'
                              : 'border-neutral-700 hover:border-neutral-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              quizAnswers[currentQuestion.id] === option
                                ? 'border-[#6C2BD9]'
                                : 'border-neutral-600'
                            }`}>
                              {quizAnswers[currentQuestion.id] === option && (
                                <div className="w-3 h-3 rounded-full bg-[#6C2BD9]" />
                              )}
                            </div>
                            <span className="text-white">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === 'multiple' && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => {
                        const selected = Array.isArray(quizAnswers[currentQuestion.id]) && 
                          quizAnswers[currentQuestion.id].includes(option)
                        
                        return (
                          <button
                            key={option}
                            onClick={() => {
                              const current = Array.isArray(quizAnswers[currentQuestion.id]) 
                                ? quizAnswers[currentQuestion.id] 
                                : []
                              const updated = selected
                                ? current.filter(item => item !== option)
                                : [...current, option]
                              handleQuizAnswer(currentQuestion.id, updated)
                            }}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              selected
                                ? 'border-[#6C2BD9] bg-[#6C2BD9]/10'
                                : 'border-neutral-700 hover:border-neutral-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                selected
                                  ? 'border-[#6C2BD9] bg-[#6C2BD9]'
                                  : 'border-neutral-600'
                              }`}>
                                {selected && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className="text-white">{option}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {currentQuestion.type === 'text' && (
                    <Textarea
                      placeholder={currentQuestion.placeholder}
                      value={quizAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleQuizAnswer(currentQuestion.id, e.target.value)}
                      className="w-full min-h-[120px] bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                    />
                  )}

                  {currentQuestion.type === 'contact' && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Your Name"
                        value={quizAnswers[`${currentQuestion.id}-name`] || ''}
                        onChange={(e) => handleQuizAnswer(`${currentQuestion.id}-name`, e.target.value)}
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={quizAnswers[`${currentQuestion.id}-email`] || ''}
                        onChange={(e) => handleQuizAnswer(`${currentQuestion.id}-email`, e.target.value)}
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                      />
                      <Input
                        placeholder="Company Name"
                        value={quizAnswers[`${currentQuestion.id}-company`] || ''}
                        onChange={(e) => handleQuizAnswer(`${currentQuestion.id}-company`, e.target.value)}
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                    className="border-neutral-700 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!quizAnswers[currentQuestion.id]}
                      className="flex-1 bg-[#6C2BD9] hover:bg-[#6C2BD9]/90 disabled:opacity-50"
                    >
                      Next
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleQuizSubmit}
                      className="flex-1 bg-[#FF7A1A] hover:bg-[#FF7A1A]/90"
                    >
                      Proceed to Payment (£97)
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9]" />
                <span>24-hour delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9]" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6C2BD9]" />
                <span>Secure payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#6C2BD9]/10 text-[#6C2BD9] border-[#6C2BD9]/30">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-neutral-800/30 backdrop-blur-sm border-neutral-700/50 rounded-lg px-6 data-[state=open]:border-[#6C2BD9]/50"
                >
                  <AccordionTrigger className="text-left hover:text-[#6C2BD9] hover:no-underline">
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 bg-neutral-900/50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/30">
              Contact Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Let's Talk About Your AI Journey
            </h2>
            <p className="text-lg md:text-xl text-white max-w-[700px] mx-auto">
              Get in touch to discuss how we can transform your business with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-neutral-800/50 backdrop-blur-sm border-neutral-700/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                  <CardDescription>We'll respond within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white">Name</label>
                      <Input 
                        name="name" 
                        required 
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white">Email</label>
                      <Input 
                        name="email" 
                        type="email" 
                        required 
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white">Company</label>
                      <Input 
                        name="company" 
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] text-white placeholder:text-neutral-500"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white">Message</label>
                      <Textarea 
                        name="message" 
                        required 
                        className="bg-neutral-900/50 border-neutral-700 focus:border-[#6C2BD9] min-h-[120px] text-white placeholder:text-neutral-500"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF7A1A] hover:bg-[#FF7A1A]/90"
                      size="lg"
                    >
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6C2BD9] to-[#FF7A1A] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Email</h4>
                      <p className="text-white">hello@flowstateit.co.uk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6C2BD9] to-[#FF7A1A] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Location</h4>
                      <p className="text-white">United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-[#6C2BD9]/50 flex items-center justify-center transition-all hover:-translate-y-1"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-[#6C2BD9]/50 flex items-center justify-center transition-all hover:-translate-y-1"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-[#6C2BD9]/50 flex items-center justify-center transition-all hover:-translate-y-1"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-[#6C2BD9]/20 to-[#FF7A1A]/20 border-[#6C2BD9]/30">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-[#FF7A1A]" />
                    Quick Start
                  </h4>
                  <p className="text-sm text-white mb-4">
                    Book a free 30-minute consultation to explore how AI can transform your business.
                  </p>
                  <Button 
                    onClick={() => scrollToSection('quiz')}
                    variant="outline" 
                    className="w-full border-[#6C2BD9] text-[#6C2BD9] hover:bg-[#6C2BD9]/10"
                  >
                    Get Your Free Audit
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900/80 border-t border-white/10 py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#6C2BD9]" />
                <span className="text-xl font-bold">FlowState IT</span>
              </div>
              <p className="text-sm text-white">
                Enterprise AI solutions and prompt engineering expertise for businesses ready to scale.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#services" className="hover:text-white transition">AI Automation</a></li>
                <li><a href="#services" className="hover:text-white transition">Prompt Engineering</a></li>
                <li><a href="#services" className="hover:text-white transition">Voice AI</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Fractional CAIO</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#process" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Solutions</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#quiz" className="hover:text-white transition">AI Readiness Audit</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              © 2025 FlowState IT. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}