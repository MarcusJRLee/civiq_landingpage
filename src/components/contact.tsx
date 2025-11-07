import React from "react";

const GOOGLE_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLScg80MRoIjJS7qxRt_JklcV6VPu3Ao_GScXr73DDvzDM86s4A/viewform?usp=header";

export const Contact: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Want to get in touch?
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          We&apos;d love to hear from you.
        </p>
        <div className="mt-5">
          <a
            href={GOOGLE_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 text-base font-semibold text-white bg-brand-purple rounded-md shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
};
