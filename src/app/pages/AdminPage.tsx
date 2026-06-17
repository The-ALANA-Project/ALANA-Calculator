import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllSubmissions, updateSubmission, calculateReward } from '../services/contributionStorage';
import { ContributionSubmission, ContributionTemplate, ReviewEntry } from '../types/contribution';
import { toast } from 'sonner';
import { Footer } from '../components/Footer';
import { linkifyText } from '../utils/linkify';
import { TemplateFormModal } from '../components/TemplateFormModal';
import { getCustomTemplates, createCustomTemplate, updateCustomTemplate, deleteCustomTemplate } from '../services/templateStorage';
import { contributionTemplates } from '../data/templates';

export function AdminPage() {
  const { role, address } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'archived' | 'templates'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [submissions, setSubmissions] = useState<ContributionSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContributionSubmission | null>(null);
  const [reviewBatteryLife, setReviewBatteryLife] = useState(50);
  const [reviewQuality, setReviewQuality] = useState(70);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  // Template management state
  const [customTemplates, setCustomTemplates] = useState<ContributionTemplate[]>([]);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ContributionTemplate | undefined>();

  useEffect(() => {
    loadSubmissions();
    loadCustomTemplates();
  }, [activeTab]);

  const loadCustomTemplates = () => {
    const templates = getCustomTemplates();
    setCustomTemplates(templates);
  };

  const loadSubmissions = () => {
    const allSubmissions = getAllSubmissions();
    const filtered = allSubmissions.filter((sub) => {
      if (activeTab === 'pending') {
        return sub.status === 'pending' || sub.status === 'in_review';
      } else {
        return sub.status === 'approved' || sub.status === 'needs_revision';
      }
    });
    setSubmissions(filtered.sort((a, b) => b.submittedAt - a.submittedAt));
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (searchQuery === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      submission.templateName?.toLowerCase().includes(query) ||
      submission.contributorName?.toLowerCase().includes(query) ||
      submission.userAddress?.toLowerCase().includes(query) ||
      submission.branches?.some((branch) => branch.toLowerCase().includes(query))
    );
  });

  const openReview = (submission: ContributionSubmission) => {
    setSelectedSubmission(submission);
    setReviewBatteryLife(submission.batteryLife);
    setReviewQuality(submission.quality);
    setReviewNotes('');
    // Mark as in_review the moment a Guardian opens it
    if (submission.status === 'pending') {
      updateSubmission(submission.id, { status: 'in_review' });
    }
  };

  const closeReview = () => {
    setSelectedSubmission(null);
    setReviewNotes('');
    setReviewerName('');
  };

  const handleCreateTemplate = (template: Omit<ContributionTemplate, 'id'>) => {
    try {
      if (editingTemplate) {
        updateCustomTemplate(editingTemplate.id, template);
        toast.success('Template updated successfully!');
      } else {
        createCustomTemplate(template);
        toast.success('Template created successfully!');
      }
      setIsTemplateModalOpen(false);
      setEditingTemplate(undefined);
      loadCustomTemplates();
    } catch (error) {
      console.error('Template save error:', error);
      toast.error('Failed to save template');
    }
  };

  const handleEditTemplate = (template: ContributionTemplate) => {
    setEditingTemplate(template);
    setIsTemplateModalOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const success = deleteCustomTemplate(templateId);
      if (success) {
        toast.success('Template deleted successfully!');
        loadCustomTemplates();
      } else {
        toast.error('Failed to delete template');
      }
    }
  };

  const handleApprove = async () => {
    if (!selectedSubmission || !address) return;

    // Prevent self-approval (except in dev mode)
    if (!import.meta.env.DEV && selectedSubmission.userAddress.toLowerCase() === address.toLowerCase()) {
      toast.error('You cannot approve your own submission');
      return;
    }

    if (!reviewNotes.trim()) {
      toast.error('Please provide review notes');
      return;
    }

    setIsReviewing(true);

    try {
      // Calculate final reward with adjusted values
      const finalReward = calculateReward(
        selectedSubmission.reach,
        selectedSubmission.orgImpact,
        selectedSubmission.customerImpact,
        reviewBatteryLife,
        reviewQuality,
        selectedSubmission.branchFactor
      );

      const approveEntry: ReviewEntry = {
        note: reviewNotes.trim(),
        outcome: 'approved',
        reviewedAt: Date.now(),
        reviewedBy: address,
        reviewerName: reviewerName.trim() || undefined,
      };

      updateSubmission(selectedSubmission.id, {
        status: 'approved',
        adjustedBatteryLife: reviewBatteryLife,
        adjustedQuality: reviewQuality,
        finalReward,
        reviewNotes: reviewNotes.trim(),
        reviewedAt: approveEntry.reviewedAt,
        reviewedBy: address,
        reviewHistory: [...(selectedSubmission.reviewHistory || []), approveEntry],
      });

      toast.success('Submission approved successfully!');
      loadSubmissions();
      closeReview();
    } catch (error) {
      console.error('Approval error:', error);
      toast.error('Failed to approve submission');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleRequestChanges = async () => {
    if (!selectedSubmission || !address) return;

    if (!import.meta.env.DEV && selectedSubmission.userAddress.toLowerCase() === address.toLowerCase()) {
      toast.error('You cannot review your own submission');
      return;
    }

    if (!reviewNotes.trim()) {
      toast.error('Please provide feedback notes explaining what needs to change');
      return;
    }

    setIsReviewing(true);

    try {
      const revisionEntry: ReviewEntry = {
        note: reviewNotes.trim(),
        outcome: 'needs_revision',
        reviewedAt: Date.now(),
        reviewedBy: address,
        reviewerName: reviewerName.trim() || undefined,
      };

      updateSubmission(selectedSubmission.id, {
        status: 'needs_revision',
        reviewNotes: reviewNotes.trim(),
        reviewedAt: revisionEntry.reviewedAt,
        reviewedBy: address,
        reviewHistory: [...(selectedSubmission.reviewHistory || []), revisionEntry],
      });

      toast.success('Feedback sent — submission returned to contributor');
      loadSubmissions();
      closeReview();
    } catch (error) {
      console.error('Request changes error:', error);
      toast.error('Failed to send feedback');
    } finally {
      setIsReviewing(false);
    }
  };

  if (role !== 'guardian') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-8">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-sans">Nucleus Guardians Only</h2>
          <p className="text-muted-foreground">
            This admin panel is restricted to Nucleus Guardian NFT holders.
          </p>
        </div>
      </div>
    );
  }

  const adjustedReward = selectedSubmission
    ? calculateReward(
        selectedSubmission.reach,
        selectedSubmission.orgImpact,
        selectedSubmission.customerImpact,
        reviewBatteryLife,
        reviewQuality,
        selectedSubmission.branchFactor
      )
    : 0;

  return (
    <>
      <div className="px-8 md:px-16 py-16 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-sans">Guardian Panel</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Review and approve community quests. Adjust Battery Life and Quality values as needed.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by task, contributor, wallet, or branch..."
              className="w-full pl-12 pr-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 h-10 font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`px-4 h-10 font-medium transition-colors ${
                activeTab === 'archived'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Archived
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 h-10 font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Templates
            </button>
          </div>

          {/* Stats */}
          {activeTab !== 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-border rounded-none rounded-br-[25px] p-6">
                <div className="text-sm text-muted-foreground">
                  {activeTab === 'pending' ? 'Pending Review' : 'Archived'}
                </div>
                <div className="text-3xl font-bold mt-1 text-[#FFDDB2]">{filteredSubmissions.length}</div>
              </div>
            </div>
          )}

          {/* Templates Management */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Template Management</h3>
                <button
                  onClick={() => {
                    setEditingTemplate(undefined);
                    setIsTemplateModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-accent border border-accent text-foreground font-medium px-4 h-10 rounded-none rounded-br-[15px] transition-colors hover:bg-white/10 hover:backdrop-blur-sm hover:border-black"
                >
                  <Plus className="w-4 h-4" />
                  Create Template
                </button>
              </div>

              <div className="space-y-6">
                {/* Default Templates */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Default Templates</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {contributionTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="border border-border rounded-none rounded-br-[15px] p-4 bg-background/50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h5 className="font-medium">{template.category}</h5>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {template.branches.map((branch) => (
                                <span
                                  key={branch}
                                  className="text-xs px-2 py-1 bg-accent/20 text-foreground border border-accent"
                                >
                                  {branch}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">Built-in</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Templates */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Custom Templates ({customTemplates.length})
                  </h4>
                  {customTemplates.length === 0 ? (
                    <div className="border border-border rounded-none rounded-br-[15px] p-8 text-center">
                      <p className="text-muted-foreground">
                        No custom templates yet. Click "Create Template" to add your first one.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {customTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="border border-border rounded-none rounded-br-[15px] p-4 hover:border-accent transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h5 className="font-medium">{template.category}</h5>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {template.branches.map((branch) => (
                                  <span
                                    key={branch}
                                    className="text-xs px-2 py-1 bg-accent/20 text-foreground border border-accent"
                                  >
                                    {branch}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {template.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditTemplate(template)}
                                className="p-2 border border-border hover:border-accent transition-colors"
                                title="Edit template"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTemplate(template.id)}
                                className="p-2 border border-border hover:border-red-500 hover:text-red-500 transition-colors"
                                title="Delete template"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submissions List */}
          {activeTab !== 'templates' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {activeTab === 'pending' ? 'Pending Submissions' : 'Archived Submissions'}
              </h3>

            {filteredSubmissions.length === 0 ? (
              <div className="border border-border rounded-none rounded-br-[25px] p-12 text-center">
                <p className="text-muted-foreground">
                  {searchQuery
                    ? 'No submissions match your search.'
                    : activeTab === 'pending'
                    ? 'No pending submissions to review.'
                    : 'No archived submissions.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredSubmissions.map((submission) => {
                  const isOwnSubmission =
                    address && submission.userAddress.toLowerCase() === address.toLowerCase();

                  return (
                    <div
                      key={submission.id}
                      className={`border rounded-none rounded-br-[25px] p-6 transition-colors border-border ${
                        isOwnSubmission ? 'bg-[#FFDDB2]/5' : ''
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <h4 className="text-lg font-medium">{submission.templateName}</h4>
                            <div className="flex flex-wrap gap-2">
                              {submission.branches.map((branch) => (
                                <span
                                  key={branch}
                                  className="text-xs px-2 py-1 bg-accent/20 text-foreground border border-accent"
                                >
                                  {branch}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">{submission.contributorName}</span>
                              {' • '}
                              <span className="font-mono">
                                {submission.userAddress.slice(0, 6)}...{submission.userAddress.slice(-4)}
                              </span>
                              {isOwnSubmission && (
                                <span className="text-[#FFDDB2] text-xs font-medium ml-2">(Your submission)</span>
                              )}
                            </div>
                          </div>
                          {activeTab === 'archived' && (
                            <div className={`px-3 py-1.5 border ${
                              submission.status === 'approved'
                                ? 'bg-[#27EF8C]/20 border-[#27EF8C]'
                                : 'bg-[#FFDDB2]/20 border-[#FFDDB2]'
                            }`}>
                              <span className="text-sm font-medium text-foreground">
                                {submission.status === 'approved' ? 'Approved' : 'Needs Revision'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-border">
                          <div>
                            <div className="text-xs text-muted-foreground">Battery Life</div>
                            <div className="text-sm font-medium">
                              {submission.adjustedBatteryLife || submission.batteryLife}%
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Quality</div>
                            <div className="text-sm font-medium">
                              {submission.adjustedQuality || submission.quality}%
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Calculated</div>
                            <div className="text-sm font-medium text-accent">
                              {submission.calculatedReward.toLocaleString()} $ALANA
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Final Reward</div>
                            <div className="text-sm font-medium text-accent">
                              {(submission.finalReward || submission.calculatedReward).toLocaleString()} $ALANA
                            </div>
                          </div>
                        </div>

                        {/* Review History for Archived */}
                        {activeTab === 'archived' && submission.reviewHistory && submission.reviewHistory.length > 0 && (
                          <div className="pt-3 border-t border-border space-y-2">
                            <div className="text-xs text-muted-foreground mb-2">Review History:</div>
                            {submission.reviewHistory.map((entry, i) => (
                              <div
                                key={i}
                                className={`text-sm p-3 rounded-none rounded-br-[10px] border ${
                                  entry.outcome === 'approved'
                                    ? 'bg-[#27EF8C]/5 border-[#27EF8C]/30'
                                    : 'bg-[#FFDDB2]/10 border-[#FFDDB2]/40'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-xs font-medium ${entry.outcome === 'approved' ? 'text-[#27EF8C]' : 'text-[#F5A623]'}`}>
                                    {entry.outcome === 'approved' ? 'Approved' : 'Needs Revision'} — Round {i + 1}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(entry.reviewedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p>{entry.note}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Date + Review button */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="text-xs text-muted-foreground">
                            {activeTab === 'pending' ? (
                              <span>Submitted: {new Date(submission.submittedAt).toLocaleString()}</span>
                            ) : (
                              <div className="flex gap-4">
                                <span>Submitted: {new Date(submission.submittedAt).toLocaleString()}</span>
                                {submission.reviewedAt && (
                                  <span>Reviewed: {new Date(submission.reviewedAt).toLocaleString()}</span>
                                )}
                              </div>
                            )}
                          </div>
                          {activeTab === 'pending' && (
                            <button
                              onClick={() => openReview(submission)}
                              disabled={!import.meta.env.DEV && !!isOwnSubmission}
                              className={`px-4 h-10 font-medium rounded-none rounded-br-[15px] transition-colors ${
                                !import.meta.env.DEV && isOwnSubmission
                                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                  : 'bg-accent border border-accent text-foreground hover:bg-white/10 hover:backdrop-blur-sm hover:border-black'
                              }`}
                            >
                              {!import.meta.env.DEV && isOwnSubmission ? 'Cannot Review Own' : 'Review'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Template Form Modal */}
      <TemplateFormModal
        isOpen={isTemplateModalOpen}
        onClose={() => {
          setIsTemplateModalOpen(false);
          setEditingTemplate(undefined);
        }}
        onSave={handleCreateTemplate}
        existingTemplate={editingTemplate}
      />

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-background border border-accent rounded-none rounded-br-[25px] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Review Submission</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.branches.map((branch) => (
                      <span
                        key={branch}
                        className="text-xs px-2 py-1 bg-accent/20 text-foreground border border-accent"
                      >
                        {branch}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={closeReview}
                  className="text-muted-foreground hover:text-foreground transition-colors text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Template Info */}
              <div className="space-y-2 pb-4 border-b border-border">
                <h4 className="font-medium">{selectedSubmission.templateName}</h4>
                <div className="text-sm text-muted-foreground">
                  Submitted by:{' '}
                  <span className="font-medium text-foreground">{selectedSubmission.contributorName}</span>
                  {' • '}
                  <span className="font-mono">
                    {selectedSubmission.userAddress.slice(0, 6)}...{selectedSubmission.userAddress.slice(-4)}
                  </span>
                </div>
              </div>

              {/* Proof of Work */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Proof of Work:</h5>
                <div className="text-sm bg-background/50 p-4 rounded-none rounded-br-[15px] border border-border whitespace-pre-wrap break-words">
                  {linkifyText(selectedSubmission.proofOfWork)}
                </div>
                {selectedSubmission.proofImages && selectedSubmission.proofImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {selectedSubmission.proofImages.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Proof ${idx + 1}`}
                        className="w-full h-32 object-cover border border-border rounded-br-[10px] cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.open(image, '_blank')}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Adjustment Controls */}
              <div className="space-y-4 p-4 bg-accent/5 rounded-none rounded-br-[15px] border border-accent/30">
                <h5 className="font-medium">Adjust Values:</h5>

                {/* Battery Life */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Battery Life Bar (Effort %)</label>
                    <span className="text-lg font-medium text-accent">{reviewBatteryLife}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={reviewBatteryLife}
                    onChange={(e) => setReviewBatteryLife(Number(e.target.value))}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="text-xs text-muted-foreground">
                    Original: {selectedSubmission.batteryLife}%
                  </div>
                </div>

                {/* Quality */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Quality Control (Alignment %)</label>
                    <span className="text-lg font-medium text-accent">{reviewQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={reviewQuality}
                    onChange={(e) => setReviewQuality(Number(e.target.value))}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="text-xs text-muted-foreground">
                    Original: {selectedSubmission.quality}%
                  </div>
                </div>

                {/* Reward Comparison */}
                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Original Calculated:</span>
                    <span className="font-medium">{selectedSubmission.calculatedReward.toLocaleString()} $ALANA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adjusted Reward:</span>
                    <span className="font-medium text-accent">{adjustedReward.toLocaleString()} $ALANA</span>
                  </div>
                </div>
              </div>

              {/* Guardian Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium block">
                  Your (Reviewer) Name or Handle
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Guardian Alex..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-none focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Review Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium block">
                  Review Notes <span className="text-accent">*</span>
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Provide feedback and reasoning for your decision..."
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-none focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  onClick={handleApprove}
                  disabled={isReviewing || !reviewNotes.trim()}
                  className="flex-1 bg-[#27EF8C] text-black font-medium py-3 rounded-none rounded-br-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReviewing ? 'Processing...' : 'Approve'}
                </button>
                <button
                  onClick={handleRequestChanges}
                  disabled={isReviewing || !reviewNotes.trim()}
                  className="flex-1 bg-[#FFDDB2] text-black font-medium py-3 rounded-none rounded-br-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReviewing ? 'Processing...' : 'Request Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
