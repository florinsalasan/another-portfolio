import path from "path";
import matter from "gray-matter";
import fsPromises from "fs/promises";
import CNTowerSvg from "../components/CNTowerSvg";
import ToTopBtn from "../components/toTopBtn";
import DropdownChecklist from "../components/dropdownChecklist";

export default async function Page() {
  const filepath = path.join(process.cwd(), "posts");
  const posts = await fsPromises.readdir(filepath, { withFileTypes: false });
  let postTags: string[] = [];
  const orderedPosts = posts
    .map((f) => {
        const d = matter.read(`./posts/${f}`);
        for (let tag of d.data.tags) {
            postTags.push(tag)
        }
        return { data: d.data, slug: f.slice(0, -3) };
    })
    .sort(
        (a, b) =>
            new Date((b.data.posted as string) ?? "").getTime() - 
            new Date((a.data.posted as string) ?? "").getTime(),
    );

  return (
    <div className="flex flex-row md:justify-between md:align-top">
        <div className="prose dark:prose-invert w-full">
            <h1>Posts</h1>
            <DropdownChecklist allTags={ postTags } orderedPosts={ orderedPosts }/>
        </div>
        <CNTowerSvg />
        <ToTopBtn />
  </div>
  );
} 

