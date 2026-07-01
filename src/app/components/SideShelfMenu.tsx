import { Instagram, Linkedin, Youtube, Github, Wallet, LogOut, ChevronDown, Shield, TrendingUp, Calculator, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppKit } from '@reown/appkit/react';
import { useDisconnect } from 'wagmi';
import { siteConfig } from '../config/site';
import { useAuth, UserRole } from '../contexts/AuthContext';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

const roleConfig: Record<UserRole, { icon: typeof User; label: string }> = {
  visitor: { icon: User, label: 'Visitor' },
  apprentice: { icon: Calculator, label: 'Apprentice' },
  specialist: { icon: TrendingUp, label: 'Specialist' },
  guardian: { icon: Shield, label: 'Nucleus Guardian' },
};

function shortAddr(addr?: string) {
  if (!addr) return '';
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

interface SideShelfMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function SideShelfMenu({ isOpen, onClose, currentPath }: SideShelfMenuProps) {
  const navigate = useNavigate();
  const { role, isAuthenticated, isConnected, address, isLoading, devRoleOverride, setDevRoleOverride } = useAuth();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const [walletExpanded, setWalletExpanded] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const walletRef = useRef<HTMLDivElement>(null);

  const RoleIcon = roleConfig[role].icon;

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Close wallet dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (walletRef.current && !walletRef.current.contains(event.target as Node)) {
        setWalletExpanded(false);
      }
    }
    if (walletExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [walletExpanded]);

  const { socialLinks, navItems } = siteConfig;

  const filteredNavItems = navItems.filter((item) => {
    if (item.id === 'quest-library') return isAuthenticated;
    if (item.id === 'my-quests') return isAuthenticated;
    if (item.id === 'analytics') return true;
    if (item.id === 'admin') return role === 'guardian';
    return true;
  });

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        style={{ top: '80px', zIndex: 40 }}
        aria-hidden="true"
      />

      {/* Side Panel */}
      <div
        className={`fixed right-0 h-[calc(100vh-80px)] w-72 max-w-[90vw] bg-background border-l border-foreground shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '80px', zIndex: 50 }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Navigation + Wallet */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Site navigation">
            {filteredNavItems.map((item) => {
              const isActive = currentPath === item.path || (item.path === '/' && currentPath === '/');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.path)}
                  className={`w-full text-left py-3 px-4 rounded-none rounded-br-[25px] transition-all duration-200 font-sans text-base ${
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Wallet section — separator after nav, above social */}
          <div className="px-6" ref={walletRef}>
            <div className="h-px bg-foreground/30 mb-5" />

          {!isConnected ? (
            /* Not connected — full-width connect button */
            <button
              onClick={() => open()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent text-accent-foreground font-medium rounded-none rounded-br-[25px] hover:opacity-90 transition-opacity"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          ) : (
            /* Connected — shows identity + expandable actions */
            <div>
              <button
                onClick={() => setWalletExpanded((v) => !v)}
                className="w-full flex items-center gap-3 py-3 px-4 border border-foreground/30 rounded-none rounded-br-[25px] hover:border-accent transition-colors"
              >

                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm font-medium truncate">
                    {isLoading ? 'Checking…' : roleConfig[role].label}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono truncate">
                    {shortAddr(address)}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
                    walletExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {walletExpanded && (
                <div className="mt-2 border border-foreground/20 rounded-none rounded-br-[20px] p-3 space-y-2 bg-background">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setWalletExpanded(false);
                        setTimeout(() => open({ view: 'Account' }), 0);
                      }}
                      className="flex-1 text-xs font-mono px-3 py-2 border border-border rounded-none rounded-br-[10px] hover:bg-accent/10 transition-colors"
                    >
                      Account
                    </button>
                    <button
                      onClick={() => {
                        setWalletExpanded(false);
                        disconnect();
                      }}
                      className="flex items-center justify-center gap-1 text-xs font-mono px-3 py-2 border border-border rounded-none rounded-br-[10px] hover:bg-accent/10 transition-colors"
                    >
                      <LogOut className="w-3 h-3" />
                      Disconnect
                    </button>
                  </div>

                  {/* Dev role override */}
                  {import.meta.env.DEV && (
                    <>
                      <div className="h-px bg-border" />
                      <div>
                        <button
                          onClick={() => setDevOpen((o) => !o)}
                          className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-mono text-muted-foreground hover:text-accent"
                        >
                          <span>DEV: {devRoleOverride ?? 'on-chain'}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${devOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {devOpen && (
                          <div className="mt-1 space-y-1">
                            <button
                              onClick={() => setDevRoleOverride(null)}
                              className={`w-full text-left text-xs font-mono px-2 py-1 rounded-none rounded-br-[10px] ${
                                devRoleOverride === null ? 'bg-accent/20 text-accent' : 'hover:bg-accent/10'
                              }`}
                            >
                              off (use on-chain)
                            </button>
                            {(Object.keys(roleConfig) as UserRole[]).map((r) => (
                              <button
                                key={r}
                                onClick={() => setDevRoleOverride(r)}
                                className={`w-full text-left text-xs font-mono px-2 py-1 rounded-none rounded-br-[10px] ${
                                  devRoleOverride === r ? 'bg-accent/20 text-accent' : 'hover:bg-accent/10'
                                }`}
                              >
                                force: {roleConfig[r].label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
          </div>
        </div>

        {/* Social Icons — always at bottom */}
        <div className="px-6 py-6 shrink-0">
          <div className="h-px bg-foreground/20 mb-5" />
          <div className="flex items-center justify-between">
            {socialLinks.tiktok && (
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors" aria-label="TikTok">
                <TikTokIcon />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            )}
            {socialLinks.telegram && (
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors" aria-label="Telegram">
                <TelegramIcon />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
