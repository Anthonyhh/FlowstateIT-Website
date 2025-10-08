'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

const socialLinks = [
  { icon: Github, href: 'https://github.com/anthonyhh', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/flowstateit', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/flowstateit', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@flowstateit.com', label: 'Email' },
]

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Documentation', href: '/docs' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background-dark border-t border-white/10">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary opacity-30" />

      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-gradient mb-4">FlowstateIT</h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              AI Website Factory. Build production-ready websites in 15 minutes with enterprise
              infrastructure and cinematic design.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary transition-all glow-violet"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#cases"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/api/docs"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://payloadcms.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Payload CMS Docs
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Next.js Docs
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/anthonyhh/Payload-Template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="/api/health"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  System Health
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-foreground/60">
            © {currentYear} FlowstateIT. Built with Next.js 15 + Payload CMS.
          </p>

          <div className="flex gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
