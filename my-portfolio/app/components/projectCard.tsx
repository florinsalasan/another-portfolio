import React from 'react';
import Image from "next/image";
import { Github } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string[];
  technologies: string[];
  gitLink: string;
  slug: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ slug, imageUrl, title, description, technologies, gitLink }) => {
  return (
    <div className="w-full lg:max-w-full lg:flex lg:flex-grow mb-4">
      <div className="h-64 lg:h-72 lg:w-72 flex-none 
                rounded-t lg:rounded-tr-none lg:rounded-l text-center overflow-hidden
                border-l border-r border-t lg:border-r-0 lg:border-b border-gray-400 dark:border-gray-200 bg-white relative">
        <Link 
          href={`./projects/${slug}`}
          key={crypto.randomUUID()}
          className="no-underline hover:underline"
        >
            {properImage({ slug, imageUrl, title, description, technologies, gitLink })}
        </Link>
      </div>
      <div className="border-r border-b border-l border-gray-400 dark:border-gray-200 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white dark:bg-slate-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <Link 
          href={`./projects/${slug}`}
          key={crypto.randomUUID()}
          className="no-underline hover:underline"
        >
          <div className="mb-8">
            <div className="text-gray-900 dark:text-white font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">{description.join(" ")}</p>
          </div>
        </Link>
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

const properImage = (all_props: ProjectCardProps): JSX.Element => {
    // if (all_props.imageUrl.slice(-3) != 'svg') {
       return  <Image
                  src={all_props.imageUrl}
                  alt={all_props.title}
                  className='m-0 '
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover"
                  }} />
    // } 
    // else {
    //     return <img src={all_props.imageUrl} className='m-0 object-fill' />
    // }
}

export default ProjectCard;
