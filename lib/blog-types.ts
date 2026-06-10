export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'tip'; text: string }
  | { type: 'callout'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  readingTime: number
  publishedAt: string
  coverGradient: string
  coverImage: string
  featured?: boolean
  content: Block[]
}