// LangdockCard.jsx
const companies = [
    { src: "/assets/merck-logo.png", alt: "Merck Logo" },
    { src: "/assets/babbel-logo.png", alt: "Babbel Logo" },
    { src: "/assets/personio-logo.png", alt: "Personio Logo" },
  ];
  
  function LangdockCard() {
    return (
      <section className="mt-8 bg-secondary/30 rounded-lg p-4 flex items-center gap-4">
        <img
          src="/assets/langdock-logo.png"
          alt="Langdock Logo"
          className="h-10 w-10"
        />
        <div>
          <strong>Can’t use ChatGPT at work?</strong>
          <div>
            Try Langdock for secure, company-friendly AI.{" "}
            <a
              href="http://www.langdock.com/?ref=jakob"
              className="text-primary underline hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
    );
  }
  
  function SocialProof() {
    return (
      <section className="flex flex-col items-center mt-4">
        <div className="flex items-center gap-4 mb-2">
          {companies.map(({ src, alt }) => (
            <img key={alt} src={src} alt={alt} className="h-6" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mb-2">
          Trusted by teams at leading companies
        </p>
        <blockquote className="bg-secondary/20 rounded p-2 text-center text-sm italic text-muted-foreground max-w-md">
          “Langdock helped our team collaborate securely with AI—no more IT headaches!”
          <footer>
            <span className="not-italic font-semibold">
              — IT Manager, ExampleCorp
            </span>
          </footer>
        </blockquote>
      </section>
    );
  }
  
  // Usage in your page/component
  export default function PromoSection() {
    return (
      <>
        <LangdockCard />
        <SocialProof />
      </>
    );
  }
  