import type { CollectionConfig } from 'payload'

export const ProcessSteps: CollectionConfig = {
  slug: 'process-steps',
  admin: {
    useAsTitle: 'title',
    description: 'Process/methodology steps for #process section',
    defaultColumns: ['stepNumber', 'title', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'stepNumber',
      type: 'number',
      required: true,
      label: 'Step Number',
      admin: {
        description: 'e.g., 1, 2, 3, 4',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Step Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Step Description',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Search', value: 'search' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Code', value: 'code' },
        { label: 'Rocket', value: 'rocket' },
        { label: 'Check Circle', value: 'checkCircle' },
        { label: 'Target', value: 'target' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
