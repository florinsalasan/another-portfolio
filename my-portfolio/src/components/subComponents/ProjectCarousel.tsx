// // ProjectCarousel.tsx

// import React, { useState, useEffect } from "react";
// import styles from "./ProjectCarousel.module.css";

// interface ProjectCarouselProps {
//   children: React.ReactNode[];
// }

// const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ children }) => {
//   const totalCards = children.length;
//   const [currentCard, setCurrentCard] = useState(0);

//   const nextCard = () => {
//     const nextIndex = (currentCard + 1) % totalCards;
//     setCurrentCard(nextIndex);
//   };

//   const prevCard = () => {
//     const prevIndex = (currentCard - 1 + totalCards) % totalCards;
//     setCurrentCard(prevIndex);
//   };

//   return (
//     <div className={styles.carousel}>
//       <button onClick={prevCard} className={styles.prevButton}>
//         Previous
//       </button>
//       <div className={styles.cardContainer}>
//         {children.map((child, index) => (
//           <div
//             key={index}
//             className={`${styles.card} ${
//               index === currentCard
//                 ? styles.center
//                 : index === (currentCard + 1) % totalCards
//                 ? styles.right
//                 : index === (currentCard - 1 + totalCards) % totalCards
//                 ? styles.left
//                 : ""
//             }`}
//           >
//             {child}
//           </div>
//         ))}
//       </div>
//       <button onClick={nextCard} className={styles.nextButton}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default ProjectCarousel;
import React, { useState } from "react";
import styles from "./ProjectCarousel.module.css";

interface ProjectCarouselProps {
  children: React.ReactNode[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ children }) => {
  const totalCards = children.length;
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    const nextIndex = (currentCard + 1) % totalCards;
    setCurrentCard(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = (currentCard - 1 + totalCards) % totalCards;
    setCurrentCard(prevIndex);
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prevCard} className={styles.prevButton}>
        Previous
      </button>

      {/* Carousel Grid */}

      <div className={styles.cardContainer}>
        {children.map((child, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              index === currentCard
                ? styles.center
                : index === (currentCard + 1) % totalCards
                ? styles.right
                : index === (currentCard - 1 + totalCards) % totalCards
                ? styles.left
                : ""
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      <button onClick={nextCard} className={styles.nextButton}>
        Next
      </button>
    </div>
  );
};

export default ProjectCarousel;
