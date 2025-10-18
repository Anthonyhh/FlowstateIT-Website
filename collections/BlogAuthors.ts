import type { CollectionConfig } from 'payload'

export const BlogAuthors: CollectionConfig = {
  slug: 'blog-authors',
  admin: {
    useAsTitle: 'name',
    description: 'Blog author profiles',
    defaultColumns: ['name', 'role'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short Bio',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Job Title/Role',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
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
      ],
    },
  ],
}
