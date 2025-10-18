import type { CollectionConfig } from 'payload'

export const AuditSubmissions: CollectionConfig = {
  slug: 'audit-submissions',
  admin: {
    useAsTitle: 'email',
    description: 'AI Readiness Audit quiz submissions',
    defaultColumns: ['email', 'companyName', 'calculatedScore', 'status', 'submittedAt'],
  },
  access: {
    read: ({ req }) => req.user != null, // Admin only
  },
  fields: [
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
      name: 'quizAnswers',
      type: 'json',
      required: true,
      label: 'Quiz Answers (JSON)',
      admin: {
        description: 'Complete questionnaire responses',
      },
    },
    {
      name: 'calculatedScore',
      type: 'number',
      label: 'AI Readiness Score (0-100)',
      admin: {
        description: 'Calculated score from quiz answers',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'User Email',
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'orderId',
      type: 'relationship',
      relationTo: 'orders',
      label: 'Related Order',
      admin: {
        description: 'Links to Orders collection after payment',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Payment', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ],
}
