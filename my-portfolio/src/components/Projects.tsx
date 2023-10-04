import React from "react";
import ProjectCarousel from "./subComponents/ProjectCarousel";
import ProjectCard from "./subComponents/ProjectCard";
import SectionIntroduction from "./subComponents/SectionIntroduction";
import { v4 as uuidv4 } from "uuid"; // Import uuid

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

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-10 bg-blue-500 text-white">
      <div className="container mx-auto">
        {/* <h2 className="text-2xl font-semibold mb-6">Projects</h2> */}
        <SectionIntroduction title="Projects" className="text-5xl mb-20" />
        <ProjectCarousel>
          {fakeProjects.map((project) => (
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
