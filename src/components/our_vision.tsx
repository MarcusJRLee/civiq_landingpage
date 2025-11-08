import React from "react";

const Step: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <div className="relative">
    <div className="absolute -left-4 top-1 flex items-center justify-center w-8 h-8 bg-brand-light text-brand-purple font-bold rounded-full border-2 border-white">
      ✓
    </div>
    <div className="pl-8">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  </div>
);

export const OurVision: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            We Envision a World Where:
          </h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="ml-4">
            <div className="space-y-16">
              <Step
                title="Your Vote Matters"
                description="Vote on specific issues as they arise - capturing nuance beyond picking the “lesser of two evils.” Your input stays active and influential long after any candidate takes office."
              />
              <Step
                title="You Know Where Your Taxes Are Going"
                description="CivIQ eliminates the friction of scouring dozens of government websites to understand how your money is being spent by providing world class UI and AI assisted analysis."
              />
              <Step
                title="Good Ideas Get Found"
                description="Like what YouTube and TikTok has done for entertainment, CivIQ elevates the best ideas from around the world no matter where they come from."
              />
              <Step
                title="Your Representatives Answer to You"
                description="Representatives receive clear mandates from their consitutents, and an objective scorecard shows who delivered on those preferences—and who didn't."
              />
              <Step
                title="You Understand Your Government"
                description="CivIQ allows you to tailor a personal AI Agent that answers your questions about bills, candidates, and what is going on in your government."
              />
              <Step
                title="Projects Get Done"
                description="Constituents shape well written bills that ensure projects get completed - for example, stipulating that contractors don't get paid until a project like high speed rail is done, moving risk from the public sector to the private sector."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
