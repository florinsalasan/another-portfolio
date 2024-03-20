"use client"

import Link from "next/link"
import TagButton from "./tagButton";

export default function DropdownChecklist({ allTags, orderedPosts }: {allTags: string[], orderedPosts: { data: { [key: string]: any; }; slug: string; }[]; })
{
    return (
    <div className="inline">
        <TagButton tag={"Filter by Tags"} />
        <ul className="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allTags.map(tag => (
                <li key={tag} className="list-none block">
                    <TagButton tag={ tag } />
                </li>
            ))}
        </ul>
        <ul className="list-none w-4/5">
            {orderedPosts.map((p: any) => (
                <Link
                  href={`./blog/${p.slug}`}
                  className="no-underline hover:underline"
                  key={crypto.randomUUID()}
                >
                    <li className="w-full mt-6 text-xl capitalize border-b pb-2 
                        dark:border-white border-solid border-black" key={p.slug}>
                        {p.slug.replaceAll("-", " ")}
                        <span className="pl-4 text-base">
                            {/* {(p.data.posted as Date).toLocaleString().split(",")[0]} */}
                            {p.data.posted}
                        </span>
                    <p className="font-thin text-base mb-0">Tags: {p.data.tags.toString().split(',').join(', ')}</p>
                    </li>
                </Link>
            ))}
        </ul>
    </div>
    )
};
