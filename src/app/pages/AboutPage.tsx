import { useNavigate } from 'react-router';
import { Footer } from '../components/Footer';
import { siteConfig } from '../config/site';
import { ExternalLink } from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Stella Achenbach',
    role: 'Nucleus Guardian',
    bio: 'Stella is a creative strategist and community builder who brings structure and vision to The ALANA Project. As a Nucleus Guardian she oversees contributor onboarding and ensures the quest framework reflects the community\'s values.',
    initials: 'SA',
    linkedin: 'https://www.linkedin.com/in/stella-achenbach/',
    image: 'https://pink-quick-lizard-297.mypinata.cloud/ipfs/bafybeidm2g3gnn5zezkpajalnmkbc2mshoqdonyz3g2q2tqglzaqkpdx4i',
  },
  {
    id: '2',
    name: 'Nils Otter',
    role: 'Nucleus Guardian',
    bio: 'Nils is a product and technology specialist who shapes the technical infrastructure behind ALANA\'s contributor ecosystem. As a Nucleus Guardian he bridges engineering and community governance to keep the platform running and evolving.',
    initials: 'NO',
    linkedin: 'https://www.linkedin.com/in/nils-otter-a23446131/',
    image: 'https://pink-quick-lizard-297.mypinata.cloud/ipfs/bafkreifharckw7z6ll7itpoine2tuw3afapfpcgsp555rnljqcvbtvkcci',
  },
  {
    id: '3',
    name: 'Kerry Allen',
    role: 'Nucleus Specialist',
    bio: 'Kerry is a brand and design professional with deep experience in creative direction and visual communication. At ALANA she brings her expertise from Greyscale Group to help shape the aesthetic identity and contributor experience.',
    initials: 'KA',
    linkedin: 'https://www.linkedin.com/in/kerry-allen-greyscale-group/',
    image: 'https://pink-quick-lizard-297.mypinata.cloud/ipfs/bafkreiahrdlai2zlnvk3gutq5g6ktwhngtz6qsn2vrnnpoiuzs4qvhzqiq',
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
            <h2 className="mb-4">About the ALANA Calculator</h2>
            <p className="text-muted-foreground text-[16px] md:text-[18px]">
              A transparent, NFT-gated tool that lets verified ALANA contributors submit community quests, calculate their $ALANA token rewards based on effort and impact, and have their work reviewed and approved by elected Nucleus Guardians — bringing fair, onchain accountability to community contribution.
            </p>
          </div>

          {/* ── Mission / Vision / ALANA Project ── */}
          <div className="space-y-8 mb-16">
            <div>
              <h3 className="mb-4">Mission</h3>
              <p className="leading-relaxed text-[16px] md:text-[18px]">
                To give every ALANA contributor a fair, transparent way to have their contributions recognized and rewarded, grounded in effort, impact, and quality with a token that gives them governance power over the full ALANA Project.
              </p>
            </div>

            <div>
              <h3 className="mb-4">Vision</h3>
              <p className="leading-relaxed text-[16px] md:text-[18px]">
                A community where contribution is measurable, reviewable, and rewarded onchain. The ALANA Calculator is the first step toward a fully decentralized contribution layer, one where quests feed into building products, and infrastructure together and collaboratively. Every participant has a stake in what gets created and becomes more influential with every added contribution into the system.
              </p>
            </div>

            <div>
              <h3 className="mb-4">Part of The ALANA Project</h3>
              <p className="leading-relaxed text-[16px] md:text-[18px]">
                The ALANA Calculator is an internal tool built and maintained by{' '}
                <a
                  href="https://the-alana-project.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-accent transition-colors"
                >
                  The ALANA Project
                </a>{' '}
                Infrastructure & Strategy team. It exists because the community chose to build its own infrastructure — tools that reflect its values rather than borrow them from platforms that don't. What started as a spreadsheet is becoming a living system, shaped by the people who use it.
              </p>
            </div>
          </div>

          {/* ── Team ── */}
          <div className="mb-16">
            <h3 className="mb-4">The Team</h3>
            <p className="text-[16px] md:text-[18px] text-muted-foreground mb-8">
              Many people across the ALANA community helped shape this tool. These three were at the core of it — driving the concept, building it out, and seeing it through to release.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="border border-foreground rounded-none rounded-br-[25px] p-6 transition-transform duration-300 hover:scale-[1.03]"
                >
                  {member.image ? (
                    <img src={member.image} alt={member.name} className={`w-14 h-14 rounded-full object-cover mb-4 ${member.id === '2' ? 'grayscale' : ''}`} />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <span className="font-mono text-foreground/50">{member.initials}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{member.name}</h4>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-sm font-mono text-accent mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
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
