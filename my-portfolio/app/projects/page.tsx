import CNTowerSvg from "../components/CNTowerSvg";
import ToTopBtn from "../components/toTopBtn";
import DropdownChecklist from "../components/dropdownChecklist";
import ProjectCard from "../components/projectCard";
import projectsData from '../../projects.json';

interface ProjectData {
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    gitLink: string;
}

export default async function Page() {
  let typedProjectsData= projectsData as ProjectData[];

  return (
    <div className="flex flex-row md:justify-between md:align-top">
        <div className="prose dark:prose-invert w-full">
            <h1>Projects</h1>
            {typedProjectsData.map((project: ProjectData, index: number) => (
                <ProjectCard key={index} imageUrl={project.imageUrl} title={project.title} description={project.description} technologies={project.technologies} gitLink={project.gitLink} />
            ))}
        </div>
        <CNTowerSvg />
        <ToTopBtn />
  </div>
  );
} 

