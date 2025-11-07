import React from "react";

const Step: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <div className="relative">
    <div className="absolute -left-4 top-1 flex items-center justify-center w-8 h-8 bg-brand-light text-brand-purple font-bold rounded-full border-2 border-white">
      {number}
    </div>
    <div className="pl-8">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  </div>
);

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Make Your Impact in 3 Steps
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Getting involved has never been easier. We&apos;re breaking down the
            barriers between you and your government.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative border-l-2 border-slate-200 ml-4">
            <div className="space-y-16 pl-8">
              <Step
                number={1}
                title="Sign Up & Verify"
                description="Quickly create your account and verify your status as a constituent to ensure your voice is authentic and heard."
              />
              <Step
                number={2}
                title="Engage with Policy"
                description="Explore proposed bills, participate in polls, and see daily updates on your representatives' performance."
              />
              <Step
                number={3}
                title="Drive Real Change"
                description="Your collective action provides a clear, undeniable signal to politicians, creating real accountability and influencing outcomes."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
