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

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-apps-i-actually-use',
    title: 'the AI apps I actually use every day (and the ones I deleted)',
    excerpt: 'honest review. tried dozens. here is what stayed on my phone and what went straight to the bin.',
    category: 'tools',
    tags: ['apps', 'productivity', 'review'],
    readingTime: 5,
    publishedAt: '2026-05-15',
    coverGradient: 'from-blush-light/60 to-[#FFD7D1]/40',
    coverImage: 'https://images.unsplash.com/photo-1758874384556-cc2b9dcbb6e0?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    content: [
      { type: 'p', text: 'There are hundreds of AI tools that launched in the last year alone. I am not going to pretend I tried all of them. But I tried a lot. Here is what actually stayed.' },

      { type: 'h2', text: 'the keepers' },

      { type: 'h3', text: 'Claude (by Anthropic)' },
      { type: 'p', text: 'My everyday writing and thinking tool. The answers feel considered rather than generated. It does not pad responses with things you did not ask for. For anything that needs nuance, like giving feedback on your own writing, helping you think through a real decision, or drafting something that needs to sound like an actual human, Claude is consistently the best.' },

      { type: 'h3', text: 'Perplexity' },
      { type: 'p', text: 'Think of this as your Google replacement. You get actual answers with sources attached, not just a list of links to click through. The free tier is solid for most everyday searches. Any time I need to research something quickly, this is where I go first.' },

      { type: 'h3', text: 'Canva Magic Studio' },
      { type: 'p', text: 'The AI features inside Canva have gotten genuinely good. Background removal works properly now. Magic Write is decent for first drafts of captions and post descriptions. The one-click resize across platforms saves real time if you are posting on multiple channels. If you are already using Canva, these features are already sitting in your account.' },

      { type: 'h3', text: 'Notion AI' },
      { type: 'p', text: 'If you are in Notion all day, the built-in AI is worth using because it is right there where your notes already are. Good for turning a messy brain dump into a structured plan, summarising a long document into three bullets, and getting a first draft started when you are staring at a blank page.' },

      { type: 'h3', text: 'Opus Clip' },
      { type: 'p', text: 'Takes your long videos and automatically clips the best moments for short-form. It identifies where attention peaks, places captions in a way that looks intentional rather than tacked on, and formats everything for vertical. If you have any long-form content to repurpose, this is the tool that makes it actually worth doing.' },

      { type: 'h2', text: 'the ones I deleted' },

      { type: 'h3', text: 'every AI writing tool that is not Claude or ChatGPT' },
      { type: 'p', text: 'Tried about six. They all produce the same hollow, corporate-sounding output. Not worth paying for separately when ChatGPT and Claude do the same thing better, with more context, and without charging you an extra subscription.' },

      { type: 'h3', text: 'AI schedulers that learn your calendar' },
      { type: 'p', text: 'Three different apps promised to optimise my week automatically. All three moved things around without clear logic and I missed a meeting in the first week of using one of them. Auto-scheduling is not there yet. Deleted all three.' },

      { type: 'h3', text: 'AI note-taking apps' },
      { type: 'p', text: 'The transcriptions were fine. But I never went back to read the AI summaries. If you are someone who regularly reviews your notes, they are probably useful. I am not that person. So they were not useful for me.' },

      { type: 'h2', text: 'the honest summary' },
      { type: 'p', text: 'The tools that stuck are the ones that plug into what I was already doing. Canva with AI features. Notion with AI features. Search with better answers. I did not add new habits. I just made existing habits faster.' },

      { type: 'tip', text: 'You do not need ten AI tools. Start with ChatGPT or Claude, learn what it can actually do, and then add one specific tool only if you have a clear use case for it.' },
    ],
  },

  {
    slug: 'chatgpt-finance-feature-explained',
    title: 'chatgpt just added a finance tab. here is what it actually does',
    excerpt: 'chatgpt pro users can now connect their bank accounts inside chatgpt. here is what it does, what it does not do, and whether it is worth it.',
    category: 'AI updates',
    tags: ['chatgpt', 'finance', 'money', 'updates'],
    readingTime: 4,
    publishedAt: '2026-05-12',
    coverGradient: 'from-[#FFF0E8]/80 to-blush-light/30',
    coverImage: 'https://images.unsplash.com/photo-1681825984459-47ee999da245?w=1200&auto=format&fit=crop&q=80',
    content: [
      { type: 'p', text: 'ChatGPT Pro users in the US just got access to a personal finance dashboard inside ChatGPT. You can connect your bank accounts and investment accounts, see where your money is going, and ask questions about your spending in plain language. Here is what you need to know.' },

      { type: 'h2', text: 'what it actually is' },
      { type: 'p', text: 'You link your financial accounts through a secure connection. ChatGPT pulls in your transactions, bills, subscriptions, and net worth data, then shows you a dashboard sorted by category so you can see where your money went without opening a separate app.' },
      { type: 'p', text: 'From there, you can ask questions like "what did I spend on food last month" or "list all my active subscriptions" and it answers from your actual data. Not made-up examples. Your real numbers.' },

      { type: 'h2', text: 'what works well' },
      { type: 'ul', items: [
        'Clean spending overview sorted by category',
        'Subscription tracking, which catches things most people forgot they signed up for',
        'Plain language questions about your money, with real answers pulled from your accounts',
        'Net worth view that pulls multiple accounts into one place',
        'Follow-up questions work in the same conversation without re-explaining anything',
      ]},

      { type: 'h2', text: 'what it does not do' },
      { type: 'p', text: 'It will tell you upfront that it is not a financial advisor. It will not tell you what to invest in, give tax advice, or make financial decisions for you. Think of it as a smart dashboard rather than a money coach.' },
      { type: 'p', text: 'It is also US only right now and requires a ChatGPT Pro subscription. Free plan users do not have access to this yet.' },

      { type: 'h2', text: 'is it worth upgrading for?' },
      { type: 'p', text: 'If you are already on Pro and you are in the US, connect your accounts and try it for a month. The convenience of asking questions about your money in plain English, without opening three different apps, is genuinely useful for staying aware of your spending without making it a whole project.' },
      { type: 'p', text: 'If you are not on Pro and your bank app is doing the job fine, this is not worth upgrading for on its own. Wait for it to expand to more plans.' },

      { type: 'callout', text: 'To find it: open ChatGPT and look for a Finance tab in the left sidebar. If it is not there yet, it is still rolling out. Check back in a few weeks.' },
    ],
  },

  {
    slug: 'how-to-use-ai-for-job-search',
    title: 'how to use AI to actually get hired in 2026',
    excerpt: 'the job market is tough. AI tools have genuinely changed what you can do on your own. here is the process that actually works.',
    category: 'career',
    tags: ['job search', 'resume', 'career', 'AI tools'],
    readingTime: 6,
    publishedAt: '2026-05-08',
    coverGradient: 'from-sage/20 to-[#C7D1C2]/30',
    coverImage: 'https://images.unsplash.com/photo-1698047681432-006d2449c631?w=1200&auto=format&fit=crop&q=80',
    content: [
      { type: 'p', text: 'The job market is hard right now. That is not a controversial observation. But AI tools have genuinely changed what is possible when you are job searching on your own without a recruiter or career coach. Here is the process that gets results.' },

      { type: 'h2', text: 'step one: fix your resume before you apply to anything' },
      { type: 'p', text: 'Most companies run resumes through ATS software before a human reads them. ATS filters for specific language from the job description. If your resume does not match, it gets filtered out before anyone sees it.' },
      { type: 'p', text: 'Use Jobscan. Paste your resume and the job description. It gives you a match score and tells you exactly what language is missing. Aim for 75% or higher. Rewrite the bullets that do not match using language from the posting until you get there.' },
      { type: 'p', text: 'This sounds tedious. It takes about 15 minutes per application. It is worth it because it is the difference between getting filtered out automatically and getting an actual interview.' },

      { type: 'h3', text: 'for rewriting resume bullets' },
      { type: 'p', text: 'Paste the job description and your rough experience into ChatGPT. Ask it to "rewrite these bullets to match this job description using achievement-focused language and strong action verbs. No filler phrases like team player or detail-oriented." Read through the output and remove anything that does not sound like you actually wrote it.' },

      { type: 'h2', text: 'step two: a cover letter that does not start like everyone else\'s' },
      { type: 'p', text: 'Hiring managers have read "I am writing to express my interest" thousands of times. Start with something specific about the company or the role instead.' },
      { type: 'p', text: 'The prompt that works: "Write me a cover letter for this role. Open with something specific about the company. Lead with what I bring, not what I want. Keep it under 300 words. Do not use \'I am writing to express my interest\' or \'I am passionate about.\' Here is the job description: [paste]. Here is my experience: [paste]."' },
      { type: 'p', text: 'Read it back and edit anything that sounds stiff or generic. Your actual voice needs to come through.' },

      { type: 'h2', text: 'step three: prep for the interview without memorising scripts' },
      { type: 'p', text: 'Prompt: "Act as the hiring manager for [job title] at [company name]. Give me the ten most likely interview questions for this role. For each question, give me a framework for answering it, not a script."' },
      { type: 'p', text: 'Frameworks beat scripts. A script falls apart the moment the interviewer goes off plan. A framework keeps you coherent even when the conversation shifts in an unexpected direction.' },

      { type: 'h2', text: 'step four: negotiate what you are actually worth' },
      { type: 'p', text: 'Look up salary data on Levels.fyi, Glassdoor, or LinkedIn Salary before any negotiation conversation. Know your number and the market range before you walk in.' },
      { type: 'p', text: 'Then ask ChatGPT to write you the exact opening line. Give it your target salary, the current offer, and your situation. Ask for "the word-for-word script to open the salary negotiation, confident tone, no apologising for the ask."' },
      { type: 'p', text: 'The one rule: do not name a number first.' },

      { type: 'tip', text: 'The best use of AI in a job search is not to replace your effort. It is to make four well-targeted applications better than forty generic ones.' },
    ],
  },

  {
    slug: 'content-creator-ai-stack',
    title: 'the content creator AI stack that actually saves time',
    excerpt: '96% of social media managers now use AI tools daily. here is a real stack with what each tool does and how to use them together.',
    category: 'content',
    tags: ['content creation', 'creators', 'tools', 'social media'],
    readingTime: 5,
    publishedAt: '2026-05-05',
    coverGradient: 'from-[#FFE8D6]/50 to-blush/15',
    coverImage: 'https://images.unsplash.com/photo-1759215524472-1b0686fdbd87?w=1200&auto=format&fit=crop&q=80',
    content: [
      { type: 'p', text: '96% of social media managers now use AI tools daily. If you are not sure where to even start, that stat probably feels like pressure. Here is a real stack with what each tool actually does and how they fit together.' },

      { type: 'h2', text: 'for writing: hooks, captions, scripts' },
      { type: 'h3', text: 'ChatGPT or Claude' },
      { type: 'p', text: 'Start every batch day by priming your AI with your brand voice. Paste two or three examples of your own writing and say "this is how I write, match this energy for everything today." Then ask for hooks, caption options, and script outlines.' },
      { type: 'p', text: 'The difference between content that sounds like you and content that sounds like everyone else is entirely in how well you brief the AI before you start. Give it your real voice first. The output will be completely different.' },

      { type: 'h2', text: 'for video' },
      { type: 'h3', text: 'Opus Clip' },
      { type: 'p', text: 'Takes a long video and automatically clips the best moments for Reels and TikTok. It identifies where engagement is highest, formats captions in a way that looks good rather than slapped on, and outputs everything in vertical format. The free plan includes a few exports per month, which is enough to start.' },
      { type: 'p', text: 'If you are making any long-form content, a podcast, a YouTube video, a webinar, this tool changes the math on what repurposing actually costs in time.' },

      { type: 'h3', text: 'HeyGen' },
      { type: 'p', text: 'Lets you create AI avatar videos. Useful for talking-head educational content if you want to scale video output without being on camera every single time. More suited to informational content than lifestyle content, but worth knowing it exists.' },

      { type: 'h2', text: 'for design' },
      { type: 'h3', text: 'Canva Magic Studio' },
      { type: 'p', text: 'The AI features inside Canva are genuinely useful now. Background removal works. Magic Write handles graphic copy and post descriptions. One-click resize adapts a design for every platform. If you are already in Canva, these are already available in your account.' },

      { type: 'h2', text: 'how to use them together on batch day' },
      { type: 'p', text: 'One batch day. Two hours. Here is the order that works:' },
      { type: 'ul', items: [
        'Prime ChatGPT with your brand voice examples',
        'Generate hooks and captions for the week',
        'Record your videos using your best hooks as opening lines',
        'Run any longer videos through Opus Clip for short-form clips',
        'Design graphics in Canva using the captions you already wrote',
        'Schedule everything',
      ]},
      { type: 'p', text: 'AI does not replace the creative work. It removes the friction around doing it. The ideas are yours. The perspective is yours. AI just means you are not staring at a blank screen for an hour before any of it happens.' },

      { type: 'callout', text: 'The content creator advantage in 2026 is not posting more often. It is using AI to make one good idea go further across every platform you are already on. ✦' },
    ],
  },

  {
    slug: 'honest-truth-about-ai-daily-use',
    title: 'what nobody tells you about using AI every day',
    excerpt: 'the hype is real. so is the disappointment when you expect things AI cannot do. here is the honest version.',
    category: 'opinion',
    tags: ['honest take', 'AI reality', 'productivity'],
    readingTime: 4,
    publishedAt: '2026-05-01',
    coverGradient: 'from-charcoal/5 to-blush/10',
    coverImage: 'https://images.unsplash.com/photo-1545239351-c77e88f1c3c8?w=1200&auto=format&fit=crop&q=80',
    content: [
      { type: 'p', text: 'The hype around AI is real. So is the disappointment that comes when you expect it to do things it cannot. Here is the version that does not show up in the marketing.' },

      { type: 'h2', text: 'it is good at tasks you can describe clearly' },
      { type: 'p', text: '"Write me a caption" gets you something generic. "Write me five Instagram captions for a photo of me at a cafe, morning energy, audience is women in their late 20s, tone is warm and real but never preachy, maximum five lines each" gets you something usable.' },
      { type: 'p', text: 'The skill is not really in using AI. The skill is in knowing what you want specifically enough to describe it before you ask.' },

      { type: 'h2', text: 'it makes mistakes and sounds confident about them' },
      { type: 'p', text: 'AI hallucinates. That is the actual technical term for when it makes something up with full confidence. Statistics, dates, specific facts, quotes from real people, all of these can be wrong even when the answer reads like it is definitely true.' },
      { type: 'p', text: 'The new GPT-5.5 model has about 52% fewer hallucinations than earlier versions. That is genuinely better. It is still not zero. Anything you are going to publish publicly, fact-check it yourself.' },

      { type: 'h2', text: 'it cannot replace the things that matter most' },
      { type: 'p', text: 'AI can write a first draft. It cannot give you a point of view. The content that performs is the content with a perspective, a story, an opinion that only you could have. AI can help you write it. It cannot generate it from nothing.' },
      { type: 'p', text: 'Same with relationships. An AI-drafted thank-you email can get you started. The actual relationship with a client, a collaborator, your audience, is yours to build and yours to keep.' },

      { type: 'h2', text: 'the people winning with AI right now' },
      { type: 'p', text: 'They use it like a very fast first draft machine. They put their own thinking in before they ask, and their own judgment after they get the output. They are not outsourcing their brain. They are removing the friction around using it.' },
      { type: 'p', text: 'They also know what good looks like before they ask. If you cannot tell a strong caption from a weak one without AI, learn that first. AI makes your taste faster to execute. It does not replace having taste.' },

      { type: 'tip', text: 'AI works best when you already know what good looks like. Build your judgment first. Then use AI to move faster.' },

      { type: 'h2', text: 'the bottom line' },
      { type: 'p', text: 'AI is genuinely useful. More useful than most people have figured out yet. Also more limited than the marketing suggests. Knowing the difference is the thing that actually makes it worth using.' },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

export function getPostsWithoutContent() {
  return blogPosts.map(({ content: _, ...post }) => post)
}

export function getFeaturedPost(): BlogPost | null {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0] ?? null
}

export function getNonFeaturedPosts() {
  return blogPosts.filter((p) => !p.featured)
}
