const companies = [
    { src: "/assets/merck-logo2.png", alt: "Merck logo" },
    { src: "/assets/babbel-logo-removebg-preview.png", alt: "Babbel logo" },
    { src: "/assets/spiegel-logo.png", alt: "Spiegel logo" },
  ];
  
  function LangdockCard() {
    return (
      <section className="mt-12 bg-white/10 shadow-lg rounded-xl p-6 flex items-center gap-5 max-w-xl mx-auto">
        <img
          src="/assets/langdock-logo.png"
          alt="Langdock company logo"
          className="h-12 w-12 flex-shrink-0"
        />
        <div>
          <strong className="text-lg block mb-1">Can’t use ChatGPT at work?</strong>
          <span className="block">
            Try Langdock for secure, company-friendly AI.{" "}
            <a
              href="http://www.langdock.com/?ref=jakob"
              className="text-primary underline hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </span>
        </div>
      </section>
    );
  }
  
  function SocialProof() {
    return (
      <section className="flex flex-col items-center gap-3 mt-6 max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-1">
          {companies.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-7 w-auto mx-1"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mb-1 tracking-wide">
          Trusted by teams at leading companies
        </p>
        <blockquote className="bg-white/10 border border-white/20 rounded-lg p-4 text-center text-sm italic text-muted-foreground max-w-md mx-auto shadow">
          “Langdock helped our team collaborate securely with AI—no more IT headaches!”
          <footer className="mt-2">
            <span className="not-italic font-semibold text-xs">
              — IT Manager, ExampleCorp
            </span>
          </footer>
        </blockquote>
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
  