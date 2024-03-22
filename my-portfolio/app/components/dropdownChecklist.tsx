"use client"

import Link from "next/link"
import TagButton from "./tagButton";
import { useState } from "react";

export default function DropdownChecklist({ allTags, orderedPosts }: {allTags: string[], orderedPosts: { data: { [key: string]: any; }; slug: string; }[]; })
{
    const [expanded, setExpanded] = useState(false);

    const expandList = () => { 
        console.log("expandList called")
        console.log(expanded)
        setExpanded(!expanded)
        console.log(expanded)
    }

    const uniqueTags = [...new Set(allTags)]

    return (
    <div>
        <div onClick={expandList}>
            <TagButton tag={expanded ? "Collapse filters" : "Filter by Tags"} />
        </div>
        <ul className={["grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-56 p-0",
                expanded ? "" : "hidden"
            ].join(' ')}>
            {uniqueTags.map(tag => (
                <li key={tag} className="list-none block p-0">
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
                    <p className="font-thin text-base mb-0">Tags: {getUnique(p.data.tags.toString())} </p>
                    </li>
                </Link>
            ))}
        </ul>
    </div>
    )
};


function getUnique(stringTags: String) {

    let currTags = stringTags.split(',')
    let uniqueTags = [...new Set(currTags)].join(', ')
    return uniqueTags

}
