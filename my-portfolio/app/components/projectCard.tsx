import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, description, technologies}) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
        <Image src={imageUrl} alt={title}/>
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white dark:bg-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 dark:text-white font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 dark:text-gray-300 text-base">{description}</p>
        </div>
        <div className="flex flex-wrap mt-4">
            {technologies.map((tech, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2">
                {tech}
              </span>
            ))}
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;
