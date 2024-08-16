import ProjectCard from "../components/projectCard";
import projectsData from "../../projects.json";
import Link from "next/link";

interface ProjectData {
  title: string;
  description: string[];
  imageUrl: string;
  technologies: string[];
  gitLink: string;
  slug: string;
}

export default async function Page() {
  let typedProjectsData = projectsData as ProjectData[];

  return (
    <div className="flex flex-row md:justify-between md:align-top align-middle md:mr-4">
      <div className="prose dark:prose-invert w-full max-w-none">
        <h1>Projects</h1>
        {typedProjectsData.map((project: ProjectData, index: number) => (
          <Link 
            href={`./projects/${project.slug}`}
            className="no-underline hover:underline"
            key={crypto.randomUUID()}
          >
            <ProjectCard
              key={index}
              imageUrl={project.imageUrl}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              gitLink={project.gitLink}
            />
          </Link>
        ))}
        <p>
          *Thumbnails were made using Bing Copilot, or bad paintbrush skills or
          a screenshot
        </p>
      </div>
    </div>
  );
}
