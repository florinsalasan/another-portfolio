import React from "react";

interface SectionIntroductionProps {
  title: string;
  className?: string;
}

const SectionIntroduction: React.FC<SectionIntroductionProps> = ({
  title,
  className, // Add className prop
}) => {
  return (
    <div className={`flex items-end ${className}`}>
      <h3 className="mb-2">{title}</h3>
      <div className="h-0.5 bg-white w-10 flex-grow ml-5 mb-4"></div>
    </div>
  );
};

export default SectionIntroduction;
