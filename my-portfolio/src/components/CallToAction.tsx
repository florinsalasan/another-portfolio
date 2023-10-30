// import React from "react";
// import SectionIntroduction from "./subComponents/SectionIntroduction";
// import Image from "next/image";

// const CallToAction = () => {
//   return (
//     <section className="bg-blue-500 text-white pt-4 pb-10 text-center">
//       <SectionIntroduction title="" type="title" />
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-semibold mb-4 pt-4">
//           Like what you see? Let's collaborate on a project!
//         </h2>
//         <p className="text-xl text-white mb-4">
//           I'm always open to new opportunities and collaborations. Feel free to
//           reach out to me.
//         </p>
//         <div className="flex justify-center">
//           <a href="mailto:me@florinsalasan.dev" className="btn-primary mr-4">
//             <Image
//               src="/icons8-email-50.png"
//               alt="github-logo"
//               width={20}
//               height={20}
//             ></Image>
//           </a>
//           <a
//             href="https://github.com/florinsalasan"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn-primary"
//           >
//             <Image
//               src="/github-mark.svg"
//               alt="github-logo"
//               width={20}
//               height={20}
//             ></Image>
//           </a>

//           <a
//             href="
//             https://ca.linkedin.com/in/florin-salasan"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn-primary"
//           >
//             <Image
//               src="/linkedIn.png"
//               alt="github-logo"
//               width={20}
//               height={20}
//             ></Image>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CallToAction;

import React from "react";
import Image from "next/image";
import SectionIntroduction from "./subComponents/SectionIntroduction";

const CallToAction = () => {
  return (
    <section className="bg-blue-500 text-white pt-4 pb-10 text-center">
      <SectionIntroduction title="" type="title" />
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4 pt-4">
          Like what you see? Let&apos;s collaborate on a project!
        </h2>
        <p className="text-xl text-white mb-4">
          I&apos;m always open to new opportunities and collaborations. Feel
          free to reach out to me.
        </p>
        <div className="flex justify-around space-x-4 bg-white p-3 rounded-2xl mx-auto w-[30vw]">
          <a href="mailto:me@florinsalasan.dev" className="btn-primary">
            <Image
              src="/icons8-email-50.png"
              alt="github-logo"
              width={20}
              height={20}
            ></Image>
          </a>
          <a
            href="https://github.com/florinsalasan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Image
              src="/github-mark.svg"
              alt="github-logo"
              width={20}
              height={20}
            ></Image>
          </a>
          <a
            href="https://ca.linkedin.com/in/florin-salasan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Image
              src="/linkedIn.png"
              alt="github-logo"
              width={20}
              height={20}
            ></Image>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
