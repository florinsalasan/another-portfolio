// import Image from "next/image";
// import React from "react";

// const Hero: React.FC = () => {
//   return (
//     <section
//       id="hero"
//       className="bg-blue-500 text-white min-h-screen flex items-center"
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Text on the left (2/3 of the space) */}
//         <div className="w-2/3 pr-4">
//           <h1 className="text-8xl font-bold mb-2">
//             {`I'm Florin,`} <br /> a software developer <br /> based in the GTA
//           </h1>
//           {/* <p className="text-lg mb-4">Web whisperer, tech enjoyer</p> */}
//         </div>

//         {/* Image on the right (1/3 of the space) */}
//         <div className="w-1/3 flex justify-center">
//           {/* <img
//             src="/your-profile-picture.jpg" // Replace with the path to your profile picture
//             alt="Super good high quality portrait"
//             className="rounded-full w-32 h-32 mx-auto"
//           /> */}

//           <Image
//             src="/cnTower.svg"
//             alt="CN Tower outline"
//             width={0}
//             height={0}
//             sizes="100vw"
//             style={{ width: "40%", height: "auto" }} // optional
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import Image from "next/image";
// import CNTowerSVG from 'path-to-your-svg/cn-tower.svg'; // Replace with the actual path

const Hero = () => {
  return (
    <section
      id="hero"
      className="bg-blue-500 text-white text-center min-h-screen flex flex-col justify-center"
    >
      <h1 className="text-3xl font-bold">Hello, I&apos;m Florin</h1>
      <p className="text-xl">a software developer based in the GTA</p>
      <div className=" mx-auto mt-6">
        <Image
          src={"/cnTower.svg"}
          alt="CN Tower"
          width={100}
          height={100}
          style={{ maxWidth: "100%" }}
        />
      </div>
    </section>
  );
};

export default Hero;
