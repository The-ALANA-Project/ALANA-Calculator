import { ContributionTemplate } from '../types/contribution';

export const contributionTemplates: ContributionTemplate[] = [
  // ── Infrastructure & Strategy ────────────────────────────────────────────
  {
    id: 'nucleus-guardian-duties',
    category: 'Nucleus Guardian Duties (monthly)',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to lead as a Nucleus Guardian in The ALANA Project?
- Managing and leading with compassion and as a guide toward the dedicated team
- Organizing weekly and exceptional meetings when and if necessary
- Reviewing and improving tasks on DeWork for their team
- Responsibility for team members and their dedicated area
- Foresight when it comes to team management along ALANA's 10 Principles of a Good Community`,
    tools: `What tools are required?
- Access to Discord
- Access to Google Sheets
- Access to Milanote
- Access to Figma / Canva`,
    reach: 1453, orgImpact: 3, customerImpact: 0.25,
    batteryLifeExample: 25, qualityExample: 85, interimResultExample: 702,
  },
  {
    id: 'grant-proposal-writing',
    category: 'Writing a Grant Proposal',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write a grant proposal?
- Define the objective, purpose and proposed solution of the grant proposal
- Evaluate value alignment with the potential grant giver
- Research and gathering information on how to write the grant
- Network building in the grant giver community
- Coordination with the Branding Team
- Refined pitch for your proposed project
- Following procedure to hand in the grant proposal to the grant giver`,
    tools: `What tools are required?
- Access to Discord
- Access to Google Sheets
- Access to Figma / Canva`,
    reach: 1453, orgImpact: 2.5, customerImpact: 1.5,
    batteryLifeExample: 60, qualityExample: 80, interimResultExample: 1953,
  },
  {
    id: 'dao-proposal-writing',
    category: 'Writing and submitting a DAO Proposal',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write and submit a DAO Proposal?
- Investigate the topic, open discussion threads
- Fill in proposal templates, involve community and build working groups if needed
- Post on Discord and Snapshot, and communicate the active proposal`,
    tools: `What tools are required?
- Access to Discord
- Access to Google Sheets
- Access to Snapshot (if applicable)`,
    reach: 1453, orgImpact: 2, customerImpact: 1,
    batteryLifeExample: 70, qualityExample: 75, interimResultExample: 1602,
  },
  {
    id: 'legal-protection-management',
    category: 'Management of Legal Protection for ALANA',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to manage legal protection?
- Review laws and research legal issues relevant to ALANA
- Outline protection sections, draft with lawyers
- Schedule meetings, refine drafts, gather community input
- Implement on platforms`,
    tools: `What tools are required?
- Access to Google Sheets
- Access to Zoom or similar
- Proficient language knowledge in Spanish`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.25,
    batteryLifeExample: 50, qualityExample: 90, interimResultExample: 1259,
  },
  {
    id: 'organizational-structural-design',
    category: 'Organizational/Structural Design',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to design ALANA's organizational structure?
- Analyze existing structure, survey DAO members
- Define roles and branches, visualize flow
- Create DAO proposal with visuals
- Implement via HatsProtocol and announce changes`,
    tools: `What tools are required?
- Access to Discord
- Access to Figma
- Access to Google Sheets
- Access to HatsProtocol`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.25,
    batteryLifeExample: 90, qualityExample: 90, interimResultExample: 2266,
  },
  {
    id: 'implement-execute-dao-proposal',
    category: 'Implementing & Execute a successful DAO Proposal',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to implement and execute a DAO Proposal?
- Document in Gitbook, receive legal confirmation
- Enact all steps from the proposal to ensure successful execution`,
    tools: `What tools are required?
- Access to Gitbook or similar
- Access to Google Sheets
- Access to necessary secondary contacts`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.25,
    batteryLifeExample: 30, qualityExample: 70, interimResultExample: 587,
  },
  {
    id: 'research-tools-software',
    category: 'Research for tools/software',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to research tools and software for ALANA?
- Identify need, define requirements, consider constraints
- Evaluate competitive tools, present findings
- Lead implementation and testing if consensus is reached
- Write documentation`,
    tools: `What tools are required?
- Access to Word or similar
- Access to documentation`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.25,
    batteryLifeExample: 15, qualityExample: 90, interimResultExample: 378,
  },
  {
    id: 'financial-reporting-products',
    category: 'Financial Reporting for Products',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to produce financial reporting for ALANA's products?
- Gather financial data and organize history
- Create income, balance, and cash flow statements
- Perform analysis, maintain reporting schedule
- Publish info and refine processes`,
    tools: `What tools are required?
- Google Sheets or similar
- Dework or similar
- Token Contract access
- Stripe`,
    reach: 1453, orgImpact: 1.5, customerImpact: 0.5,
    batteryLifeExample: 38, qualityExample: 75, interimResultExample: 580,
  },
  {
    id: 'interviews-feedback-initiatives',
    category: 'Writing Interviews/Feedback Initiatives',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write interviews and feedback initiatives?
- Research interviewee, develop questions
- Coordinate time, create structure
- Practice active listening, review notes
- Identify themes, structure narrative, suggest resolutions`,
    tools: `What tools are required?
- Access to Word or similar
- Access to a meeting coordination tool such as Calendly or Lettucemeet
- Access to a form designer tool like Deform`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.5,
    batteryLifeExample: 30, qualityExample: 84, interimResultExample: 769,
  },
  {
    id: 'newsletter-writing',
    category: 'Newsletter Writing',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write the ALANA newsletter?
- Duplicate Mailchimp template
- Research LEARN, CREATE, and BUILD categories
- Reach out to creator for assets
- Write content for each topic, link items, and schedule sending`,
    tools: `What tools are required?
- Mailchimp
- Photoshop or similar`,
    reach: 200, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 45, qualityExample: 70, interimResultExample: 99,
  },
  {
    id: 'educational-article-social-content',
    category: 'Educational Article Writing + Social Media Content Writing',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write educational articles and social content?
- Follow "The Art of Explanation" by Ros Atkins
- Set up questions, gather, distil, organize and link information
- Tighten content and deliver with visuals across socials`,
    tools: `What tools are required?
- Google Sheets or similar
- Google Docs or similar
- AI Generator for images
- mirror.xyz access
- Social media accounts for outreach`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 60, qualityExample: 80, interimResultExample: 628,
  },
  {
    id: 'product-documentation',
    category: 'Writing Product Specific Documentation',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write product-specific documentation?
- Learn the product, set up a meeting with a questionnaire
- Write comprehensive documentation
- Have it proofread and hand over to Identity & Socials team`,
    tools: `What tools are required?
- Access to Word or similar
- Access to docs, GitHub or the website manager`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.5,
    batteryLifeExample: 35, qualityExample: 90, interimResultExample: 961,
  },
  {
    id: 'general-documentation',
    category: 'Writing Important General Documentation',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write important general documentation?
- Requires holistic understanding of ALANA
- Follow Ros Atkins's framework: set up, find, distil, organize and link information
- Tighten and deliver with visuals`,
    tools: `What tools are required?
- Access to Word or similar
- Access to docs, GitHub or the website manager`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.5,
    batteryLifeExample: 50, qualityExample: 90, interimResultExample: 1373,
  },

  // ── Identity & Socials ───────────────────────────────────────────────────
  {
    id: 'livestream-podcast',
    category: 'An ALANA Livestream/Podcast',
    branches: ['Identity & Socials'],
    description: `What does it take to host an ALANA livestream or podcast?
- Reach out to guest, send follow-up for headshot, bio and links
- Set up graphics, schedule on socials
- Prepare script, brief the guest, set up stream platform
- Follow up post-event`,
    tools: `What tools are required?
- Access to Google Sheets
- Access to ALANA Figma
- Access to Streaming Platform
- Access to Streamlabs`,
    reach: 1453, orgImpact: 1.5, customerImpact: 1.5,
    batteryLifeExample: 60, qualityExample: 70, interimResultExample: 1098,
  },
  {
    id: 'event-managing',
    category: 'Event Managing',
    branches: ['Identity & Socials'],
    description: `What does it take to manage an ALANA event?
- Coordinate with host for guests and co-hosts
- Gather headshots, bios, and links
- Set up graphics, schedule on socials
- Share stream link to all and follow up with participants`,
    tools: `What tools are required?
- Access to Google Sheets
- Access to ALANA Figma
- Access to Streaming Platform
- Access to Streamlabs`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 50, qualityExample: 70, interimResultExample: 763,
  },
  {
    id: 'event-hosting-moderation',
    category: 'Event Hosting/Moderation',
    branches: ['Identity & Socials'],
    description: `What does it take to host or moderate an ALANA event?
- Collaborate with manager, prepare script and questions
- Reshare announcements on socials
- Hold a briefing meeting with guests to understand their interests`,
    tools: `What tools are required?
- Access to Google Sheets
- Access to ALANA Figma
- Access to Streaming Platform
- Access to Streamlabs`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 23, qualityExample: 70, interimResultExample: 351,
  },
  {
    id: 'webinar',
    category: 'Webinar',
    branches: ['Identity & Socials'],
    description: `What does it take to run an ALANA webinar?
- Investigate community topic, seek partners
- Prepare flow, get confirmations, set up graphics
- Schedule on socials, brief co-host, set up platform
- Follow up post-event`,
    tools: `What tools are required?
- Access to Milanote
- Access to ALANA Figma
- Access to Streaming Platform
- Access to Streamlabs`,
    reach: 1453, orgImpact: 2, customerImpact: 2.5,
    batteryLifeExample: 70, qualityExample: 70, interimResultExample: 1922,
  },
  {
    id: 'onboarding-community-members',
    category: 'Onboarding new Community Members',
    branches: ['Identity & Socials'],
    description: `What does it take to onboard new community members?
- Greet members in Discord and Telegram
- Guide through onboarding steps, offer branch guidance
- Conduct one-on-one calls, maintain relationships
- Help reshare content`,
    tools: `What tools are required?
- Access to Discord
- Access to Telegram`,
    reach: 1453, orgImpact: 0.5, customerImpact: 0.5,
    batteryLifeExample: 15, qualityExample: 90, interimResultExample: 118,
  },
  {
    id: 'community-protection-patrol',
    category: 'Community Protection Patrol',
    branches: ['Identity & Socials'],
    description: `What does it take to protect the ALANA community?
- Check security bots, scan channels for suspicious activity
- Use bot commands after manual inspection
- Maintain a mod log and alert community to new risks and scams`,
    tools: `What tools are required?
- Access to Discord Mod permissions
- Access to Wick Bot
- Access to Mee6 bot
- Access to Carl bot`,
    reach: 1453, orgImpact: 2.5, customerImpact: 0.25,
    batteryLifeExample: 45, qualityExample: 65, interimResultExample: 701,
  },
  {
    id: 'communication-platform-maintenance',
    category: 'Communication Platform Maintenance',
    branches: ['Identity & Socials'],
    description: `What does it take to maintain ALANA's communication platforms?
- Identify pain points, survey audience
- Plan new layout in Milanote and Figma, gather feedback
- Refine based on input, implement adjustments
- Conduct frequent audits`,
    tools: `What tools are required?
- Planning tools like Milanote
- Mock-up tools like Figma
- Admin Access to the platform in question`,
    reach: 1453, orgImpact: 1.5, customerImpact: 1.5,
    batteryLifeExample: 10, qualityExample: 70, interimResultExample: 183,
  },
  {
    id: 'onboarding-experience-design',
    category: 'Design, Implement, Innovate and Maintain Onboarding Experiences',
    branches: ['Identity & Socials'],
    description: `What does it take to design and maintain onboarding experiences?
- Understand target audience, survey existing community
- Create mockup, gather feedback, refine
- Test with core audience before full publish
- Conduct frequent audits`,
    tools: `What tools are required?
- Planning tools like Milanote
- Mock-up tools like Figma`,
    reach: 1453, orgImpact: 2, customerImpact: 1.5,
    batteryLifeExample: 70, qualityExample: 70, interimResultExample: 1495,
  },
  {
    id: 'social-media-management',
    category: 'Social Media Management for one channel',
    branches: ['Identity & Socials'],
    description: `What does it take to manage one ALANA social media channel?
- Plan content by monitoring ALANA activity
- Create a content calendar, manage post timing
- Fix errors, execute plans
- Request content creator assets as needed`,
    tools: `What tools are required?
- Social media platform access
- Milanote access for planning
- Figma access for graphic adaptions and brand assets`,
    reach: 1453, orgImpact: 1.2, customerImpact: 1.5,
    batteryLifeExample: 15, qualityExample: 70, interimResultExample: 206,
  },
  {
    id: 'social-media-content-creation',
    category: 'Social Media Content Creation',
    branches: ['Identity & Socials'],
    description: `What does it take to create social media content for ALANA?
- Use content pillars and trending topics, write captions
- Film, source, or design visuals
- Edit photos and videos, add captions and branded elements
- Develop thumbnails and format for platforms`,
    tools: `What tools are required?
- Google Docs or similar
- Access to Milanote
- Access to Figma
- Adobe Illustrator
- Midjourney, Comfy UI or similar`,
    reach: 1453, orgImpact: 1, customerImpact: 1,
    batteryLifeExample: 5, qualityExample: 70, interimResultExample: 51,
  },
  {
    id: 'brand-collaboration-pr',
    category: 'Brand Collaboration/PR',
    branches: ['Identity & Socials'],
    description: `What does it take to execute a brand collaboration or PR initiative?
- Respond to or target brands, research and analyze alignment
- Set up meetings, draft collaboration agreements
- Involve relevant teams for execution and launch campaign`,
    tools: `What tools are required?
- Email access
- Calendly or similar
- Google Docs or similar
- Access to Milanote
- Access to Figma
- Adobe Illustrator
- Midjourney, Comfy UI or similar`,
    reach: 1453, orgImpact: 2, customerImpact: 0.5,
    batteryLifeExample: 45, qualityExample: 70, interimResultExample: 572,
  },
  {
    id: 'brand-identity-kit-maintenance',
    category: 'Brand Identity Kit Maintenance',
    branches: ['Identity & Socials'],
    description: `What does it take to maintain ALANA's Brand Identity Kit?
- Audit brand usage, update visual elements, refine messaging
- Create new templates, use feedback systems for inconsistencies
- Conduct branding workshops and apply data insights`,
    tools: `What tools are required?
- Access to Figma
- Adobe Illustrator
- Midjourney, Comfy UI or similar`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 10, qualityExample: 90, interimResultExample: 147,
  },
  {
    id: 'branded-asset-creation',
    category: 'Branded Asset Creation',
    branches: ['Identity & Socials'],
    description: `What does it take to create branded assets for ALANA?
- Reference the existing brand identity kit
- Use the Figma space to craft entirely new brand elements as needed`,
    tools: `What tools are required?
- Access to Figma
- Adobe Illustrator
- Midjourney, Comfy UI or similar`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 10, qualityExample: 90, interimResultExample: 180,
  },
  {
    id: 'website-maintenance-updates',
    category: 'Website Maintenance/Updates',
    branches: ['Identity & Socials'],
    description: `What does it take to maintain and update ALANA's website?
- Perform regular maintenance including bug fixes and security patches
- Content updates, add sub-pages as needed
- Implement new functionalities when available and appropriate`,
    tools: `What tools are required?
- GitHub Team Access
- Access to Figma
- Access to other required tools or resources`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 10, qualityExample: 90, interimResultExample: 147,
  },
  {
    id: 'product-website-design',
    category: 'Product Website Design',
    branches: ['Identity & Socials'],
    description: `What does it take to design a product website for ALANA?
- Define goals and audience, outline content, sketch layouts
- Apply brand identity, design high-fidelity prototypes in Figma
- Write copy, gather feedback, and prepare for handoff to developers`,
    tools: `What tools are required?
- GitHub Team Access
- Access to Figma
- Access to other required tools or resources`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 90, qualityExample: 90, interimResultExample: 1618,
  },
  {
    id: 'marketing-campaign',
    category: "Dedicated Marketing Campaign for one of ALANA's Products",
    branches: ['Identity & Socials'],
    description: `What does it take to run a dedicated marketing campaign?
- Learn the product, consult the responsible team
- Draft campaign with deliverables, create content or instruct others
- Build a posting schedule, set launch date, and oversee publication`,
    tools: `What tools are required?
- Calendly or similar
- Google Docs, Figma or similar
- Access to Milanote
- Access to Figma`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 65, qualityExample: 90, interimResultExample: 956,
  },
  {
    id: 'attending-presentations-talks',
    category: "Attending Presentations & Talks on behalf of an ALANA Product",
    branches: ['Identity & Socials'],
    description: `What does it take to represent ALANA at presentations and talks?
- Research event and attendees, consult product team
- Prepare brand-aligned presentation
- Communicate attendance to social media team
- Craft at least one tagging social post`,
    tools: `What tools are required?
- Social media account(s)
- Calendly or similar
- Google Docs, Figma or similar
- Access to Milanote
- Access to Figma
- Midjourney, Comfy UI or similar`,
    reach: 1453, orgImpact: 1, customerImpact: 1.25,
    batteryLifeExample: 60, qualityExample: 80, interimResultExample: 785,
  },

  // ── ALANAmagazine ────────────────────────────────────────────────────────
  {
    id: 'magazine-content-curation',
    category: 'ALANAmagazine Content Curation',
    branches: ['ALANAmagazine'],
    description: `What does it take to curate content for ALANAmagazine?
- Ensure theme alignment and understand audience preferences
- Compile reliable sources and provide insights and summaries
- Structure content flow for engaging reader navigation`,
    tools: `What tools are required?
- Google Sheets or similar`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 40, qualityExample: 84, interimResultExample: 537,
  },
  {
    id: 'magazine-editorial-curation',
    category: 'ALANAmagazine Editorial Curation and Management',
    branches: ['ALANAmagazine'],
    description: `What does it take to manage editorial curation for ALANAmagazine?
- Develop editorial concept, create mood board
- Submit credentials, establish timeline, provide submission page details
- Run fair selection and art-direct the final curation list`,
    tools: `What tools are required?
- Access to Milanote
- Access to Website submissions
- Blender or similar
- CLO 3D, Marvelous or similar
- Figma or similar
- Photoshop or similar`,
    reach: 1453, orgImpact: 0.25, customerImpact: 3,
    batteryLifeExample: 50, qualityExample: 90, interimResultExample: 850,
  },
  {
    id: 'magazine-contributor-management',
    category: 'ALANAmagazine Contributor Management',
    branches: ['ALANAmagazine'],
    description: `What does it take to manage contributors for ALANAmagazine?
- Seek new voices, establish clear expectations
- Have contributors sign agreements, appoint editors
- Provide submission process, give feedback, hold to deadlines
- Check in regularly`,
    tools: `What tools are required?
- Google Sheets or similar
- Calendly
- Video Call Software`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.5,
    batteryLifeExample: 30, qualityExample: 50, interimResultExample: 153,
  },
  {
    id: 'magazine-interview-coordination',
    category: 'ALANAmagazine Interview Coordination',
    branches: ['ALANAmagazine'],
    description: `What does it take to coordinate interviews for ALANAmagazine?
- Determine interviewee from curation sheet, gather background info
- Contact subject, develop flexible questions
- Prepare recording tools, capture interview
- Follow up for clarification`,
    tools: `What tools are required?
- Google Sheets or similar
- Video Recording Software (e.g. OBS)
- Video Call Software
- Social media accounts for outreach`,
    reach: 1453, orgImpact: 0.25, customerImpact: 0.5,
    batteryLifeExample: 40, qualityExample: 75, interimResultExample: 131,
  },
  {
    id: 'magazine-article-writing',
    category: 'ALANAmagazine Article Writing',
    branches: ['ALANAmagazine'],
    description: `What does it take to write an article for ALANAmagazine?
- Convert interview to text if applicable, or select topic from curation sheet
- Gather sources, write draft with introduction, body, and conclusion
- Revise, proofread, get feedback, and submit`,
    tools: `What tools are required?
- Google Sheets or similar
- Google Docs or similar
- Social media accounts for outreach`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 60, qualityExample: 80, interimResultExample: 767,
  },
  {
    id: 'magazine-short-form-writing',
    category: 'ALANAmagazine Short-form Content Writing',
    branches: ['ALANAmagazine'],
    description: `What does it take to write short-form content for ALANAmagazine?
- Pick topic from curation sheet, gather accurate data
- Structure content logically and briefly, add visuals if applicable
- Revise for clarity, proofread, and send for editorial feedback`,
    tools: `What tools are required?
- Google Sheets or similar
- Google Docs or similar
- Social media accounts for outreach`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 30, qualityExample: 80, interimResultExample: 314,
  },
  {
    id: 'magazine-fact-checking-editing',
    category: 'ALANAmagazine Fact-Checking & Content Editing',
    branches: ['ALANAmagazine'],
    description: `What does it take to fact-check and edit for ALANAmagazine?
- Verify sources, check claims with author, provide feedback
- Assess organization and flow, remove redundancies, check visuals
- Proofread for errors, offer constructive notes, and hand to layouter`,
    tools: `What tools are required?
- PDF Reader and annotation tool
- Google Docs or similar`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 70, qualityExample: 80, interimResultExample: 732,
  },
  {
    id: 'magazine-layout-design',
    category: 'ALANAmagazine Layout Design',
    branches: ['ALANAmagazine'],
    description: `What does it take to design the layout of ALANAmagazine?
- Align design with ALANA branding, develop style guide and grid system
- Use typographic hierarchy, manage white space
- Select quality images, adjust for print and digital
- Export final files`,
    tools: `What tools are required?
- InDesign
- PDF Reader
- Photoshop
- AI Enhancer`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.75,
    batteryLifeExample: 85, qualityExample: 85, interimResultExample: 1260,
  },
  {
    id: 'magazine-proof-reading',
    category: 'ALANAmagazine Proof Reading',
    branches: ['ALANAmagazine'],
    description: `What does it take to proofread ALANAmagazine?
- Requires 3 to 5 people (not the original author) to review
- 124 pages of patience and eagle-eyed attention to detail`,
    tools: `What tools are required?
- PDF Reader and annotation tool`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.5,
    batteryLifeExample: 50, qualityExample: 65, interimResultExample: 331,
  },
  {
    id: 'magazine-media-kit',
    category: 'ALANAmagazine Media Kit Creation',
    branches: ['ALANAmagazine'],
    description: `What does it take to create the ALANAmagazine media kit?
- Define goals, compile magazine details, describe content and ad options
- Gather reach statistics, incorporate branded visuals, add team bios
- Design layout, proofread, and share digitally`,
    tools: `What tools are required?
- Photoshop or similar
- Figma, InDesign or similar
- PDF Creator
- AI enhancer and AI creation tools`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 50, qualityExample: 75, interimResultExample: 490,
  },
  {
    id: 'magazine-partnership-sponsor',
    category: 'ALANAmagazine Partnership/Sponsor Acquisition & Management',
    branches: ['ALANAmagazine'],
    description: `What does it take to acquire and manage ALANAmagazine partnerships?
- Research aligned brands, use Media Kit for pitching
- Write concise outreach, emphasize sponsor benefits
- Follow up, negotiate packages, maintain relationships
- Report on outcomes`,
    tools: `What tools are required?
- Video Call Software
- Social media accounts for outreach
- Google Docs (Sponsor Sheet)`,
    reach: 1453, orgImpact: 2, customerImpact: 0.5,
    batteryLifeExample: 35, qualityExample: 65, interimResultExample: 331,
  },
  {
    id: 'community-competitions',
    category: 'Managing Community Competitions',
    branches: ['ALANAmagazine'],
    description: `What does it take to manage community competitions?
- Define parameters and timeline, create rules
- Develop submission platform, create marketing materials
- Manage and organize submissions, notify winners
- Announce results on socials`,
    tools: `What tools are required?
- Figma
- Milanote`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2.75,
    batteryLifeExample: 50, qualityExample: 75, interimResultExample: 708,
  },
  {
    id: 'magazine-graphic-design',
    category: 'ALANAmagazine Graphic Design',
    branches: ['ALANAmagazine'],
    description: `What does it take to create graphics for ALANAmagazine?
- Create graphics from scratch
- Retouch existing or submitted imagery so it fits the magazine layout`,
    tools: `What tools are required?
- Photoshop or similar
- Illustrator or similar
- AI enhancer and AI creation tools`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.75,
    batteryLifeExample: 30, qualityExample: 75, interimResultExample: 262,
  },
  {
    id: 'magazine-ar-filter',
    category: 'ALANAmagazine AR Filter Creation',
    branches: ['ALANAmagazine'],
    description: `What does it take to create an AR filter for ALANAmagazine?
- Develop concept and references, create and refine basic shapes
- Combine elements, add details
- Perform retopology and topology baking
- Apply textures and potentially rig and weight paint`,
    tools: `What tools are required?
- Blender, Cinema 4D, Zbrush, etc.
- Substance Designer, Painter or Quixel`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 65, qualityExample: 70, interimResultExample: 1157,
  },
  {
    id: 'magazine-product-trailer',
    category: 'Create ALANAmagazine Product Trailer',
    branches: ['ALANAmagazine'],
    description: `What does it take to create the ALANAmagazine product trailer?
- Consult teams on visuals, gather finalized graphics
- Blockout scene in Blender, define lighting and textures
- Create pre-renders, finalize camera angles
- Collaborate with video editor and adjust per feedback`,
    tools: `What tools are required?
- Blender
- Texturing software
- Asset Library
- Sounds
- Video Editing software`,
    reach: 1453, orgImpact: 2.5, customerImpact: 3,
    batteryLifeExample: 60, qualityExample: 85, interimResultExample: 2853,
  },
  {
    id: 'magazine-production-management',
    category: 'ALANAmagazine Production Management',
    branches: ['ALANAmagazine'],
    description: `What does it take to manage ALANAmagazine production?
- Create production schedule, develop flatplan
- Coordinate content and assets, prepare print files
- Research printing facilities, liaise with printer
- Conduct press checks and coordinate distribution`,
    tools: `What tools are required?
- Google Sheets or similar
- InDesign`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 35, qualityExample: 75, interimResultExample: 601,
  },
  {
    id: 'magazine-sales-b2b',
    category: 'ALANAmagazine Sales Management B2B',
    branches: ['ALANAmagazine'],
    description: `What does it take to manage B2B sales for ALANAmagazine?
- Identify B2B clients, create pitch using Media Kit
- Develop bulk pricing, build decision-maker database
- Send personalized outreach, negotiate agreements
- Create distribution plan and track orders`,
    tools: `What tools are required?
- Video Call Software
- Social media accounts for outreach
- Google Docs (Sponsor Sheet)
- Inventory software
- Access to promotional resources`,
    reach: 1453, orgImpact: 2, customerImpact: 0.5,
    batteryLifeExample: 35, qualityExample: 65, interimResultExample: 331,
  },
  {
    id: 'magazine-distribution-management',
    category: 'ALANAmagazine Distribution Management',
    branches: ['ALANAmagazine'],
    description: `What does it take to manage ALANAmagazine distribution?
- Track orders and inventory
- Check automated emails from website form
- Print labels and arrange collection by shipping service`,
    tools: `What tools are required?
- Google Sheets or similar
- Delivery Service Access (UPS, DHL, etc.)
- Access to the Multi-sig Wallet
- Access to Unlock Lock
- Access to Stripe Service
- Labeling Tool & Software`,
    reach: 1453, orgImpact: 0.25, customerImpact: 3,
    batteryLifeExample: 15, qualityExample: 65, interimResultExample: 184,
  },

  // ── ALANAboutique ────────────────────────────────────────────────────────
  {
    id: 'boutique-seasonal-content-curation',
    category: 'ALANAboutique Seasonal Content Curation',
    branches: ['ALANAboutique'],
    description: `What does it take to curate seasonal content for ALANAboutique?
- Define season theme and narrative, write curatorial statement
- Create timeline, identify aligned artists and brands
- Select artworks for mock-up graphics
- Compile into a streamlined season proposal`,
    tools: `What tools are required?
- Access to Milanote`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 95, qualityExample: 85, interimResultExample: 1291,
  },
  {
    id: 'boutique-exhibition-curation',
    category: 'ALANAboutique Individual Exhibition Curation',
    branches: ['ALANAboutique'],
    description: `What does it take to curate an individual exhibition for ALANAboutique?
- Brainstorm educational topics, conduct research
- Select artworks with proper permissions, write descriptions
- Forward to design team with layout and interaction plans
- Write a press release`,
    tools: `What tools are required?
- Access to Milanote`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 55, qualityExample: 70, interimResultExample: 615,
  },
  {
    id: 'virtual-space-design',
    category: 'Virtual Space Design',
    branches: ['ALANAboutique'],
    description: `What does it take to design a virtual space for ALANAboutique?
- Develop space narrative, create layout plan aligned with ALANA brand
- Define user journey, research platform framework
- Model 3D environment, apply textures, optimize for web
- Create renderings`,
    tools: `What tools are required?
- Access to Milanote
- Access to Blender, Substance Painter and similar`,
    reach: 1453, orgImpact: 3, customerImpact: 2.8,
    batteryLifeExample: 100, qualityExample: 98, interimResultExample: 3304,
  },
  {
    id: 'virtual-sub-space-design',
    category: 'Virtual Sub-Space Design',
    branches: ['ALANAboutique'],
    description: `What does it take to design a virtual sub-space for ALANAboutique?
- Per Individual Exhibition Curation, create layout plan
- Define user flow, design 3D space from existing blueprint
- Develop sub-space-specific textures and assets
- Optimize for web deployment`,
    tools: `What tools are required?
- Access to Milanote
- Access to Blender, Substance Painter and similar`,
    reach: 1453, orgImpact: 1, customerImpact: 3,
    batteryLifeExample: 60, qualityExample: 90, interimResultExample: 1255,
  },
  {
    id: 'virtual-space-maintenance',
    category: 'Virtual Space Maintenance, Adaptions & Interactivity',
    branches: ['ALANAboutique'],
    description: `What does it take to maintain and adapt ALANA's virtual spaces?
- Perform regular maintenance including bug fixes and security patches
- Content updates, deploy updated versions
- Implement new functionalities as requested`,
    tools: `What tools are required?
- Access to the final model files
- Access to the deployment service and API keys used
- Access to the ALANA GitHub`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 35, qualityExample: 70, interimResultExample: 320,
  },
  {
    id: 'virtual-space-deployment',
    category: 'Virtual Space Platform Implementation & Deployment',
    branches: ['ALANAboutique'],
    description: `What does it take to implement and deploy a virtual space platform?
- Import Blender files to game engine (e.g., UE5), optimize
- Design navigation UI, set up hosting and CDN
- Conduct load and frame rate tests
- Hand over to web developers with instructions`,
    tools: `What tools are required?
- Access to the final model files
- Access to the deployment service and API keys used
- Access to the ALANA GitHub`,
    reach: 1453, orgImpact: 1, customerImpact: 3,
    batteryLifeExample: 50, qualityExample: 85, interimResultExample: 988,
  },
  {
    id: 'boutique-pitch-deck',
    category: 'ALANAboutique Pitch Deck Creation',
    branches: ['ALANAboutique'],
    description: `What does it take to create the ALANAboutique pitch deck?
- Define pitch deck goals, compile boutique details
- Describe content and exhibition options, gather reach statistics
- Incorporate branded renderings, add team bios
- Design layout, proofread, and share digitally`,
    tools: `What tools are required?
- Photoshop or similar
- Figma, InDesign or similar
- PDF Creator
- AI enhancer and AI creation tools`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 50, qualityExample: 75, interimResultExample: 490,
  },
  {
    id: 'boutique-contributor-brand-management',
    category: 'ALANAboutique Contributor/Brand Management',
    branches: ['ALANAboutique'],
    description: `What does it take to manage contributors and brands for ALANAboutique?
- Seek new voices per curation themes, establish expectations
- Obtain signed agreements, appoint curator
- Provide clear submission process, deliver organized files
- Give feedback and check in regularly`,
    tools: `What tools are required?
- Google Sheets or similar
- Calendly
- Video Call Software`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.5,
    batteryLifeExample: 30, qualityExample: 65, interimResultExample: 198,
  },
  {
    id: 'contributor-brand-integration',
    category: 'Contributor/Brand Integration in Virtual Spaces',
    branches: ['ALANAboutique'],
    description: `What does it take to integrate contributors and brands into virtual spaces?
- Receive brief and files, investigate and adapt if necessary
- Integrate assets into Unreal Engine, render approval shots
- Provide images to management team
- Hand updated file to deployment team`,
    tools: `What tools are required?
- Blender or similar
- Unreal Engine 5
- Substance Designer, Painter or similar
- Access to Milanote, brief and email
- Access to Google Drive`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1,
    batteryLifeExample: 80, qualityExample: 90, interimResultExample: 523,
  },
  {
    id: 'boutique-sales-distribution',
    category: 'ALANAboutique Management, Sales & Distribution',
    branches: ['ALANAboutique'],
    description: `What does it take to manage ALANAboutique sales and distribution?
- Maintain contributor and brand communication, monitor and process orders
- Handle fulfillment coordination, respond to customers
- Ensure website performance, execute marketing campaigns
- Track KPIs and generate quarterly DAO reports`,
    tools: `What tools are required?
- Access to BOSON Protocol page
- Access to WooCommerce
- Access to all Contributor and Brand contacts
- Access to the ALANAboutique Multi-sig wallet
- Access to Google Sheets or similar`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2.5,
    batteryLifeExample: 25, qualityExample: 84, interimResultExample: 336,
  },
  {
    id: '3d-asset-tier1',
    category: 'Modeling a 3D Asset - Tier#1 (difficulty - easy)',
    branches: ['ALANAboutique'],
    description: `What does it take to model an easy 3D asset?
- For singular easy objects (e.g., a vase)
- Concept and references, basic shape creation, refining
- Adding details, texturing, and potentially lighting and rendering`,
    tools: `What tools are required?
- Blender, Cinema 4D, Zbrush, etc.
- Substance Designer, Painter or Quixel`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 30, qualityExample: 50, interimResultExample: 381,
  },
  {
    id: '3d-asset-tier2',
    category: 'Modeling a 3D Asset - Tier#2 (difficulty - challenging)',
    branches: ['ALANAboutique'],
    description: `What does it take to model a challenging 3D asset?
- For combined object structures (e.g., a layered sign)
- Concept and references, basic shape, refining, combining elements
- Adding details, retopology and topology baking
- Texturing and potentially rendering`,
    tools: `What tools are required?
- Blender, Cinema 4D, Zbrush, etc.
- Substance Designer, Painter or Quixel`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 50, qualityExample: 65, interimResultExample: 826,
  },
  {
    id: '3d-asset-tier3',
    category: 'Modeling a 3D Asset - Tier#3 (difficulty - difficult)',
    branches: ['ALANAboutique'],
    description: `What does it take to model a difficult 3D asset?
- For complex objects requiring retopology, rigging, or baked animations (e.g., characters or machines)
- Concept through base mesh, combining, detailing, retopology
- Texturing, rigging, weight painting, and animations`,
    tools: `What tools are required?
- Blender, Cinema 4D, Zbrush, etc.
- Substance Designer, Painter or Quixel
- Cascadeur or other animation software`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 70, qualityExample: 85, interimResultExample: 1513,
  },
  {
    id: 'custom-texture-design',
    category: 'Custom Texture Design',
    branches: ['ALANAboutique'],
    description: `What does it take to design custom textures for ALANAboutique?
- Research and moodboard the topic, break visuals into nodes
- Assemble node tree through experimentation
- Export for different applications
- Conduct software translation testing with potential iteration`,
    tools: `What tools are required?
- AI Tools
- Substance Designer, Painter, Sampler or similar`,
    reach: 1453, orgImpact: 0.5, customerImpact: 2,
    batteryLifeExample: 30, qualityExample: 50, interimResultExample: 381,
  },

  // ── FABA Studio ──────────────────────────────────────────────────────────
  {
    id: 'faba-model-retraining',
    category: 'Retraining FABA Models',
    branches: ['FABA Studio'],
    description: `What does it take to retrain FABA models?
- Collect and prepare training data
- Train AI model on community-specific content and interactions
- Fine-tune weights of existing models for domain-specific needs`,
    tools: `What tools are required?
- Access to AI dev environments (VSCode, PyCharm, Jupyter Notebooks)
- Access to training libraries (PyTorch or similar SDKs)
- Access to agentic coding tools (Claude Code, Codex)`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1,
    batteryLifeExample: 60, qualityExample: 70, interimResultExample: 305,
  },
  {
    id: 'faba-evaluation-tests',
    category: 'Write and Automate Evaluation Tests for new FABA Studio Versions',
    branches: ['FABA Studio'],
    description: `What does it take to write and automate evaluation tests for FABA Studio?
- Run full feature tests, detect regressions
- Design and write test plans or evals
- Monitor user transactions for anomalous patterns
- Create unit tests for continuous testing with every release`,
    tools: `What tools are required?
- Agentic coding tools (Claude, Codex)
- IDE (VSCode, PyCharm, Cursor)
- Access to Google Sheets
- Access to monitoring and reporting software (Galileo, Grafana, Datadog)`,
    reach: 1453, orgImpact: 0.25, customerImpact: 0.5,
    batteryLifeExample: 45, qualityExample: 70, interimResultExample: 137,
  },
  {
    id: 'faba-performance-improvements',
    category: 'Performance improvements to existing features (FABA Studio/AI Model)',
    branches: ['FABA Studio'],
    description: `What does it take to improve performance of existing FABA Studio features?
- Reduce latency, improve LLM streaming
- Enhance search and database retrieval
- Implement algorithmic refactors
- Demonstrate improvements via objective metrics such as latency and success rates`,
    tools: `What tools are required?
- Access to IDE and coding agents (VSCode, Cursor, Claude)
- Access to measurement and observability system (Grafana)`,
    reach: 1453, orgImpact: 0.25, customerImpact: 2,
    batteryLifeExample: 70, qualityExample: 60, interimResultExample: 549,
  },
  {
    id: 'faba-prd',
    category: 'PRD - Product Requirements Document',
    branches: ['FABA Studio'],
    description: `What does it take to write a Product Requirements Document for FABA Studio?
- Investigate proposal topic, open discussion threads
- Fill in templates, involve community and working groups
- Post on Discord and Snapshot
- Communicate the active proposal`,
    tools: `What tools are required?
- Access to Telegram (comms)
- Access to Google Docs (authoring)
- Access to ALANA GitHub
- Access to Snapshot (voting)`,
    reach: 1453, orgImpact: 1, customerImpact: 2,
    batteryLifeExample: 50, qualityExample: 75, interimResultExample: 654,
  },
  {
    id: 'faba-feature-ui-ux',
    category: 'Creating/Implementing new Feature - Specialty UI/UX Design',
    branches: ['FABA Studio'],
    description: `What does it take to design a new UI/UX feature for FABA Studio?
- Design UI layouts in Figma, prototype user flows via vibe coding
- Build front-end designs, submit PRs to GitHub
- Address reviewer comments and merge changes for the developer`,
    tools: `What tools are required?
- Access to Figma
- Access to Claude Code (for testing)
- Access to GitHub`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.5,
    batteryLifeExample: 70, qualityExample: 75, interimResultExample: 534,
  },
  {
    id: 'faba-feature-engineering',
    category: 'Creating/Implementing new Feature - Specialty Engineering',
    branches: ['FABA Studio'],
    description: `What does it take to engineer a new feature for FABA Studio?
- Design feature architecture, implement back-end API
- Connect front-end to back-end, submit a PR
- Respond to reviewer comments fixing bugs
- Merge feature into main branch`,
    tools: `What tools are required?
- Access to Claude Code
- Access to Figma (frontend work)
- Access to GitHub`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.5,
    batteryLifeExample: 70, qualityExample: 75, interimResultExample: 534,
  },
  {
    id: 'faba-feature-documentation',
    category: 'Creating/Implementing new Feature - Specialty Documentation/Education',
    branches: ['FABA Studio'],
    description: `What does it take to document and educate on a new FABA Studio feature?
- Read and revise the PRD
- Meet with designers and developers to understand the feature
- Build marketing materials and training content from the user's perspective`,
    tools: `What tools are required?
- Access to Google Docs (written docs)
- Access to Loom or OBS (for video tutorials)`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1,
    batteryLifeExample: 30, qualityExample: 60, interimResultExample: 131,
  },
  {
    id: 'faba-bug-fix',
    category: 'Bug Fix - General, Security, UX/UI, etc.',
    branches: ['FABA Studio'],
    description: `What does it take to fix bugs in FABA Studio?
- Fix defects and regressions, apply security patches
- Write tests confirming fixes
- Add to unit tests for continuous monitoring to prevent future regressions`,
    tools: `What tools are required?
- Access to GitHub
- Access to coding agents (Claude, Codex)
- Access to IDE (Cursor, VSCode)
- Access to monitoring and observability system`,
    reach: 1453, orgImpact: 0.25, customerImpact: 1.75,
    batteryLifeExample: 35, qualityExample: 70, interimResultExample: 285,
  },
  {
    id: 'faba-recruiting',
    category: 'Recruiting for Contributions to AI Assistant',
    branches: ['FABA Studio'],
    description: `What does it take to recruit contributors for the FABA AI assistant?
- Find willing creatives, educate on benefits, protections, and compensation
- Develop and execute recruitment strategies across forums and meetups
- Define success metrics such as signups and sales`,
    tools: `What tools are required?
- Access to video call software (Zoom, Google Meets, Telegram, Huddle)
- Access to social media tools (Snap, Instagram, X)
- Access to content creation tools (Buffer, Canva, Capcut, Meta Business Suite)`,
    reach: 1453, orgImpact: 1, customerImpact: 1,
    batteryLifeExample: 30, qualityExample: 60, interimResultExample: 209,
  },
  {
    id: 'faba-partnerships-sponsor',
    category: 'FABA Studio Partnerships/Sponsor Acquisition & Management',
    branches: ['FABA Studio'],
    description: `What does it take to acquire and manage partnerships for FABA Studio?
- Research aligned companies, develop a media kit
- Write concise outreach, emphasize sponsor benefits
- Follow up, negotiate sponsorship levels
- Coordinate implementation with design and engineering teams
- Report on outcomes`,
    tools: `What tools are required?
- Video Call Software (Google Meets, Huddle, Zoom)
- Social media accounts for outreach (Instagram, Telegram)
- Google Docs (Sponsor Sheet)`,
    reach: 1453, orgImpact: 2, customerImpact: 0.5,
    batteryLifeExample: 35, qualityExample: 65, interimResultExample: 331,
  },
];
