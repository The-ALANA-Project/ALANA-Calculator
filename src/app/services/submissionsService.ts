import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { ContributionSubmission, ContributionTemplate, SubmissionInput, BRANCH_FACTORS } from '../types/contribution';

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-44fc6238`;

const headers = () => ({
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json',
});

function makeId(): string {
  return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ── Calculation (pure) ───────────────────────────────────────────────────

export function calculateReward(
  reach: number,
  orgImpact: number,
  customerImpact: number,
  batteryLife: number,
  quality: number,
  branchFactor: number
): number {
  return Math.round(
    reach *
    (orgImpact + customerImpact) *
    (batteryLife / 100) *
    (quality / 100) *
    (branchFactor / 10)
  );
}

// Build a full submission object without saving it
export function buildSubmission(
  userAddress: string,
  input: SubmissionInput,
  template: ContributionTemplate
): ContributionSubmission {
  const branchFactor = Math.max(...template.branches.map((b) => BRANCH_FACTORS[b]));
  const calculatedReward = calculateReward(
    template.reach,
    template.orgImpact,
    template.customerImpact,
    input.batteryLife,
    input.quality,
    branchFactor
  );

  return {
    id: makeId(),
    templateId: template.id,
    templateName: template.category,
    userAddress,
    branches: template.branches,
    secondaryBranch: input.secondaryBranch,
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
}

// ── CRUD ─────────────────────────────────────────────────────────────────

export async function getAllSubmissions(): Promise<ContributionSubmission[]> {
  try {
    const res = await fetch(`${BASE}/submissions`, { headers: headers() });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function getUserSubmissions(userAddress: string): Promise<ContributionSubmission[]> {
  try {
    const res = await fetch(`${BASE}/submissions/user/${userAddress}`, { headers: headers() });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function createSubmission(submission: ContributionSubmission): Promise<void> {
  await fetch(`${BASE}/submissions`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(submission),
  });
}

export async function updateSubmission(
  id: string,
  updates: Partial<ContributionSubmission>
): Promise<ContributionSubmission | null> {
  try {
    const res = await fetch(`${BASE}/submissions/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/submissions/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    return res.ok;
  } catch { return false; }
}

export async function submitForReview(submissionId: string): Promise<ContributionSubmission | null> {
  return updateSubmission(submissionId, {
    status: 'pending',
    submittedForReviewAt: Date.now(),
  });
}
