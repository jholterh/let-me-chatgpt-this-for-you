// PromoSection.jsx

function LangdockCard() {
    return (
      <a
        href="http://www.langdock.com/?ref=jakob"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Langdock"
        className="block mt-12 max-w-xl mx-auto focus:outline-none group"
        style={{ textDecoration: "none" }}
      >
        <section className="bg-gradient-to-br from-white/10 to-white/5 shadow-2xl rounded-2xl p-8 flex items-center gap-6 transition-transform hover:scale-[1.03]">
          <img
            src="/assets/langdock-logo.png"
            alt="Langdock company logo"
            className="h-14 w-14 flex-shrink-0 hover:scale-110 group-hover:scale-110 transition-transform"
          />
          <div>
            <strong className="text-2xl block mb-1 text-white">Can’t use ChatGPT at work?</strong>
            <span className="block text-lg text-white/80">
              Try Langdock for secure, company-friendly AI.&nbsp;
              <span className="text-primary underline group-hover:text-primary/80 inline-flex items-center">
                Learn more
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </span>
          </div>
        </section>
      </a>
    );
  }
  
  function SocialProof() {
    // Example companies array; replace with your actual data
    const companies = [
      { src: "/assets/merck-logo2.png", alt: "Merck logo", href: "https://www.langdock.com/de/case-studies/merck/?ref=jakob" },
      { src: "/assets/babbel-logo-removebg-preview.png", alt: "Babbel logo", href: "https://www.langdock.com/de/case-studies/?ref=jakob" },
      { src: "/assets/spiegel-logo.png", alt: "Spiegel logo", href: "https://www.langdock.com/de/case-studies/?ref=jakob" },
    ];
  
    return (
      <section className="flex flex-col items-center gap-6 max-w-xl mx-auto w-full">
        {/* Divider */}
        <div className="w-full border-t border-white/20 mb-6" />
  
        {/* Company Logos */}
        <div className="flex items-center justify-center gap-10 mb-2 animate-fade-in">
          {companies.map(({ src, alt, href }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1"
            >
              <img
                src={src}
                alt={alt}
                className="h-10 w-auto hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </div>
  
        <p className="text-xs text-muted-foreground text-center mb-1 tracking-wide text-white/80">
          Over 800 companies trust Langdock
        </p>
  
        {/* Europe Hosting Card */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-left max-w-md mx-auto shadow flex items-center gap-6 mt-3">
            <div className="flex-shrink-0 flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-2 shadow-md">
                <img
                    src="/assets/europe-icon3.png"
                    alt="Map of Europe"
                    className="h-16 w-16 rounded-full"
                    style={{ background: 'radial-gradient(circle, #2d3748 60%, transparent 100%)' }} // Optional soft glow
                />
                </div>
            </div>
            <div>
                <strong className="block text-lg mb-1 text-white">Hosted in Europe</strong>
                <span className="block text-base text-white/90">
                The Langdock platform is hosted in Europe – as are most of the available models.
                </span>
            </div>
            </div>

      </section>
    );
  }
  
  export default function PromoSection() {
    return (
      <div className="flex flex-col items-center gap-12 w-full">
        <LangdockCard />
        <SocialProof />
      </div>
    );
  }
  