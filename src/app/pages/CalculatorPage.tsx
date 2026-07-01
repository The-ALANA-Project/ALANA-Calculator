import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { contributionTemplates } from '../data/templates';
import { ContributionTemplate, ContributionSubmission, Branch, BRANCH_FACTORS } from '../types/contribution';
import { calculateReward, buildSubmission, createSubmission, updateSubmission } from '../services/submissionsService';
import { toast } from 'sonner';
import { Footer } from '../components/Footer';

export function CalculatorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { templateId } = useParams<{ templateId: string }>();
  const { address, isAuthenticated } = useAuth();

  const editingSubmission = location.state?.submission as ContributionSubmission | undefined;

  const [template, setTemplate] = useState<ContributionTemplate | null>(
    location.state?.template || null
  );
  const [contributorName, setContributorName] = useState(editingSubmission?.contributorName || '');
  const [batteryLife, setBatteryLife] = useState(editingSubmission?.batteryLife || 50);
  const [quality, setQuality] = useState(editingSubmission?.quality || 70);
  const [proofOfWork, setProofOfWork] = useState(editingSubmission?.proofOfWork || '');
  const [proofImages, setProofImages] = useState<string[]>(editingSubmission?.proofImages || []);
  const [secondaryBranch, setSecondaryBranch] = useState<Branch | ''>(editingSubmission?.secondaryBranch || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If editing a submission, load the template from the submission
    if (editingSubmission && !template) {
      const found = contributionTemplates.find((t) => t.id === editingSubmission.templateId);
      if (found) {
        setTemplate(found);
      } else {
        navigate('/quest-library');
      }
      return;
    }

    if (!template && templateId) {
      const found = contributionTemplates.find((t) => t.id === templateId);
      if (found) {
        setTemplate(found);
        // Only set default values if NOT editing
        if (!editingSubmission) {
          if (found.batteryLifeExample !== undefined) {
            setBatteryLife(found.batteryLifeExample);
          }
          if (found.qualityExample !== undefined) {
            setQuality(found.qualityExample);
          }
        }
      } else {
        navigate('/quest-library');
      }
    } else if (template && !editingSubmission) {
      // Set values when template comes from location state and not editing
      if (template.batteryLifeExample !== undefined) {
        setBatteryLife(template.batteryLifeExample);
      }
      if (template.qualityExample !== undefined) {
        setQuality(template.qualityExample);
      }
    }
  }, [template, templateId, editingSubmission, navigate]);

  if (!template) {
    return null;
  }

  if (!isAuthenticated || !address) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-8">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-sans">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to calculate and submit quests.
          </p>
        </div>
      </div>
    );
  }

  const branchFactor = Math.max(...template.branches.map((b) => BRANCH_FACTORS[b]));
  const calculatedReward = calculateReward(
    template.reach,
    template.orgImpact,
    template.customerImpact,
    batteryLife,
    quality,
    branchFactor
  );

  const MAX_IMAGES = 5;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = MAX_IMAGES - proofImages.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      e.target.value = '';
      return;
    }

    Array.from(files).slice(0, remaining).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload only image files');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProofImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input so the same file(s) can be re-selected if removed
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setProofImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contributorName.trim()) {
      toast.error('Please enter your name or handle');
      return;
    }

    if (!proofOfWork.trim() && proofImages.length === 0) {
      toast.error('Please provide proof of work (text or images)');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingSubmission) {
        const branchFactor = Math.max(...template!.branches.map((b) => BRANCH_FACTORS[b]));
        const calculatedReward = calculateReward(
          template!.reach, template!.orgImpact, template!.customerImpact,
          batteryLife, quality, branchFactor
        );
        await updateSubmission(editingSubmission.id, {
          contributorName: contributorName.trim(),
          batteryLife, quality,
          proofOfWork: proofOfWork.trim(),
          proofImages, calculatedReward,
          secondaryBranch: secondaryBranch || undefined,
        });
        toast.success('Draft updated successfully!');
      } else {
        const submission = buildSubmission(address, {
          templateId: template!.id,
          contributorName: contributorName.trim(),
          batteryLife, quality,
          proofOfWork: proofOfWork.trim(),
          proofImages,
          secondaryBranch: secondaryBranch || undefined,
        }, template!);
        await createSubmission(submission);
        toast.success('Draft saved successfully!');
      }

      navigate('/my-quests');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to save quest. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="px-8 md:px-16 py-16 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/mission-library')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to Dashboard
          </button>

          {/* Template Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-sans">{template.category}</h2>
              {editingSubmission && (
                <span className="text-sm px-3 py-1 bg-[#CEAAFE]/20 text-foreground border border-[#CEAAFE]">
                  Editing Draft
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {template.branches.map((branch) => (
                <span
                  key={branch}
                  className="text-sm px-3 py-1 bg-accent/20 text-foreground border border-accent"
                >
                  {branch}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground whitespace-pre-line">{template.description}</p>
          </div>

          {/* Calculator Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-border rounded-none rounded-br-[25px] p-6 space-y-6">
              {/* Fixed Values */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border rounded-none rounded-br-[15px] p-4">
                  <div className="text-xs text-muted-foreground mb-1">Battery Life Bar (Effort %)</div>
                  <div className="text-2xl font-bold text-accent">{batteryLife}%</div>
                </div>
                <div className="border border-border rounded-none rounded-br-[15px] p-4">
                  <div className="text-xs text-muted-foreground mb-1">Quality Control (Alignment %)</div>
                  <div className="text-2xl font-bold text-accent">{quality}%</div>
                </div>
              </div>

              {/* Calculated Reward Display */}
              <div className="pt-6 border-t border-border">
                <div className="bg-[#FFDDB2]/20 border border-[#FFDDB2] p-4">
                  <div className="text-sm text-foreground mb-1">Calculated Reward:</div>
                  <div className="text-3xl font-bold text-foreground">
                    {calculatedReward.toLocaleString()} $ALANA
                  </div>
                  <div className="text-xs text-foreground mt-2">
                    Formula: Reach × (Org Impact + Customer Impact) × Battery Life % × Quality % ×
                    Branch Factor
                  </div>
                </div>
              </div>

              {/* Contributor Name */}
              <div className="space-y-3 pt-4 border-t border-border">
                <label htmlFor="contributorName" className="text-sm font-medium block">
                  Your Name or Handle <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="contributorName"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="Enter your name or handle for attribution..."
                  className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This helps Guardians identify you and ensures proper attribution for your work.
                </p>
              </div>

              {/* Secondary Branch */}
              <div className="space-y-3 pt-4 border-t border-border">
                <label htmlFor="secondaryBranch" className="text-sm font-medium block">
                  Secondary Branch <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <select
                  id="secondaryBranch"
                  value={secondaryBranch}
                  onChange={(e) => setSecondaryBranch(e.target.value as Branch | '')}
                  className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                >
                  <option value="">None</option>
                  {(Object.keys(BRANCH_FACTORS) as Branch[])
                    .filter((b) => !template?.branches.includes(b))
                    .map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  If this quest closely relates to another branch, you can indicate that here.
                </p>
              </div>

              {/* Proof of Work */}
              <div className="space-y-3 pt-4 border-t border-border">
                <label htmlFor="proofOfWork" className="text-sm font-medium block">
                  Proof of Work <span className="text-accent">*</span>
                </label>
                <textarea
                  id="proofOfWork"
                  value={proofOfWork}
                  onChange={(e) => setProofOfWork(e.target.value)}
                  placeholder="Provide URLs or descriptions demonstrating your completed work..."
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  Include links to your work or detailed descriptions. You can also upload screenshots below.
                </p>

                {/* Image Upload */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Upload Screenshots</label>
                    <span className="text-xs text-muted-foreground">{proofImages.length} / {MAX_IMAGES}</span>
                  </div>
                  {proofImages.length < MAX_IMAGES && (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-background file:text-foreground file:font-medium hover:file:border-accent file:transition-colors cursor-pointer"
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, or GIF (max 5MB per image)
                  </p>
                </div>

                {/* Image Preview */}
                {proofImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {proofImages.map((image, index) => (
                      <div key={index} className="relative border border-border rounded-br-[10px] overflow-hidden">
                        <img
                          src={image}
                          alt={`Proof ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center text-lg leading-none hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !contributorName.trim() || (!proofOfWork.trim() && proofImages.length === 0)}
                className="w-full bg-accent border border-accent text-foreground font-medium h-10 px-6 rounded-none rounded-br-[15px] transition-colors hover:bg-white/10 hover:backdrop-blur-sm hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Quest Draft'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
