// import React from "react";
// import ProjectCarousel from "./subComponents/ProjectCarousel";
// import ProjectCard from "./subComponents/ProjectCard";
// import SectionIntroduction from "./subComponents/SectionIntroduction";

// const fakeProjects = [
//   {
//     title: "Project 1",
//     description: "This is the first project",
//     imageSrc: "/project1.jpg",
//     link: "#",
//     technologies: ["react", "nextjs"],
//   },
//   {
//     title: "Project 2",
//     description: "This is the second project",
//     imageSrc: "/project2.jpg",
//     link: "#",
//     technologies: ["react", "nextjs"],
//   },
//   {
//     title: "Project 3",
//     description: "This is the third project",
//     imageSrc: "/project3.jpg",
//     link: "#",
//     technologies: ["react", "nextjs"],
//   },
//   {
//     title: "Project 4",
//     description: "This is the fourth project",
//     imageSrc: "/project4.jpg",
//     projectLink: "#",
//     technologies: ["react", "nextjs"],
//   },
//   // Add more project data as needed
// ];

// const Projects: React.FC = () => {
//   return (
//     <section className="bg-blue-500 text-white py-10">
//       <div className="container mx-auto">
//         <SectionIntroduction title="Projects" />
//         <ProjectCarousel>
//           {fakeProjects.map((project) => (
//             <ProjectCard
//               title={project.title}
//               description={project.description}
//               imageSrc={project.imageSrc}
//               link={project.link}
//               technologies={project.technologies}
//             />
//           ))}
//         </ProjectCarousel>
//         {/* <ProjectCard
//           title="Project 1"
//           description="This is project 1, pretty cool yadda yadda"
//           imageSrc="/cover.png"
//           projectLink="www.google.ca"
//           technologies={["react", "nextjs", "chatgpt"]}
//         /> */}
//       </div>
//     </section>
//   );
// };

// export default Projects;

// import React from "react";
// import ProjectCard from "./ProjectCard";
// import ProjectCarousel from "./ProjectCarousel";

import React from "react";
import ProjectCarousel from "./subComponents/ProjectCarousel";
import ProjectCard from "./subComponents/ProjectCard";
import SectionIntroduction from "./subComponents/SectionIntroduction";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const fakeProjects = [
  {
    title: "Project 1",
    description: "This is the first project",
    imageSrc: "/project1.jpg",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 2",
    description: "This is the second project",
    imageSrc: "/project2.jpg",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 3",
    description: "This is the third project",
    imageSrc: "/project3.jpg",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 4",
    description: "This is the fourth project",
    imageSrc: "/project4.jpg",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  // Add more project data as needed
];

// const projects = [
//   {
//     title: "Project 1",
//     description: "Description for Project 1",
//     technologies: ["Tech 1", "Tech 2"],
//     imageSrc: "project1.jpg",
//     link: "https://example.com/project1",
//   },
//   // Add more projects here
// ];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-10 bg-blue-500 text-white">
      <div className="container mx-auto">
        {/* <h2 className="text-2xl font-semibold mb-6">Projects</h2> */}
        <SectionIntroduction title="Projects" />
        <ProjectCarousel>
          {fakeProjects.map((project, index) => (
            <ProjectCard
              key={uuidv4()} // Generate a unique key using uuid
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageSrc={project.imageSrc}
              link={project.link}
            />
          ))}
        </ProjectCarousel>
      </div>
    </section>
  );
};

export default Projects;
