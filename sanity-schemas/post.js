export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'coverImage', title: 'Cover Image', type: 'image' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: {
        list: [
          { title: 'SEO', value: 'SEO' },
          { title: 'PPC', value: 'PPC' },
          { title: 'Content', value: 'Content' },
          { title: 'Learnings', value: 'Learnings' },
        ],
      }
    },
    { name: 'readTime', title: 'Read Time', type: 'string', description: 'e.g., "5 min read"' },

    // SEO fields (Rank Math replacement)
    { name: 'metaTitle', title: 'Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'Meta Description', type: 'text' },
    { name: 'focusKeyword', title: 'Focus Keyword', type: 'string' }
  ]
};
