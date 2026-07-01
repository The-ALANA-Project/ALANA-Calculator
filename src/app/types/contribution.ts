export type Branch =
  | 'Infrastructure & Strategy'
  | 'Identity & Socials'
  | 'ALANAmagazine'
  | 'ALANAboutique'
  | 'FABA Studio';

export const BRANCH_FACTORS: Record<Branch, number> = {
  'Infrastructure & Strategy': 7,
  'Identity & Socials': 5,
  'ALANAmagazine': 4,
  'ALANAboutique': 4,
  'FABA Studio': 4,
};

export interface ReviewEntry {
  note: string;
  outcome: 'approved' | 'needs_revision';
  reviewedAt: number;
  reviewedBy: string;
  reviewerName?: string;
}

export interface ContributionTemplate {
  id: string;
  category: string;
  branches: Branch[];
  description: string;
  tools: string;
  reach: number;
  orgImpact: number;
  customerImpact: number;
  batteryLifeExample?: number;
  qualityExample?: number;
  interimResultExample?: number;
  milestoneIds?: string[];
  isDraft?: boolean;
}

export interface ContributionSubmission {
  id: string;
  templateId: string;
  templateName: string;
  userAddress: string;
  branches: Branch[];
  secondaryBranch?: Branch;

  // User inputs
  contributorName: string; // Name or handle
  batteryLife: number; // 0-100
  quality: number; // 0-100
  proofOfWork: string; // URL or description
  proofImages?: string[]; // Array of base64 image data URLs

  // Calculated values
  reach: number;
  orgImpact: number;
  customerImpact: number;
  branchFactor: number;
  calculatedReward: number;

  // Metadata
  status: 'draft' | 'pending' | 'in_review' | 'approved' | 'needs_revision';
  submittedAt: number;
  submittedForReviewAt?: number;
  reviewedAt?: number;
  reviewedBy?: string;
  reviewNotes?: string; // most recent note — kept for backwards compat
  reviewHistory?: ReviewEntry[];

  // Guardian adjustments (optional)
  adjustedBatteryLife?: number;
  adjustedQuality?: number;
  finalReward?: number;
}

export interface SubmissionInput {
  templateId: string;
  contributorName: string;
  batteryLife: number;
  quality: number;
  proofOfWork: string;
  proofImages?: string[];
}
