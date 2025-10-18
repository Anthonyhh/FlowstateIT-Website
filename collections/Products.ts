import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    description: 'Products for sale (AI Readiness Audit, etc.)',
    defaultColumns: ['name', 'price', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price (GBP)',
      admin: {
        description: 'Price in British Pounds (e.g., 97 for £97)',
      },
    },
    {
      name: 'stripeProductId',
      type: 'text',
      label: 'Stripe Product ID',
      admin: {
        description: 'From Stripe dashboard (e.g., prod_...)',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      label: 'Stripe Price ID',
      admin: {
        description: 'From Stripe dashboard (e.g., price_...)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Internal Description',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Enable/disable product availability',
      },
    },
  ],
}
