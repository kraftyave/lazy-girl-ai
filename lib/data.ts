export type MoodCard = {
  id: string
  emoji: string
  title: string
  imageSrc: string
  imagePrompt: string
  gradient: string
  modalPrompts: {
    title: string
    prompt: string
  }[]
}

export type Scenario = {
  id: string
  title: string
  caption: string
  imageSrc: string
  imagePrompt: string
  gradient: string
}

export type Prompt = {
  id: string
  title: string
  description: string
  prompt: string
  category: string
}

export const categories = [
  'all',
  'life & clarity',
  'money & work',
  'planning & systems',
  'create & make',
  'feel better',
]

export const moodCards: MoodCard[] = [
  {
    id: 'overwhelmed',
    emoji: 'layers',
    title: "i'm overwhelmed",
    imageSrc: '/images/mood-overwhelmed.jpg',
    imagePrompt:
      'Aesthetic cozy bedroom, woman sitting on cream linen bed looking peaceful, soft morning light through sheer curtains, warm cream and blush pink tones, editorial lifestyle photography',
    gradient: 'from-[#FFD7D1] to-[#F2A7B3]/60',
    modalPrompts: [
      {
        title: 'brain dump everything',
        prompt:
          "I'm feeling completely overwhelmed right now. Help me do a full brain dump — ask me to list everything that's on my mind, then help me sort it by: what's urgent vs. what can wait, what I can control vs. what I can't, and what the single most important next step is. Make it feel manageable, not stressful.",
      },
      {
        title: 'make me a simple plan',
        prompt:
          "I have too much going on and I don't know where to start. Here's everything I need to do: [list your tasks]. Create a simple, realistic plan for me. Break it into today, this week, and later. Assume I have limited energy. Be warm and encouraging, not bossy.",
      },
      {
        title: 'help me breathe',
        prompt:
          "I'm spiraling. I need you to first help me calm down with a short grounding exercise, then gently help me identify the one thing making me most anxious. Then give me one small, doable action I can take in the next 10 minutes to feel slightly more in control.",
      },
    ],
  },
  {
    id: 'money',
    emoji: 'trending-up',
    title: 'i want to make money',
    imageSrc: '/images/mood-money.jpg',
    imagePrompt:
      'Aesthetic flat lay with rose gold laptop, matcha latte in ceramic mug, gold pen, small plant, cream linen background, soft natural light, warm and aspirational lifestyle photography',
    gradient: 'from-[#C7D1C2]/60 to-[#8B7A6B]/20',
    modalPrompts: [
      {
        title: 'find my profitable skills',
        prompt:
          "Based on what I tell you about myself, help me identify skills I already have that people would pay for. Ask me questions about: my job, hobbies, things friends come to me for, and things I do naturally that feel effortless. Then suggest 3-5 realistic ways I could monetize them, ranked by how quickly I could start.",
      },
      {
        title: 'side hustle generator',
        prompt:
          "I want to start a side hustle. My situation: [describe your schedule, skills, budget, and goals]. Generate 5 side hustle ideas tailored to me. For each, tell me: estimated startup cost, time to first dollar, how much I could realistically earn in 3 months, and what my first 3 action steps would be.",
      },
      {
        title: 'price my services',
        prompt:
          "I offer [describe your service]. Help me figure out what to charge. Consider: my experience level, market rates, the value I provide, and my target clients. Give me a pricing structure — starter, standard, and premium tiers — with what each includes. Explain the reasoning so I can defend my rates with confidence.",
      },
    ],
  },
  {
    id: 'overthinking',
    emoji: 'message-circle',
    title: "i'm overthinking",
    imageSrc: '/images/mood-overthinking.jpg',
    imagePrompt:
      'Woman sitting by a large window with a cup of coffee, thoughtful expression, soft golden bokeh background, warm cream and taupe tones, lifestyle photography, peaceful mood',
    gradient: 'from-[#FFF6F0] to-[#FFD7D1]/70',
    modalPrompts: [
      {
        title: 'make the decision for me',
        prompt:
          "I need help making a decision and I've been going back and forth for too long. The decision is: [describe it]. The options are: [list your options]. Here's what matters most to me: [values/priorities]. Please analyze this for me, tell me what you'd choose and why, and help me feel at peace with moving forward.",
      },
      {
        title: 'stop the spiral',
        prompt:
          "I'm overthinking [situation/scenario]. Help me reality-check my thoughts. For each worry I share, tell me: (1) how likely this outcome actually is, (2) whether I have any control over it, (3) what the worst case really looks like, and (4) one reframe that would help me stop obsessing. Be direct, kind, and a little bit like a wise best friend.",
      },
      {
        title: 'pros & cons but smarter',
        prompt:
          "I'm trying to decide between [option A] and [option B]. Instead of a basic pros and cons list, help me dig deeper. Ask me about: what each option says about my values, what my gut is trying to tell me, what I'd regret more in 5 years, and what I'd tell a best friend in this situation. Then summarize what you actually think I should do.",
      },
    ],
  },
  {
    id: 'together',
    emoji: 'layout-grid',
    title: 'i need my life together',
    imageSrc: '/images/mood-together.jpg',
    imagePrompt:
      'Organized aesthetic desk with open planner, handwritten notes, gold pen, small succulent, warm coffee in ceramic mug, soft golden hour natural light, cream and pink palette, editorial lifestyle flat lay',
    gradient: 'from-[#F2A7B3]/30 to-[#C7D1C2]/40',
    modalPrompts: [
      {
        title: 'life audit',
        prompt:
          "I need to do a full life audit. Walk me through it step by step, covering: health & energy, relationships, money, career/purpose, daily routines, and living space. For each area, ask me to rate it and describe how it feels. Then help me identify the 2-3 areas that would create the most positive ripple effect if I improved them first.",
      },
      {
        title: 'build my system',
        prompt:
          "Help me build a simple life admin system. I need to manage: work tasks, personal errands, finances, health appointments, and goals. My style is: [describe if you prefer digital, paper, minimal, detailed, etc.]. Design a weekly rhythm and a simple structure I can actually maintain — not some overengineered productivity system, but something real-life-proof.",
      },
      {
        title: 'weekly reset ritual',
        prompt:
          "Design me a 30-minute Sunday reset ritual that helps me feel prepared and calm for the week ahead. It should cover: reviewing what happened last week, planning this week's priorities, prepping anything that reduces friction (meals, outfits, errands), and a mental reset to let go of the previous week. Make it feel like self-care, not a chore.",
      },
    ],
  },
]

