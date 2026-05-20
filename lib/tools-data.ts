export type ToolStep = {
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'textarea' | 'select'
  options?: string[]
  hint?: string
}

export type PromptTool = {
  id: string
  name: string
  tagline: string
  type: 'prompt-builder'
  steps: ToolStep[]
  buildPrompt: (a: Record<string, string>) => string
  comingSoon?: false
}

export type ChecklistTool = {
  id: string
  name: string
  tagline: string
  type: 'checklist'
  items: string[]
  comingSoon?: false
}

export type CalculatorItem = { id: string; label: string; hours: number }

export type CalculatorTool = {
  id: string
  name: string
  tagline: string
  type: 'calculator'
  items: CalculatorItem[]
  comingSoon?: false
}

export type ComingSoonTool = {
  id: string
  name: string
  tagline: string
  type: string
  comingSoon: true
}

export type BundleTool = PromptTool | ChecklistTool | CalculatorTool | ComingSoonTool

export type PaidProduct = {
  name: string
  price: number
  href: string
  tag?: string
}

export type Bundle = {
  slug: string
  name: string
  emoji: string
  tagline: string
  desc: string
  gradient: string
  freeTools: BundleTool[]
  paidProducts: PaidProduct[]
}

export const bundles: Bundle[] = [
  {
    slug: 'content-creator',
    name: 'The Content Creator',
    emoji: '✦',
    tagline: 'create more. stress less.',
    desc: 'AI that handles the blank page, the repurposing, the caption writing. You just show up and create.',
    gradient: 'from-blush-light/60 to-[#FFD7D1]/40',
    freeTools: [
      {
        id: 'brand-voice-finder',
        name: 'Brand Voice Finder',
        tagline: 'teach any AI to write exactly like you',
        type: 'prompt-builder',
        steps: [
          { id: 'niche', label: 'what is your niche or content topic?', placeholder: 'e.g. sustainable fashion, budget travel, fitness for moms' },
          { id: 'audience', label: 'who is your audience?', placeholder: 'e.g. women 25–35 who want to look good without overspending' },
          { id: 'vibe', label: 'how would you describe your tone?', placeholder: 'e.g. honest, a little sarcastic, warm but direct, not preachy' },
          { id: 'never', label: 'what should AI never say or do in your content?', placeholder: 'e.g. never use hustle culture language, never be too polished or corporate' },
        ],
        buildPrompt: (a) => `You are my personal brand copywriter. Here is everything you need to know to write like me:

My niche: ${a.niche}
My audience: ${a.audience}
My tone and vibe: ${a.vibe}
What to never do: ${a.never}

From now on, every piece of content you write for me should sound like this — not like generic AI, like me. Before writing anything, ask yourself: would my audience believe a real person wrote this? Is this specific, not vague? Does it match the tone I described?

To confirm you understand, write me three different opening lines for a post about [topic]. Each should feel distinctly like my voice.`,
      },
      {
        id: 'hook-builder',
        name: 'Hook Builder',
        tagline: '10 hooks for any topic, instantly',
        type: 'prompt-builder',
        steps: [
          { id: 'topic', label: 'what is this piece of content about?', placeholder: 'e.g. why I stopped posting every day and my views went up' },
          { id: 'platform', label: 'which platform?', placeholder: 'e.g. TikTok, Instagram Reels, YouTube Shorts, LinkedIn', type: 'select', options: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'LinkedIn', 'Twitter / X', 'Newsletter'] },
          { id: 'audience', label: 'who is watching / reading?', placeholder: 'e.g. women trying to grow their Instagram without burning out' },
        ],
        buildPrompt: (a) => `Write me 10 hooks for a ${a.platform} post about: "${a.topic}"

My audience: ${a.audience}

Rules:
- Each hook should stop the scroll in the first 2 seconds
- Mix formats: some questions, some bold statements, some "here's what nobody tells you" angles, some relatable confessions
- No fluff, no "in today's video" — get straight to the point
- Write for ${a.platform} specifically — match the energy of that platform
- Number each hook 1–10
- After the list, mark your top 3 picks with ⭐ and explain why in one sentence each`,
      },
      {
        id: 'batch-day-checklist',
        name: 'Batch Day Checklist',
        tagline: 'how to use AI on your content batch day',
        type: 'checklist',
        items: [
          'Open ChatGPT and paste your Brand Voice prompt first — prime it before asking for anything',
          'Dump your content ideas for the week (brain dump, no filter)',
          'Ask AI to organize your ideas by pillar and suggest which 3 to prioritize',
          'For each piece: generate 10 hooks, pick your favourite, build from there',
          'Use AI to write first drafts — then rewrite in your own voice (takes 5 mins, not 45)',
          'Ask AI to repurpose each piece: "turn this into a TikTok script / caption / thread / email"',
          'Generate your CTA variations — ask for 5 different ways to end each piece',
          'Create your posting schedule: "here are 6 pieces of content, give me a posting schedule for this week"',
          'Save any prompts that worked well — build your personal prompt library',
          'Close ChatGPT. You\'re done in under 2 hours.',
        ],
      },
      { id: 'caption-rescue', name: 'Caption Rescue', tagline: 'turn a flat caption into 5 that actually perform', type: 'prompt-builder', comingSoon: true },
      { id: 'dm-handler', name: 'DM & Comment Handler', tagline: 'the perfect response to any message', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Content Calendar System', price: 37, href: '/shop/notion-systems/content-calendar', tag: 'start here' },
      { name: 'Content Repurpose Workflow', price: 47, href: '/shop/automations/content-repurpose' },
      { name: 'The Content Creator Bundle', price: 87, href: '/shop/bundles/content-creator-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'business-baddie',
    name: 'The Business Baddie',
    emoji: '◆',
    tagline: 'run your business like you have a team.',
    desc: 'AI handles your emails, your proposals, your operations, your client management. You focus on the work that actually grows it.',
    gradient: 'from-charcoal/6 to-sage/20',
    freeTools: [
      {
        id: 'hard-email-builder',
        name: 'Hard Email Builder',
        tagline: 'the email you\'ve been avoiding — written',
        type: 'prompt-builder',
        steps: [
          {
            id: 'situation',
            label: 'what kind of email is this?',
            placeholder: 'asking for a raise, saying no to a client, following up after being ghosted...',
            type: 'select',
            options: ['Asking for a raise / higher rate', 'Saying no to a client or opportunity', 'Following up after being ghosted', 'Ending a working relationship', 'Chasing an unpaid invoice', 'Handling a client complaint', 'Negotiating terms', 'Apologising professionally'],
          },
          { id: 'context', label: 'give me the key details', placeholder: 'e.g. I\'ve been with this client for 8 months, my rate was $50/hr, I want to move to $75/hr, they\'ve hinted at budget constraints' },
          { id: 'tone', label: 'how do you want to come across?', placeholder: 'e.g. firm but warm, professional not cold, confident not aggressive' },
        ],
        buildPrompt: (a) => `Write me a professional email for this situation: ${a.situation}

Context: ${a.context}

Tone I want: ${a.tone}

Requirements:
- Subject line included
- Get to the point quickly — no waffle
- Sound like a confident human, not a corporate robot
- End with a clear next step or ask
- Keep it under 200 words unless the situation genuinely needs more
- Give me 2 versions: one slightly softer, one slightly more direct. I'll pick which fits.`,
      },
      {
        id: 'pricing-calculator',
        name: 'Pricing Reality Check',
        tagline: 'figure out what you actually need to charge',
        type: 'calculator',
        items: [
          { id: 'client-calls', label: 'Client calls and meetings per week', hours: 3 },
          { id: 'admin', label: 'Admin, invoicing, and admin tasks', hours: 2 },
          { id: 'emails', label: 'Client email and communication', hours: 2 },
          { id: 'proposals', label: 'Writing proposals and pitching', hours: 1.5 },
          { id: 'delivery', label: 'Actual client delivery work', hours: 10 },
          { id: 'marketing', label: 'Marketing and content for your business', hours: 2 },
          { id: 'learning', label: 'Learning and staying current', hours: 1.5 },
          { id: 'revisions', label: 'Revisions and client feedback rounds', hours: 2 },
        ],
      },
      {
        id: 'sop-builder',
        name: 'SOP Builder',
        tagline: 'turn any process into a repeatable system',
        type: 'prompt-builder',
        steps: [
          { id: 'process', label: 'what process do you want to document?', placeholder: 'e.g. how I onboard a new client, how I deliver a completed project, how I handle a refund request' },
          { id: 'currentSteps', label: 'walk me through what you currently do (messy is fine)', placeholder: 'e.g. I get a contract signed, then I send a welcome email, then I set up a shared folder, then I send a questionnaire...' },
          { id: 'whoFollows', label: 'who will follow this SOP?', placeholder: 'e.g. just me, a VA I\'m hiring, a future team member, a replacement when I\'m on holiday' },
        ],
        buildPrompt: (a) => `Help me turn this process into a clear, repeatable SOP (Standard Operating Procedure).

Process: ${a.process}
What I currently do: ${a.currentSteps}
Who will follow this: ${a.whoFollows}

Create:
1. A clean, numbered step-by-step SOP — every action clearly stated, nothing assumed
2. For each step, include: what to do, where to do it (tool/platform), and how long it should take
3. Add decision points — if X happens, do Y. If Z happens, do W.
4. List what tools, logins, or resources are needed before starting
5. A "done looks like" description — how to know the process is complete and correct
6. Flag the 2–3 steps most likely to go wrong, and how to handle them
7. Format the final SOP so it can be copied into Notion or a Google Doc and used immediately`,
      },
      {
        id: 'client-onboarding-checklist',
        name: 'Client Onboarding Checklist',
        tagline: 'what to do every time you sign a new client',
        type: 'checklist',
        items: [
          'Send the contract — use AI to draft any custom clauses you need',
          'Collect the signed contract + payment (or first invoice) before starting work',
          'Send a welcome email — introduce yourself properly, set expectations, share next steps',
          'Create a shared folder (Google Drive or Dropbox) with the client\'s name',
          'Send the onboarding questionnaire — AI can generate one customised to your service',
          'Set up the project in your task manager (Notion, Asana, Trello) with deadlines',
          'Schedule the kickoff call — agenda ready, 30 minutes max',
          'Add the client to your CRM or client tracker with their contact + contract details',
          'Set a reminder for the halfway check-in and the final delivery date',
          'After kickoff: send a recap email — "here\'s what we agreed, here\'s what\'s next"',
        ],
      },
      {
        id: 'collab-pitch-builder',
        name: 'Pitch & Proposal Builder',
        tagline: 'outreach and proposals that actually get replies',
        type: 'prompt-builder',
        steps: [
          { id: 'whoYouAre', label: 'describe your business and what you offer', placeholder: 'e.g. I\'m a brand designer specialising in e-commerce brands, 3 years experience, worked with 25+ clients' },
          { id: 'who', label: 'who are you pitching to?', placeholder: 'e.g. a sustainable skincare brand I\'ve been following, they recently rebranded but the website still feels off' },
          { id: 'ask', label: 'what are you proposing?', placeholder: 'e.g. a full website redesign including brand refresh, 4-week project, $3,500' },
        ],
        buildPrompt: (a) => `Write me a pitch email and a proposal outline for this potential client.

About my business: ${a.whoYouAre}
Who I'm pitching: ${a.who}
What I'm proposing: ${a.ask}

Pitch email:
- Under 150 words, gets straight to value
- Personal — reference something specific about their business
- Clear about what I'm offering and why them, why now
- Ends with one low-friction ask

Proposal outline (for follow-up):
- Executive summary in 3 sentences
- The problem I'm solving for them
- My proposed solution and deliverables
- Timeline with phases
- Investment (how to present the price confidently)
- What happens next (clear CTA)
- 3 objections they might have and pre-emptive answers`,
      },
      {
        id: 'business-ai-checklist',
        name: 'AI for Your Business Checklist',
        tagline: 'what to set up in your first week',
        type: 'checklist',
        items: [
          'Set up ChatGPT custom instructions with your business name, niche, and tone',
          'Write your "brand voice prompt" once — save it to use at the start of every session',
          'Create a template for your most-sent email (inquiry response, proposal, follow-up)',
          'Ask AI to rewrite your bio for every platform you\'re on',
          'Use AI to audit your current offers — "here\'s what I sell, what\'s missing or unclear?"',
          'Generate 30 content ideas for your niche — pick the 5 best',
          'Draft your FAQ page using AI — feed it your most common client questions',
          'Build one SOP using the SOP Builder above — start with your client onboarding',
          'Create a pricing sheet — ask AI "am I charging enough for what I do?"',
          'Schedule 2 hours/week as your AI work session — batch, don\'t sprinkle',
        ],
      },
      { id: 'customer-service-builder', name: 'Customer Service Reply Builder', tagline: 'the professional response to any client situation', type: 'prompt-builder', comingSoon: true },
      { id: 'finance-snapshot', name: 'Business Finance Snapshot', tagline: 'understand your numbers in plain English', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Brand Bible System', price: 37, href: '/shop/notion-systems/brand-bible', tag: 'start here' },
      { name: 'Inbox Zero System', price: 47, href: '/shop/automations/inbox-zero' },
      { name: 'The Brand Bundle', price: 87, href: '/shop/bundles/brand-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'ig-queen',
    name: 'The IG & Photography Queen',
    emoji: '◇',
    tagline: 'your feed, your aesthetic, on autopilot.',
    desc: 'AI for captions that sound like you, strategies that actually work, and pitches brands actually reply to.',
    gradient: 'from-[#FFD7D1]/50 to-blush/15',
    freeTools: [
      {
        id: 'ig-caption-builder',
        name: 'IG Caption Builder',
        tagline: 'a caption that sounds like you, not like AI',
        type: 'prompt-builder',
        steps: [
          { id: 'photoDesc', label: 'describe the photo or reel', placeholder: 'e.g. mirror selfie in my apartment, soft morning light, wearing beige co-ord' },
          { id: 'vibe', label: 'what mood or message do you want to land?', placeholder: 'e.g. slow morning energy, feeling good lately, gentle reminder to rest' },
          { id: 'voice', label: 'describe your caption style', placeholder: 'e.g. short and poetic, conversational and funny, mix of relatable and aspirational' },
          { id: 'cta', label: 'any call to action? (optional)', placeholder: 'e.g. link in bio, save this, comment your answer, or leave blank' },
        ],
        buildPrompt: (a) => `Write me 5 Instagram captions for this photo: ${a.photoDesc}

The mood / message I want to convey: ${a.vibe}
My caption style: ${a.voice}
${a.cta ? `CTA to include: ${a.cta}` : 'No CTA needed.'}

Rules:
- Each caption should sound like a real person wrote it, not AI
- Vary the length — give me 2 short (under 3 lines), 2 medium, 1 longer storytelling version
- No clichés ("blessed", "living my best life", "Monday vibes")
- No excessive emojis — use them like I would in a text to a friend: sparingly and purposefully
- Number each caption 1–5 and note the vibe of each in brackets`,
      },
      {
        id: 'bio-rewriter',
        name: 'Bio Rewriter',
        tagline: '5 versions of your bio that actually convert',
        type: 'prompt-builder',
        steps: [
          { id: 'currentBio', label: 'paste your current bio (or describe yourself)', placeholder: 'e.g. "photographer & content creator 📸 lifestyle • travel • fashion DMs open for collabs"' },
          { id: 'audience', label: 'who should your bio speak to?', placeholder: 'e.g. brands looking to hire me, women who want to improve their photography, people considering a preset purchase' },
          { id: 'goal', label: 'what should your bio make people do?', placeholder: 'e.g. follow me, click the link, DM me for rates' },
        ],
        buildPrompt: (a) => `Rewrite this Instagram bio 5 different ways:

Current bio: "${a.currentBio}"
Target audience: ${a.audience}
Goal of the bio: ${a.goal}

Requirements:
- Stay under 150 characters each (Instagram limit)
- Each version should have a different angle: one focused on what I do, one on who I help, one personality-forward, one achievement/credibility, one curiosity-driven
- Include a subtle CTA or value prop in each
- No generic phrases like "living my best life" or "✨"
- Label each version with its angle so I can pick the right one`,
      },
      {
        id: 'photo-prompt-generator',
        name: 'Photo Shot Prompt Generator',
        tagline: 'describe the shot you want — get a full image-gen prompt',
        type: 'prompt-builder',
        steps: [
          {
            id: 'subject',
            label: 'what is in the shot?',
            placeholder: 'e.g. me sitting at a cafe window, a flat lay of my desk and coffee, my outfit from behind walking through a market',
          },
          {
            id: 'style',
            label: 'what aesthetic do you want?',
            placeholder: 'pick the vibe...',
            type: 'select',
            options: ['Editorial', 'Golden Hour', 'Clean & Minimal', 'Dark & Moody', 'Candid Film', 'Bright & Airy', 'Cinematic'],
          },
          {
            id: 'lighting',
            label: 'what kind of lighting?',
            placeholder: 'pick the lighting...',
            type: 'select',
            options: ['Natural window light', 'Golden hour', 'Soft studio', 'Blue hour', 'Overcast natural', 'Neon / night'],
          },
          {
            id: 'palette',
            label: 'color palette / tones',
            placeholder: 'pick your palette...',
            type: 'select',
            options: ['Warm & creamy', 'Cool & muted', 'High contrast', 'Soft pastels', 'Earth tones', 'Monochromatic'],
          },
          {
            id: 'framing',
            label: 'how should it be framed?',
            placeholder: 'pick the shot type...',
            type: 'select',
            options: ['Close-up portrait', 'Medium shot', 'Full body / wide', 'Flat lay / overhead', 'Low angle'],
          },
        ],
        buildPrompt: (a) => {
          const styleGuide: Record<string, string> = {
            'Editorial': 'editorial fashion photography, high-end magazine aesthetic, intentional and composed',
            'Golden Hour': 'golden hour photography, warm sun rays, soft lens flare, dreamy bokeh',
            'Clean & Minimal': 'clean minimal photography, neutral background, uncluttered composition, white space',
            'Dark & Moody': 'dark moody photography, deep shadows, rich saturation, brooding atmosphere',
            'Candid Film': 'candid film photography aesthetic, grain and texture, natural imperfection, lomography',
            'Bright & Airy': 'bright airy photography, lifted shadows, soft highlights, light and fresh',
            'Cinematic': 'cinematic photography, widescreen quality, film color grade, narrative mood',
          }
          const lightingGuide: Record<string, string> = {
            'Natural window light': 'soft natural window light, diffused indirect daylight, gentle directional shadows',
            'Golden hour': 'warm golden hour sunlight, directional low sun, long shadows, glowing warmth',
            'Soft studio': 'soft studio lighting, beauty dish, even professional illumination, no harsh shadows',
            'Blue hour': 'blue hour twilight, cool ambient light, dusk atmosphere, gentle evening glow',
            'Overcast natural': 'overcast sky, flat even natural light, no harsh shadows, cool soft diffusion',
            'Neon / night': 'neon artificial light, mixed urban light sources, night atmosphere, colored reflections',
          }
          const colorGuide: Record<string, string> = {
            'Warm & creamy': 'warm cream color palette, ivory and sand tones, golden warmth throughout',
            'Cool & muted': 'cool muted color grade, desaturated palette, faded film color look',
            'High contrast': 'high contrast, deep blacks and bright highlights, punchy and bold',
            'Soft pastels': 'soft pastel palette, gentle pinks and lilacs, romantic and delicate tones',
            'Earth tones': 'earthy terracotta and warm brown palette, organic and grounded color story',
            'Monochromatic': 'monochromatic palette, tonal variations within a single color family',
          }
          const framingGuide: Record<string, string> = {
            'Close-up portrait': 'close-up portrait framing, 85mm lens equivalent, shallow depth of field, face or detail sharp',
            'Medium shot': 'medium shot framing, waist up, 50mm lens equivalent, subject clearly composed',
            'Full body / wide': 'full body shot in environment, 35mm equivalent, subject and surroundings in frame',
            'Flat lay / overhead': 'overhead flat lay, birds-eye view, perfectly arranged composition, centered and balanced',
            'Low angle': 'low angle shot, camera angled upward, elongating perspective, powerful and commanding',
          }
          return `${a.subject}, ${styleGuide[a.style] || a.style}, ${lightingGuide[a.lighting] || a.lighting}, ${colorGuide[a.palette] || a.palette}, ${framingGuide[a.framing] || a.framing}, instagram photography, ultra high resolution, professional color grading, shot on Sony A7IV or Canon R5, sharp focus on subject, depth of field --ar 4:5 --style raw

HOW TO USE:
1. Copy the full prompt above
2. Open Midjourney, Ideogram, or Leonardo AI
3. Upload a reference photo of yourself or the scene (use as image reference for best results)
4. Paste the prompt and generate
5. To lock a style you like, note the seed number and reuse it`
        },
      },
      { id: 'hashtag-guide', name: 'Hashtag Strategy Guide', tagline: 'how to use AI to find hashtags that actually work', type: 'prompt-builder', comingSoon: true },
      { id: 'pr-tracker', name: 'PR & Collab Tracker', tagline: 'your brand deal pipeline, organised', type: 'checklist', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Brand Bible System', price: 37, href: '/shop/notion-systems/brand-bible', tag: 'start here' },
      { name: 'Content Calendar System', price: 37, href: '/shop/notion-systems/content-calendar' },
      { name: 'The Brand Bundle', price: 87, href: '/shop/bundles/brand-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'corporate-girlie',
    name: 'The Corporate Girlie',
    emoji: '▲',
    tagline: 'get the job. get the raise. get out on time.',
    desc: 'AI as your career coach, your negotiation prep, your cover letter writer. Work smarter, not longer.',
    gradient: 'from-sage/25 to-[#C7D1C2]/35',
    freeTools: [
      {
        id: 'cover-letter-builder',
        name: 'Cover Letter Prompt Builder',
        tagline: 'a tailored cover letter in under 5 minutes',
        type: 'prompt-builder',
        steps: [
          { id: 'jobDesc', label: 'paste the job description (or key requirements)', placeholder: 'paste the relevant parts of the job posting here' },
          { id: 'experience', label: 'what\'s your most relevant experience for this role?', placeholder: 'e.g. 3 years in B2B marketing, led a team of 4, grew email list from 2k to 20k' },
          { id: 'why', label: 'why do you actually want this specific role / company?', placeholder: 'be honest — the more specific, the better the letter' },
        ],
        buildPrompt: (a) => `Write me a tailored cover letter for this job.

Job description / requirements:
${a.jobDesc}

My relevant experience:
${a.experience}

Why I want this role:
${a.why}

Requirements:
- Under 300 words — hiring managers don't read long letters
- First paragraph: hook them with one specific, compelling reason I'm right for this role
- Second paragraph: 2–3 concrete examples from my experience that match their needs
- Third paragraph: why this company specifically (use what I told you — don't make it up)
- Closing: confident, not desperate. Clear next step.
- Tone: professional but human. Not robotic. Like I actually wrote it.
- Do NOT start with "I am writing to express my interest in..."`,
      },
      {
        id: 'negotiation-prep',
        name: 'Negotiation Prep Builder',
        tagline: 'walk into that conversation ready',
        type: 'prompt-builder',
        steps: [
          { id: 'situation', label: 'what are you negotiating?', placeholder: 'e.g. salary for a new job offer, annual raise, promotion, freelance rate increase' },
          { id: 'numbers', label: 'what are the numbers involved?', placeholder: 'e.g. they offered $85k, I want $95k, market rate is $88–98k for my role and city' },
          { id: 'worries', label: 'what are you most worried about in this conversation?', placeholder: 'e.g. they\'ll say no and rescind the offer, I\'ll freeze up, I don\'t know how to respond if they push back' },
        ],
        buildPrompt: (a) => `I need to prepare for a negotiation. Act as my negotiation coach.

What I'm negotiating: ${a.situation}
The numbers: ${a.numbers}
My biggest worries: ${a.worries}

Please:
1. Give me my opening script — exactly what to say to open the negotiation conversation (word for word)
2. Give me 3 different ways to state my ask, from most direct to most conversational
3. Prepare me for their 3 most likely pushbacks and give me a response to each
4. Tell me what to do if they say they need to "check with HR / their manager"
5. Tell me what NOT to say (common mistakes that weaken the position)
6. End with: what does winning look like here, and what\'s my walkaway point?`,
      },
      { id: 'resume-bullets', name: 'Resume Bullet Rewriter', tagline: 'weak bullets in, strong bullets out', type: 'prompt-builder', comingSoon: true },
      { id: 'interview-prep', name: 'Interview Prep Builder', tagline: 'prep for any interview in 20 minutes', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Goal + Habit System', price: 27, href: '/shop/notion-systems/goal-habit', tag: 'track your progress' },
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os' },
      { name: 'The Career Bundle', price: 57, href: '/shop/bundles/job-search-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'life-admin',
    name: 'The Life Admin Girlie',
    emoji: '○',
    tagline: 'your life, running itself.',
    desc: 'AI takes the boring stuff — emails, decisions, planning — so you can spend your energy on literally anything else.',
    gradient: 'from-[#FFF0E8]/80 to-blush-light/25',
    freeTools: [
      {
        id: 'custom-instructions-builder',
        name: 'Custom Instructions Builder',
        tagline: 'set up ChatGPT once, get better answers forever',
        type: 'prompt-builder',
        steps: [
          { id: 'aboutYou', label: 'tell ChatGPT about you', placeholder: 'e.g. I\'m a 28-year-old marketing manager, side hustling as a content creator, based in Manila, no kids, dog mom' },
          { id: 'howYouThink', label: 'how do you like information presented?', placeholder: 'e.g. give me bullet points, not walls of text. Short answers first, expand if I ask. No jargon.' },
          { id: 'neverDo', label: 'what should ChatGPT never do?', placeholder: 'e.g. don\'t add disclaimers, don\'t tell me to consult a professional for basic questions, don\'t be preachy' },
          { id: 'alwaysDo', label: 'what should ChatGPT always do?', placeholder: 'e.g. be direct, give me options when relevant, ask clarifying questions before long answers' },
        ],
        buildPrompt: (a) => `Here are your ChatGPT Custom Instructions — paste these exactly into Settings → Personalization → Custom Instructions.

---
WHAT CHATGPT SHOULD KNOW ABOUT ME:
${a.aboutYou}

HOW I WANT RESPONSES:
${a.howYouThink}

ALWAYS:
${a.alwaysDo}

NEVER:
${a.neverDo}
---

After saving, test it by asking ChatGPT: "Based on what you know about me, what are 3 ways AI could make my week easier?" — it should now give you a personalised answer.`,
      },
      {
        id: 'time-saved-calculator',
        name: 'Time Saved Calculator',
        tagline: 'see exactly what AI could take off your plate',
        type: 'calculator',
        items: [
          { id: 'emails', label: 'Writing and replying to emails', hours: 3 },
          { id: 'planning', label: 'Weekly planning and scheduling', hours: 2 },
          { id: 'research', label: 'Researching things (products, decisions, topics)', hours: 2 },
          { id: 'content', label: 'Writing captions, posts, or messages', hours: 3 },
          { id: 'admin', label: 'Life admin (bookings, forms, organising)', hours: 2 },
          { id: 'decisions', label: 'Overthinking decisions you could just ask AI', hours: 1.5 },
          { id: 'reports', label: 'Writing reports, summaries, or recaps', hours: 2 },
          { id: 'learning', label: 'Learning something new (could use AI to speed this up)', hours: 2 },
        ],
      },
      {
        id: 'weekly-reset-checklist',
        name: 'Weekly Reset Checklist',
        tagline: 'your Sunday routine with AI built in',
        type: 'checklist',
        items: [
          'Open ChatGPT. Start with: "I\'m doing my weekly reset. Ask me 5 questions about my week."',
          'Brain dump everything still on your mind into ChatGPT — let it help you clear it',
          'Review last week: ask AI "here\'s what I did this week [list]. What patterns do you notice?"',
          'Set 3 priorities for the coming week — ask AI to pressure-test them: "are these the right 3?"',
          'Block your calendar for those 3 priorities first, before anything else goes in',
          'Review your inbox and ask AI to help draft any replies you\'ve been avoiding',
          'Check your finances — 5 minutes, not an audit. Ask AI to analyse any categories you\'re confused about.',
          'Prep anything you\'ve been procrastinating: ask AI to break it into the smallest possible first step',
          'Set your phone to Do Not Disturb for the first hour of Monday morning',
          'Close your laptop. The week is ready.',
        ],
      },
      { id: 'ai-readiness-quiz', name: 'AI Readiness Quiz', tagline: 'top 3 things AI could take over in your life right now', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os', tag: 'start here' },
      { name: 'Finance Tracker', price: 27, href: '/shop/notion-systems/finance-tracker' },
      { name: 'The Life Admin Bundle', price: 87, href: '/shop/bundles/life-admin-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'mom-girlie',
    name: 'The Mom Girlie',
    emoji: '♡',
    tagline: 'you do enough. let AI do the rest.',
    desc: 'The mental load is real. AI handles the meal planning, the school emails, the research, the scheduling — so you can just be present.',
    gradient: 'from-[#FFE8D6]/60 to-[#FFD7D1]/30',
    freeTools: [
      {
        id: 'family-meal-planner',
        name: 'Family Meal Planner Builder',
        tagline: 'a full week of dinners in 2 minutes',
        type: 'prompt-builder',
        steps: [
          { id: 'kids', label: 'how many kids, and rough ages?', placeholder: 'e.g. 2 kids, ages 4 and 8' },
          { id: 'restrictions', label: 'any allergies, dislikes, or dietary needs?', placeholder: 'e.g. one is allergic to nuts, the other refuses anything green, husband is dairy-free' },
          { id: 'effort', label: 'how much cooking time do you realistically have on weeknights?', placeholder: 'e.g. 20–30 minutes max, I need at least 2 no-cook nights' },
          { id: 'budget', label: 'any budget or pantry notes?', placeholder: 'e.g. trying to keep it under $150/week, I usually have pasta, rice, and canned tomatoes stocked' },
        ],
        buildPrompt: (a) => `Plan my family's meals for the week.

Family: ${a.kids}
Restrictions and dislikes: ${a.restrictions}
Weeknight cooking time: ${a.effort}
Budget / pantry: ${a.budget}

Give me:
- 5 weeknight dinners (realistic, not Pinterest-level effort)
- 1 easy weekend lunch idea
- 1 weekend dinner that's slightly more fun (but still doable)
- A consolidated grocery list, organised by section (produce, protein, pantry, dairy)
- Mark which meals can be prepped ahead on Sunday
- Flag any meals that make good leftovers for lunch the next day

Make these meals things kids will actually eat, not aspirational food content.`,
      },
      {
        id: 'school-email-drafter',
        name: 'School Email Drafter',
        tagline: 'the professional parent email, written',
        type: 'prompt-builder',
        steps: [
          {
            id: 'situation',
            label: 'what\'s the email about?',
            placeholder: 'choose or describe...',
            type: 'select',
            options: ['Reporting an absence', 'Following up on a concern about my child', 'Raising an issue with a teacher', 'Requesting a meeting', 'Responding to a complaint about my child', 'Asking about grades or progress', 'Introducing a change in circumstances', 'Other'],
          },
          { id: 'details', label: 'give me the key details', placeholder: 'e.g. my son missed Monday and Tuesday due to fever, I need to inform his teacher and ask for missed work' },
          { id: 'tone', label: 'how do you want to come across?', placeholder: 'e.g. polite but firm, warm and apologetic, professional and brief' },
        ],
        buildPrompt: (a) => `Write me a professional parent email to a school / teacher.

Situation: ${a.situation}
Details: ${a.details}
Tone: ${a.tone}

Requirements:
- Include: Subject line, greeting, body, professional closing
- Under 150 words unless the situation genuinely needs more
- Polite but clear — no grovelling, no aggression
- Make it sound like a confident, organised parent wrote it
- Give me 2 versions: one slightly more formal, one slightly warmer. I'll pick.`,
      },
      { id: 'activity-finder', name: 'Activity Finder Prompt', tagline: 'find the right activity for your kid in seconds', type: 'prompt-builder', comingSoon: true },
      { id: 'mom-checklist', name: 'AI for Moms Checklist', tagline: '10 things to hand to AI this week', type: 'checklist', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os', tag: 'start here' },
      { name: 'Goal + Habit System', price: 27, href: '/shop/notion-systems/goal-habit' },
      { name: 'The Life Admin Bundle', price: 87, href: '/shop/bundles/life-admin-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'pcos-girlie',
    name: 'The PCOS Girlie',
    emoji: '◉',
    tagline: 'the research partner you actually deserve.',
    desc: 'AI for symptom tracking, understanding your labs, building a protocol that works for your body. Evidence-based, no doom-scrolling.',
    gradient: 'from-[#EDE0F5]/40 to-sage/20',
    freeTools: [
      {
        id: 'symptom-tracker-prompt',
        name: 'Symptom Tracker Prompt Builder',
        tagline: 'track what\'s actually happening with your body',
        type: 'prompt-builder',
        steps: [
          { id: 'symptoms', label: 'what symptoms are you currently experiencing?', placeholder: 'e.g. irregular periods, hair thinning, fatigue, bloating, cravings, acne on jawline' },
          { id: 'cycle', label: 'describe your cycle if relevant', placeholder: 'e.g. 45–60 day cycles, last period was 6 weeks ago, spotting sometimes' },
          { id: 'lifestyle', label: 'briefly describe your current diet and lifestyle', placeholder: 'e.g. mostly eating carbs, not exercising much, high stress at work, sleeping 5–6 hours' },
          { id: 'diagnosed', label: 'have you been diagnosed? any known labs or context?', placeholder: 'e.g. diagnosed 2 years ago, high testosterone on last test, currently not on any medication' },
        ],
        buildPrompt: (a) => `Act as a knowledgeable PCOS research assistant. You are not replacing my doctor — you are helping me understand my body better and prepare smarter for my appointments.

My current symptoms: ${a.symptoms}
My cycle: ${a.cycle}
My lifestyle: ${a.lifestyle}
Diagnosis / history: ${a.diagnosed}

Please:
1. Help me identify which PCOS type my symptoms most align with (insulin-resistant, adrenal, inflammatory, or post-pill) — explain what this means in plain language
2. Based on what I've described, what are the top 3 lifestyle factors that may be driving my symptoms?
3. What questions should I ask my doctor at my next appointment?
4. What blood tests are worth requesting that I may not have had?
5. What are the most evidence-backed interventions for my symptom profile? (cite the type of evidence — don't just say "studies show")
6. What should I track over the next 30 days to bring useful data to my next appointment?`,
      },
      {
        id: 'explain-my-labs',
        name: '"Explain My Labs" Builder',
        tagline: 'understand your bloodwork in plain English',
        type: 'prompt-builder',
        steps: [
          { id: 'labs', label: 'paste your lab results (or key values)', placeholder: 'e.g. Testosterone: 85 ng/dL (ref: 15–70), DHEA-S: 320 mcg/dL (ref: 35–430), Fasting insulin: 18 mIU/L (ref: 2–19.6), HbA1c: 5.4%' },
          { id: 'concerns', label: 'what are you most confused or worried about?', placeholder: 'e.g. my testosterone is flagged as high but only slightly, my doctor said it\'s fine but I still feel terrible' },
        ],
        buildPrompt: (a) => `Act as a knowledgeable health educator helping me understand my lab results. You are not diagnosing me — you are helping me understand what these numbers mean so I can have a better conversation with my doctor.

My lab results:
${a.labs}

What I'm concerned about: ${a.concerns}

Please:
1. Explain each value in plain language — what does it measure, what does mine mean?
2. Flag anything that is technically "in range" but worth discussing with a doctor
3. Explain how these values relate to each other (e.g. insulin and testosterone connection)
4. Tell me: if I were to improve these numbers through lifestyle, where would I start and why?
5. Write me 3 specific questions to ask my doctor about these results
6. What additional tests would give me a fuller picture?`,
      },
      { id: 'pcos-meal-plan', name: 'PCOS Meal Plan Builder', tagline: 'anti-inflammatory eating, made simple', type: 'prompt-builder', comingSoon: true },
      { id: 'doctor-prep', name: 'Doctor Appointment Prep', tagline: 'walk in knowing exactly what to say', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os', tag: 'track everything' },
      { name: 'Goal + Habit System', price: 27, href: '/shop/notion-systems/goal-habit' },
      { name: 'Finance Tracker', price: 27, href: '/shop/notion-systems/finance-tracker' },
    ],
  },

  {
    slug: 'fit-girlie',
    name: 'The Fit Girlie',
    emoji: '◈',
    tagline: 'your goals. your plan. actually done for you.',
    desc: 'AI as your personal trainer, nutritionist, and accountability partner. No guessing, no cookie-cutter plans.',
    gradient: 'from-sage/30 to-[#C7D1C2]/45',
    freeTools: [
      {
        id: 'workout-plan-builder',
        name: 'Workout Plan Builder',
        tagline: 'a program built for your actual life',
        type: 'prompt-builder',
        steps: [
          { id: 'goal', label: 'what\'s your main goal right now?', placeholder: 'e.g. lose body fat, build muscle, run a 5K, get stronger, feel less exhausted', type: 'select', options: ['Lose body fat', 'Build muscle / tone up', 'Improve strength', 'Improve cardio / endurance', 'Feel more energetic', 'Train for a specific event', 'General health and consistency'] },
          { id: 'equipment', label: 'what do you have access to?', placeholder: 'e.g. full gym, home with dumbbells and resistance bands, just my body weight' },
          { id: 'time', label: 'how many days per week and how long per session?', placeholder: 'e.g. 4 days, 45 minutes max. I have Monday, Wednesday, Friday, Saturday.' },
          { id: 'level', label: 'describe your current fitness level and any injuries', placeholder: 'e.g. intermediate, been training on and off for 2 years, bad left knee so no heavy squats' },
        ],
        buildPrompt: (a) => `Build me a personalised workout program.

My goal: ${a.goal}
Equipment available: ${a.equipment}
Schedule: ${a.time}
Level and limitations: ${a.level}

Create:
- A full weekly program with specific exercises, sets, reps, and rest times for each session
- A warm-up routine (under 5 minutes) I can use for every session
- Progressive overload guidance — how should I increase difficulty week over week?
- What to do on rest days (active recovery options)
- The 3 most important things to track to know this program is working
- A "minimum effective dose" version for weeks when life gets in the way (1–2 sessions only)

Make it realistic — I want to actually stick to this, not burn out by week 3.`,
      },
      {
        id: 'macro-builder',
        name: 'Macro & Nutrition Prompt Builder',
        tagline: 'eat to support your goals, without obsessing',
        type: 'prompt-builder',
        steps: [
          { id: 'stats', label: 'your basics', placeholder: 'e.g. 5\'5", 65kg, 28 years old, female' },
          { id: 'goal', label: 'what\'s your nutrition goal?', placeholder: 'e.g. lose fat without losing muscle, eat more protein without meal prepping all day, stop the 3pm crash' },
          { id: 'lifestyle', label: 'describe your eating habits honestly', placeholder: 'e.g. I skip breakfast, eat a big lunch, snack constantly in the afternoon, have a normal dinner' },
          { id: 'restrictions', label: 'any food restrictions or things you don\'t like?', placeholder: 'e.g. vegetarian, hate fish, lactose intolerant, obsessed with rice and can\'t give it up' },
        ],
        buildPrompt: (a) => `Act as a nutrition coach helping me eat in a way that supports my goals without making food stressful.

My basics: ${a.stats}
My goal: ${a.goal}
My current eating habits: ${a.lifestyle}
Restrictions / preferences: ${a.restrictions}

Please:
1. Calculate my approximate TDEE and suggest a realistic calorie target for my goal
2. Recommend a macro split (protein / carbs / fat) with the reasoning
3. Give me a sample day of eating that hits those macros with foods I'll actually eat
4. Tell me the 2–3 highest-impact nutrition changes based on my current habits
5. Suggest 5 high-protein meals or snacks that require minimal effort
6. What should I track (if anything) and what's not worth obsessing over?`,
      },
      { id: 'progress-journal', name: 'Progress Journal Prompt', tagline: 'check in with your body, not just the scale', type: 'prompt-builder', comingSoon: true },
      { id: 'supplement-research', name: 'Supplement Research Prompter', tagline: 'what\'s actually worth taking', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Goal + Habit System', price: 27, href: '/shop/notion-systems/goal-habit', tag: 'track your training' },
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os' },
      { name: 'The Life Admin Bundle', price: 87, href: '/shop/bundles/life-admin-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'side-hustle',
    name: 'The Side Hustle Girlie',
    emoji: '◆',
    tagline: 'build faster. on your lunch break.',
    desc: 'AI compresses the time between idea and income. Your Etsy, your coaching, your freelance — moving while you\'re at your 9-5.',
    gradient: 'from-blush-light/40 to-[#FFF0E8]/70',
    freeTools: [
      {
        id: 'offer-builder',
        name: 'Offer Builder',
        tagline: 'turn your skill into something people will pay for',
        type: 'prompt-builder',
        steps: [
          { id: 'skill', label: 'what can you do really well?', placeholder: 'e.g. I\'m a graphic designer by day, I write really good copy, I\'m great at organising systems and workflows' },
          { id: 'who', label: 'who would pay for this?', placeholder: 'e.g. small business owners, content creators, coaches and consultants, busy moms' },
          { id: 'problem', label: 'what problem does your skill solve for them?', placeholder: 'e.g. they look unprofessional, they don\'t have time to do it themselves, they keep doing it wrong' },
          { id: 'format', label: 'what format are you thinking? (or not sure)', placeholder: 'e.g. 1:1 service, digital product, template, course, retainer, or I\'m open to ideas' },
        ],
        buildPrompt: (a) => `Help me build a clear, sellable offer.

My skill: ${a.skill}
Who would pay for it: ${a.who}
The problem it solves: ${a.problem}
Format I'm considering: ${a.format}

Please:
1. Write 3 different offer concepts I could sell based on what I've told you — ranging from lowest to highest price point
2. For each offer, write: the name, the one-sentence description, the price range, and what's included
3. Which offer would be easiest to sell first (least friction, fastest money)?
4. Write the headline and 3-line description for that offer as if it were on a sales page
5. What objections will buyers have, and how should I address them?
6. What would make this offer an obvious "yes" for my target buyer?`,
      },
      {
        id: 'first-client-outreach',
        name: 'First Client Outreach Builder',
        tagline: 'the message that gets your first paying client',
        type: 'prompt-builder',
        steps: [
          { id: 'offer', label: 'what are you offering?', placeholder: 'e.g. brand identity design for coaches, social media management for local businesses, virtual assistant services' },
          { id: 'prospect', label: 'who are you reaching out to?', placeholder: 'e.g. a life coach I follow on Instagram who I know is launching something, a local bakery with a bad website' },
          { id: 'channel', label: 'how are you reaching out?', placeholder: 'e.g. Instagram DM, cold email, LinkedIn message, in-person networking' },
        ],
        buildPrompt: (a) => `Write me an outreach message to get my first client.

What I'm offering: ${a.offer}
Who I'm reaching out to: ${a.prospect}
Channel: ${a.channel}

The message should:
- Be under 100 words (for DMs/messages) — people don't read long cold outreach
- Lead with something specific about them, not a generic opener
- Make the value crystal clear in one sentence
- Have a low-friction ask (not "can we jump on a call?" — something easier to say yes to)
- Sound like a human wrote it, not like a pitch template

Also give me a follow-up message to send 3 days later if I get no response. Make that one even shorter.`,
      },
      { id: 'pricing-guide', name: 'Pricing Research Prompter', tagline: 'figure out what to charge', type: 'prompt-builder', comingSoon: true },
      { id: 'side-hustle-content', name: 'Content Ideas for Your Niche', tagline: 'market your side hustle without burning out', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Brand Bible System', price: 37, href: '/shop/notion-systems/brand-bible', tag: 'start here' },
      { name: 'Content Repurpose Workflow', price: 47, href: '/shop/automations/content-repurpose' },
      { name: 'The Brand Bundle', price: 87, href: '/shop/bundles/brand-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'student',
    name: 'The Student Girlie',
    emoji: '✧',
    tagline: 'study smarter. submit on time. still sleep.',
    desc: 'AI as your study partner, essay coach, and internship application writer. It doesn\'t do the work for you — it makes your work way better.',
    gradient: 'from-[#C7D1C2]/30 to-cream',
    freeTools: [
      {
        id: 'essay-outline-builder',
        name: 'Essay Outline Builder',
        tagline: 'go from blank page to structured outline in 5 minutes',
        type: 'prompt-builder',
        steps: [
          { id: 'topic', label: 'what is your essay topic or prompt?', placeholder: 'e.g. "Discuss the impact of social media on political polarisation" or paste the exact prompt' },
          { id: 'type', label: 'what type of essay?', placeholder: 'e.g. argumentative, analytical, reflective, research, personal statement', type: 'select', options: ['Argumentative', 'Analytical / critical', 'Reflective / personal', 'Research / literature review', 'Personal statement / application essay', 'Case study analysis', 'Compare and contrast'] },
          { id: 'requirements', label: 'any specific requirements?', placeholder: 'e.g. 2000 words, must include 5 academic sources, APA format, due Friday' },
        ],
        buildPrompt: (a) => `Help me build a strong essay outline.

Essay topic / prompt: "${a.topic}"
Essay type: ${a.type}
Requirements: ${a.requirements}

Please provide:
1. A compelling thesis statement (2–3 options, ranging from safe to bold)
2. A detailed outline with: introduction structure, 3–4 main body sections (each with 2–3 sub-points), and conclusion approach
3. For each body section: suggest the type of evidence or analysis needed
4. 5 strong academic search terms I can use to find relevant sources
5. The 3 weakest points in this structure — where would a marker likely push back?
6. A suggested word count per section to hit my target

Don't write the essay for me. Give me the map — I'll do the driving.`,
      },
      {
        id: 'study-guide-maker',
        name: 'Study Guide Maker',
        tagline: 'turn your notes into something you can actually study from',
        type: 'prompt-builder',
        steps: [
          { id: 'subject', label: 'what subject / topic is this?', placeholder: 'e.g. Organisational Behaviour, Chapter 4: Motivation Theories' },
          { id: 'examType', label: 'what type of exam or assessment?', placeholder: 'e.g. multiple choice MCQ, written essay exam, short answer, presentation', type: 'select', options: ['Multiple choice (MCQ)', 'Short answer', 'Essay / long form', 'Open book exam', 'Practical / case study', 'Presentation', 'Mixed format'] },
          { id: 'notes', label: 'paste your notes or key content (or describe what you\'ve covered)', placeholder: 'paste your lecture notes, textbook excerpts, or describe the key topics' },
        ],
        buildPrompt: (a) => `Help me create an effective study guide for an exam.

Subject / topic: ${a.subject}
Exam format: ${a.examType}

My notes / content:
${a.notes}

Please create:
1. A one-page summary of the key concepts — the stuff most likely to come up
2. 10 practice questions in the style of my exam format, with answer explanations
3. A "cheat sheet" of key terms, dates, formulas, or frameworks I need to memorise
4. The 5 most important things to understand (not just memorise) for this topic
5. Common mistakes students make on ${a.examType} questions in this subject — and how to avoid them
6. A 3-day study plan if my exam is on Friday`,
      },
      { id: 'prof-email', name: 'Email to Professor Builder', tagline: 'the professional student email, written', type: 'prompt-builder', comingSoon: true },
      { id: 'internship-builder', name: 'Internship Application Builder', tagline: 'applications that actually get shortlisted', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Goal + Habit System', price: 27, href: '/shop/notion-systems/goal-habit', tag: 'track everything' },
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os' },
      { name: 'The Career Bundle', price: 57, href: '/shop/bundles/job-search-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'wellness',
    name: 'The Wellness Girlie',
    emoji: '◌',
    tagline: 'build the life you keep pinning.',
    desc: 'AI helps you actually do the routines, habits, and rituals you\'ve been meaning to start. Consistent, not perfect.',
    gradient: 'from-[#E8F0E6]/60 to-sage/20',
    freeTools: [
      {
        id: 'morning-routine-builder',
        name: 'Morning Routine Builder',
        tagline: 'a realistic morning routine that you\'ll actually do',
        type: 'prompt-builder',
        steps: [
          { id: 'wakeTime', label: 'what time do you wake up, and when do you need to leave / start work?', placeholder: 'e.g. wake at 7am, need to be at my desk by 9am' },
          { id: 'goals', label: 'what do you want your mornings to feel like or include?', placeholder: 'e.g. calm and intentional, want to move my body, journal, and not look at my phone first thing' },
          { id: 'honest', label: 'what always derails your mornings?', placeholder: 'e.g. I always snooze, I spend 30 min on my phone before getting up, I skip breakfast then crash at 10am' },
        ],
        buildPrompt: (a) => `Build me a realistic morning routine.

I wake at and my window is: ${a.wakeTime}
What I want from my mornings: ${a.goals}
What always derails me: ${a.honest}

Design:
1. A minute-by-minute morning schedule that fits my actual time window
2. Build it in phases: non-negotiables (must do), nice-to-haves (when time allows), and the emergency version (only 15 minutes)
3. Address each thing that derails me with a specific, practical fix
4. The first 5 minutes of my morning should be designed to NOT trigger my usual habits — tell me exactly what those 5 minutes look like
5. What should I prepare the night before to make this morning possible?
6. How do I build this slowly so it actually sticks, rather than going all-in on Monday and quitting by Thursday?`,
      },
      {
        id: 'habit-stack-builder',
        name: 'Habit Stack Prompter',
        tagline: 'attach new habits to things you already do',
        type: 'prompt-builder',
        steps: [
          { id: 'wantToAdd', label: 'what habits do you want to build?', placeholder: 'e.g. meditate 10 min daily, drink more water, journal, stretch, read before bed' },
          { id: 'currentHabits', label: 'what do you reliably do every day already?', placeholder: 'e.g. make coffee, brush teeth, commute 20 min, eat lunch at my desk, watch something before bed' },
          { id: 'failedBefore', label: 'what have you tried that hasn\'t stuck?', placeholder: 'e.g. I always start journaling then forget after 3 days, I downloaded Headspace 5 times' },
        ],
        buildPrompt: (a) => `Help me build habits that actually stick using habit stacking.

Habits I want to build: ${a.wantToAdd}
What I already do every day: ${a.currentHabits}
What hasn't worked before: ${a.failedBefore}

Please:
1. Create a habit stack for each habit I want to build — attach it to something I already do (use the format: "After I [current habit], I will [new habit]")
2. Start with the 2-minute version of each habit — the smallest possible version
3. Address why my previous attempts failed and what to do differently
4. Design a "minimum streak" — the non-negotiable tiny version I do even on hard days
5. Build a 4-week progression: what does week 1 look like vs week 4?
6. What should I track, and how do I avoid making tracking itself another thing to fail at?`,
      },
      { id: 'journal-prompts', name: 'Journal Prompt Generator', tagline: 'prompts that actually make you think', type: 'prompt-builder', comingSoon: true },
      { id: 'evening-routine', name: 'Evening Wind-Down Builder', tagline: 'end the day on purpose, not by accident', type: 'prompt-builder', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Goal + Habit System', price: 27, href: '/shop/notion-systems/goal-habit', tag: 'track your habits' },
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os' },
      { name: 'The Life Admin Bundle', price: 87, href: '/shop/bundles/life-admin-bundle', tag: 'best value' },
    ],
  },

  {
    slug: 'burnout',
    name: 'The Burnout Girlie',
    emoji: '◎',
    tagline: 'you\'re allowed to do less.',
    desc: 'AI helps you figure out what to drop, how to say no, and how to rebuild a life that doesn\'t run you into the ground.',
    gradient: 'from-[#FFF0E8]/80 to-taupe/8',
    freeTools: [
      {
        id: 'boundary-script-builder',
        name: 'Boundary Script Builder',
        tagline: 'the "no" message you\'ve been dreading — written',
        type: 'prompt-builder',
        steps: [
          {
            id: 'situation',
            label: 'what do you need to say no to?',
            placeholder: 'choose or describe...',
            type: 'select',
            options: ['A work request or extra project', 'A social obligation I don\'t have energy for', 'A family expectation', 'A favour someone keeps asking for', 'A client asking for more than agreed', 'A friend or partner who\'s taking too much', 'My own overcommitting — I need to cancel something'],
          },
          { id: 'details', label: 'give me the context', placeholder: 'e.g. my manager keeps asking me to cover for a colleague on weekends, I\'ve already done it 3 times this month' },
          { id: 'relationship', label: 'what\'s your relationship with this person?', placeholder: 'e.g. my direct manager who I need to keep a good relationship with, a close friend I don\'t want to hurt' },
        ],
        buildPrompt: (a) => `Help me say no without guilt, conflict, or over-explaining.

What I need to decline: ${a.situation}
Context: ${a.details}
My relationship with them: ${a.relationship}

Write me:
1. The exact message or script to say no — short, kind, and final. No maybes, no fake promises.
2. A version for if they push back or ask why
3. A version for if they get upset
4. What NOT to say (the things I'll be tempted to add that will undo the boundary)
5. How to handle the guilt I'll feel after sending this — because I know I will

The goal: I say no without it becoming a negotiation, without ruining the relationship, and without spending 3 days feeling terrible about it.`,
      },
      {
        id: 'gentle-plan-builder',
        name: 'Gentle Weekly Plan Builder',
        tagline: 'a week that doesn\'t make things worse',
        type: 'prompt-builder',
        steps: [
          { id: 'capacity', label: 'honestly, where is your energy right now?', placeholder: 'e.g. running on empty, can do about 4 hours of focused work a day maximum, evenings are completely gone' },
          { id: 'mustDos', label: 'what absolutely has to get done this week?', placeholder: 'e.g. a deliverable for work due Thursday, a doctor\'s appointment, picking up kids every day' },
          { id: 'dropping', label: 'what are you willing to drop or deprioritise?', placeholder: 'e.g. I don\'t have to reply to every email immediately, the house doesn\'t need to be perfect, I can skip the gym this week' },
        ],
        buildPrompt: (a) => `Help me plan a week that works for someone in burnout recovery.

My honest energy level: ${a.capacity}
What must happen this week: ${a.mustDos}
What I'm willing to let go: ${a.dropping}

Design:
1. A week plan built around my actual capacity — not what I wish I could do
2. Block "buffer time" into every day — unscheduled space to breathe or overrun
3. Identify the one most important thing per day — the only thing that truly matters if everything else falls apart
4. Give me permission slips: specific things I'm allowed to not do this week, stated clearly
5. Design an end-of-day "close" — a 5-minute ritual to actually stop working and not carry it into the evening
6. What are the early warning signs that next week is heading toward burnout again, and what's one thing I can do differently?`,
      },
      { id: 'capacity-checker', name: 'Capacity Checker', tagline: 'figure out what you can actually take on right now', type: 'prompt-builder', comingSoon: true },
      { id: 'burnout-checklist', name: 'Recovery Checklist', tagline: '10 small things that actually help', type: 'checklist', comingSoon: true },
    ],
    paidProducts: [
      { name: 'Life OS Dashboard', price: 47, href: '/shop/notion-systems/life-os', tag: 'start here' },
      { name: 'Finance Tracker', price: 27, href: '/shop/notion-systems/finance-tracker' },
      { name: 'The Life Admin Bundle', price: 87, href: '/shop/bundles/life-admin-bundle', tag: 'best value' },
    ],
  },
]

export function getBundleBySlug(slug: string) {
  return bundles.find((b) => b.slug === slug) ?? null
}
