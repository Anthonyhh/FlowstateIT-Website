import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    description: 'Customer testimonials and reviews',
    defaultColumns: ['clientName', 'clientCompany', 'rating', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'clientTitle',
      type: 'text',
      required: true,
      label: 'Job Title',
    },
    {
      name: 'clientCompany',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      label: 'Rating (1-5 stars)',
    },
    {
      name: 'clientPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Client Headshot',
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company Logo',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured (Highlight in Hero)',
    },
  ],
}
