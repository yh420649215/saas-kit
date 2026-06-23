export interface ToolScenario {
  slug: string;
  title: string;
  description: string;
  icon: string;
  systemPrompt: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
}

export const toolScenarios: ToolScenario[] = [
  {
    slug: "wedding-speech",
    title: "AI Wedding Speech Generator",
    description: "Craft a heartfelt best man or maid of honor speech in seconds.",
    icon: "💒",
    systemPrompt: "You are an expert wedding speech writer. Write a warm, personal, and memorable wedding speech based on the details provided. Keep it 2-3 minutes long (300-500 words). Include a touch of humor but keep it classy. End with a toast.",
    inputLabel: "Tell us about the couple",
    inputPlaceholder: "E.g. Bride is my sister Sarah, groom is Tom. They met in college 8 years ago. Sarah loves hiking, Tom is a chef. The wedding is in a vineyard...",
    outputLabel: "Your Speech",
  },
  {
    slug: "eulogy",
    title: "AI Eulogy Writer",
    description: "Write a dignified, heartfelt eulogy when words are hardest to find.",
    icon: "🕊️",
    systemPrompt: "You are a compassionate eulogy writer. Write a dignified, heartfelt eulogy based on the details provided. Focus on celebrating their life, sharing warm memories, and offering comfort. Keep it respectful and personal, 400-600 words.",
    inputLabel: "Tell us about your loved one",
    inputPlaceholder: "E.g. My grandmother Mary, 82, loved gardening and taught me to bake. Her famous quote was 'always add extra butter'. She volunteered at the library for 30 years...",
    outputLabel: "Your Eulogy",
  },
  {
    slug: "apology-letter",
    title: "AI Apology Letter Writer",
    description: "Write a sincere, effective apology letter for any situation.",
    icon: "💌",
    systemPrompt: "You are an expert in conflict resolution and sincere apologies. Write a genuine apology letter based on the situation described. Be specific about what went wrong, acknowledge the impact, offer a plan to make things right. Keep it warm and human, not corporate. 200-400 words.",
    inputLabel: "Describe the situation",
    inputPlaceholder: "E.g. I forgot my best friend's birthday dinner last night. I had a work emergency and didn't call. She's been my friend for 15 years and I feel terrible...",
    outputLabel: "Your Apology",
  },
  {
    slug: "resignation-letter",
    title: "AI Resignation Letter",
    description: "Leave on good terms with a professional, graceful resignation letter.",
    icon: "📝",
    systemPrompt: "You are a professional career coach. Write a graceful, professional resignation letter. Keep it positive, express gratitude, offer to help with the transition. No bridge-burning. 150-250 words. Include standard letter formatting.",
    inputLabel: "Your situation",
    inputPlaceholder: "E.g. Leaving after 4 years as a product manager at Acme Corp. New role at a startup. Want to stay on good terms with my manager Lisa...",
    outputLabel: "Your Letter",
  },
  {
    slug: "performance-review",
    title: "AI Performance Review Writer",
    description: "Turn bullet points into a polished, impactful self-review.",
    icon: "📊",
    systemPrompt: "You are an expert at writing compelling performance reviews. Transform the provided bullet points into a professional, achievement-focused self-review. Use specific metrics where possible, frame challenges as learning opportunities, and highlight impact on the team and company. 300-500 words.",
    inputLabel: "Your achievements this period",
    inputPlaceholder: "E.g. Shipped 3 features on time, mentored 2 junior devs, reduced API latency by 40%, led cross-team migration to new infrastructure...",
    outputLabel: "Your Self-Review",
  },
  {
    slug: "cover-letter",
    title: "AI Cover Letter Generator",
    description: "Generate a tailored cover letter that gets you the interview.",
    icon: "💼",
    systemPrompt: "You are a hiring expert and professional cover letter writer. Write a compelling cover letter tailored to the job and company described. Highlight relevant skills, show enthusiasm, and connect the candidate's experience to the company's needs. Keep it concise, 250-350 words. Use standard business letter format.",
    inputLabel: "About the job & your experience",
    inputPlaceholder: "E.g. Applying for Senior Designer at Airbnb. I have 6 years of UX design experience at startups, led redesign that increased conversion 25%. Airbnb's mission-driven culture appeals to me because...",
    outputLabel: "Your Cover Letter",
  },
  {
    slug: "tinder-bio",
    title: "AI Dating Profile Writer",
    description: "Get more matches with a witty, authentic dating profile bio.",
    icon: "❤️",
    systemPrompt: "You are a dating profile expert with a knack for witty, authentic writing. Write an engaging dating profile bio that showcases personality, avoids clichés, and stands out. Keep it fun, genuine, and conversational. Include conversation starters. 150-250 words.",
    inputLabel: "About you",
    inputPlaceholder: "E.g. 28M, software engineer by day, rock climber by weekend. Love cooking Italian food, hate small talk. Two cats. Looking for someone who laughs at bad puns...",
    outputLabel: "Your Profile",
  },
  {
    slug: "cold-email",
    title: "AI Cold Email Writer",
    description: "Write cold emails that actually get opened and replied to.",
    icon: "📧",
    systemPrompt: "You are an expert in B2B sales outreach. Write a concise, personalized cold email that gets responses. Research-based, value-first, with a clear and low-friction CTA. No jargon, no templates that sound like templates. 100-200 words max. Subject line included.",
    inputLabel: "Who you're reaching out to",
    inputPlaceholder: "E.g. CTO of a 50-person fintech startup. I noticed they're hiring backend engineers — our API could cut their integration time by 60%. Mutual connection: we both spoke at MicroConf...",
    outputLabel: "Your Email",
  },
];
