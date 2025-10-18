import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    description: 'Contact form submissions',
    defaultColumns: ['name', 'email', 'company', 'status', 'submittedAt'],
  },
  access: {
    read: ({ req}) => req.user != null, // Admin only
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Contact Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (!value) return new Date().toISOString()
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      label: 'Source',
      options: [
        { label: 'Hero CTA', value: 'hero' },
        { label: 'Footer', value: 'footer' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Contact Section', value: 'contact' },
      ],
    },
  ],
}