export const scenarios: Scenario[] = [
  {
    id: 'week',
    title: 'planned my entire week in 10 mins',
    caption: 'used to spend hours on sundays dreading monday. now i just ask ai.',
    imageSrc: '/images/scenario-week.jpg',
    imagePrompt:
      'Open planner journal on a wooden table, warm golden light, surrounded by a latte in a ceramic mug, reading glasses, small white flowers, cream and warm brown tones, editorial lifestyle photography',
    gradient: 'from-[#FFD7D1] via-[#F2A7B3]/20 to-[#FFF6F0]',
  },
  {
    id: 'life',
    title: 'asked ai what to do with my life',
    caption: 'gave it my resume, my fears, and a voice memo. it sorted me out.',
    imageSrc: '/images/scenario-life.jpg',
    imagePrompt:
      'Young woman with a soft smile looking at a phone screen in a cozy bedroom, golden afternoon light, cream linen bedding, warm and relatable lifestyle photo',
    gradient: 'from-[#C7D1C2]/40 via-[#FFF6F0] to-[#FFD7D1]/20',
  },
  {
    id: 'overthink',
    title: 'stopped overthinking decisions',
    caption: 'turns out all i needed was someone to just tell me what to do.',
    imageSrc: '/images/scenario-overthink.jpg',
    imagePrompt:
      'Woman taking a peaceful deep breath with eyes closed, standing in a bright airy room, hands at heart, soft natural light, cream and sage color palette, editorial photography',
    gradient: 'from-[#F2A7B3]/30 via-[#FFF6F0] to-[#C7D1C2]/30',
  },
  {
    id: 'resume',
    title: 'rewrote my entire resume in 20 mins',
    caption: "three years of job hunting. one prompt. finally got the callback.",
    imageSrc: '/images/scenario-resume.jpg',
    imagePrompt:
      'Aesthetic desk setup with a laptop open, notebook with handwritten notes, fresh flowers in a small vase, warm cream and blush tones, home office lifestyle photography',
    gradient: 'from-[#FFF6F0] via-[#FFD7D1]/30 to-[#8B7A6B]/10',
  },
  {
    id: 'brand',
    title: 'created a whole brand identity',
    caption: 'name, colors, voice, content strategy. ai did 80% of the heavy lifting.',
    imageSrc: '/images/scenario-brand.jpg',
    imagePrompt:
      'Creative flat lay with mood board papers, color swatches in blush and sage, laptop, coffee cup, aesthetic workspace, warm natural light, editorial brand photography',
    gradient: 'from-[#FFD7D1]/40 via-[#C7D1C2]/20 to-[#FFF6F0]',
  },
  {
    id: 'finances',
    title: 'finally got my finances sorted',
    caption: 'no spreadsheet experience needed. just honesty and a good prompt.',
    imageSrc: '/images/scenario-finances.jpg',
    imagePrompt:
      'Woman confidently typing on a laptop at a cafe table, matcha latte beside her, warm golden hour light, cream and sage tones, lifestyle photography, empowered mood',
    gradient: 'from-[#C7D1C2]/30 via-[#FFF6F0] to-[#F2A7B3]/20',
  },
]

