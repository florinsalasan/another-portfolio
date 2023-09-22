import React from "react";

interface SectionIntroductionProps {
  title: string;
}

const SectionIntroduction: React.FC<SectionIntroductionProps> = ({ title }) => {
  return (
    <div className="flex items-end">
      <h2 className="text-5xl font-semibold mb-2">{title} </h2>
      <div className="h-0.5 bg-white w-10 flex-grow ml-5 mb-4"></div>
    </div>
  );
};

export default SectionIntroduction;
