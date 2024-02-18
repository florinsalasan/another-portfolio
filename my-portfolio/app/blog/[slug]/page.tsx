import Link from "next/link";
import path from "path";
import matter from "gray-matter";
import fsPromises from "fs/promises";
import Markdown from 'react-markdown';

function capitalize(str: string) {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default async function Page({ params }: { params: { slug: string } }) {
    const filepath = path.join(
        process.cwd(),
        "posts",
        params.slug + ".md",
    );
    const file = await fsPromises.readFile(filepath, "utf8");
    const data = matter(file);
    return (
        <div className="prose dark:prose-invert">
            <h1 className="mb-0">{capitalize(params.slug.replaceAll("-", " "))}</h1>
            <span>
                Posted{" "}
                {new Date(data.data.posted as string).toLocaleString().split(",")[0]}
            </span>

            <hr />
        </div>
    )
};
