
  
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
        <section className="bg-white/10 shadow-lg rounded-xl p-6 flex items-center gap-5 transition-transform hover:scale-[1.02]">
          <img
            src="/assets/langdock-logo.png"
            alt="Langdock company logo"
            className="h-12 w-12 flex-shrink-0 hover:scale-105 group-hover:scale-110 transition-transform"
          />
          <div>
            <strong className="text-lg block mb-1">Can’t use ChatGPT at work?</strong>
            <span className="block">
              Try Langdock for secure, company-friendly AI.{" "}
              <span className="text-primary underline group-hover:text-primary/80">
                Learn more
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
      <section className="flex flex-col items-center gap-3 mt-6 max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-1">
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
                className="h-7 w-auto hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </div>
  
        <p className="text-xs text-muted-foreground text-center mb-1 tracking-wide">
          Over 800 companies trust Langdock
        </p>
  
        <div className="bg-white/10 border border-white/20 rounded-lg p-6 text-center text-sm text-muted-foreground max-w-md mx-auto shadow flex items-center gap-4">
            <img
                src="/assets/europe-icon3.png"
                alt="Map of Europe"
                className="h-20 w-20 opacity-80"
            />
            <div>
                <strong className="block text-base mb-1 text-foreground">Gehostet in Europa</strong>
                <span>
                Die Langdock-Plattform wird in Europa gehostet – ebenso wie die meisten verfügbaren Modelle.
                </span>
            </div>
            </div>



      </section>
    );
  }
  
  
  
  export default function PromoSection() {
    return (
      <div className="flex flex-col items-center gap-6">
        <LangdockCard />
        <SocialProof />
      </div>
    );
  }
  