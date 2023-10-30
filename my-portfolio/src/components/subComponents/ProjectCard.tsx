import React from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

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
      <h3 className="text-xl mb-2 text-gray-600">{title}</h3>
      <p className={`${styles.cardDescription}text-gray-600 mb-4`}>
        {description}
      </p>
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
      <div className={`${styles.modal} hidden modal`}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-content">
          <div className="modal-section">
            <h4>Technologies Used</h4>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="modal-section">
            <h4>External Links</h4>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Live Version
            </a>
            <a href={link} target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </div>
          <div className="modal-section">
            <h4>In-Depth Description</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
      );
    </div>
  );
};

export default ProjectCard;
