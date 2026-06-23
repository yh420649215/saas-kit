export interface ToolTheme {
  gradient: string;          // bg gradient classes
  accent: string;            // accent color for buttons, badges
  accentLight: string;       // lighter accent for cards
  border: string;            // border color
  text: string;              // heading text color
  icon: string;              // lucide icon name
}

export interface ToolScenario {
  slug: string;
  title: string;
  description: string;
  theme: ToolTheme;
  systemPrompt: string;
  steps: { question: string; placeholder: string }[];
  tones: string[];
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  sampleInput: string;
  sampleOutput: string;
}

export const toolScenarios: ToolScenario[] = [
  {
    slug: "wedding-speech",
    title: "Wedding Speech Writer",
    description: "Craft a heartfelt, personal speech for the people you love most.",
    steps: [
      { question: "What's your role?", placeholder: "Best man? Maid of honor? Father of the bride? Tell us who you are in this wedding." },
      { question: "Tell us about the couple", placeholder: "How do you know them? What's a moment you'll never forget? What makes their love story special? Any inside jokes or funny stories to include?" },
    ],
    tones: ["Heartfelt & Warm", "Funny & Charming", "Classic & Elegant", "Short & Sweet"],
    theme: {
      gradient: "bg-gradient-to-b from-rose-50 via-white to-rose-50 dark:from-rose-950/20 dark:via-background dark:to-rose-950/20",
      accent: "bg-rose-500 hover:bg-rose-600",
      accentLight: "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800",
      border: "border-rose-100 dark:border-rose-900/30",
      text: "text-rose-800 dark:text-rose-200",
      icon: "Heart",
    },
    systemPrompt: "You are a warm, experienced wedding speech writer. Write a heartfelt, personal speech that feels genuine and unscripted. Open with a warm greeting and how you know the couple. Share 2-3 specific, vivid memories — the kind of stories that make people laugh and tear up. Talk about what their relationship teaches us about love. End with a sincere toast. Aim for 300-500 words. Write like you're speaking at a real wedding, not reading an essay.",
    inputLabel: "Tell us about the couple — your relationship, memories, what makes them special",
    inputPlaceholder: "Share the details that matter: How do you know them? What's a moment you'll never forget? What makes their love story unique? The more specific you are, the more personal the speech...",
    outputLabel: "Your Speech",
    sampleInput: "My younger sister Emily is getting married to James this Saturday at a vineyard in Sonoma. I'm the maid of honor. Emily and I grew up sharing a room — she'd stay up late reading while I pretended to sleep. James walked into her life three years ago at a farmers market when he accidentally knocked over her entire display of handmade candles. Instead of getting mad, she laughed. That's who she is. He spent the next hour helping her clean up, and they've been inseparable since. He proposed at the same market stall.",
    sampleOutput: '"Good evening everyone. For those who don\'t know me, I\'m Sarah — Emily\'s older sister and proud maid of honor.\n\nEmily and I shared a bedroom for 16 years. I know every one of her secrets, her fears, her dreams. I was there when she cried over her first heartbreak, when she danced around the room after getting into her dream college, and — three years ago — when she came home from the farmers market with the strangest story about a clumsy stranger and a pile of ruined candles.\n\nShe told me that night: "I think I met someone." She was right.\n\nJames, what you did that day — spending an hour on your hands and knees picking up wax shards — told us everything we needed to know about you before you ever said a word. And proposing at the same market stall? You set the bar impossibly high for every future brother-in-law.\n\nWatching you two together has taught me what partnership really looks like. It\'s not grand gestures. It\'s showing up. Every single day. It\'s laughing at the messes instead of blaming each other for them.\n\nEmily — you\'ve been my first phone call for every important moment in my life. Today, I get to be part of yours.\n\nPlease raise your glasses. To Emily and James — may your life together be full of beautiful messes, and may you always have each other to help clean them up."',
  },
  {
    slug: "eulogy",
    title: "Eulogy Writer",
    description: "Honor a life with words that capture who they truly were.",
    steps: [
      { question: "Who was this person to you?", placeholder: "Their name, your relationship. How long did you know them? What role did they play in your life?" },
      { question: "What made them who they were?", placeholder: "Their passions, quirks, sayings, habits. What will you miss most? What story would they want told?" },
      { question: "What feeling do you want to leave?", placeholder: "Celebration of life? Quiet reflection? Hope and comfort? Any special reading or theme?" },
    ],
    tones: ["Warm & Personal", "Celebratory", "Quiet & Reflective", "Faith-Based"],
    theme: {
      gradient: "bg-gradient-to-b from-stone-50 via-white to-stone-50 dark:from-stone-950/20 dark:via-background dark:to-stone-950/20",
      accent: "bg-stone-600 hover:bg-stone-700",
      accentLight: "bg-stone-50 border-stone-200 dark:bg-stone-950/30 dark:border-stone-800",
      border: "border-stone-200 dark:border-stone-900/30",
      text: "text-stone-700 dark:text-stone-300",
      icon: "Feather",
    },
    systemPrompt: "You are a compassionate, thoughtful eulogy writer. Write a eulogy that truly honors the person — not a generic tribute, but a living portrait. Start by acknowledging the loss honestly. Share specific, vivid memories that reveal their character. Include their quirks, their sayings, the small things that made them who they were. Let the tone match their personality — if they were funny, be funny; if they were quiet, be reflective. End with what they taught us and how they live on. 400-600 words. This is for someone who is grieving — every word matters.",
    inputLabel: "Tell us who they were — not just facts, but what made them them",
    inputPlaceholder: "Their name, how you're related, what they loved, how they made you feel. What's your favorite memory? What would they say right now if they could? What will you miss most?",
    outputLabel: "Your Eulogy",
    sampleInput: "My grandmother Helen passed last week at 86. She taught me to bake bread — every Sunday morning for 20 years, we'd make sourdough together. She had this habit of humming old Beatles songs while she kneaded dough, completely off-key. Her kitchen always smelled like yeast and cinnamon. She volunteered at the library for 35 years because she believed 'everyone deserves a good story.' She lived through the death of two husbands, raised four children alone, and never complained. Her last words to me were 'don't forget to feed your starter.' She meant the sourdough.",
    sampleOutput: '"My grandmother Helen believed that bread was proof of God\'s love. Every Sunday for twenty years, I watched her hands work dough — the same hands that raised four children alone after losing two husbands, that shelved books at the public library for thirty-five years because, as she put it, \'everyone deserves a good story.\'\n\nHer kitchen was sacred ground. It always smelled of yeast and cinnamon. She hummed Beatles songs while she kneaded — spectacularly off-key, but with such conviction you couldn\'t help but smile. \'I Wanna Hold Your Hand\' was her favorite. She said it reminded her of her first dance with my grandfather.\n\nHelen was not an easy woman. She had opinions. She didn\'t suffer fools. When my father first asked to marry my mother, Helen made him bake a loaf of sourdough from scratch. \'If you can be patient with bread,\' she told him, \'you can be patient with my daughter.\' He burned three attempts before she approved him.\n\nThat was her philosophy: anything worth having requires patience. Bread, love, grief — all of them take time.\n\nHer last words to me were \'don\'t forget to feed your starter.\' She meant the sourdough starter she\'d kept alive for forty years, the one now sitting on my kitchen counter. But I think she also meant something else. Feed what matters. Nurture what you love. Show up, week after week, even when it\'s hard. Especially when it\'s hard.\n\nI fed the starter this morning. It bubbled back to life, as it always does. Some things, thank God, are impossible to lose."',
  },
  {
    slug: "apology-letter",
    title: "Apology Letter Writer",
    description: "Find the right words when it matters most.",
    steps: [
      { question: "What happened?", placeholder: "Be honest. What did you do (or fail to do)? When and where did it happen?" },
      { question: "How did it affect them?", placeholder: "Put yourself in their shoes. How did your action hurt, disappoint, or let them down?" },
      { question: "What do you want to say?", placeholder: "What have you learned? What will you do differently? Why is this relationship worth repairing?" },
    ],
    tones: ["Sincere & Direct", "Warm & Personal", "Brief & Simple", "Heartfelt & Detailed"],
    theme: {
      gradient: "bg-gradient-to-b from-amber-50 via-white to-amber-50 dark:from-amber-950/20 dark:via-background dark:to-amber-950/20",
      accent: "bg-amber-500 hover:bg-amber-600",
      accentLight: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
      border: "border-amber-100 dark:border-amber-900/30",
      text: "text-amber-800 dark:text-amber-200",
      icon: "HeartHandshake",
    },
    systemPrompt: "You are a thoughtful mediator and apology coach. Write a sincere, specific apology letter. The key to a real apology: name exactly what you did wrong, acknowledge the impact it had on the other person, offer no excuses, explain what you've learned, and describe what you'll do differently. Keep the letter warm and human — not corporate, not defensive, not vague. Let the recipient feel seen and heard. 200-400 words.",
    inputLabel: "Describe what happened — be honest about what went wrong",
    inputPlaceholder: "What did you do (or fail to do)? How did it affect them? Why do you want to make it right? What have you learned?",
    outputLabel: "Your Letter",
    sampleInput: "I completely forgot my best friend David's 40th birthday dinner last Friday. He'd been planning it for months. I was buried in a work deadline and it genuinely slipped my mind — no call, no text, nothing. He showed up with 15 friends and my chair was empty. He hasn't responded to my messages since. We've been best friends for 22 years, since college.",
    sampleOutput: '"David,\n\nI\'ve been staring at this page for an hour, trying to find the right words. The truth is, there are no right words. I missed your 40th birthday. You planned it for months. Fifteen people showed up. I didn\'t.\n\nI could tell you about the work deadline. I could tell you I was exhausted, distracted, barely keeping my head above water. But you deserve better than excuses. The fact is, I let something urgent push out something important. I let a spreadsheet matter more than a friendship that has lasted half my life.\n\nI keep thinking about you standing there, looking around the table, realizing I wasn\'t coming. I\'ve imagined that moment a hundred times since Friday, and every time it makes me feel sick. Not because I feel sorry for myself — because I hurt someone I love. Someone who has shown up for me at every hard moment for twenty-two years.\n\nYou taught me how to shave when my dad walked out. You drove six hours to be at my mom\'s funeral. You\'re the first person I call with good news. And I couldn\'t make it to a dinner.\n\nI\'m not asking you to forgive me right now. I\'m asking for a chance to earn it back, one day at a time. I booked a table at Rossi\'s — the place we went after college graduation. Saturday, 7pm. Just the two of us. If you\'ll have me.\n\nWhatever you decide, I want you to know: you\'re not just a friend. You\'re my brother. And I\'m sorry I forgot that, even for a moment.\n\nAlways,\n[Your name]"',
  },
  {
    slug: "resignation-letter",
    title: "Resignation Letter Writer",
    description: "Leave with grace, gratitude, and professionalism.",
    steps: [
      { question: "What's your situation?", placeholder: "Current role, company, how long you've been there. Your relationship with your manager." },
      { question: "Why are you leaving?", placeholder: "New opportunity? Career change? Personal reasons? What are you grateful for about this job?" },
      { question: "How do you want to leave it?", placeholder: "Last day. How much notice? Any specific projects to wrap up? Want to stay in touch?" },
    ],
    tones: ["Warm & Grateful", "Brief & Professional", "Detailed & Helpful", "Formal & Traditional"],
    theme: {
      gradient: "bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950/20 dark:via-background dark:to-slate-950/20",
      accent: "bg-slate-700 hover:bg-slate-800",
      accentLight: "bg-slate-50 border-slate-200 dark:bg-slate-950/30 dark:border-slate-800",
      border: "border-slate-200 dark:border-slate-900/30",
      text: "text-slate-700 dark:text-slate-300",
      icon: "Briefcase",
    },
    systemPrompt: "You are a professional career advisor. Write a resignation letter that is gracious, professional, and leaves the door open. Express genuine gratitude for the opportunity. Give standard notice (2 weeks). Offer to help with the transition. No bridge-burning, no complaints, no oversharing about the new role. Keep it warm but professional. 150-250 words. Standard business letter format with date, salutation, body, closing, signature block.",
    inputLabel: "Your situation at a glance",
    inputPlaceholder: "Current role, company, how long you've been there, relationship with your manager, reason for leaving (optional)",
    outputLabel: "Your Letter",
    sampleInput: "Leaving my role as Senior Product Designer at ClearView Analytics after 5 years. Great relationship with my manager Rachel — she hired me as a junior and mentored me. Moving to a health-tech startup to lead design. Last day in 3 weeks. Want to leave on the best possible terms.",
    sampleOutput: "[Date]\n\nDear Rachel,\n\nPlease accept this letter as formal notice of my resignation from my position as Senior Product Designer at ClearView Analytics. My last day will be [date].\n\nFive years ago, you took a chance on a junior designer who had more enthusiasm than experience. You taught me that great design starts with listening, that feedback is a gift, and that the best work happens when teams truly trust each other. I would not be the designer — or the person — I am today without your mentorship.\n\nI\'m incredibly proud of what we\'ve built together. The dashboard redesign, the accessibility initiative, the design system that still makes me smile every time I see it in use. These weren\'t just projects. They were proof that thoughtful work, done with care, can make a real difference.\n\nOver the next three weeks, I\'ll make sure every project is documented, every file is organized, and every transition is smooth. Whatever you need — training, handoff meetings, late nights — you\'ve got it.\n\nClearView will always feel like home. Thank you for making it one.\n\nWith deep gratitude,\n[Your name]",
  },
  {
    slug: "performance-review",
    title: "Self-Review Writer",
    description: "Transform your bullet points into a compelling performance narrative.",
    steps: [
      { question: "What's your role and scope?", placeholder: "Job title, team, how long in this role. What are your main responsibilities?" },
      { question: "What did you achieve?", placeholder: "List projects, metrics, goals hit. Any numbers? Revenue impact? Team impact? Awards?" },
      { question: "What's next?", placeholder: "Challenges you overcame? Skills you built? Goals for next period? Areas you want to grow?" },
    ],
    tones: ["Confident & Impactful", "Humble & Team-Focused", "Data-Driven", "Growth-Oriented"],
    theme: {
      gradient: "bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20",
      accent: "bg-blue-600 hover:bg-blue-700",
      accentLight: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
      border: "border-blue-100 dark:border-blue-900/30",
      text: "text-blue-800 dark:text-blue-200",
      icon: "ClipboardCheck",
    },
    systemPrompt: "You are an expert at writing impactful self-reviews. Transform bullet-point achievements into a compelling narrative. Structure: (1) Opening — your role and scope. (2) Key achievements — each with context, action, measurable result. (3) Challenges & growth — what you learned. (4) Goals for next period. Use specific numbers wherever possible. Frame challenges as learning opportunities. Show how your work impacted the team and business. Professional, confident, not arrogant. 300-500 words.",
    inputLabel: "What did you accomplish this review period?",
    inputPlaceholder: "List your achievements, projects, metrics, challenges overcome, skills learned, and goals. Bullet points are fine — we'll turn them into prose.",
    outputLabel: "Your Self-Review",
    sampleInput: "- Shipped 3 major features: real-time dashboard, API v2, and search overhaul\n- Led migration from REST to GraphQL — reduced page load by 40%\n- Mentored 2 junior engineers — both promoted to mid-level\n- On-call rotation: reduced incident response time from 45min to 12min\n- Spoke at ReactConf about our architecture\n- Struggle: took on too much Q1, burned out, learned to delegate",
    sampleOutput: '"This review period has been the most impactful of my tenure at Acme. As a senior engineer on the platform team, I shipped three major features — real-time dashboard, API v2, and a ground-up search overhaul — that collectively serve over 50,000 daily active users.\n\nThe work I\'m proudest of isn\'t just the code. It\'s the architectural decision to migrate from REST to GraphQL, which reduced page load times by 40% across the application. This wasn\'t just a technical win — it meant our users in rural areas with slow connections could finally use our product without frustration. That matters to me.\n\nI also invested significantly in the team. I mentored two junior engineers through their first year, both of whom were promoted to mid-level this quarter. Watching them go from asking me questions to answering other people\'s questions has been the most rewarding part of my job.\n\nIn Q1, I learned a hard lesson about capacity. I took on four major initiatives simultaneously and hit burnout by March. I worked with my manager to restructure my workload, learned to delegate more effectively, and recovered fully by April. The experience taught me that sustainable pace isn\'t just a buzzword — it\'s a skill I needed to develop."',
  },
  {
    slug: "cover-letter",
    title: "Cover Letter Writer",
    description: "Tell your story in a way that makes recruiters stop scrolling.",
    steps: [
      { question: "What's the job?", placeholder: "Role title, company name, industry. What excites you about this company specifically?" },
      { question: "What's your story?", placeholder: "Your experience, key achievements. What's your biggest professional win? What makes you different?" },
      { question: "Why this role?", placeholder: "Why now? How does this connect to your career path? What will you bring that others won't?" },
    ],
    tones: ["Confident & Bold", "Warm & Authentic", "Concise & Direct", "Story-Driven"],
    theme: {
      gradient: "bg-gradient-to-b from-indigo-50 via-white to-indigo-50 dark:from-indigo-950/20 dark:via-background dark:to-indigo-950/20",
      accent: "bg-indigo-600 hover:bg-indigo-700",
      accentLight: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800",
      border: "border-indigo-100 dark:border-indigo-900/30",
      text: "text-indigo-800 dark:text-indigo-200",
      icon: "FileText",
    },
    systemPrompt: "You are a hiring expert and professional resume writer. Write a cover letter that tells a story, not just lists skills. Structure: Opening paragraph — why this company, why this role (show you did your research). Middle — connect 2-3 specific achievements to the company's needs. Closing — what you'll bring and a clear call to action. Write with confidence and warmth. Avoid cliches like 'I'm a perfect fit.' Avoid repeating the resume. Show, don't tell. 250-350 words.",
    inputLabel: "About the role, the company, and your relevant experience",
    inputPlaceholder: "What's the role and company? What have you done that's relevant? What about this company excites you? What's your biggest professional win?",
    outputLabel: "Your Cover Letter",
    sampleInput: "Applying for Senior Product Designer at Airbnb. 6 years of experience, currently at a fintech startup. Led a redesign that increased conversion by 25%. Passionate about travel — used Airbnb in 12 countries as a guest. Love their mission of belonging anywhere. Portfolio: designwithsarah.com",
    sampleOutput: '"Dear Hiring Team,\n\nI\'ve used Airbnb in twelve countries across four continents. I\'ve stayed in a treehouse in Costa Rica, a houseboat in Amsterdam, and a converted church in rural Japan. Each experience taught me something about what it means to feel at home somewhere unfamiliar. That feeling — of belonging, even when you\'re far from everything you know — is why I\'m applying to be your next Senior Product Designer.\n\nFor the past three years, I\'ve led design at Finova, a fintech startup where I rebuilt our entire onboarding flow from scratch. The result was a 25% increase in conversion — but the metric I care about more is this: customer support tickets about confusion during signup dropped by 60%. Good design doesn\'t just convert. It removes friction from people\'s lives.\n\nWhat excites me about Airbnb specifically is the design challenge at the intersection of digital and physical. You\'re not just designing screens. You\'re designing the first chapter of someone\'s real-world experience. That\'s a responsibility I don\'t take lightly.\n\nI\'d love to share a few projects from my portfolio that I think are particularly relevant — including a cross-platform booking flow that I believe maps directly to challenges your team is working on right now.\n\nThank you for your time and consideration.\n\nWarmly,\n[Your name]\n\nPortfolio: designwithsarah.com"',
  },
  {
    slug: "dating-profile",
    title: "Dating Profile Writer",
    description: "Show the real you — not a list of hobbies, but who you actually are.",
    steps: [
      { question: "Who are you, really?", placeholder: "Not your job title. What brings you joy? What would friends say about you? What's a story only they know?" },
      { question: "What does your life look like?", placeholder: "Weekday routine? Weekend adventures? What's your perfect Sunday? Any pets? Hidden talents?" },
      { question: "What are you looking for?", placeholder: "What kind of connection? Any dealbreakers? What's a quality you admire most in others?" },
    ],
    tones: ["Witty & Playful", "Warm & Genuine", "Adventurous & Bold", "Short & Intriguing"],
    theme: {
      gradient: "bg-gradient-to-b from-pink-50 via-white to-pink-50 dark:from-pink-950/20 dark:via-background dark:to-pink-950/20",
      accent: "bg-pink-500 hover:bg-pink-600",
      accentLight: "bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800",
      border: "border-pink-100 dark:border-pink-900/30",
      text: "text-pink-800 dark:text-pink-200",
      icon: "Heart",
    },
    systemPrompt: "You are a warm, witty dating profile writer. Write a profile that shows personality, not just a resume of hobbies. Key principles: Be specific (not 'I like music' but 'I once drove 6 hours to see a band in a basement'). Be vulnerable enough to be interesting. Include a conversation starter. Avoid cliches completely ('work hard play hard', 'looking for my partner in crime', 'fluent in sarcasm'). End with a light prompt that makes it easy for someone to message first. 150-250 words.",
    inputLabel: "Tell us about yourself — the real stuff, not the resume",
    inputPlaceholder: "What brings you joy? What's a story only your close friends know? What would a perfect Sunday look like? What are you looking for?",
    outputLabel: "Your Profile",
    sampleInput: "I'm Alex, 29, software engineer in Austin. I do CrossFit but I also bake sourdough on weekends. I have a rescue dog named Pixel. My party trick is naming any country by its flag. I'm looking for someone who's kind, curious, and doesn't take themselves too seriously. Dealbreaker: people who are rude to waitstaff.",
    sampleOutput: '"On Saturdays, you\'ll find me either under a barbell or covered in flour — sometimes both, which my dog Pixel considers a personal offense. He\'s a rescue mutt who judges my deadlift form and steals sourdough when I\'m not looking.\n\nI\'m a software engineer by day, but my real passion is being the person at parties who can identify any country by its flag. Yes, I\'m aware this is a useless skill. Yes, I will demonstrate it if asked. No, I cannot explain why I know what the flag of Bhutan looks like.\n\nI\'m looking for someone who is kind in the small moments — the way you treat a waiter, the way you listen when someone\'s had a hard day. Someone who\'s curious about the world and doesn\'t take themselves too seriously. If you\'ve ever stayed up too late because you couldn\'t stop talking to someone, we\'re probably on the same page.\n\nTell me: what\'s the most unexpectedly beautiful place you\'ve ever been?"',
  },
  {
    slug: "cold-email",
    title: "Cold Email Writer",
    description: "Write emails people actually want to reply to.",
    steps: [
      { question: "Who are you reaching out to?", placeholder: "Name, role, company. What do you know about them? Any mutual connections or shared interests?" },
      { question: "What's your value proposition?", placeholder: "What problem do you solve for them? Why should they care? What's the simplest next step you're asking for?" },
      { question: "What's your angle?", placeholder: "Any research you've done on their company? Recent news? A compliment that shows you did your homework?" },
    ],
    tones: ["Short & Punchy", "Research-Backed", "Casual & Friendly", "Value-First"],
    theme: {
      gradient: "bg-gradient-to-b from-teal-50 via-white to-teal-50 dark:from-teal-950/20 dark:via-background dark:to-teal-950/20",
      accent: "bg-teal-600 hover:bg-teal-700",
      accentLight: "bg-teal-50 border-teal-200 dark:bg-teal-950/30 dark:border-teal-800",
      border: "border-teal-100 dark:border-teal-900/30",
      text: "text-teal-800 dark:text-teal-200",
      icon: "Send",
    },
    systemPrompt: "You are an expert in B2B sales outreach who believes the best cold emails feel like they were written by a human, not an AI. Write a concise, personalized cold email. Research-based: mention something specific about the recipient or their company. Value-first: explain what they'll gain, not what you do. Low-friction CTA: make it easy to say yes. No jargon, no templates, no 'hope this email finds you well.' Keep it under 150 words. Include subject line.",
    inputLabel: "Who are you reaching out to and why?",
    inputPlaceholder: "Who are they? What do you know about them or their company? What's the value you're offering? What's the easiest first step you're asking for?",
    outputLabel: "Your Email",
    sampleInput: "Reaching out to Sarah Chen, VP of Engineering at a 200-person fintech company. They're hiring 12 backend engineers in Q3 — job postings mention scaling challenges. Our API platform (DevScale) handles authentication and rate limiting out of the box, typical customers cut integration time by 60%. We both spoke at PlatformCon in March — I was in the audience for her talk on microservices. Asking for a 15-minute call.",
    sampleOutput: '"Subject: Your PlatformCon talk on microservices\n\nHi Sarah,\n\nI caught your PlatformCon talk in March — your point about microservices teams needing better shared infrastructure really resonated. It\'s exactly the problem we built DevScale to solve.\n\nI noticed your team is hiring 12 backend engineers in Q3. Our API platform handles authentication, rate limiting, and observability out of the box, so new hires ship features instead of building plumbing. Our customers typically cut integration time by 60%.\n\nWould a 15-minute call next week be worth exploring? Happy to show you how Dropbox and Linear are using us — or just compare notes on platform engineering.\n\nBest,\n[Your name]"',
  },
];
