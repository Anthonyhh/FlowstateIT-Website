import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero Section',
  admin: {
    description: 'Homepage hero content and CTAs',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'badge',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'AI Readiness Audit',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'sparkles',
          options: [
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Zap', value: 'zap' },
            { label: 'Star', value: 'star' },
            { label: 'Rocket', value: 'rocket' },
          ],
        },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue:
        'Scaling Business Operations with Prompt Engineering & Enterprise AI Solutions',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
      defaultValue:
        'Transform your workflows with custom AI automation—no technical expertise required. Get audit results in 24 hours.',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Get Your AI Readiness Audit - £97',
        },
        {
          name: 'action',
          type: 'select',
          required: true,
          defaultValue: 'scrollTo',
          options: [
            { label: 'Scroll to Section', value: 'scrollTo' },
            { label: 'External Link', value: 'externalLink' },
          ],
        },
        {
          name: 'target',
          type: 'text',
          required: true,
          defaultValue: '#quiz',
          admin: {
            description: 'Section ID (e.g., #quiz) or full URL',
          },
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'View Services',
        },
        {
          name: 'target',
          type: 'text',
          required: true,
          defaultValue: '#services',
          admin: {
            description: 'Section ID or URL',
          },
        },
      ],
    },
    {
      name: 'visualType',
      type: 'select',
      required: true,
      defaultValue: 'aiWorkflow',
      options: [
        { label: 'AI Workflow Visualization', value: 'aiWorkflow' },
        { label: 'Static Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
      admin: {
        condition: (data) => data.visualType === 'image',
      },
    },
  ],
}
