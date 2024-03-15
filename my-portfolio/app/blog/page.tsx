import Link from "next/link";
import path from "path";
import matter from "gray-matter";
import fsPromises from "fs/promises";
import { randomUUID } from "crypto";
import CNTowerSvg from "../components/CNTowerSvg";
import ToTopBtn from "../components/toTopBtn";

export default async function Page() {
  const filepath = path.join(process.cwd(), "posts");
  const posts = await fsPromises.readdir(filepath, { withFileTypes: false });
  let postTags: string[] = [];
  const orderedPosts = posts
    .map((f) => {
        const d = matter.read(`./posts/${f}`);
        for (let tag of d.data.tags) {
            postTags.push(tag)
            postTags.push(", ")
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
                <p>{postTags}</p>
                <ul className="list-none w-4/5">
                    {orderedPosts.map((p) => (
                        <Link
                          href={`./blog/${p.slug}`}
                          className="no-underline hover:underline"
                          key={randomUUID()}
                        >
                            <li className="w-full mt-6 text-xl capitalize border-b pb-2 border-white border-solid" key={p.slug}>
                                {p.slug.replaceAll("-", " ")}
                                <span className="pl-4 text-base">
                                    {/* {(p.data.posted as Date).toLocaleString().split(",")[0]} */}
                                    {p.data.posted}
                                </span>
                            <p className="font-thin mb-0">Tags: {p.data.tags.toString().split(',').join(', ')}</p>
                            </li>
                        </Link>
                        ))}
                </ul>

        </div>
        <CNTowerSvg />
        <ToTopBtn />
  </div>
  );
} 

