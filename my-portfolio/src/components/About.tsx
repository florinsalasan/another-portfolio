import React from "react";
import SectionIntroduction from "./subComponents/SectionIntroduction";

const About: React.FC = () => {
  return (
    <section id="about" className="bg-blue-500 text-white pt-10">
      <div className="container mx-auto">
        {/* <div className="flex items-end">
          <h2 className="text-5xl font-semibold mb-2">About </h2>
          <div className="h-0.5 bg-white w-10 flex-grow ml-5 mb-4"></div>
        </div> */}

        {/* <SectionIntroduction title="About" className="text-5xl mb-16" /> */}
        <SectionIntroduction title="About" type="title" />

        {/* <p className="text-2xl font-light">
          {`I'm currently on the lookout for new opportunities in the world of
          software development. When I'm not coding, you can often find me
          immersed in the highs and lows of being a devoted Leafs fan. I'm also
          a sushi and shawarma enthusiast, constantly on a quest to discover the
          best spots in town.`}
        </p> */}

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
