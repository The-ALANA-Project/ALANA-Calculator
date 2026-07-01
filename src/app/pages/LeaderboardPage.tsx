import { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getAllSubmissions } from '../services/submissionsService';
import { ContributionSubmission, Branch } from '../types/contribution';
import { Footer } from '../components/Footer';

// ── Types ─────────────────────────────────────────────────────────────────

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

const BRANCHES: Branch[] = [
  'Infrastructure & Strategy', 'Identity & Socials',
  'ALANAmagazine', 'ALANAboutique', 'FABA Studio',
];

const BRANCH_SHORT: Record<Branch, string> = {
  'Infrastructure & Strategy': 'Infra & Strategy',
  'Identity & Socials': 'Identity & Socials',
  'ALANAmagazine': 'ALANAmagazine',
  'ALANAboutique': 'ALANAboutique',
  'FABA Studio': 'FABA Studio',
};

function filterByPeriod(subs: ContributionSubmission[], period: PeriodKey, offsetMultiplier = 0) {
  if (period === 'all' && offsetMultiplier === 0) return subs;
  if (period === 'all') return [];
  const ms = MS_MAP[period] * 86_400_000;
  const now = Date.now();
  const end = now - offsetMultiplier * ms;
  const start = end - ms;
  return subs.filter((s) => s.reviewedAt! >= start && s.reviewedAt! < end);
}

function pctChange(current: number, previous: number): string | null {
  if (previous === 0) return current > 0 ? '+new' : null;
  const pct = Math.round(((current - previous) / previous) * 100);
  return pct >= 0 ? `+${pct}%` : `${pct}%`;
}

function bucketByTime(subs: ContributionSubmission[], period: PeriodKey) {
  if (subs.length === 0) return [];
  const now = Date.now();
  const ms = period === 'all' ? null : MS_MAP[period] * 86_400_000;

  // Determine bucket size
  let fmt: (ts: number) => string;
  let step: number;

  if (period === '7d') {
    step = 86_400_000; // daily
    fmt = (ts) => new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else if (period === '30d') {
    step = 7 * 86_400_000; // weekly
    fmt = (ts) => new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    step = 30 * 86_400_000; // monthly
    fmt = (ts) => new Date(ts).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }

  const start = ms ? now - ms : Math.min(...subs.map((s) => s.reviewedAt!));
  const buckets: Record<string, { label: string; quests: number; alana: number }> = {};

  for (let t = start; t <= now; t += step) {
    const label = fmt(t);
    if (!buckets[label]) buckets[label] = { label, quests: 0, alana: 0 };
  }

  subs.forEach((s) => {
    const label = fmt(s.reviewedAt!);
    if (!buckets[label]) buckets[label] = { label, quests: 0, alana: 0 };
    buckets[label].quests += 1;
    buckets[label].alana += s.finalReward ?? 0;
  });

  return Object.values(buckets);
}

function toCSV(rows: ContributionSubmission[]) {
  const headers = ['Date', 'Contributor', 'Quest', 'Branch', 'Final Reward ($ALANA)'];
  const lines = rows.map((r) => [
    new Date(r.reviewedAt!).toLocaleDateString(),
    `"${r.contributorName}"`,
    `"${r.templateName}"`,
    `"${r.branches[0]}"`,
    r.finalReward ?? 0,
  ].join(','));
  return [headers.join(','), ...lines].join('\n');
}

// ── Custom tooltip for charts ─────────────────────────────────────────────

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1818] border border-foreground/20 px-3 py-2 text-xs font-mono">
      <div className="text-muted-foreground mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────

