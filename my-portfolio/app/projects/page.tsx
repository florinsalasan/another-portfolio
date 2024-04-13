import CNTowerSvg from "../components/CNTowerSvg";
import ToTopBtn from "../components/toTopBtn";
import DropdownChecklist from "../components/dropdownChecklist";
import ProjectCard from "../components/projectCard";

export default async function Page() {
  let postTags: string[] = [];

  return (
    <div className="flex flex-row md:justify-between md:align-top">
        <div className="prose dark:prose-invert w-full">
            <h1>Projects</h1>
            <ProjectCard title="discord dailies" description="get daily reminders straight from discord" technologies={["go", "discord"]}/>
        </div>
        <CNTowerSvg />
        <ToTopBtn />
  </div>
  );
} 


