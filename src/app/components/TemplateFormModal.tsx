import { useState } from 'react';
import { Branch, BRANCH_FACTORS, ContributionTemplate } from '../types/contribution';
import { toast } from 'sonner';

const allBranches: Branch[] = [
  'Infrastructure & Strategy',
  'Brand Identity & Socials',
  'Onboarding & Community',
  'ALANAmagazine',
  'ALANAboutique',
  'FABA Studio',
];

interface TemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<ContributionTemplate, 'id'>) => void;
  existingTemplate?: ContributionTemplate;
}

export function TemplateFormModal({ isOpen, onClose, onSave, existingTemplate }: TemplateFormModalProps) {
  const [category, setCategory] = useState(existingTemplate?.category || '');
  const [selectedBranches, setSelectedBranches] = useState<Branch[]>(existingTemplate?.branches || []);
  const [description, setDescription] = useState(existingTemplate?.description || '');
  const [tools, setTools] = useState(existingTemplate?.tools || '');
  const [reach, setReach] = useState(existingTemplate?.reach?.toString() || '');
  const [orgImpact, setOrgImpact] = useState(existingTemplate?.orgImpact?.toString() || '');
  const [customerImpact, setCustomerImpact] = useState(existingTemplate?.customerImpact?.toString() || '');
  const [batteryLifeExample, setBatteryLifeExample] = useState(existingTemplate?.batteryLifeExample?.toString() || '');
  const [qualityExample, setQualityExample] = useState(existingTemplate?.qualityExample?.toString() || '');

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

    const reachNum = parseInt(reach);
    const orgImpactNum = parseFloat(orgImpact);
    const customerImpactNum = parseFloat(customerImpact);

    if (isNaN(reachNum) || reachNum <= 0) {
      toast.error('Please enter a valid reach value');
      return;
    }

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
    };

    onSave(template);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-background border-2 border-accent rounded-none rounded-br-[25px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-medium">
              {existingTemplate ? 'Edit Template' : 'Create New Template'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors text-3xl leading-none"
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
              <input
                type="number"
                value={reach}
                onChange={(e) => setReach(e.target.value)}
                placeholder="e.g., 1453"
                min="1"
                className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">Number of people reached</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Org Impact <span className="text-accent">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={orgImpact}
                onChange={(e) => setOrgImpact(e.target.value)}
                placeholder="e.g., 3"
                min="0"
                className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">Impact on organization</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Customer Impact <span className="text-accent">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={customerImpact}
                onChange={(e) => setCustomerImpact(e.target.value)}
                placeholder="e.g., 0.25"
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
                <label className="text-sm font-medium block">Battery Life %</label>
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
                <label className="text-sm font-medium block">Quality %</label>
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

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-background border border-border text-foreground font-medium h-10 hover:border-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-accent border border-accent text-foreground font-medium h-10 rounded-none rounded-br-[15px] transition-colors hover:bg-white/10 hover:backdrop-blur-sm hover:border-black"
            >
              {existingTemplate ? 'Update Template' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
