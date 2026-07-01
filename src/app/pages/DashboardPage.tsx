import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Search, ChevronDown, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { contributionTemplates } from '../data/templates';
import { Branch, ContributionTemplate } from '../types/contribution';
import { Footer } from '../components/Footer';
import { getTemplates } from '../services/templateService';

const allBranches: Branch[] = [
  'Infrastructure & Strategy',
  'Identity & Socials',
  'ALANAmagazine',
  'ALANAboutique',
  'FABA Studio',
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, address } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState<Branch | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allTemplates, setAllTemplates] = useState<ContributionTemplate[]>(contributionTemplates);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTemplates().then(setAllTemplates).catch(() => setAllTemplates(contributionTemplates));
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
    else setSearchQuery('');
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const filteredTemplates = allTemplates.filter((template) => {
    const matchesBranch =
      selectedBranch === 'all' || template.branches.includes(selectedBranch);
    const matchesSearch =
      searchQuery === '' ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tools.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-8">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-sans">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to access the Quest Library. Only verified NFT
            holders can submit quests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-8 md:px-16 py-16 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="font-sans">Quest Library</h2>
            <p className="text-lg text-muted-foreground">
              Browse quest templates by branch and calculate your ALANA token rewards.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3">
            {/* Search — always visible, full width */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quests…"
                className="w-full pl-9 pr-4 h-10 bg-background border border-border focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>

            {/* Branch Dropdown */}
            <div className="relative w-56" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className={`w-full flex items-center justify-between gap-2 px-4 h-10 text-sm border transition-colors ${
                  selectedBranch !== 'all'
                    ? 'bg-accent border-accent text-foreground'
                    : 'bg-background border-border text-foreground hover:border-accent'
                }`}
              >
                <span className="whitespace-nowrap">
                  {selectedBranch === 'all' ? 'All Branches' : selectedBranch}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-0 z-20 bg-background border border-border border-t-0 w-full">
                  {(['all', ...allBranches] as (Branch | 'all')[]).map((branch) => (
                    <button
                      key={branch}
                      onClick={() => { setSelectedBranch(branch); setDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        selectedBranch === branch
                          ? 'text-accent font-medium'
                          : 'text-foreground hover:text-accent'
                      }`}
                    >
                      {branch === 'all' ? 'All Branches' : branch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? 's' : ''}{' '}
                Available
              </h3>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="border border-border rounded-none rounded-br-[25px] p-8 text-center">
                <p className="text-muted-foreground">
                  No templates found for this branch. Try selecting a different branch.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-border rounded-none rounded-br-[25px] p-6 hover:border-accent transition-colors"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">{template.category}</h4>
                        <div className="flex flex-wrap gap-2">
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

                      {/* Description */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {template.description}
                          </p>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-border">
                          <div>
                            <div className="text-xs text-muted-foreground">Reach</div>
                            <div className="text-sm font-medium">{template.reach.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Org Impact</div>
                            <div className="text-sm font-medium">{template.orgImpact}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Customer Impact</div>
                            <div className="text-sm font-medium">{template.customerImpact}</div>
                          </div>
                        </div>

                        {/* Example + Calculate */}
                        <div className="flex items-end justify-between gap-4 pt-3 border-t border-border">
                          {template.batteryLifeExample !== undefined &&
                          template.qualityExample !== undefined &&
                          template.interimResultExample !== undefined ? (
                            <div>
                              <div className="text-xs text-muted-foreground mb-2">
                                Example Calculation:
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <span>
                                  Battery: <strong>{template.batteryLifeExample}%</strong>
                                </span>
                                <span>
                                  Quality: <strong>{template.qualityExample}%</strong>
                                </span>
                                <span className="text-accent">
                                  ≈ <strong>{template.interimResultExample.toLocaleString()}</strong>{' '}
                                  $ALANA
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div />
                          )}
                          <button
                            onClick={() =>
                              navigate(`/calculator/${template.id}`, { state: { template } })
                            }
                            className="bg-accent border border-accent text-foreground font-medium px-4 h-10 rounded-none rounded-br-[15px] transition-colors hover:bg-white/10 hover:backdrop-blur-sm hover:border-black whitespace-nowrap shrink-0"
                          >
                            Add Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