export const prompts: Prompt[] = [
  {
    id: 'figure-out-want',
    title: 'figure out what i actually want',
    description: 'for when you feel stuck and honestly have no idea what direction to go',
    category: 'life & clarity',
    prompt:
      "I feel stuck and I'm not sure what I actually want from my life right now. I need you to help me get clear. Ask me 5 deep but practical questions — one at a time — about my values, what drains vs. energizes me, what I envy in others, what I'd do if failure wasn't possible, and what my ideal Tuesday looks like. After my answers, synthesize what you've learned into a clear picture of what I'm actually craving, and suggest 2-3 concrete directions I could explore.",
  },
  {
    id: 'make-decision',
    title: 'make a decision for me',
    description: 'when you need someone to just pick for you',
    category: 'life & clarity',
    prompt:
      "I've been going back and forth on a decision and I need you to help me actually choose. The decision: [describe it]. My two main options: [option A] vs [option B]. Things I care about most: [list your values like security, freedom, relationships, growth, etc.]. What would most people regret more: choosing safety or taking the risk? Based on everything I've told you, what would you actually tell me to do — and what's the one thing I'm probably not seeing clearly?",
  },
  {
    id: 'life-audit',
    title: 'give me a life audit',
    description: 'find the one thing actually holding you back',
    category: 'life & clarity',
    prompt:
      'I need a life audit. I\'m going to describe my current situation across 6 areas: work/career, health, relationships, finances, living situation, and personal growth. [Describe each briefly.] After I share, I need you to: (1) identify which area has the most friction or is dragging down the others, (2) name the patterns you see that I might be too close to notice, and (3) give me one high-leverage change that would create the most positive ripple effect. Be honest, not just supportive.',
  },
  {
    id: 'monetize-skills',
    title: 'turn my skills into money',
    description: 'find the fastest path from what you know to what you earn',
    category: 'money & work',
    prompt:
      "I want to make money from skills I already have, but I don't know where to start. Here's what I know how to do: [list skills, jobs, hobbies, things people come to you for]. Here's my situation: [time available per week, budget to start, any constraints]. Help me identify my top 3 most monetizable skills, explain exactly who would pay for each and why, and give me a realistic first-month action plan for the one with the fastest path to income.",
  },
  {
    id: 'write-bio',
    title: 'write my bio for me',
    description: 'for when talking about yourself feels impossible',
    category: 'money & work',
    prompt:
      "I need help writing a bio but I'm terrible at talking about myself. Here's the context: [Instagram/LinkedIn/website/dating app — pick one]. My name is [name]. I work in/as [job/field]. My hobbies and interests are [list them]. What I want people to feel when they read my bio: [vibe — professional, creative, warm, funny, etc.]. Write me 3 versions: a short one (under 80 words), a medium one (150 words), and a punchy one-liner. Match the tone to the platform.",
  },
  {
    id: 'price-services',
    title: 'price my services confidently',
    description: "stop undercharging — get what you're actually worth",
    category: 'money & work',
    prompt:
      "I need help figuring out what to charge for my services. What I offer: [describe service]. My experience level: [beginner/1-2 years/3-5 years/expert]. My target client: [describe]. What I've been charging (if anything): [price]. What's making me unsure: [fear of being too expensive / not knowing market rates / imposter syndrome]. Research current market rates for this, suggest a pricing structure with 3 tiers, and give me the exact language I can use when a client asks 'how much do you charge?' so I sound confident.",
  },
  {
    id: 'plan-week',
    title: 'plan my perfect week',
    description: "build a realistic week that doesn\'t burn you out by wednesday",
    category: 'planning & systems',
    prompt:
      "Help me plan my week. Here's what I need to get done: [list all tasks — work, personal, errands, appointments]. My energy pattern: [morning person / night owl / inconsistent]. Time available: [work hours, free hours per day]. Non-negotiables: [sleep, workouts, meals, etc.]. Create a day-by-day schedule that groups similar tasks, protects my energy, includes buffer time, and doesn't feel like a prison. Format it so I can easily copy it into my planner.",
  },
  {
    id: 'morning-routine',
    title: 'build my morning routine',
    description: 'design a morning that actually makes you want to get out of bed',
    category: 'planning & systems',
    prompt:
      "I want to build a morning routine that works for my actual life, not an influencer fantasy. My situation: I wake up at [time] and need to leave by / start work by [time]. Time I have for a morning routine: [X minutes]. What I want to feel by 9am: [energized / calm / creative / focused]. What's currently killing my mornings: [doom scrolling / snoozing / no structure / etc.]. Design me a routine with specific times that includes movement, food/drink, and a mental reset. Make it something I could actually start tomorrow.",
  },
  {
    id: 'sunday-reset',
    title: 'design my sunday reset ritual',
    description: 'a 30-minute ritual that makes you feel ready for the week',
    category: 'planning & systems',
    prompt:
      "Create a Sunday reset ritual for me that takes 30 minutes or less. I want to end Sunday feeling: prepared, calm, and excited for the week — not anxious. Include: a quick review of last week (wins + lessons), this week's top 3 priorities, 2-3 friction-reducing prep tasks (think meals, outfits, errands), and a mental close-out moment. Format it as a checklist I can actually follow. Make it feel like a treat, not a task.",
  },
  {
    id: 'write-content',
    title: 'write my content for the week',
    description: 'batch-generate a week of posts from a single idea',
    category: 'create & make',
    prompt:
      "I need to create a week of content for [Instagram/TikTok/LinkedIn — pick one]. My niche/topic: [describe]. My brand voice: [describe in 3 words — e.g. warm, direct, a little funny]. My target audience: [describe]. Core message I want to push this week: [one theme or idea]. Generate 5 content ideas with: a hook line, the main point of the post, and a call to action. Format them so I can batch-create and schedule them easily.",
  },
  {
    id: 'turn-idea-into-plan',
    title: 'turn my idea into an action plan',
    description: `go from "wouldn't it be cool if..." to actual first steps`,
    category: 'create & make',
    prompt:
      "I have an idea I want to actually act on instead of just thinking about. The idea: [describe it]. Why I want to do it: [motivation]. What's stopping me from starting: [list fears, blockers, or confusion]. What I have available: [time, money, skills, resources]. Break this into phases: Phase 1 (week 1-2, minimum viable version), Phase 2 (month 1-2, building momentum), Phase 3 (month 3+, scaling). Give me the first 5 concrete actions I can take this week. Make it feel doable, not overwhelming.",
  },
  {
    id: 'process-feelings',
    title: 'help me process my feelings',
    description: 'for when you need to vent but also want to actually understand yourself',
    category: 'feel better',
    prompt:
      "I need to process something that's been bothering me. I'm going to explain the situation and how I'm feeling, and I need you to: (1) reflect back what you heard without judgment, (2) help me identify what I actually need underneath the emotion (validation, clarity, action, or rest), (3) ask me one question that gets to the root of why this is hitting so hard, and (4) offer one perspective shift I haven't considered. Don't rush to fix it — just help me understand myself better first. The situation: [describe it].",
  },
  {
    id: 'set-boundaries',
    title: 'help me set a boundary',
    description: 'write the exact words to say so you stop rehearsing in your head',
    category: 'feel better',
    prompt:
      "I need to set a boundary with someone and I'm struggling to find the right words. The situation: [describe what's happening]. The person: [relationship — friend, family, coworker, partner]. What I've been doing instead: [avoiding / people-pleasing / saying yes when I mean no]. The outcome I want: [what changes, what stays the same]. Write me 3 ways to say this boundary clearly and kindly — one direct, one gentle, one for text. Include what to say if they push back.",
  },
  {
    id: 'feel-better-fast',
    title: 'help me feel better right now',
    description: "5-minute mood reset when you're in a bad headspace",
    category: 'feel better',
    prompt:
      "I'm in a bad headspace right now and I need a fast reset. Current mood: [describe — anxious, sad, irritable, empty, overwhelmed, etc.]. What triggered it (if I know): [describe or say 'not sure']. Time I have: [5 minutes / 15 minutes / 30 minutes]. Give me: (1) one breathing or grounding technique that matches my mood, (2) a 3-sentence reframe for what I'm feeling, (3) a micro-action (under 5 minutes) that will physically shift my state. Don't tell me to just 'stay positive' — give me something that actually works.",
  },
]
