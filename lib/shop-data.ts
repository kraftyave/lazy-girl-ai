export type ShopProduct = {
  id: string
  name: string
  tagline: string
  desc: string
  price: number
  status: 'available' | 'coming-soon'
  popular?: boolean
  kofiUrl?: string
  dodoProductId?: string
  whatYouGet?: string[]
}

export type ShopCategory = {
  slug: string
  name: string
  shortName: string
  tagline: string
  desc: string
  priceRange: string
  gradient: string
  products: ShopProduct[]
}

export const shopCategories: ShopCategory[] = [
  {
    slug: 'automations',
    name: 'Automation Templates',
    shortName: 'Automations',
    tagline: 'one-click workflows that run while you sleep',
    desc: 'Zapier & Make templates, built and tested. Import in one click, fill in your info, and watch things happen automatically.',
    priceRange: '$27–67',
    gradient: 'from-sage/20 to-[#C7D1C2]/30',
    products: [
      {
        id: 'inbox-zero',
        name: 'Inbox Zero System',
        tagline: 'auto-sort, draft, and archive your email',
        desc: 'Your inbox gets triaged before you even open it. Newsletters sorted, important emails flagged, routine responses drafted. Done.',
        price: 47,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A fully built Zapier/Make automation template — import in one click',
          'Auto-sorts incoming emails into priority, newsletters, and archive',
          'AI-drafted responses for routine emails',
          'Weekly email digest so you never miss anything important',
          'Setup guide included — live in under 30 minutes',
          'Works with Gmail (Google Workspace support included)',
        ],
      },
      {
        id: 'content-repurpose',
        name: 'Content Repurpose Workflow',
        tagline: 'one piece of content → five platforms, automatically',
        desc: 'Write once. This automation rewrites it for Instagram, TikTok, LinkedIn, Twitter, and your newsletter. No copy-pasting.',
        price: 47,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A fully built automation that repurposes one post into 5 platform formats',
          'Platform-specific rewrites: Instagram, TikTok, LinkedIn, Twitter/X, Newsletter',
          'Tone and voice adaptation per platform — not just a copy-paste',
          'Import in one click to Zapier or Make',
          'Setup guide + video walkthrough',
          'Template update when major platforms change their algorithm',
        ],
      },
      {
        id: 'weekly-wrap',
        name: 'Weekly Wrap Generator',
        tagline: 'your week summarised while you sleep',
        desc: 'Pulls your tasks, emails, and calendar from the week and generates a clean summary you wake up to every Monday. No manual reporting.',
        price: 27,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Automated weekly wrap report delivered every Monday morning',
          'Pulls from your tasks, calendar, and email automatically',
          'Highlights wins, blockers, and what carried over',
          'One-click import to Zapier or Make',
          'Customisable report format — weekly, biweekly, or monthly',
          'Works with Google Calendar, Notion, and Todoist',
        ],
      },
      {
        id: 'lead-capture',
        name: 'Lead Capture System',
        tagline: 'form → CRM → follow-up email, done for you',
        desc: 'Someone fills out your inquiry form. This workflow saves their info, tags them in your CRM, and sends a personalised follow-up — automatically.',
        price: 57,
        status: 'coming-soon',
      },
      {
        id: 'social-scheduler',
        name: 'Social Post Scheduler',
        tagline: 'approved posts go live on their own',
        desc: 'Review and approve from a simple spreadsheet. This workflow picks them up, formats them per platform, and schedules automatically.',
        price: 47,
        status: 'coming-soon',
      },
    ],
  },
  {
    slug: 'notion-systems',
    name: 'Notion AI Systems',
    shortName: 'Notion Systems',
    tagline: 'your second brain, already wired',
    desc: 'Pre-built Notion workspaces with AI prompts already written in. Duplicate, fill in your info, and run. No setup, no figuring it out.',
    priceRange: '$27–47',
    gradient: 'from-[#FFF0E8]/80 to-blush-light/30',
    products: [
      {
        id: 'life-os',
        name: 'Life OS Dashboard',
        tagline: 'your entire life in one Notion page',
        desc: 'Goals, habits, finances, and tasks — all linked, all in one place. Includes a daily Dashboard, Sunday Weekly Review, and AI prompts at every decision point. Open it every morning. Let it run your life.',
        price: 47,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A complete Notion workspace — goals, habits, finances, and tasks all linked',
          'Daily Dashboard you open every morning — 5 minutes to set your day',
          'Sunday Weekly Review template with AI prompts built in',
          'Habit tracker with streak tracking and weekly check-in',
          'Finance overview linked to your goals',
          'AI prompts pre-written at every decision point — no staring at blank pages',
          'Mobile-friendly layout for on-the-go access',
        ],
      },
      {
        id: 'content-calendar',
        name: 'Content Calendar System',
        tagline: 'plan, write, and batch in one place',
        desc: 'Ideas Vault, Content Pipeline, and Batch Day Planner — all connected. AI hook generator, caption writer, and monthly planning prompt built in. One batch session, a week of content done.',
        price: 37,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A complete Notion content workspace — ideas to published, all in one place',
          'Ideas Vault for capturing content ideas anytime',
          'Content Pipeline with stages: Idea → Draft → Ready → Published',
          'Batch Day Planner for efficient content creation sessions',
          'AI hook generator prompt built into every content entry',
          'Monthly content planning prompt to plan your pillars and themes',
          'Platform tracker for multi-channel content management',
        ],
      },
      {
        id: 'finance-tracker',
        name: 'Finance Tracker',
        tagline: 'budget tracker with AI insights built in',
        desc: 'Log every expense in seconds. Track by category, see your monthly totals, and get an honest AI reflection on your spending — what\'s working, what\'s a leak, what to change. No spreadsheet anxiety.',
        price: 27,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A complete Notion finance tracker — expenses, income, and budget in one view',
          'Category-based expense logging with monthly rollups',
          'Monthly budget vs. actual comparison',
          'AI spending reflection prompt — paste your month, get honest insights',
          '"Safe to spend" calculator based on your budget',
          'Savings goal tracker with progress visualization',
          'No formulas to figure out — everything is pre-built',
        ],
      },
      {
        id: 'goal-habit',
        name: 'Goal + Habit System',
        tagline: 'set goals that actually stick',
        desc: 'Quarterly goals linked to monthly milestones, linked to daily habits. AI goal-setting prompt to start the quarter right, weekly accountability check-in, and a habit tracker with streak tracking built in.',
        price: 27,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Quarterly goal framework — big goals broken into 90-day plans',
          'Monthly milestones linked to each quarterly goal',
          'Daily habit tracker with streak tracking',
          'AI quarterly goal-setting prompt to start each quarter right',
          'Weekly accountability check-in template',
          'Year-in-review template for end-of-year reflection',
          'Mobile-friendly for daily habit check-ins on the go',
        ],
      },
      {
        id: 'brand-bible',
        name: 'Brand Bible System',
        tagline: 'your entire brand in one shareable doc',
        desc: 'Foundation, audience, voice, visuals, pillars, and messaging — all documented. Includes a master AI Brand Prompt you fill in once and paste into any AI tool to get on-brand content every time.',
        price: 37,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A complete brand documentation workspace in Notion',
          'Brand foundation: mission, vision, values, and positioning',
          'Audience personas with pain points and language',
          'Brand voice guide with dos, don\'ts, and examples',
          'Visual identity section: palette, typography, and aesthetic notes',
          'Content pillars and messaging framework',
          'Master AI Brand Prompt — fill in once, paste into any AI tool forever',
          'Shareable link so collaborators and VAs can access your brand',
        ],
      },
    ],
  },
  {
    slug: 'bundles',
    name: 'System Bundles',
    shortName: 'Bundles',
    tagline: 'the full stack for one life area',
    desc: 'Custom GPT + automation + Notion system, bundled for one goal. Everything done, nothing left to figure out.',
    priceRange: '$67–127',
    gradient: 'from-charcoal/5 to-blush/10',
    products: [
      {
        id: 'brand-bundle',
        name: 'The Brand Bundle',
        tagline: 'your brand, documented and running on autopilot',
        desc: 'Brand Bible Notion System + Content Repurpose Workflow + Content Calendar. Your brand documented once, your content running automatically.',
        price: 87,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Brand Bible System ($37) — your brand documented in one shareable Notion workspace',
          'Content Repurpose Workflow ($47) — one post → 5 platforms automatically',
          'Content Calendar System ($37) — your full content pipeline in Notion',
          'Save $34 vs buying separately',
          'Setup guide for connecting all three together',
          'Brand launch checklist included',
        ],
      },
      {
        id: 'life-admin-bundle',
        name: 'The Life Admin Bundle',
        tagline: 'your life, organised and running itself',
        desc: 'Inbox Zero Automation + Life OS Notion Dashboard + Finance Tracker. The systems that handle the boring stuff so you can stop thinking about it.',
        price: 87,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Inbox Zero Automation ($47) — your email triaged and drafted before you open it',
          'Life OS Dashboard ($47) — your goals, habits, tasks, and finances in one Notion page',
          'Finance Tracker ($27) — log expenses in seconds, get honest AI spending insights',
          'Save $34 vs buying separately',
          'Integration guide for getting all three working together',
          'Weekly routine checklist to get the most out of each system',
        ],
      },
      {
        id: 'content-creator-bundle',
        name: 'The Content Creator Bundle',
        tagline: 'create once. let the systems do the rest.',
        desc: 'Content Repurpose Workflow + Content Calendar System + Weekly Wrap Generator. One batch day, and your content runs itself for the week.',
        price: 87,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Content Repurpose Workflow ($47) — one piece of content → 5 platforms automatically',
          'Content Calendar System ($37) — ideas vault, pipeline, and batch day planner in Notion',
          'Weekly Wrap Generator ($27) — your content recap delivered every Monday morning',
          'Save $24 vs buying separately',
          'Batch day guide: how to use all three in one 2-hour session',
          'Content strategy quick-start checklist',
        ],
      },
      {
        id: 'job-search-bundle',
        name: 'The Career Bundle',
        tagline: 'land the job. negotiate the salary. track everything.',
        desc: 'Goal + Habit System + Life OS Dashboard + a job application tracker Notion template. Every application organised, every milestone tracked.',
        price: 57,
        status: 'coming-soon',
      },
      {
        id: 'full-autopilot',
        name: 'The Full Stack',
        tagline: 'every system, one price',
        desc: 'All automations and all Notion systems — the complete lazy girl setup. Everything handled, nothing left to build.',
        price: 197,
        status: 'coming-soon',
      },
    ],
  },
  {
    slug: 'merch',
    name: 'Merch',
    shortName: 'Merch',
    tagline: 'wear the lazy girl era',
    desc: 'For when you want everyone to know you\'re running on autopilot. Soft fits, minimal design, maximum lazy girl energy.',
    priceRange: '$8–52',
    gradient: 'from-blush/10 to-sage/15',
    products: [
      {
        id: 'let-ai-do-it-tee',
        name: '"let AI do it" tee',
        tagline: 'your entire personality in four words',
        desc: 'Soft unisex tee, crew neck, minimal print on the chest. The answer to every "but how do you get so much done?"',
        price: 32,
        status: 'coming-soon',
      },
      {
        id: 'lazy-but-effective-sweatshirt',
        name: '"lazy but effective" sweatshirt',
        tagline: 'cozy and correct',
        desc: 'Oversized pullover in cream. Because efficiency is a vibe and you\'ve mastered it.',
        price: 52,
        status: 'coming-soon',
      },
      {
        id: 'on-autopilot-tote',
        name: '"on autopilot" tote',
        tagline: 'carry your whole life (effortlessly)',
        desc: 'Heavyweight canvas tote, natural color. Holds a laptop, your planner, and your complete lack of desire to do things manually.',
        price: 22,
        status: 'coming-soon',
      },
      {
        id: 'lazy-girl-mug',
        name: '"done for you" mug',
        tagline: 'drink coffee. let AI do the rest.',
        desc: '15oz ceramic mug in cream. The only mug that gets your morning routine.',
        price: 24,
        status: 'coming-soon',
      },
      {
        id: 'sticker-pack',
        name: 'Lazy Girl AI Sticker Pack',
        tagline: '10 digital stickers — instant download',
        desc: 'Minimal blush and cream stickers for your planner, laptop, or Notion covers. ✦ marks, lazy girl quotes, and brand icons.',
        price: 8,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          '10 digital stickers as PNG files with transparent backgrounds',
          'Designed in the lazy girl ai brand palette: cream, blush, sage',
          'Perfect for Notion covers, digital planners, and laptop stickers',
          'Instant download — delivered immediately after purchase',
          'Commercial use allowed for personal brand use',
        ],
      },
      {
        id: 'phone-case',
        name: '"lazy girl approved" phone case',
        tagline: 'officially certified',
        desc: 'Slim clear case with minimal blush lettering. Available for iPhone and Samsung.',
        price: 24,
        status: 'coming-soon',
      },
    ],
  },
]

export function getCategoryBySlug(slug: string) {
  return shopCategories.find((c) => c.slug === slug) ?? null
}

export function getProductById(categorySlug: string, productId: string) {
  const category = getCategoryBySlug(categorySlug)
  return category?.products.find((p) => p.id === productId) ?? null
}

export function getBundlesContainingProduct(productId: string): string[] {
  const bundles = shopCategories.find((c) => c.slug === 'bundles')
  if (!bundles) return []
  return bundles.products
    .filter((b) => b.desc.toLowerCase().includes(productId.replace(/-/g, ' ').split('-')[0]))
    .map((b) => b.name)
}
