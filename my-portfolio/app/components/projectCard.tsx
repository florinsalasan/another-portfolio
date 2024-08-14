import React from 'react';
import Image from "next/image";
import { Github } from 'lucide-react';

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string[];
  technologies: string[];
  gitLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, description, technologies, gitLink }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
      <div className="h-48 lg:h-auto lg:w-48 xl:w-64 flex-none 
                rounded-t lg:rounded-tr-none lg:rounded-l text-center overflow-hidden
                border-l border-r border-t lg:border-r-0 lg:border-b border-gray-400 bg-white relative">
          <Image
                  src={imageUrl}
                  alt={title}
                  className='m-0 '
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover"
                  }} />
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white dark:bg-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 dark:text-white font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 dark:text-gray-300 text-base">{description.join(" ")}</p>
        </div>
        <div className="flex flex-wrap mt-4 justify-between">
            <div>
                {technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2">
                    {tech}
                  </span>
                ))}
            </div>
            <a
              aria-label="Link to project on github"
              className="transition-all hover:text-red-600"
              href={gitLink}
              target='_blank'
            >
              <Github />
            </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
