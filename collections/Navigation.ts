import type { CollectionConfig } from 'payload'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'label',
    description: 'Top navigation menu items',
    defaultColumns: ['label', 'type', 'order', 'isButton'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Menu Item Label',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'section',
      options: [
        { label: 'Section (Anchor Link)', value: 'section' },
        { label: 'Page (URL)', value: 'page' },
        { label: 'Button (CTA)', value: 'button' },
      ],
    },
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      admin: {
        condition: (data) => data.type === 'section',
        description: 'e.g., #services, #process, #contact',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      admin: {
        condition: (data) => data.type === 'page',
        description: 'e.g., /blog, /about',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
      label: 'Open in New Tab',
      admin: {
        condition: (data) => data.type === 'page',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (1, 2, 3...)',
      },
    },
    {
      name: 'isButton',
      type: 'checkbox',
      defaultValue: false,
      label: 'Style as Button',
      admin: {
        description: 'For CTAs like "Let\'s Talk"',
      },
    },
  ],
}
