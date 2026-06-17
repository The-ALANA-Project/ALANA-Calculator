import { ContributionTemplate, Branch } from '../types/contribution';

// Parsed from CSV - only including templates with all required fields filled
export const contributionTemplates: ContributionTemplate[] = [
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
- Access to Figma/ Canva`,
    reach: 1453,
    orgImpact: 3,
    customerImpact: 0.25,
    batteryLifeExample: 25,
    qualityExample: 85,
    interimResultExample: 702,
  },
  {
    id: 'grant-proposal-writing',
    category: 'Writing a Grant Proposal',
    branches: ['Infrastructure & Strategy', 'FABA Studio'],
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
- Access to Figma/ Canva`,
    reach: 1453,
    orgImpact: 2.5,
    customerImpact: 1.5,
    batteryLifeExample: 60,
    qualityExample: 80,
    interimResultExample: 1953,
  },
  {
    id: 'dao-proposal-writing',
    category: 'Writing and submitting a DAO Proposal',
    branches: ['Infrastructure & Strategy', 'ALANAmagazine', 'FABA Studio', 'ALANAboutique', 'Onboarding & Community', 'Brand Identity & Socials'],
    description: `What does it take to write and submit a DAO Proposal?
- Investigation in the dedicated proposal topic (can be technical, require work with third parties, purely investigative, etc...)
- Open up a new conversation thread in the DAC Discussions channels
- Create a new template and fill in all the data as seen in former examples
- Involve other people from your dedicated branch and wider community to create a proposal that will meet the quorum
- If necessary build working groups
- Finally, post the finished proposal on Discord/ Snapshot and bring attention to it
- Implementing a DAO Proposal is another task and can look very unique depending on what is being proposed!`,
    tools: `What tools are required?
- Access to Discord
- Access to Google Sheets
- Access to Snapshot (if applicable)`,
    reach: 1453,
    orgImpact: 2,
    customerImpact: 1,
    batteryLifeExample: 70,
    qualityExample: 75,
    interimResultExample: 1602,
  },
  {
    id: 'legal-protection-management',
    category: 'Management of Legal Protection for ALANA',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to write drafts around legal protection for ALANA and coordinate with lawyers?
- Review existing community rights laws and frameworks
- Identify and conduct research on legal issues needing solving or protection
- Inform yourself about relevant local, state, and federal regulations
- Outline main sections of legal protection needed
- Reach out to an ALANA lawyer and introduce the issue
- Schedule a meeting to discuss potential adjustments
- Refine the final draft with the lawyer
- Present draft to community members for input
- Implement the new legal draft on platforms where needed`,
    tools: `What tools are required?
- Access to Google Sheets
- Access to Zoom or similar
- Proficient language knowledge in Spanish (ALANA is incorporated in Peru)`,
    reach: 1453,
    orgImpact: 2.5,
    customerImpact: 0.25,
    batteryLifeExample: 50,
    qualityExample: 90,
    interimResultExample: 1259,
  },
  {
    id: 'organizational-structural-design',
    category: 'Organizational/ Structural Design',
    branches: ['Infrastructure & Strategy'],
    description: `What does it take to create/maintain/innovate on ALANA's organizational design?
- A general understanding of the existing structure
- Thorough analysis of current organization and its failing/weak elements
- Inquiry with DAO members about satisfaction/dissatisfaction
- Definition of new roles or branches according to evaluated data
- Clear definition of roles and/or additional branches
- Clear argument for or against certain roles/branches
- Establish clear expectations if new roles or branches are added
- Design a flow in visual format showing benefits
- Create a DAO Proposal for the new structure
- If accepted, establish changes onchain with HatsProtocol x Unlock Protocol
- Officially announce changes
- Help guide people towards established changes`,
    tools: `What tools are required?
- Access to Discord
- Access to Figma
- Access to Google Sheets
- Access to HatsProtocol`,
    reach: 1453,
    orgImpact: 2.5,
    customerImpact: 0.25,
    batteryLifeExample: 90,
    qualityExample: 90,
    interimResultExample: 2266,
  },
];
