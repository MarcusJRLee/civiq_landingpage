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
            We envision a world where:
          </h2>
          <p className="mt-4 text-lg text-slate-600">Something here?</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="ml-4">
            <div className="space-y-16">
              <Step
                title="Your Vote Matters"
                description="You vote on specific, relevant issues as they arise, replacing the frustrating cycle of only choosing between a couple of candidates every few years."
              />
              <Step
                title="You Know Where Your Taxes Are Going"
                description="CivIQ eliminates the friction of looking through dozens of government websites to get the answers to your budgetary questions by providing world class UI and AI analysis."
              />
              <Step
                title="Good Ideas Get Found"
                description="Like what YouTube and TikTok has done for entertainment, CivIQ's algorithm will promote the best ideas from around the world no matter where they come from."
              />
              <Step
                title="Your Representatives Answer to You"
                description="Representatives know exactly what their constituents want, and a clear, objective scorecard shows who delivered on those preferences—and who didn't."
              />
              <Step
                title="You Understand Your Government"
                description="CivIQ allows you to tailor a personal AI Agent that answers your questions about bills, candidates, and how your government is run."
              />
              <Step
                title="Projects Get Done"
                description="Popular projects like high-speed rail are completed in a timely manner because the bills we pass specify that contractors don't get paid until the job is done."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