export function LeaderboardPage() {
  const [allApproved, setAllApproved] = useState<ContributionSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllSubmissions()
      .then((subs) => setAllApproved(subs.filter((s) => s.status === 'approved' && s.reviewedAt)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  const filtered  = useMemo(() => filterByPeriod(allApproved, period, 0), [allApproved, period]);
  const previous  = useMemo(() => filterByPeriod(allApproved, period, 1), [allApproved, period]);

  // Stats
  const totalAlana      = filtered.reduce((s, r) => s + (r.finalReward ?? 0), 0);
  const prevAlana       = previous.reduce((s, r) => s + (r.finalReward ?? 0), 0);
  const uniqueContribs  = new Set(filtered.map((r) => r.userAddress)).size;
  const prevContribs    = new Set(previous.map((r) => r.userAddress)).size;
  const allInPeriod     = period === 'all' ? allApproved.length : filtered.length + allApproved.filter((s) => {
    if (period === 'all') return false;
    const ms = MS_MAP[period] * 86_400_000;
    return s.reviewedAt! < Date.now() - ms;
  }).length;
  const approvalRate    = allApproved.length > 0 ? Math.round((filtered.length / Math.max(filtered.length, 1)) * 100) : 0;

  // Chart data
  const timeData    = useMemo(() => bucketByTime(filtered, period), [filtered, period]);
  const branchData  = useMemo(() =>
    BRANCHES.map((b) => ({
      branch: BRANCH_SHORT[b],
      quests: filtered.filter((s) => s.branches.includes(b)).length,
      alana:  filtered.filter((s) => s.branches.includes(b)).reduce((sum, s) => sum + (s.finalReward ?? 0), 0),
    })).filter((d) => d.quests > 0 || true),
    [filtered]
  );

  // Chronological quest log
  const questLog = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => b.reviewedAt! - a.reviewedAt!);
    if (!searchQuery.trim()) return sorted;
    const q = searchQuery.toLowerCase();
    return sorted.filter((s) =>
      s.templateName?.toLowerCase().includes(q) ||
      s.contributorName?.toLowerCase().includes(q) ||
      s.branches?.some((b) => b.toLowerCase().includes(q))
    );
  }, [filtered, searchQuery]);

  const currentLabel = PERIODS.find((p) => p.value === period)?.label ?? 'All Time';

  const handleExport = () => {
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alana-analytics-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    { label: 'Total $ALANA Distributed', value: totalAlana.toLocaleString(), change: pctChange(totalAlana, prevAlana), highlight: true },
    { label: 'Quests Approved',           value: filtered.length,              change: pctChange(filtered.length, previous.length) },
    { label: 'Active Contributors',       value: uniqueContribs,               change: pctChange(uniqueContribs, prevContribs) },
    { label: 'Approval Rate',             value: `${approvalRate}%`,           change: null },
  ];

  return (
    <>
      <div className="dark bg-background min-h-[calc(100vh-140px)]">
        <div className="px-8 md:px-16 py-16 max-w-6xl mx-auto space-y-10">

          {/* Header */}
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="space-y-2">
              <h2 className="text-foreground">ALANA Calculator Analytics</h2>
              <p className="text-muted-foreground">
                Community contribution activity, transparent and public.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-1">
              {/* Search — stretches to fill */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quests, contributors, branches…"
                className="flex-1 pl-4 pr-4 h-10 bg-background border border-foreground/20 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
              />

              {/* Period dropdown — fixed width */}
              <div className="relative w-56" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-2 bg-background border border-foreground/20 text-foreground text-sm font-mono pl-3 pr-3 h-10 hover:border-accent/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{currentLabel}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full right-0 w-full mt-0 bg-background border border-foreground/20 border-t-0 z-50">
                    {PERIODS.map((opt) => (
                      <button key={opt.value}
                        onClick={() => { setPeriod(opt.value); setDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 text-sm font-mono transition-colors ${opt.value === period ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-foreground/10'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Export */}
              <button
                onClick={handleExport}
                disabled={filtered.length === 0}
                className="bg-accent text-accent-foreground font-medium px-6 h-10 rounded-none rounded-br-[15px] hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-foreground/15 bg-foreground/5 p-5">
                <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
                <div className={`text-2xl font-bold font-mono ${stat.highlight ? 'text-[#FFDDB2]' : 'text-foreground'}`}>
                  {loading ? '—' : stat.value}
                </div>
                {stat.change && period !== 'all' && (
                  <div className={`text-xs font-mono mt-1 ${stat.change.startsWith('+') ? 'text-[#27EF8C]' : 'text-red-400'}`}>
                    {stat.change} vs prev period
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Quests over time */}
            <div className="border border-foreground/15 bg-foreground/5 p-6">
              <h3 className="text-foreground text-base font-medium mb-6">Quests Approved Over Time</h3>
              {loading ? (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
              ) : timeData.length === 0 || timeData.every((d) => d.quests === 0) ? (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">No data for this period</div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={timeData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="questGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#DCC2FE" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#DCC2FE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="quests" name="Quests" stroke="#DCC2FE" fill="url(#questGradient)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Output by branch */}
            <div className="border border-foreground/15 bg-foreground/5 p-6">
              <h3 className="text-foreground text-base font-medium mb-6">Output by Branch</h3>
              {loading ? (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
              ) : branchData.every((d) => d.quests === 0) ? (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">No data for this period</div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={branchData} layout="vertical" margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="branch" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} width={120} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="quests" name="Quests" fill="#DCC2FE" radius={0} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* $ALANA distributed over time */}
          <div className="border border-foreground/15 bg-foreground/5 p-6">
            <h3 className="text-foreground text-base font-medium mb-6">$ALANA Distributed Over Time</h3>
            {loading ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
            ) : timeData.every((d) => d.alana === 0) ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">No data for this period</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={timeData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="alanaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFDDB2" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FFDDB2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="alana" name="$ALANA" stroke="#FFDDB2" fill="url(#alanaGradient)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Approved Quest Log */}
          <div className="space-y-4">
            <h3 className="text-foreground">
              Approved Quests
              <span className="text-sm font-normal text-muted-foreground ml-2 font-mono">{questLog.length} total</span>
            </h3>

            {loading ? (
              <div className="border border-foreground/15 p-12 text-center">
                <p className="text-muted-foreground">Loading…</p>
              </div>
            ) : questLog.length === 0 ? (
              <div className="border border-foreground/15 p-12 text-center">
                <p className="text-muted-foreground">No approved quests for this period.</p>
              </div>
            ) : (
              <div className="border border-foreground/15">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-foreground/10 text-xs text-muted-foreground font-mono uppercase tracking-wide">
                  <span>Quest</span>
                  <span className="hidden md:block">Branch</span>
                  <span>Contributor</span>
                  <span className="text-right">$ALANA</span>
                </div>
                {questLog.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 items-center text-sm ${idx % 2 === 0 ? '' : 'bg-foreground/[0.03]'} border-b border-foreground/5 last:border-0`}
                  >
                    <div className="min-w-0">
                      <div className="text-foreground/90 truncate">{s.templateName}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                        {new Date(s.reviewedAt!).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <span className="hidden md:inline-block text-xs px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent/80 whitespace-nowrap">
                      {s.branches[0]}
                    </span>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">{s.contributorName}</span>
                    <span className="text-right font-mono font-medium text-[#FFDDB2] whitespace-nowrap">
                      {(s.finalReward ?? 0).toLocaleString()}
                    </span>
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
