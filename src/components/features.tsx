import React from "react";
import { ChartBarIcon, DocumentTextIcon, ScaleIcon, UsersIcon } from "./icons";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-light text-brand-purple mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  const features = [
    {
      icon: <ChartBarIcon />,
      title: "Daily Accountability Scorecards",
      description:
        "Get real-time, data-driven insights into your representatives. See how their voting records align with your interests and the community's.",
    },
    {
      icon: <DocumentTextIcon />,
      title: "From Idea to Law",
      description:
        "Propose, discuss, and vote on bills that matter to you. Our platform lowers the barrier for great ideas to become impactful policy.",
    },
    {
      icon: <ScaleIcon />,
      title: "Follow the Money",
      description:
        "Explore government budgets with unprecedented clarity. Understand how public funds are allocated and spent, from the federal to the local level.",
    },
    {
      icon: <UsersIcon />,
      title: "Constructive Conversation",
      description:
        "Engage in issue-first discourse. Our platform is designed to foster productive conversations, not partisan division.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Not Politics, Policy.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            CivIQ provides the tools you need to move beyond partisan bickering
            and focus on what truly matters: effective governance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
