import ProjectCard from "../components/projectCard";
import projectsData from "../../projects.json";
import Link from "next/link";
import DropdownChecklist from "../components/dropdownChecklist";

interface ProjectData {
  title: string;
  description: string[];
  imageUrl: string;
  technologies: string[];
  gitLink: string;
}

export default async function Page() {
  let typedProjectsData = projectsData as ProjectData[];

  return (
    <div className="flex flex-row md:justify-between md:align-top align-middle md:mr-4">
      <div className="prose dark:prose-invert w-full max-w-none">
        <h1>Projects</h1>
        {typedProjectsData.map((project: ProjectData, index: number) => (
          //<Link
          //  href={`./projects/${project.title}`}
          //  className="no-underline hover:underline"
          //  key={crypto.randomUUID()}
          //>
            <ProjectCard
              key={index}
              imageUrl={project.imageUrl}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              gitLink={project.gitLink}
            />
          //</Link>
        ))}
        <p>
          *Thumbnails were made using Bing Copilot, or bad paintbrush skills or
          a screenshot
        </p>
      </div>
    </div>
  );
}

// import path from "path";
// import matter from "gray-matter";
// import fsPromises from "fs/promises";

// export default async function ProjectsPage() {
//   const filepath = path.join(process.cwd(), "projects");
//   const projects = await fsPromises.readdir(filepath, { withFileTypes: false });
//   let projectTags: string[] = [];
//   const orderedPosts = projects.map((f) => {
//     const d = matter.read(`./projects/${f}`);
//     for (let tag of d.data.tags) {
//       projectTags.push(tag);
//     }
//     return { data: d.data, slug: f.slice(0, -3) };
//   });

//   return (
//     <div className="prose dark:prose-invert w-full">
//       <h1>Posts</h1>
//       <DropdownChecklist
//         allTags={projectTags}
//         orderedPosts={orderedPosts}
//         type="projects"
//       />
//     </div>
//   );
// }
