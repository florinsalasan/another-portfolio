import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageSrc: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageSrc,
  link,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Image
        src={imageSrc}
        alt={title}
        className="mb-4 rounded-md"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex flex-wrap">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mt-4 inline-block hover:underline"
      >
        View Project
      </a>
    </div>
  );
};

export default ProjectCard;
