import React from "react";

const Projects: React.FC = () => {
  return (
    <section className="bg-blue-500 text-white py-10">
      <div className="container mx-auto">
        <div className="flex items-end">
          <h2 className="text-5xl font-semibold mb-2">Projects </h2>
          <div className="h-0.5 bg-white w-10 flex-grow ml-5 mb-4"></div>
        </div>
        <h4>Project cards go here</h4>
      </div>
    </section>
  );
};

export default Projects;
