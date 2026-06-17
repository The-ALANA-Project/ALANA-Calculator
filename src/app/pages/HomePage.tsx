import { useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { Footer } from '../components/Footer';
import { siteConfig } from '../config/site';
import { useAuth } from '../contexts/AuthContext';

const HERO_IMAGE = 'https://pink-quick-lizard-297.mypinata.cloud/ipfs/bafybeih6cvtirf5nobtknajtcvdibcn3vxvalqhltpprkmslgl722e3544';

export function HomePage() {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { isConnected } = useAuth();
  const pendingDashboard = useRef(false);
  const { hero } = siteConfig;

  // Once wallet connects (after user triggered "Add New Contribution"), navigate to dashboard
  useEffect(() => {
    if (isConnected && pendingDashboard.current) {
      pendingDashboard.current = false;
      navigate('/quest-library');
    }
  }, [isConnected, navigate]);

  function handleAddContribution() {
    if (isConnected) {
      navigate('/quest-library');
    } else {
      pendingDashboard.current = true;
      open();
    }
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[calc(100vh-140px)] overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Hero background"
            className="w-full h-full object-cover scale-[1.05]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-[#DCC2FE]/20" />
        </div>

        <div className="relative min-h-[calc(100vh-140px)] flex items-center px-8 md:px-16 max-w-6xl mx-auto">
          <div className="max-w-3xl text-foreground">
            <h1 className="leading-tight">{hero.heading}</h1>
            <p className="max-w-2xl mt-4">{hero.subheading}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {/* Primary CTA: Add New Contribution */}
              <button
                onClick={handleAddContribution}
                className="inline-flex items-center justify-center bg-[#27EF8C] border border-[#27EF8C] text-[#262424] font-sans font-semibold px-8 h-10 rounded-none rounded-br-[25px] transition-colors hover:bg-white/10 hover:backdrop-blur-sm hover:border-black hover:text-foreground"
              >
                Add New Quest
              </button>

              {/* Secondary CTA: Learn More */}
              <button
                onClick={() => navigate(hero.secondaryCta.path)}
                className="inline-flex items-center justify-center bg-background/20 backdrop-blur-md border border-foreground hover:bg-background text-foreground font-sans px-8 h-10 rounded-none rounded-br-[25px] transition-colors"
              >
                {hero.secondaryCta.label}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
