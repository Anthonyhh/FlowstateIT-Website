import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site configuration, SEO, and social links',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'FlowState IT',
            },
            {
              name: 'siteUrl',
              type: 'text',
              required: true,
              defaultValue: 'https://flowstateit.co.uk',
            },
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
            },
            {
              name: 'contactPhone',
              type: 'text',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                {
                  name: 'twitter',
                  type: 'text',
                  label: 'Twitter/X URL',
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  label: 'LinkedIn URL',
                },
                {
                  name: 'github',
                  type: 'text',
                  label: 'GitHub URL',
                },
                {
                  name: 'youtube',
                  type: 'text',
                  label: 'YouTube URL',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
              defaultValue: 'FlowState IT - AI Automation & Enterprise Solutions',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Transform your business with custom AI automation, prompt engineering, and fractional CAIO services.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Open Graph Image',
            },
          ],
        },
      ],
    },
  ],
}
