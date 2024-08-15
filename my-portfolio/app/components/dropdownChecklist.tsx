"use client";

import Link from "next/link";
import TagButton from "./tagButton";
import { useState } from "react";

// This is a mess
export default function DropdownChecklist({
  allTags,
  orderedPosts,
  type,
}: {
  allTags: string[];
  orderedPosts: { data: { [key: string]: any }; slug: string }[];
  type: String;
}) {
  const uniqueTags = [...new Set(allTags)];

  const [expanded, setExpanded] = useState(false);

  let allTagsFalse = new Map<String, boolean>();
  uniqueTags.forEach((tag) => {
    allTagsFalse.set(tag, false);
  });

  const [activeFilters, setActiveFilters] = useState(allTagsFalse);

  const expandList = () => {
    setExpanded(!expanded);
  };

  const resetFilters = () => {
    let allTagsFalse = new Map<String, boolean>();
    uniqueTags.forEach((tag) => {
      allTagsFalse.set(tag, false);
    });
    setActiveFilters(allTagsFalse);
  };

  const toggleFilter = (e: React.MouseEvent<HTMLElement>) => {
    // given a button tag, either add it to activeFilters or remove it
    let currButtonTag = e.currentTarget.children[0]
      .getAttribute("id")
      ?.toString();
    // Get a copy of the activeFilters, toggle the one with currButtonTag and set it
    let copyOfFilters = new Map(activeFilters);
    if (typeof currButtonTag !== "string") {
      return;
    }
    copyOfFilters.set(currButtonTag, !activeFilters.get(currButtonTag));
    setActiveFilters(copyOfFilters);
    // This is a cursed function
    // nvm, useState is async so won't necessarily console.log properly have to believe
    // it works as expected
  };

  // make the getFilteredPosts function a diff component? can make it client side and then
  // this can use async/await from useState
  const getFilteredPosts = () => {
    // Get the index of true as a check if any tag filters were applied.
    if (Array.from(activeFilters.values()).indexOf(true) === -1) {
      // return all posts
      return orderedPosts.map((p: any) => (
        <Link
          href={`./${type}/${p.slug}`}
          className="no-underline hover:underline"
          key={crypto.randomUUID()}
        >
          <li
            className="w-full mt-6 text-xl capitalize border-b pb-2 
                        dark:border-white border-solid border-black"
            key={p.slug}
          >
            {p.slug.replaceAll("-", " ")}
            <span className="pl-4 text-base">{p.data.posted}</span>
            <p className="font-thin text-base mb-0">
              Tags: {getUnique(p.data.tags.toString())}{" "}
            </p>
          </li>
        </Link>
      ));
    } else {
      // Start by looping over the orderedPosts
      let passingPosts = [];
      for (let post of orderedPosts) {
        // Loop over active filters I think to see if they are in the given post?
        // Will need a way to break out of this inner loop and add it to a collection of
        // posts that match the filters
        let passed = true;
        for (let activeFilter of activeFilters) {
          if (activeFilter[1] && !post.data.tags.includes(activeFilter[0])) {
            // should break inner loop and continue main loop I think
            passed = false;
            break;
          }
        }
        if (passed) {
          passingPosts.push(post);
        }
      }
      return passingPosts.map((p: any) => (
        <Link
          href={`./${type}/${p.slug}`}
          className="no-underline hover:underline"
          key={crypto.randomUUID()}
        >
          <li
            className="w-full mt-6 text-xl capitalize border-b pb-2 
                        dark:border-white border-solid border-black"
            key={p.slug}
          >
            {p.slug.replaceAll("-", " ")}
            <span className="pl-4 text-base">{p.data.posted}</span>
            <p className="font-thin text-base mb-0">
              Tags: {getUnique(p.data.tags.toString())}{" "}
            </p>
          </li>
        </Link>
      ));
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <div onClick={expandList} className="w-40 hover:cursor-pointer">
          <TagButton
            tag={expanded ? "Collapse filters" : "Filter by tags"}
            active={false}
          />
        </div>
        <div
          onClick={resetFilters}
          className={[
            "w-40 hover:cursor-pointer",
            expanded ? "" : "hidden",
          ].join(" ")}
        >
          <TagButton tag={expanded ? "Reset filters" : ""} active={false} />
        </div>
      </div>
      <ul
        className={[
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-56 p-0",
          expanded ? "" : "hidden",
        ].join(" ")}
      >
        {uniqueTags.map((tag) => (
          <li key={tag} className="list-none block p-0">
            <div
              onClick={(e: React.MouseEvent<HTMLElement>) => toggleFilter(e)}
              className="w-40"
            >
              <TagButton
                tag={tag}
                // need the or false bit in case .get returns undefined
                active={activeFilters.get(tag) || false}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="list-none w-4/5">{getFilteredPosts()}</ul>
    </div>
  );
}

function getUnique(stringTags: String) {
  let currTags = stringTags.split(",");
  let uniqueTags = [...new Set(currTags)].join(", ");
  return uniqueTags;
}
