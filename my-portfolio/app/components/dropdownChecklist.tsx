"use client"

import Link from "next/link"
import TagButton from "./tagButton";
import { useState } from "react";

export default function DropdownChecklist({ allTags, orderedPosts }: {allTags: string[], orderedPosts: { data: { [key: string]: any; }; slug: string; }[]; })
{
    const uniqueTags = [...new Set(allTags)]

    const [expanded, setExpanded] = useState(false);

    let allTagsFalse = new Map<String, boolean>;
    uniqueTags.forEach((tag) => {
        allTagsFalse.set(tag, false);
    });

    const [activeFilters, setActiveFilters] = useState(allTagsFalse)

    const expandList = () => { 
        setExpanded(!expanded)
        console.log(activeFilters)
    }

    const toggleFilter = (e: React.MouseEvent<HTMLElement>) => {
        // given a button tag, either add it to activeFilters or remove it
        let currButtonTag = e.currentTarget.children[0].getAttribute("id")?.toString();
        // Get a copy of the activeFilters, toggle the one with currButtonTag and set it
        let copyOfFilters = new Map(activeFilters);
        if (typeof currButtonTag !== "string") {
            return;
        }
        copyOfFilters.set(currButtonTag, !activeFilters.get(currButtonTag));
        setActiveFilters(copyOfFilters)
        // This is a cursed function 
        // nvm, useState is async so won't necessarily console.log properly have to believe
        // it works as expected
        console.log(getFilteredPosts())
    }

    const getFilteredPosts = () => {
        // Get the index of true as a check if any tag filters were applied.
        if (Array.from(activeFilters.values()).indexOf(true) === -1) {
            // return all posts 
            return orderedPosts.map((p: any) => (
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
            ))
        } else {
            // loop through posts and filter for ones containing one of the activeFilters
            console.log("posts are being filtered soon")
            return
        }
            
    }

    return (
    <div>
        <div onClick={expandList} className="w-40 hover:cursor-pointer">
            <TagButton tag={expanded ? "Collapse filters" : "Filter by Tags"} />
        </div>
        <ul className={["grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-56 p-0",
                expanded ? "" : "hidden"
            ].join(' ')}>
            {uniqueTags.map(tag => (
                <li key={tag} className="list-none block p-0">
                    <div onClick={((e: React.MouseEvent<HTMLElement>) => toggleFilter(e))} className="w-40"> 
                        <TagButton tag={ tag } />
                    </div>
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

