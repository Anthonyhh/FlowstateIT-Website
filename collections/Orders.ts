import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'customerEmail',
    description: 'Payment transactions and fulfillment tracking',
    defaultColumns: ['customerEmail', 'amount', 'status', 'paidAt'],
  },
  access: {
    read: ({ req }) => req.user != null, // Admin only
  },
  fields: [
    {
      name: 'stripeSessionId',
      type: 'text',
      required: true,
      label: 'Stripe Checkout Session ID',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      label: 'Stripe Payment Intent ID',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'auditSubmissionId',
      type: 'relationship',
      relationTo: 'audit-submissions',
      required: true,
      label: 'Audit Submission',
    },
    {
      name: 'productId',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      label: 'Product',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Amount (GBP)',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'paidAt',
      type: 'date',
      label: 'Payment Completion Timestamp',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'fulfillmentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      label: 'Customer Email',
    },
  ],
}
