import type { CollectionConfig } from 'payload'

export const PricingTiers: CollectionConfig = {
  slug: 'pricing-tiers',
  admin: {
    useAsTitle: 'tierName',
    description: 'Fractional CAIO pricing tiers',
    defaultColumns: ['tierName', 'priceAmount', 'order', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tierName',
      type: 'text',
      required: true,
      label: 'Tier Name',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'Target Audience Description',
    },
    {
      name: 'priceAmount',
      type: 'number',
      label: 'Price Amount (USD)',
      admin: {
        description: 'Leave empty for custom pricing',
      },
    },
    {
      name: 'priceLabel',
      type: 'text',
      required: true,
      defaultValue: '/month',
      label: 'Price Label',
    },
    {
      name: 'isPriceCustom',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Custom Pricing ($~)',
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      defaultValue: 'Get Started',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      defaultValue: '#contact',
      label: 'CTA Link',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      label: 'Included Features',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'check',
          options: [
            { label: 'Checkmark', value: 'check' },
            { label: 'Star', value: 'star' },
            { label: 'Zap', value: 'zap' },
          ],
        },
      ],
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
      name: 'highlightColor',
      type: 'select',
      label: 'Highlight Color',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
      ],
    },
  ],
}
