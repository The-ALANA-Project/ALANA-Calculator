import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/AppLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DashboardPage } from './pages/DashboardPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { AdminPage } from './pages/AdminPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      // ── Main Pages ──────────────────────────────────────────────────────
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },

      // ── Contribution Calculator Pages ─────────────────────────────────
      { path: 'quest-library', Component: DashboardPage },
      { path: 'calculator/:templateId', Component: CalculatorPage },
      { path: 'my-quests', Component: SubmissionsPage },
      { path: 'leaderboard', Component: LeaderboardPage },
      { path: 'guardian-panel', Component: AdminPage },

      // ── Fallback ─────────────────────────────────────────────────────
      { path: '*', Component: HomePage },
    ],
  },
]);
