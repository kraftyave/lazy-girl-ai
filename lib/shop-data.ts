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
    tagline: 'One-Click Workflows That Run While You Sleep',
    desc: 'Zapier & Make templates, built and tested. Import in one click, fill in your info, and watch things happen automatically.',
    priceRange: '$27–67',
    gradient: 'from-sage/20 to-[#C7D1C2]/30',
    products: [
      {
        id: 'inbox-zero',
        name: 'Inbox Zero System',
        tagline: 'Auto-Sort, Draft, and Archive Your Email',
        desc: 'Your inbox gets triaged before you even open it. Newsletters sorted, important emails flagged, routine responses drafted. Done.',
        price: 47,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A Fully Built Zapier/Make Automation Template. Import in One Click.',
          'Auto-Sorts Incoming Emails into Priority, Newsletters, and Archive',
          'AI-Drafted Responses for Routine Emails',
          'Weekly Email Digest So You Never Miss Anything Important',
          'Setup Guide Included. Live in Under 30 Minutes.',
          'Works With Gmail (Google Workspace Support Included)',
        ],
      },
      {
        id: 'content-repurpose',
        name: 'Content Repurpose Workflow',
        tagline: 'One Piece of Content → Five Platforms, Automatically',
        desc: 'Write once. This automation rewrites it for Instagram, TikTok, LinkedIn, Twitter, and your newsletter. No copy-pasting.',
        price: 47,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A Fully Built Automation That Repurposes One Post into 5 Platform Formats',
          'Platform-Specific Rewrites: Instagram, TikTok, LinkedIn, Twitter/X, Newsletter',
          'Tone and Voice Adaptation per Platform, Not Just a Copy-Paste',
          'Import in One Click to Zapier or Make',
          'Setup Guide + Video Walkthrough',
          'Template Update When Major Platforms Change Their Algorithm',
        ],
      },
      {
        id: 'weekly-wrap',
        name: 'Weekly Wrap Generator',
        tagline: 'Your Week Summarised While You Sleep',
        desc: 'Pulls your tasks, emails, and calendar from the week and generates a clean summary you wake up to every Monday. No manual reporting.',
        price: 27,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Automated Weekly Wrap Report Delivered Every Monday Morning',
          'Pulls From Your Tasks, Calendar, and Email Automatically',
          'Highlights Wins, Blockers, and What Carried Over',
          'One-Click Import to Zapier or Make',
          'Customisable Report Format: Weekly, Biweekly, or Monthly',
          'Works With Google Calendar, Notion, and Todoist',
        ],
      },
      {
        id: 'lead-capture',
        name: 'Lead Capture System',
        tagline: 'Form → CRM → Follow-Up Email, Done for You',
        desc: 'Someone fills out your inquiry form. This workflow saves their info, tags them in your CRM, and sends a personalised follow-up automatically.',
        price: 57,
        status: 'coming-soon',
      },
      {
        id: 'social-scheduler',
        name: 'Social Post Scheduler',
        tagline: 'Approved Posts Go Live on Their Own',
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
    tagline: 'Your Second Brain, Already Wired',
    desc: 'Pre-built Notion workspaces with AI prompts already written in. Duplicate, fill in your info, and run. No setup, no figuring it out.',
    priceRange: '$27–47',
    gradient: 'from-[#FFF0E8]/80 to-blush-light/30',
    products: [
      {
        id: 'life-os',
        name: 'Life OS Dashboard',
        tagline: 'Your Entire Life in One Notion Page',
        desc: 'Goals, habits, finances, and tasks. All linked, all in one place. Includes a daily dashboard, Sunday weekly review, and AI prompts at every decision point. Open it every morning. Let it run your life.',
        price: 47,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A Complete Notion Workspace: Goals, Habits, Finances, and Tasks All Linked',
          'Daily Dashboard You Open Every Morning. 5 Minutes to Set Your Day.',
          'Sunday Weekly Review Template With AI Prompts Built In',
          'Habit Tracker With Streak Tracking and Weekly Check-In',
          'Finance Overview Linked to Your Goals',
          'AI Prompts Pre-Written at Every Decision Point. No Staring at Blank Pages.',
          'Mobile-Friendly Layout for On-the-Go Access',
        ],
      },
      {
        id: 'content-calendar',
        name: 'Content Calendar System',
        tagline: 'Plan, Write, and Batch in One Place',
        desc: 'Ideas vault, content pipeline, and batch day planner. All connected. AI hook generator, caption writer, and monthly planning prompt built in. One batch session, a week of content done.',
        price: 37,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A Complete Notion Content Workspace: Ideas to Published, All in One Place',
          'Ideas Vault for Capturing Content Ideas Anytime',
          'Content Pipeline With Stages: Idea → Draft → Ready → Published',
          'Batch Day Planner for Efficient Content Creation Sessions',
          'AI Hook Generator Prompt Built into Every Content Entry',
          'Monthly Content Planning Prompt to Plan Your Pillars and Themes',
          'Platform Tracker for Multi-Channel Content Management',
        ],
      },
      {
        id: 'finance-tracker',
        name: 'Finance Tracker',
        tagline: 'Budget Tracker With AI Insights Built In',
        desc: 'Log every expense in seconds. Track by category, see your monthly totals, and get an honest AI reflection on your spending: what\'s working, what\'s a leak, what to change. No spreadsheet anxiety.',
        price: 27,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A Complete Notion Finance Tracker: Expenses, Income, and Budget in One View',
          'Category-Based Expense Logging With Monthly Rollups',
          'Monthly Budget vs. Actual Comparison',
          'AI Spending Reflection Prompt. Paste Your Month, Get Honest Insights.',
          '"Safe to Spend" Calculator Based on Your Budget',
          'Savings Goal Tracker With Progress Visualization',
          'No Formulas to Figure Out. Everything Is Pre-Built.',
        ],
      },
      {
        id: 'goal-habit',
        name: 'Goal + Habit System',
        tagline: 'Set Goals That Actually Stick',
        desc: 'Quarterly goals linked to monthly milestones, linked to daily habits. AI goal-setting prompt to start the quarter right, weekly accountability check-in, and a habit tracker with streak tracking built in.',
        price: 27,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Quarterly Goal Framework: Big Goals Broken into 90-Day Plans',
          'Monthly Milestones Linked to Each Quarterly Goal',
          'Daily Habit Tracker With Streak Tracking',
          'AI Quarterly Goal-Setting Prompt to Start Each Quarter Right',
          'Weekly Accountability Check-In Template',
          'Year-in-Review Template for End-of-Year Reflection',
          'Mobile-Friendly for Daily Habit Check-Ins on the Go',
        ],
      },
      {
        id: 'brand-bible',
        name: 'Brand Bible System',
        tagline: 'Your Entire Brand in One Shareable Doc',
        desc: 'Foundation, audience, voice, visuals, pillars, and messaging. All documented. Includes a master AI brand prompt you fill in once and paste into any AI tool to get on-brand content every time.',
        price: 37,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'A Complete Brand Documentation Workspace in Notion',
          'Brand Foundation: Mission, Vision, Values, and Positioning',
          'Audience Personas With Pain Points and Language',
          'Brand Voice Guide With Dos, Don\'ts, and Examples',
          'Visual Identity Section: Palette, Typography, and Aesthetic Notes',
          'Content Pillars and Messaging Framework',
          'Master AI Brand Prompt. Fill In Once, Paste into Any AI Tool Forever.',
          'Shareable Link So Collaborators and VAs Can Access Your Brand',
        ],
      },
    ],
  },
  {
    slug: 'bundles',
    name: 'System Bundles',
    shortName: 'Bundles',
    tagline: 'The Full Stack for One Life Area',
    desc: 'Automation + Notion system, bundled for one goal. Everything done, nothing left to figure out.',
    priceRange: '$67–127',
    gradient: 'from-charcoal/5 to-blush/10',
    products: [
      {
        id: 'brand-bundle',
        name: 'The Brand Bundle',
        tagline: 'Your Brand, Documented and Running on Autopilot',
        desc: 'Brand Bible Notion system + content repurpose workflow + content calendar. Your brand documented once, your content running automatically.',
        price: 87,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Brand Bible System ($37): Your Brand Documented in One Shareable Notion Workspace',
          'Content Repurpose Workflow ($47): One Post → 5 Platforms Automatically',
          'Content Calendar System ($37): Your Full Content Pipeline in Notion',
          'Save $34 vs Buying Separately',
          'Setup Guide for Connecting All Three Together',
          'Brand Launch Checklist Included',
        ],
      },
      {
        id: 'life-admin-bundle',
        name: 'The Life Admin Bundle',
        tagline: 'Your Life, Organised and Running Itself',
        desc: 'Inbox Zero automation + Life OS Notion dashboard + finance tracker. The systems that handle the boring stuff so you can stop thinking about it.',
        price: 87,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Inbox Zero Automation ($47): Your Email Triaged and Drafted Before You Open It',
          'Life OS Dashboard ($47): Your Goals, Habits, Tasks, and Finances in One Notion Page',
          'Finance Tracker ($27): Log Expenses in Seconds, Get Honest AI Spending Insights',
          'Save $34 vs Buying Separately',
          'Integration Guide for Getting All Three Working Together',
          'Weekly Routine Checklist to Get the Most Out of Each System',
        ],
      },
      {
        id: 'content-creator-bundle',
        name: 'The Content Creator Bundle',
        tagline: 'Create Once. Let the Systems Do the Rest.',
        desc: 'Content repurpose workflow + content calendar system + weekly wrap generator. One batch day, and your content runs itself for the week.',
        price: 87,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'Content Repurpose Workflow ($47): One Piece of Content → 5 Platforms Automatically',
          'Content Calendar System ($37): Ideas Vault, Pipeline, and Batch Day Planner in Notion',
          'Weekly Wrap Generator ($27): Your Content Recap Delivered Every Monday Morning',
          'Save $24 vs Buying Separately',
          'Batch Day Guide: How to Use All Three in One 2-Hour Session',
          'Content Strategy Quick-Start Checklist',
        ],
      },
      {
        id: 'job-search-bundle',
        name: 'The Career Bundle',
        tagline: 'Land the Job. Negotiate the Salary. Track Everything.',
        desc: 'Goal + Habit System + Life OS dashboard + a job application tracker Notion template. Every application organised, every milestone tracked.',
        price: 57,
        status: 'coming-soon',
      },
      {
        id: 'full-autopilot',
        name: 'The Full Stack',
        tagline: 'Every System, One Price',
        desc: 'All automations and all Notion systems. The complete lazy girl setup. Everything handled, nothing left to build.',
        price: 197,
        status: 'coming-soon',
      },
    ],
  },
  {
    slug: 'guides',
    name: 'Guides & Playbooks',
    shortName: 'Guides',
    tagline: 'The Fast Track to Actually Knowing What You\'re Doing',
    desc: 'PDFs, prompt books, and short video guides. No courses, no homework. Read it, watch it, use it today.',
    priceRange: '$9–27',
    gradient: 'from-[#FFF0E8]/70 to-sage/15',
    products: [
      {
        id: 'ai-starter-guide',
        name: 'The AI Starter Guide',
        tagline: 'Everything You Need to Know, in One Clean PDF',
        desc: 'Complete beginner? This is your 30-page no-fluff introduction to using AI in your actual life. No course. No videos. No homework. Read it once, use it forever.',
        price: 9,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          '30-Page PDF: Clean, Visual, Easy to Read',
          'What AI Is and Isn\'t (in Plain English, No Jargon)',
          'The 10 Prompts Every Beginner Needs in Their Toolkit',
          'How to Talk to AI Like a Person, Not a Search Engine',
          'Common Mistakes and Exactly How to Avoid Them',
          'Your First Week With AI, Planned Out Step by Step',
          'Instant Download: Available Immediately After Purchase',
        ],
      },
      {
        id: 'prompt-playbook',
        name: 'The Prompt Playbook',
        tagline: '80 Prompts for Your Actual Life, Organised and Ready to Copy',
        desc: 'Every prompt you\'ll need, organised by life area: work, content, money, health, home, and more. Copy, paste, and adapt. No staring at a blank page.',
        price: 17,
        status: 'available',
        popular: true,
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          '80 Ready-to-Use Prompts Across 8 Life Categories',
          'Work: Emails, Meetings, Reports, Performance Reviews',
          'Content: Captions, Hooks, Scripts, Repurposing',
          'Money: Budgets, Savings Plans, Negotiation Scripts',
          'Personal: Decisions, Journalling, Goal-Setting, and More',
          'Tips for Adapting Each Prompt to Your Own Voice',
          'Instant Download as PDF: Use It in ChatGPT or Claude Today',
        ],
      },
      {
        id: 'prompt-formula',
        name: 'The Prompt Formula',
        tagline: 'Stop Getting Generic Answers. Here\'s the Framework.',
        desc: 'Not a list of prompts. A framework for writing prompts that actually work every time. The method behind good AI outputs, explained once so you never have to guess again.',
        price: 12,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          'The 4-Part Prompt Framework That Gets Specific, Useful Answers Every Time',
          'Before and After Examples: Generic Prompt vs. Prompt That Works',
          'How to Give AI the Right Context Without Overexplaining',
          'The Role Technique: How to Get Expert-Level Output from a Single Line',
          'Tone and Voice Instructions: How to Make AI Sound Like You',
          'Evergreen Framework: Works With Any AI Tool, Now and in the Future',
          'Instant Download as PDF',
        ],
      },
      {
        id: 'chatgpt-crash-course',
        name: 'ChatGPT Crash Course',
        tagline: 'Everything That Matters in 15 Minutes',
        desc: 'A short, animated video walkthrough: everything you need to actually use ChatGPT well. No padding, no filler, just the stuff that works.',
        price: 17,
        status: 'coming-soon',
      },
      {
        id: 'first-automation',
        name: 'Your First Automation',
        tagline: 'Build It in 45 Minutes. Run It Forever.',
        desc: 'A short video guide that walks you through building your first Zapier or Make automation from scratch, even if you\'ve never touched one before.',
        price: 27,
        status: 'coming-soon',
      },
      {
        id: 'notion-ai-setup',
        name: 'Notion AI in 30 Minutes',
        tagline: 'Your Second Brain, Set Up and Running Today',
        desc: 'A focused video guide to setting up a Notion workspace with AI built in. Covers the exact setup, prompts, and automations that make it worth using daily.',
        price: 27,
        status: 'coming-soon',
      },
    ],
  },
  {
    slug: 'merch',
    name: 'Merch',
    shortName: 'Merch',
    tagline: 'Wear the Lazy Girl Era',
    desc: 'For when you want everyone to know you\'re running on autopilot. Soft fits, minimal design, maximum lazy girl energy.',
    priceRange: '$8–52',
    gradient: 'from-blush/10 to-sage/15',
    products: [
      {
        id: 'let-ai-do-it-tee',
        name: '"let AI do it" tee',
        tagline: 'Your Entire Personality in Four Words',
        desc: 'Soft unisex tee, crew neck, minimal print on the chest. The answer to every "but how do you get so much done?"',
        price: 32,
        status: 'coming-soon',
      },
      {
        id: 'lazy-but-effective-sweatshirt',
        name: '"lazy but effective" sweatshirt',
        tagline: 'Cozy and Correct',
        desc: 'Oversized pullover in cream. Because efficiency is a vibe and you\'ve mastered it.',
        price: 52,
        status: 'coming-soon',
      },
      {
        id: 'on-autopilot-tote',
        name: '"on autopilot" tote',
        tagline: 'Carry Your Whole Life (Effortlessly)',
        desc: 'Heavyweight canvas tote, natural color. Holds a laptop, your planner, and your complete lack of desire to do things manually.',
        price: 22,
        status: 'coming-soon',
      },
      {
        id: 'lazy-girl-mug',
        name: '"done for you" mug',
        tagline: 'Drink Coffee. Let AI Do the Rest.',
        desc: '15oz ceramic mug in cream. The only mug that gets your morning routine.',
        price: 24,
        status: 'coming-soon',
      },
      {
        id: 'sticker-pack',
        name: 'Lazy Girl AI Sticker Pack',
        tagline: '10 Digital Stickers: Instant Download',
        desc: 'Minimal blush and cream stickers for your planner, laptop, or Notion covers. ✦ marks, lazy girl quotes, and brand icons.',
        price: 8,
        status: 'available',
        kofiUrl: 'https://ko-fi.com/lazygirlai',
        whatYouGet: [
          '10 Digital Stickers as PNG Files With Transparent Backgrounds',
          'Designed in the Lazy Girl AI Brand Palette: Cream, Blush, Sage',
          'Perfect for Notion Covers, Digital Planners, and Laptop Stickers',
          'Instant Download: Delivered Immediately After Purchase',
          'Commercial Use Allowed for Personal Brand Use',
        ],
      },
      {
        id: 'phone-case',
        name: '"lazy girl approved" phone case',
        tagline: 'Officially Certified',
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
