import React from 'react';

interface ProjectDetailsProps {
  imageUrl: string;
  title: string;
  description: string[];
  technologies: string[];
  gitLink: string;
  // Thinking about making the details description a markdown file instead that 
  // breaks down how and why it was built the way that it was.
}

// This component will be the view that gets created when a user clicks on one of the project
// cards to get a more indepth description of the project and how it was made, remember build mobile first
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ imageUrl, title, description, technologies, gitLink }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
      <div className="h-48 lg:h-auto lg:w-48 xl:w-64 flex-none bg-cover bg-center 
                rounded-t lg:rounded-tr-none lg:rounded-l text-center overflow-hidden
                border-l border-r border-t lg:border-r-0 lg:border-b border-gray-400
                " style={{backgroundImage: `url(${imageUrl})`}}> 
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
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
