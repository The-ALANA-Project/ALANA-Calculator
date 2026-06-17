import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import party from 'party-js';

// Register custom glyph shapes
party.resolvableShapes['sparkle4'] = `<span style="font-size:10px;line-height:1;display:inline-block;">✦</span>`;
party.resolvableShapes['sparkle4w'] = `<span style="font-size:8px;line-height:1;display:inline-block;">✧</span>`;

const gold = (hex: string) => party.Color.fromHex(hex.replace('#', ''));

const GOLDEN_COLORS = [
  gold('FFDDB2'),
  gold('FFD08A'),
  gold('FFC462'),
  gold('FFB340'),
  gold('F5A623'),
  gold('FFECD4'),
  gold('FFE8C8'),
];

function launchBurst(el: HTMLElement) {
  party.confetti(el, {
    count: party.variation.range(40, 55),
    spread: party.variation.range(100, 160),
    speed: party.variation.range(350, 650),
    size: party.variation.range(0.4, 0.9),
    color: () => GOLDEN_COLORS[Math.floor(Math.random() * GOLDEN_COLORS.length)],
    shapes: ['sparkle4', 'sparkle4w', 'circle', 'circle', 'sparkle4'],
  });
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MissionSubmittedModal({ open, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !modalRef.current) return;

    const el = modalRef.current;
    let count = 0;
    const MAX = 7;

    launchBurst(el);
    count++;

    const interval = setInterval(() => {
      if (count >= MAX) { clearInterval(interval); return; }
      launchBurst(el);
      count++;
    }, 700);

    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            className="relative z-10 bg-background border border-[#FFDDB2] rounded-none rounded-br-[25px] p-10 max-w-md w-full mx-6 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, #FFDDB2, #F5A623, #DCC2FE)' }}
            />

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="font-mono text-foreground">Congrats!</h2>
                <p className="text-base font-medium text-muted-foreground mt-1">Quest successfully submitted</p>
              </motion.div>

              <motion.div
                className="space-y-3 text-left"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-foreground">
                  Your quest is now in the hands of the Nucleus Guardians.
                </p>
                <p className="text-sm text-muted-foreground">
                  They'll review your proof of work, assess the reward values, and confirm your final $ALANA. Track the status any time from your dashboard and feel free to reach out via the{' '}
                  <a
                    href="https://t.me/+wrE_zED8-sFhZGMy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors"
                    style={{ color: '#262424' }}
                  >
                    Telegram
                  </a>{' '}
                  group for more information.
                </p>
              </motion.div>

              <motion.button
                onClick={onClose}
                className="w-full bg-accent border border-accent text-foreground font-medium h-10 px-6 rounded-none rounded-br-[15px] transition-colors hover:bg-white/10 hover:backdrop-blur-sm hover:border-black"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Back to My Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
