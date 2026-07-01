import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { SideShelfMenu } from './SideShelfMenu';
import { Toaster } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" />
          <line x1="18" y1="4" x2="4" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </>
      )}
    </svg>
  );
}

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { devModeEnabled, setDevModeEnabled } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-[60] w-full border-b border-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="px-8 md:px-16 max-w-6xl mx-auto">
          <div className="flex h-20 items-center justify-between gap-4">

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              aria-label="Return to home"
            >
              <img
                src="https://pink-quick-lizard-297.mypinata.cloud/ipfs/bafkreid766y23tdqgb7pbhcyrv5tlem5ejlcj7zez7gcp26krnvicdh4wq"
                alt="ALANA Logo"
                className="h-[28px] w-auto"
              />
            </button>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Dev Mode Toggle */}
              {import.meta.env.DEV && (
                <button
                  onClick={() => setDevModeEnabled(!devModeEnabled)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-none rounded-br-[10px] border transition-colors ${
                    devModeEnabled
                      ? 'bg-accent/20 text-accent border-accent'
                      : 'bg-background text-muted-foreground border-border hover:border-accent'
                  }`}
                  title="Toggle dev mode"
                >
                  DEV {devModeEnabled ? 'ON' : 'OFF'}
                </button>
              )}

              {/* Hamburger — all screen sizes */}
              <button
                className="flex items-center justify-center w-10 h-10 text-foreground hover:text-accent transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Side Shelf Menu ──────────────────────────────────────────────── */}
      <SideShelfMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPath={location.pathname}
      />

      {/* ── Page Content ────────────────────────────────────────────────── */}
      <main role="main">
        <Outlet />
      </main>

{/* ── Toast Notifications ─────────────────────────────────────────── */}
      <Toaster />
    </div>
  );
}
