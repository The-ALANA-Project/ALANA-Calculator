import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Search, X } from 'lucide-react';
import { getAllSubmissions } from '../services/contributionStorage';
import { ContributionSubmission } from '../types/contribution';
import { Footer } from '../components/Footer';

type PeriodKey = 'all' | '7d' | '30d' | '3m' | '6m' | '1y';

const PERIODS: { label: string; value: PeriodKey }[] = [
  { label: 'All Time',       value: 'all' },
  { label: 'Last 7 Days',    value: '7d'  },
  { label: 'Last 30 Days',   value: '30d' },
  { label: 'Last 3 Months',  value: '3m'  },
  { label: 'Last 6 Months',  value: '6m'  },
  { label: 'Last 12 Months', value: '1y'  },
];

const MS_MAP: Record<string, number> = { '7d': 7, '30d': 30, '3m': 90, '6m': 180, '1y': 365 };

function filterByPeriod(submissions: ContributionSubmission[], period: PeriodKey) {
  if (period === 'all') return submissions;
  const cutoff = Date.now() - MS_MAP[period] * 86_400_000;
  return submissions.filter((s) => s.reviewedAt! >= cutoff);
}

function toCSV(rows: ContributionSubmission[]) {
  const headers = ['Contributor', 'Quest', 'Branch', 'Battery Life %', 'Quality %', 'Final Reward ($ALANA)', 'Approved Date'];
  const lines = rows.map((r) => [
    `"${r.contributorName}"`,
    `"${r.templateName}"`,
    `"${r.branches.join(', ')}"`,
    r.adjustedBatteryLife ?? r.batteryLife,
    r.adjustedQuality ?? r.quality,
    r.finalReward ?? 0,
    new Date(r.reviewedAt!).toLocaleDateString(),
  ].join(','));
  return [headers.join(','), ...lines].join('\n');
}

const BISCUIT = '#FFDDB2';

const podiumBorder = (idx: number) => idx < 3 ? 'border-l-4 border-l-[#FFDDB2]' : '';
const rankColor   = (idx: number) => idx < 3 ? BISCUIT : '#6B7280';

