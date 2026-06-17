import { ContributionSubmission, SubmissionInput, BRANCH_FACTORS } from '../types/contribution';
import { contributionTemplates } from '../data/templates';

const SUBMISSIONS_KEY = 'alana_contributions_submissions';

/**
 * Calculate reward using the formula:
 * Contribution = (((((Reach * (OrgImpact + CustomerImpact)) * BatteryLife%))) * Quality%) * BranchFactor%
 * Branch Factor is converted to percentage: Factor 7 = 70%, Factor 6 = 60%, etc.
 */
export function calculateReward(
  reach: number,
  orgImpact: number,
  customerImpact: number,
  batteryLife: number, // 0-100
  quality: number, // 0-100
  branchFactor: number // 4-7
): number {
  const batteryLifeDecimal = batteryLife / 100;
  const qualityDecimal = quality / 100;
  const branchFactorDecimal = branchFactor / 10; // Convert rank to percentage: 7 → 0.7 (70%)

  const reward =
    reach *
    (orgImpact + customerImpact) *
    batteryLifeDecimal *
    qualityDecimal *
    branchFactorDecimal;

  return Math.round(reward);
}

/**
 * Get all submissions from localStorage
 */
export function getAllSubmissions(): ContributionSubmission[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SUBMISSIONS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Get submissions for a specific user address
 */
export function getUserSubmissions(userAddress: string): ContributionSubmission[] {
  return getAllSubmissions().filter(
    (sub) => sub.userAddress.toLowerCase() === userAddress.toLowerCase()
  );
}

/**
 * Create a new submission
 */
export function createSubmission(
  userAddress: string,
  input: SubmissionInput
): ContributionSubmission {
  const template = contributionTemplates.find((t) => t.id === input.templateId);
  if (!template) {
    throw new Error('Template not found');
  }

  // Use the highest rank if multiple branches
  const branchFactor = Math.max(...template.branches.map((b) => BRANCH_FACTORS[b]));

  const calculatedReward = calculateReward(
    template.reach,
    template.orgImpact,
    template.customerImpact,
    input.batteryLife,
    input.quality,
    branchFactor
  );

  const submission: ContributionSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    templateId: template.id,
    templateName: template.category,
    userAddress,
    branches: template.branches,
    contributorName: input.contributorName,
    batteryLife: input.batteryLife,
    quality: input.quality,
    proofOfWork: input.proofOfWork,
    proofImages: input.proofImages || [],
    reach: template.reach,
    orgImpact: template.orgImpact,
    customerImpact: template.customerImpact,
    branchFactor,
    calculatedReward,
    status: 'draft',
    submittedAt: Date.now(),
  };

  const allSubmissions = getAllSubmissions();
  allSubmissions.push(submission);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(allSubmissions));

  return submission;
}

/**
 * Update submission (for Guardian review)
 */
export function updateSubmission(
  submissionId: string,
  updates: Partial<ContributionSubmission>
): ContributionSubmission | null {
  const allSubmissions = getAllSubmissions();
  const index = allSubmissions.findIndex((s) => s.id === submissionId);

  if (index === -1) return null;

  allSubmissions[index] = { ...allSubmissions[index], ...updates };
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(allSubmissions));

  return allSubmissions[index];
}

/**
 * Get pending submissions (for Guardian review)
 */
export function getPendingSubmissions(): ContributionSubmission[] {
  return getAllSubmissions().filter((sub) => sub.status === 'pending');
}

/**
 * Get a single submission by ID
 */
export function getSubmissionById(id: string): ContributionSubmission | null {
  return getAllSubmissions().find((sub) => sub.id === id) || null;
}

/**
 * Delete a submission by ID
 */
export function deleteSubmission(submissionId: string): boolean {
  const allSubmissions = getAllSubmissions();
  const filtered = allSubmissions.filter((s) => s.id !== submissionId);
  if (filtered.length === allSubmissions.length) return false;
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Submit a draft for review
 */
export function submitForReview(submissionId: string): ContributionSubmission | null {
  const allSubmissions = getAllSubmissions();
  const index = allSubmissions.findIndex((s) => s.id === submissionId);

  if (index === -1) return null;
  if (allSubmissions[index].status !== 'draft' && allSubmissions[index].status !== 'needs_revision') return null;

  allSubmissions[index] = {
    ...allSubmissions[index],
    status: 'pending',
    submittedForReviewAt: Date.now(),
  };
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(allSubmissions));

  return allSubmissions[index];
}
