import { siteConfig } from '../config/site';

export function Footer() {
  const { legalEntityName, copyrightYear } = siteConfig;

  return (
    <footer className="border-t border-foreground">
      <div className="px-8 md:px-16 py-4 max-w-6xl mx-auto flex items-center justify-end">
        <span className="text-[13px] text-muted-foreground font-mono leading-none">
          © {copyrightYear} {legalEntityName}
        </span>
      </div>
    </footer>
  );
}
