// import React, { useState } from "react";

// interface ProjectCarouselProps {
//   children: React.ReactNode[];
// }

// const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ children }) => {
//   const [currentCard, setCurrentCard] = useState(0);

//   const nextCard = () => {
//     const nextIndex = (currentCard + 1) % children.length;
//     setCurrentCard(nextIndex);
//   };

//   const prevCard = () => {
//     const prevIndex = (currentCard - 1 + children.length) % children.length;
//     setCurrentCard(prevIndex);
//   };

//   return (
//     <div className="relative overflow-hidden">
//       <div className="flex transition-transform duration-300 ease-in-out transform -translate-x-1/4">
//         {children.map((child, index) => (
//           <div
//             key={index}
//             className={`w-full flex-shrink-0 ${
//               index === currentCard ? "" : "opacity-50"
//             }`}
//           >
//             {child}
//           </div>
//         ))}
//       </div>

//       <button onClick={prevCard}>Previous</button>
//       <button onClick={nextCard}>Next</button>
//     </div>
//   );
// };

// export default ProjectCarousel;

// import React, { useState } from "react";

// interface ProjectCarouselProps {
//   children: React.ReactNode[];
// }

// const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ children }) => {
//   const [currentCard, setCurrentCard] = useState(0);

//   const nextCard = () => {
//     const nextIndex = (currentCard + 1) % children.length;
//     setCurrentCard(nextIndex);
//   };

//   const prevCard = () => {
//     const prevIndex = (currentCard - 1 + children.length) % children.length;
//     setCurrentCard(prevIndex);
//   };

//   const cardStyle = {
//     transform: `translateX(-${currentCard * 100}%)`,
//     transition: "transform 0.3s ease-in-out",
//   };

//   return (
//     <div className="relative overflow-hidden">
//       <div className="flex" style={cardStyle}>
//         {children.map((child, index) => (
//           <div
//             key={index}
//             className={`w-full flex-shrink-0 ${
//               index === currentCard ? "" : "opacity-50"
//             }`}
//           >
//             {child}
//           </div>
//         ))}
//       </div>

//       <button onClick={prevCard}>Previous</button>
//       <button onClick={nextCard}>Next</button>
//     </div>
//   );
// };

// export default ProjectCarousel;

import React, { useState } from "react";

interface ProjectCarouselProps {
  children: React.ReactNode[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ children }) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    const nextIndex = (currentCard + 1) % children.length;
    setCurrentCard(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = (currentCard - 1 + children.length) % children.length;
    setCurrentCard(prevIndex);
  };

  const cardStyle = {
    transform: `translateX(-${currentCard * 60}%)`,
    transition: "transform 0.3s ease-in-out",
  };

  const getCardStyle = (index: number) => {
    const zIndex = children.length - Math.abs(currentCard - index);
    return {
      zIndex,
      transform: `scale(${zIndex === children.length ? 1 : 0.9})`,
    };
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex" style={cardStyle}>
        {children.map((child, index) => (
          <div
            key={index}
            className={`w-3/5 flex-shrink-0 ${
              index === currentCard ? "" : "opacity-50"
            }`}
            style={getCardStyle(index)}
          >
            {child}
          </div>
        ))}
      </div>

      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
};

export default ProjectCarousel;
