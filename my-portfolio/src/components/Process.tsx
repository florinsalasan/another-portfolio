import React from "react";
import ProcessStep from "./subComponents/ProcessStep";
import SectionIntroduction from "./subComponents/SectionIntroduction";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const ProcessSteps = [
  {
    heading: "1. Building the blueprint",
    content:
      "I start by brainstorming and sketching out rough concepts and play around with any ideas that come to mind. It is in this phase where I quickly iterate through multiple layouts, features, and design elements as it is the cheapest and easiest place to do so. Once I am happy with the overall structure of the project I then move on and begin implementing the vision.",
  },
  {
    heading: "2. Outlining then filling in",
    content:
      "As I shift from the blueprint to the implementation phase, I first build the project's fundamental components to establish a solid foundation. Afterward, I dive into each block, refining the content and overall design details. This approach ensures consistency with the initial plan and allows me to quickly identify and address any issues that may disrupt the user experience before investing significant time.",
  },
  {
    heading: "3. Detailing and fine-tuning",
    content:
      "In this phase, I focus on refining and enhancing every aspect of the project. I review each element, from the overall functionality to the smallest design details. It's a stage where I fine-tune the user experience, making sure every interaction is intuitive and visually polished. Through rigorous testing and refinement, I bring the project to a level of quality that meets my highest standards.",
  },
  {
    heading: "Always on my mind",
    content:
      "In every phase of the project, I try to keep a watchful eye on best practices, code maintainability, and accessibility. This mindset ensures that the project meets immediate goals while also laying a solid foundation for future improvements. I embrace the principles of clean and reusable code, adding meaningful comments for clarity and fostering a design approach that respects accessibility standards. I strive to create something beautiful today that embraces adaptability to allow for future changes and improvements.",
  },
  // Add more project data as needed
];

// const Process: React.FC = () => {
//   return (
//     <section id="process" className="py-10 bg-blue-500 text-white">
//       <div className="container mx-auto">
//         <SectionIntroduction title="Process" type="title" />
//         <div className="processContainer ml-[30%]">
//           {ProcessSteps.map((step) => (
//             <ProcessStep
//               key={uuidv4()}
//               title={step.heading}
//               content={step.content}
//               customStyle="mb-8 mt-8 text-3xl font-normal" // Apply custom styles for this instance
//             ></ProcessStep>
//           ))}
//         </div>
//       </div>
//       <button className="bg-yellow-500 text-black rounded-full px-6 py-2 mt-4">
//         Contact Me!
//       </button>
//     </section>
//   );
// };
const Process: React.FC = () => {
  return (
    <section id="process" className="pt-10 bg-blue-500 text-white">
      <div className="container mx-auto">
        <SectionIntroduction title="Process" type="title" />
        <div className="processContainer ml-[10%] md:ml-[20%] lg:ml-[25%]">
          {ProcessSteps.map((step) => (
            <ProcessStep
              key={uuidv4()}
              title={step.heading}
              content={step.content}
              // Apply relevant styling directly in the ProcessStep component
            ></ProcessStep>
          ))}
        </div>
      </div>
      <button className="bg-yellow-500 text-black rounded-full px-6 py-2 mt-4">
        Contact Me!
      </button>
    </section>
  );
};

export default Process;