export function LeaderboardPage() {
  const allApproved = useMemo(() =>
    getAllSubmissions()
      .filter((s) => s.status === 'approved' && s.reviewedAt)
      .sort((a, b) => b.reviewedAt! - a.reviewedAt!),
    []
  );

  const [period, setPeriod] = useState<PeriodKey>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
    else setSearchQuery('');
  }, [searchOpen]);

  const toggleExpanded = (name: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  const filtered = useMemo(() => filterByPeriod(allApproved, period), [allApproved, period]);

  const contributors = useMemo(() => {
    const map = new Map<string, { name: string; missions: number; totalReward: number; entries: ContributionSubmission[] }>();
    filtered.forEach((s) => {
      const key = s.contributorName.toLowerCase();
      if (!map.has(key)) map.set(key, { name: s.contributorName, missions: 0, totalReward: 0, entries: [] });
      const c = map.get(key)!;
      c.missions += 1;
      c.totalReward += s.finalReward ?? 0;
      c.entries.push(s);
    });
    return Array.from(map.values()).sort((a, b) => b.totalReward - a.totalReward);
  }, [filtered]);

  const visibleContributors = useMemo(() => {
    if (!searchQuery.trim()) return contributors;
    const q = searchQuery.toLowerCase();
    return contributors.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.entries.some((e) => e.templateName.toLowerCase().includes(q))
    );
  }, [contributors, searchQuery]);

  const totalReward = filtered.reduce((sum, s) => sum + (s.finalReward ?? 0), 0);
  const currentLabel = PERIODS.find((p) => p.value === period)?.label ?? 'All Time';

  const handleDownloadCSV = () => {
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alana-leaderboard-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="dark bg-background min-h-[calc(100vh-140px)]">
        <div className="px-8 md:px-16 py-16 max-w-6xl mx-auto space-y-6">

          {/* Page header */}
          <div className="space-y-2">
            <h2 className="text-foreground">ALANA Quest Leaderboard</h2>
            <p className="text-muted-foreground text-base">
              Approved contributions from the ALANA community.
            </p>
          </div>

          {/* Stats row + search */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Approved Quests', value: filtered.length },
                { label: 'Contributors',      value: contributors.length },
                { label: 'Total $ALANA',      value: totalReward.toLocaleString() },
              ].map((stat) => (
                <div key={stat.label} className="border border-accent px-5 py-3 flex items-center gap-3">
                  <span className="text-accent" style={{ fontSize: '16px' }}>{stat.label}</span>
                  <span className="font-bold font-mono text-accent" style={{ fontSize: '16px' }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Search — expands leftward from icon */}
            <div className="flex items-center justify-end gap-2">
              <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contributors…"
                  className="w-full pr-3 pl-4 h-10 bg-background border-b border-border focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>
              <button
                onClick={() => setSearchOpen((o) => !o)}
                className="flex items-center justify-center w-10 h-10 text-foreground hover:text-accent transition-colors"
                aria-label="Toggle search"
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Period + Export row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 bg-background border border-foreground/20 text-foreground text-sm font-mono pl-3 pr-3 h-10 hover:border-accent/60 transition-colors"
              >
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="min-w-[120px] text-left">{currentLabel}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-0 bg-background border border-foreground/20 border-t-0 z-50">
                  {PERIODS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setPeriod(opt.value); setDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 text-sm font-mono transition-colors ${
                        opt.value === period
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-foreground/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleDownloadCSV}
              disabled={filtered.length === 0}
              className="bg-accent text-ac font-[Roboto]cent-foreground font-medium px-6 h-10 rounded-none rounded-br-[15px] hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Export CSV
            </button>
          </div>

          {/* Leaderboard */}
          {filtered.length === 0 ? (
            <div className="border border-foreground/15 p-16 text-center">
              <p className="text-muted-foreground">No approved contributions for this period.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleContributors.map((c, idx) => {
                const barPct = totalReward > 0 ? (c.totalReward / totalReward) * 100 : 0;
                const globalIdx = contributors.indexOf(c);
                const isFirstBelowPodium = globalIdx === 3 && idx > 0;

                return (
                  <div key={c.name}>
                    {/* Separator between podium and the rest */}
                    {isFirstBelowPodium && (
                      <div className="h-px bg-accent/40 mb-3" />
                    )}

                    <div
                      className={`border border-foreground/15 rounded-none rounded-br-[25px] p-5 space-y-3 bg-foreground/5 ${podiumBorder(globalIdx)}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span
                            className="text-2xl font-bold w-8 shrink-0 font-mono"
                            style={{ color: rankColor(globalIdx) }}
                          >
                            {globalIdx + 1}
                          </span>
                          <div>
                            <div className="font-medium text-foreground">{c.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {c.missions} mission{c.missions !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#FFDDB2]">{c.totalReward.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">$ALANA</div>
                        </div>
                      </div>

                      {/* Reward proportion bar */}
                      <div className="h-px bg-foreground/10">
                        <div
                          className="h-full bg-[#FFDDB2] transition-all duration-500"
                          style={{ width: `${barPct}%` }}
                        />
                      </div>

                      {/* Collapsible missions breakdown */}
                      <button
                        onClick={() => toggleExpanded(c.name)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors font-mono pt-1"
                      >
                        <ChevronDown className={`w-3 h-3 transition-transform ${expanded.has(c.name) ? 'rotate-180' : ''}`} />
                        {expanded.has(c.name) ? 'Hide' : 'View'} quests ({c.missions})
                      </button>

                      {expanded.has(c.name) && (
                        <div className="space-y-2 pt-2 border-t border-foreground/10">
                          {c.entries.map((s) => (
                            <div key={s.id} className="flex items-center justify-between gap-4 text-sm">
                              <div className="flex-1 min-w-0">
                                <span className="text-foreground/80">{s.templateName}</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {s.branches.map((b) => (
                                    <span key={b} className="text-xs px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent/80 rounded-none">
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="font-medium text-[#FFDDB2]">
                                  {(s.finalReward ?? 0).toLocaleString()} $ALANA
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(s.reviewedAt!).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
