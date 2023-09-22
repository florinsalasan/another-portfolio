import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-blue-500 text-white min-h-screen flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        {/* Text on the left (2/3 of the space) */}
        <div className="w-2/3 pr-4">
          <h1 className="text-8xl font-bold mb-2">
            I'm Florin, <br /> a software developer <br /> based in the GTA
          </h1>
          {/* <p className="text-lg mb-4">Web whisperer, tech enjoyer</p> */}
        </div>

        {/* Image on the right (1/3 of the space) */}
        <div className="w-1/3 flex justify-center">
          {/* <img
            src="/your-profile-picture.jpg" // Replace with the path to your profile picture
            alt="Super good high quality portrait"
            className="rounded-full w-32 h-32 mx-auto"
          /> */}

          <Image src="/cnTower.svg" height="0" width="150" alt="CN Tower" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
