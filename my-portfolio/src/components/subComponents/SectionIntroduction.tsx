// import React from "react";

// interface SectionIntroductionProps {
//   title: string;
//   className?: string;
// }

// const SectionIntroduction: React.FC<SectionIntroductionProps> = ({
//   title,
//   className, // Add className prop
// }) => {
//   return (
//     <div className={`flex items-end ${className}`}>
//       <h3 className="mb-2">{title}</h3>
//       <div className="h-0.5 bg-white w-10 flex-grow ml-5 mb-4"></div>
//     </div>
//   );
// };

// export default SectionIntroduction;
import React from "react";

interface SectionIntroductionProps {
  title: string;
  type: "title" | "subtitle"; // Prop to specify the type
}

const SectionIntroduction: React.FC<SectionIntroductionProps> = ({
  title,
  type,
}) => {
  return (
    <div className={`flex items-center mx-2 ${type === "subtitle" ? "" : ""} `}>
      <h3
        className={
          type === "title"
            ? "mr-2 mb-4 text-3xl text-center md:text-3xl md:mb-6"
            : "text-lg mb-2 mr-5"
        }
      >
        {title}
      </h3>
      <div className="h-0.5 bg-white flex-grow"></div>
    </div>
  );
};

export default SectionIntroduction;
