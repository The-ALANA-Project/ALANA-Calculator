import { useState, useEffect, useMemo } from 'react';
import { Info } from 'lucide-react';
import { Branch, BRANCH_FACTORS, ContributionTemplate } from '../types/contribution';

const FIXED_REACH = 1453;
import { toast } from 'sonner';

function InfoTooltip({ children, below }: { children: React.ReactNode; below?: boolean }) {
  return (
    <span className="relative group inline-flex items-center ml-1.5">
      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
      <span className={`pointer-events-none absolute left-0 w-72 bg-accent text-foreground text-xs rounded-none p-3 opacity-0 group-hover:opacity-100 transition-opacity z-[200] whitespace-pre-line leading-relaxed shadow-lg ${below ? 'top-full mt-2' : 'bottom-full mb-2'}`}>
        {children}
      </span>
    </span>
  );
}

const allBranches: Branch[] = [
  'Infrastructure & Strategy',
  'Identity & Socials',
  'ALANAmagazine',
  'ALANAboutique',
  'FABA Studio',
];

interface TemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<ContributionTemplate, 'id'>, isDraft: boolean) => void;
  existingTemplate?: ContributionTemplate;
}

export function TemplateFormModal({ isOpen, onClose, onSave, existingTemplate }: TemplateFormModalProps) {
  const [category, setCategory] = useState(existingTemplate?.category || '');
  const [selectedBranches, setSelectedBranches] = useState<Branch[]>(existingTemplate?.branches || []);
  const [description, setDescription] = useState(existingTemplate?.description || '');
  const [tools, setTools] = useState(existingTemplate?.tools || '');
  const [orgImpact, setOrgImpact] = useState(existingTemplate?.orgImpact?.toString() || '');
  const [customerImpact, setCustomerImpact] = useState(existingTemplate?.customerImpact?.toString() || '');
  const [batteryLifeExample, setBatteryLifeExample] = useState(existingTemplate?.batteryLifeExample?.toString() || '');
  const [qualityExample, setQualityExample] = useState(existingTemplate?.qualityExample?.toString() || '');

  useEffect(() => {
    if (isOpen) {
      setCategory(existingTemplate?.category || '');
      setSelectedBranches(existingTemplate?.branches || []);
      setDescription(existingTemplate?.description || '');
      setTools(existingTemplate?.tools || '');
      setOrgImpact(existingTemplate?.orgImpact?.toString() || '');
      setCustomerImpact(existingTemplate?.customerImpact?.toString() || '');
      setBatteryLifeExample(existingTemplate?.batteryLifeExample?.toString() || '');
      setQualityExample(existingTemplate?.qualityExample?.toString() || '');
    }
  }, [isOpen, existingTemplate]);

  // Live reward preview
  const previewReward = useMemo(() => {
    const org = parseFloat(orgImpact);
    const cust = parseFloat(customerImpact);
    const battery = parseInt(batteryLifeExample);
    const quality = parseInt(qualityExample);
    if (!selectedBranches.length || isNaN(org) || isNaN(cust) || isNaN(battery) || isNaN(quality)) return null;
    const branchFactor = Math.max(...selectedBranches.map((b) => BRANCH_FACTORS[b]));
    return Math.round(FIXED_REACH * (org + cust) * (battery / 100) * (quality / 100) * (branchFactor / 10));
  }, [orgImpact, customerImpact, batteryLifeExample, qualityExample, selectedBranches]);

  const isFormValid =
    category.trim() !== '' &&
    selectedBranches.length > 0 &&
    description.trim() !== '' &&
    !isNaN(parseFloat(orgImpact)) && parseFloat(orgImpact) >= 0 &&
    !isNaN(parseFloat(customerImpact)) && parseFloat(customerImpact) >= 0;

  const isDraftSaveable = category.trim() !== '' && selectedBranches.length > 0;

  if (!isOpen) return null;

  const toggleBranch = (branch: Branch) => {
    if (selectedBranches.includes(branch)) {
      setSelectedBranches(selectedBranches.filter((b) => b !== branch));
    } else {
      setSelectedBranches([...selectedBranches, branch]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.trim()) {
      toast.error('Please enter a task category');
      return;
    }

    if (selectedBranches.length === 0) {
      toast.error('Please select at least one branch');
      return;
    }

    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }

    const reachNum = FIXED_REACH;
    const orgImpactNum = parseFloat(orgImpact);
    const customerImpactNum = parseFloat(customerImpact);

    if (isNaN(orgImpactNum) || orgImpactNum < 0) {
      toast.error('Please enter a valid org impact value');
      return;
    }

    if (isNaN(customerImpactNum) || customerImpactNum < 0) {
      toast.error('Please enter a valid customer impact value');
      return;
    }

    // Calculate interim result example if both percentages are provided
    let interimResultExample: number | undefined;
    if (batteryLifeExample && qualityExample) {
      const branchFactor = Math.max(...selectedBranches.map((b) => BRANCH_FACTORS[b]));
      const batteryDecimal = parseInt(batteryLifeExample) / 100;
      const qualityDecimal = parseInt(qualityExample) / 100;
      const branchFactorDecimal = branchFactor / 10;
      interimResultExample = Math.round(
        reachNum * (orgImpactNum + customerImpactNum) * batteryDecimal * qualityDecimal * branchFactorDecimal
      );
    }

    const template: Omit<ContributionTemplate, 'id'> = {
      category: category.trim(),
      branches: selectedBranches,
      description: description.trim(),
      tools: tools.trim() || 'N/A',
      reach: reachNum,
      orgImpact: orgImpactNum,
      customerImpact: customerImpactNum,
      batteryLifeExample: batteryLifeExample ? parseInt(batteryLifeExample) : undefined,
      qualityExample: qualityExample ? parseInt(qualityExample) : undefined,
      interimResultExample,
      isDraft: false,
    };

    onSave(template, false);
  };

  const handleSaveDraft = () => {
    if (!category.trim()) { toast.error('Please enter a task category'); return; }
    if (selectedBranches.length === 0) { toast.error('Please select at least one branch'); return; }

    onSave({
      category: category.trim(),
      branches: selectedBranches,
      description: description.trim(),
      tools: tools.trim() || 'N/A',
      reach: FIXED_REACH,
      orgImpact: parseFloat(orgImpact) || 0,
      customerImpact: parseFloat(customerImpact) || 0,
      batteryLifeExample: batteryLifeExample ? parseInt(batteryLifeExample) : undefined,
      qualityExample: qualityExample ? parseInt(qualityExample) : undefined,
      isDraft: true,
    }, true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-background border border-foreground rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-medium">
              {existingTemplate ? 'Edit Template' : 'Create New Template'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-accent transition-colors text-3xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Task Category <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Community Moderation, Content Creation..."
              className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          {/* Branches */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Branches <span className="text-accent">*</span>
              <InfoTooltip below>{`Branch factor affects the final reward multiplier:\n\nInfrastructure & Strategy — Factor ${BRANCH_FACTORS['Infrastructure & Strategy']}\nIdentity & Socials — Factor ${BRANCH_FACTORS['Identity & Socials']}\nALANAmagazine — Factor ${BRANCH_FACTORS['ALANAmagazine']}\nALANAboutique — Factor ${BRANCH_FACTORS['ALANAboutique']}\nFABA Studio — Factor ${BRANCH_FACTORS['FABA Studio']}\n\nHigher factor = greater reward multiplier.`}</InfoTooltip>
            </label>
            <div className="flex flex-wrap gap-2">
              {allBranches.map((branch) => (
                <button
                  key={branch}
                  type="button"
                  onClick={() => toggleBranch(branch)}
                  className={`px-3 py-1.5 text-sm font-medium border transition-colors ${
                    selectedBranches.includes(branch)
                      ? 'bg-accent/20 text-foreground border-accent'
                      : 'bg-background text-foreground border-border hover:border-accent'
                  }`}
                >
                  {branch} (Factor {BRANCH_FACTORS[branch]})
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Description <span className="text-accent">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this task involves and what contributors should deliver..."
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">Tools/Skills Required</label>
            <input
              type="text"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              placeholder="e.g., Discord, Figma, Social Media Management..."
              className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Impact Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Reach <span className="text-accent">*</span>
              </label>

              <div className="w-full px-4 py-3 bg-muted/30 border border-border text-muted-foreground font-mono text-sm">
                {FIXED_REACH.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Fixed until community grows significantly</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Org Impact <span className="text-accent">*</span>
                <InfoTooltip>{`Impact on an organizational level:\n\n3 = massive\n2 = high impact\n1 = medium impact\n0.5 = low impact\n0.25 = minimal impact`}</InfoTooltip>
              </label>
              <input
                type="number"
                step="0.01"
                value={orgImpact}
                onChange={(e) => setOrgImpact(e.target.value)}
                placeholder="e.g., 0.25"
                min="0"
                className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">Impact on organization</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Customer Impact <span className="text-accent">*</span>
                <InfoTooltip>{`Impact on a customer level:\n\n3 = massive\n2 = high impact\n1 = medium impact\n0.5 = low impact\n0.25 = minimal impact`}</InfoTooltip>
              </label>
              <input
                type="number"
                step="0.01"
                value={customerImpact}
                onChange={(e) => setCustomerImpact(e.target.value)}
                placeholder="e.g., 0.5"
                min="0"
                className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">Impact on customers</p>
            </div>
          </div>

          {/* Example Values */}
          <div className="space-y-3 p-4 bg-accent/5 border border-accent/30">
            <h4 className="text-sm font-medium">Example Calculation (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium block">
                  Battery Life %
                  <InfoTooltip>{`Imagine a battery — how much of it gets drained to perform this task?\n\nXS  = 1–10%\nS   = 11–30%\nM   = 31–50%\nL   = 51–70%\nXL  = 71–90%\nXXL = 91–100%\n\nThe contributor inputs this; Guardians can adjust it during review.`}</InfoTooltip>
                </label>
                <input
                  type="number"
                  value={batteryLifeExample}
                  onChange={(e) => setBatteryLifeExample(e.target.value)}
                  placeholder="e.g., 25"
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block">
                  Quality %
                  <InfoTooltip>{`Alignment = on-brand delivery that is recognisable and propels the ALANA vision.\nQuality = compared to similar products in the market.\n\npoor       = 0–29%\nfair       = 30–49%\ngood       = 50–64%\nvery good  = 65–84%\nexcellent  = 85–100%\n\nThe contributor inputs this; Guardians can adjust it during review.`}</InfoTooltip>
                </label>
                <input
                  type="number"
                  value={qualityExample}
                  onChange={(e) => setQualityExample(e.target.value)}
                  placeholder="e.g., 85"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              These example values will help contributors understand expected rewards
            </p>
          </div>

          {/* Live reward preview */}
          {previewReward !== null && (
            <div className="flex items-center justify-between px-4 py-3 bg-[#262424] border border-[#262424]">
              <span className="text-sm text-[#D9D9D9]">Estimated $ALANA reward (example values)</span>
              <span className="text-lg font-bold font-mono text-[#FFDDB2]">{previewReward.toLocaleString()} $ALANA</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="bg-background border border-border text-foreground font-medium px-5 h-10 hover:border-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={!isDraftSaveable}
              className="flex-1 bg-background border border-border text-foreground font-medium h-10 rounded-none transition-colors hover:bg-foreground hover:text-background disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 font-medium h-10 rounded-none rounded-br-[15px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-accent text-foreground hover:bg-foreground hover:text-background"
            >
              {existingTemplate?.isDraft ? 'Publish Template' : existingTemplate ? 'Update Template' : 'Publish Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
