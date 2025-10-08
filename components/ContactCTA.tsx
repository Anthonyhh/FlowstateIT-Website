'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { staggerContainer, fadeInUp, pulse, viewportOptions } from '@/lib/animations'
import { sanitizer } from '@/lib/sanitization'
import { z } from 'zod'
import { emailSchema } from '@/lib/validations'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
})

type FormData = z.infer<typeof contactSchema>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface ContactCTAProps {
  id?: string
}

export default function ContactCTA({ id = 'contact' }: ContactCTAProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrors({})

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizer.sanitizeString(formData.name),
      email: sanitizer.sanitizeEmail(formData.email),
      message: sanitizer.sanitizeString(formData.message),
    }

    // Validate
    const validation = contactSchema.safeParse(sanitizedData)
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message
        }
      })
      setErrors(fieldErrors)
      setStatus('error')
      return
    }

    try {
      // TODO: Replace with actual API endpoint
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(validation.data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrors({ message: 'Failed to send message. Please try again.' })
    }
  }

  return (
    <section id={id} className="section-padding bg-background-dark/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainer}
        className="container-custom max-w-4xl"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            variants={fadeInUp}
            className="text-fluid-4xl md:text-fluid-5xl heading-primary text-gradient-violet mb-4"
          >
            Ready to Build?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-fluid-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Get started with FlowstateIT today. From concept to production in 15 minutes.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div variants={fadeInUp} className="relative">
          {/* Gradient Glow */}
          <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-card border-2 border-primary/20 rounded-2xl p-8 md:p-12 space-y-6"
          >
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-background border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={status === 'submitting'}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-background border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={status === 'submitting'}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={6}
                className="w-full bg-background border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                disabled={status === 'submitting'}
              />
              {errors.message && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div variants={status === 'idle' ? pulse : undefined}>
              <Button
                type="submit"
                size="lg"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-lg py-6 glow-gradient disabled:opacity-50"
              >
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                )}
                {status === 'idle' && (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
                {status === 'error' && 'Try Again'}
              </Button>
            </motion.div>

            {/* Success Message */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center"
              >
                <p className="text-primary font-medium">
                  Thank you! We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </section>
  )
}
