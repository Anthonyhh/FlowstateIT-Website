import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    description: 'Blog articles and case studies',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req }) => {
      // Public can read published posts, admins can read all
      if (req.user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Auto-generated from title or custom',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      label: 'Post Summary',
      admin: {
        description: '150-200 characters for preview cards',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Post Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'blog-authors',
      label: 'Author',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI Strategy', value: 'ai-strategy' },
        { label: 'Case Studies', value: 'case-studies' },
        { label: 'Automation Tutorials', value: 'tutorials' },
        { label: 'Industry Insights', value: 'insights' },
        { label: 'Product Updates', value: 'updates' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Publish Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Custom SEO Title',
      admin: {
        description: 'Override default title for SEO',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Custom Meta Description',
      admin: {
        description: 'Override default excerpt for SEO',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Estimated Read Time (minutes)',
      admin: {
        description: 'Auto-calculated or manual',
      },
    },
  ],
}
