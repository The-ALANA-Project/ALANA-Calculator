// Re-export everything from submissionsService so existing imports keep working.
// contributionStorage.ts is kept as an alias layer during the Supabase migration.
export {
  calculateReward,
  getAllSubmissions,
  getUserSubmissions,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  submitForReview,
} from './submissionsService';
