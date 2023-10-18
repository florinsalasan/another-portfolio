import React, { useState, useRef } from "react";
// import ProjectCarousel from "./subComponents/ProjectCarousel";
import ProjectCard from "./subComponents/ProjectCard";
import SectionIntroduction from "./subComponents/SectionIntroduction";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import styles from "./Projects.module.css";

const fakeProjects = [
  {
    title: "Project 1",
    description: "This is the first project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 2",
    description: "This is the second project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 3",
    description: "This is the third project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 4",
    description: "This is the fourth project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  // Add more project data as needed
];

// const Projects: React.FC = () => {
//   return (
//     <section id="projects" className="py-10 bg-blue-500 text-white">
//       <div className="container mx-auto">
//         {/* <h2 className="text-2xl font-semibold mb-6">Projects</h2> */}
//         <SectionIntroduction title="Projects" type="title" />
//         <ProjectCarousel>
//           {fakeProjects.map((project) => (
//             <ProjectCard
//               key={uuidv4()} // Generate a unique key using uuid
//               title={project.title}
//               description={project.description}
//               technologies={project.technologies}
//               imageSrc={project.imageSrc}
//               link={project.link}
//             />
//           ))}
//         </ProjectCarousel>
//       </div>
//     </section>
//   );
// };

// export default Projects;

// import React, { useState } from "react";
// import SectionIntroduction from "./subComponents/SectionIntroduction";
// import ProjectCard from "./subComponents/ProjectCard";

// const Projects: React.FC = () => {
//   const [currentCard, setCurrentCard] = useState(0);

//   const nextCard = () => {
//     setCurrentCard((currentCard + 1) % fakeProjects.length);
//   };

//   const prevCard = () => {
//     setCurrentCard(
//       (currentCard - 1 + fakeProjects.length) % fakeProjects.length
//     );
//   };

//   return (
//     <section id="projects" className="py-10 bg-blue-500 text-white">
//       <div className="container mx-auto">
//         <SectionIntroduction title="Projects" type="title" />
//         <div className="relative">
//           <div className="carouselContainer">
//             {fakeProjects.map((project, index) => (
//               <div
//                 key={uuidv4()}
//                 className={`${styles.projectCard} ${
//                   index === currentCard ? `${styles.active}` : ""
//                 }`}
//               >
// <ProjectCard
//   title={project.title}
//   description={project.description}
//   technologies={project.technologies}
//   imageSrc={project.imageSrc}
//   link={project.link}
// />
//               </div>
//             ))}
//           </div>
//           <div className="carousel-buttons">
//             <button className="prev" onClick={prevCard}>
//               Previous
//             </button>
//             <button className="next" onClick={nextCard}>
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;

const Projects: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % fakeProjects.length);
  };

  const prevCard = () => {
    setCurrentCard(
      (currentCard - 1 + fakeProjects.length) % fakeProjects.length
    );
  };

  const goToCard = (index: number) => {
    setCurrentCard(index);

    // Calculate the new scrollLeft value based on the index and container's clientWidth
    const container = containerRef.current;
    if (container) {
      const newScrollLeft = index * container.clientWidth;
      container.scrollLeft = newScrollLeft;
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null); // Specify the ref type
  const [scrollThreshold, setScrollThreshold] = useState(350); // Adjust the threshold value as needed

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollDirection = e.deltaY > 0 ? "right" : "left";

    const cardWidth = container.clientWidth; // Width of each card
    const newPosition = scrollLeft + e.deltaY;

    if (scrollDirection === "right" && scrollLeft > 0) {
      if (newPosition <= scrollThreshold) {
        // Scroll less than threshold, don't change the card yet
        container.scrollLeft = 0; // Reset scroll position
      } else {
        // Change the card
        setCurrentCard(
          (currentCard - 1 + fakeProjects.length) % fakeProjects.length
        );
        container.scrollLeft = cardWidth - newPosition; // Adjust scroll position
      }
    } else if (
      scrollDirection === "left" &&
      scrollLeft < container.scrollWidth
    ) {
      if (cardWidth - newPosition <= scrollThreshold) {
        // Scroll less than threshold, don't change the card yet
        container.scrollLeft = cardWidth; // Reset scroll position
      } else {
        // Change the card
        setCurrentCard((currentCard + 1) % fakeProjects.length);
        container.scrollLeft = newPosition - cardWidth; // Adjust scroll position
      }
    }
  };

  return (
    <section
      id="projects"
      className="py-10 bg-blue-500 text-white"
      onWheel={handleScroll}
    >
      <div className="container mx-auto">
        <SectionIntroduction title="Projects" type="title" />
        <div
          className="relative"
          onWheel={handleScroll}
          ref={containerRef}
          style={{ overflowX: "scroll", scrollBehavior: "smooth" }}
        >
          <div className="carouselContainer">
            {fakeProjects.map((project, index) => (
              <div
                key={uuidv4()}
                className={`${styles.projectCard} ${
                  index === currentCard ? `${styles.active}` : ""
                }`}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  imageSrc={project.imageSrc}
                  link={project.link}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.carouselButtons}`}>
          <button className="prev" onClick={prevCard}>
            Previous
          </button>
          <div className={`${styles.navigationDots}`}>
            {fakeProjects.map((_, index) => (
              <span
                key={index}
                className={`${styles.navigationDot} ${
                  index === currentCard ? "active" : ""
                }`}
                onClick={() => goToCard(index)}
              ></span>
            ))}
          </div>
          <button className="next" onClick={nextCard}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
