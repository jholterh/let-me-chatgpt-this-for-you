function LangdockCard() {
    return (
      <a
        href="http://www.langdock.com/?ref=jakob"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Langdock"
        className="block mt-8 max-w-xl mx-auto focus:outline-none group"
        style={{ textDecoration: "none" }}
      >
        <section className="chatgpt-card p-8 flex items-center gap-6 transition-transform hover:scale-[1.03]">
          <img
            src="/assets/langdock-logo.png"
            alt="Langdock company logo"
            className="h-14 w-14 flex-shrink-0 hover:scale-110 group-hover:scale-110 transition-transform"
          />
          <div>
            <strong className="text-2xl block mb-1 text-card-foreground">
              Can’t use ChatGPT at work?
            </strong>
            <span className="block text-lg text-muted-foreground">
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
  
  export default function PromoSection() {
    return (
      <div className="flex flex-col items-center gap-12 w-full">
        <LangdockCard />
      </div>
    );
  }
  