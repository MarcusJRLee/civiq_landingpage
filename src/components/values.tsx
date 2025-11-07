import React from "react";
import { CheckBadgeIcon } from "./icons";

export const Values: React.FC = () => {
  // TODO(mjrlee): Update these principles to be more specific to the platform.
  const principles = [
    "Policy over Politics",
    "Data over Drama",
    "Discourse over Division",
  ];
  return (
    <section className="py-20 md:py-28 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Our Guiding Principles
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We are building a platform, not a party. Our goal is to empower
            individuals with technology, based on a foundation of core values.
          </p>
          <div className="mt-12 space-y-6">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-xl font-semibold text-slate-700"
              >
                <div className="w-6 h-6 text-brand-purple">
                  <CheckBadgeIcon />
                </div>
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
