import React from "react";
import { CtaForm } from "./cta_form";
import type { CtaFormProps } from "./cta_form";

export const Footer: React.FC<CtaFormProps> = (props) => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            The Future of Governance is Here.
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Don&apos;t just watch politics happen. Be a part of the solution.
            Sign up for early access and help us build a better democracy.
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <CtaForm {...props} />
          </div>
        </div>
      </div>
      <div className="bg-slate-950 py-4">
        <div className="container mx-auto px-6 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} CivIQ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
