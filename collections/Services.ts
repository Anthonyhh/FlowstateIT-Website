import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    description: 'Core service offerings - 5 main pillars',
    defaultColumns: ['title', 'order', 'isActive'],
  },
  access: {
    read: () => true, // Public read access for frontend
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Service Description',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Brain (AI Strategy)', value: 'brain' },
        { label: 'Sparkles (Prompt Engineering)', value: 'sparkles' },
        { label: 'Bot (Agentic AI)', value: 'bot' },
        { label: 'Database (Data & ML)', value: 'database' },
        { label: 'Video (Media Automation)', value: 'video' },
        { label: 'Zap (Automation)', value: 'zap' },
        { label: 'Workflow (Processes)', value: 'workflow' },
      ],
      label: 'Icon',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Link',
      admin: {
        description: 'e.g., #contact or /services/ai-strategy',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Show this service on the website',
      },
    },
  ],
}
