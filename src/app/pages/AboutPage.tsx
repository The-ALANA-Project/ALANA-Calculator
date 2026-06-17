import { useNavigate } from 'react-router';
import { Footer } from '../components/Footer';
import { siteConfig } from '../config/site';
import { ArrowRight } from 'lucide-react';

// Team members
const teamMembers = [
  {
    id: '1',
    name: 'Stella Achenbach',
    role: 'Nucleus Guardian',
    bio: 'Core contributor to The ALANA Project, helping to guide and review community quests.',
    initials: 'SA',
  },
  {
    id: '2',
    name: 'Nils Otter',
    role: 'Nucleus Guardian',
    bio: 'Core contributor to The ALANA Project, helping to guide and review community quests.',
    initials: 'NO',
  },
  {
    id: '3',
    name: 'Kerry Allen',
    role: 'Nucleus Specialist',
    bio: 'Specialist contributor supporting The ALANA Project community and initiatives.',
    initials: 'KA',
  },
];

export function AboutPage() {
  const navigate = useNavigate();
  const { productName, description, contactEmail } = siteConfig;

  return (
    <>
      <div className="min-h-screen bg-background">
        <main className="px-8 md:px-16 py-12 md:py-16 max-w-4xl mx-auto">

          {/* ── Header ── */}
          <div className="mb-12">
            <h2 className="mb-4">About ALANA Quests</h2>
            <p className="text-muted-foreground text-[16px] md:text-[18px]">
              {/* Update this subtitle in your page */}
              Who we are, what we build, and why it matters.
            </p>
          </div>

          {/* ── Team ── */}
          <div className="mb-16">
            <h3 className="mb-6">The Team</h3>
            <p className="text-[16px] md:text-[18px] text-muted-foreground mb-8">
              The people behind {productName}. Replace these placeholders with your actual team members.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="border border-foreground rounded-none rounded-br-[25px] p-6"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <span className="font-mono text-foreground/50">{member.initials}</span>
                  </div>
                  <h4 className="mb-1">{member.name}</h4>
                  <p className="text-sm font-mono text-accent mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mission ── */}
          <div className="space-y-8 mb-16">
            <div>
              <h3 className="mb-4">Our Mission</h3>
              <p className="leading-relaxed text-[16px] md:text-[18px]">
                {description}
              </p>
            </div>

            <div>
              <h3 className="mb-4">What We're Building</h3>
              <p className="leading-relaxed text-[16px] md:text-[18px]">
                Replace this section with a detailed description of what your product does, the
                problem it solves, and the vision behind it. This is your opportunity to connect
                with your audience on a deeper level.
              </p>
            </div>

            <div>
              <h3 className="mb-4">Part of The ALANA Project</h3>
              <p className="leading-relaxed text-[16px] md:text-[18px]">
                {productName} is a product built within{' '}
                <a
                  href="https://the-alana-project.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  The ALANA Project
                </a>{' '}
                community — an open, decentralized collective exploring the intersection of
                technology, culture, and creativity. Our community values transparency, collaboration,
                and pushing the boundaries of what's possible.
              </p>
            </div>
          </div>

          {/* ── Values ── */}
          <div className="mb-16">
            <h3 className="mb-6">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Transparency', desc: 'We build in the open and communicate honestly with our community.' },
                { label: 'Community First', desc: 'Every decision is made with our contributors and users in mind.' },
                { label: 'Creative Freedom', desc: 'We celebrate experimentation, artistic expression, and bold ideas.' },
                { label: 'Long-term Thinking', desc: 'We build for durability, not just for today\'s trend.' },
              ].map((v) => (
                <div key={v.label} className="border border-foreground rounded-none rounded-br-[25px] p-5">
                  <h4 className="mb-2">{v.label}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </>
  );
}
