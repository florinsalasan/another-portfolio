import React from "react";
import SectionIntroduction from "./subComponents/SectionIntroduction";

const About: React.FC = () => {
  return (
    <section id="about" className="bg-blue-500 text-white pt-10">
      <div className="container mx-auto">
        <SectionIntroduction title="About" type="title" />

        <div className="text-xl p-6">
          <p className="mb-4">
            {`I'm currently on the lookout for new opportunities in the world of software development.`}
          </p>
          <p className="mb-4">
            {`When I'm not coding, you can often find me immersed in the highs and lows of being a Leafs fan.`}
          </p>
          <p>
            {`I'm also a sushi and shawarma enthusiast, constantly on a quest to discover the best spots in town.`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
