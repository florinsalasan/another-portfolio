import React, { useState } from "react";
import styles from "./ProcessStep.module.css";
import SectionIntroduction from "./SectionIntroduction";

interface ProcessStepProps {
  title: string;
  content: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`step ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SectionIntroduction title={title} type="subtitle" />
      <p
        className={`mb-4 ml-16 ${styles.content} ${
          isHovered ? styles.expanded : ""
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default ProcessStep;
