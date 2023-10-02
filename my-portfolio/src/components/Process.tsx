import React from "react";
import SectionIntroduction from "./subComponents/SectionIntroduction";

const Process: React.FC = () => {
  return (
    <section className="bg-blue-500 text-white py-10">
      <div className="container mx-auto">
        <SectionIntroduction title="Process" />
      </div>
    </section>
  );
};

export default Process;
