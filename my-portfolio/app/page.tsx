'use client'

import Link from "next/link";
import Image from "next/image";
import CNTowerSvg from "./components/CNTowerSvg";

export default function Page() {
  return (
    <div className="flex flex-row md:justify-between md:align-top relative">
        <div className="prose dark:prose-invert">
          <h1 className="">
            Hello there! <br className="sm:hidden" /> I&apos;m Florin.
          </h1>
          <div className="max-w-2xl">
            <p>
              A software developer based in the GTA, <br/>
              I am always looking for new opportunities to expand my skillset 
              and to work on new and interesting things.
            </p>
            <h3>Some background</h3>
            <p>
                I always loved tinkering with different tech from the moment I 
                first got my hands on a computer. I started off by following instructions
                on how to jailbreak my ipod touch and running somewhat suspicious scripts
                that I didn&apos;t understand at the time. After that I moved on to 
                learning how to install custom ROMs on my phone, managing to completely
                wipe the system until I discovered adb. Eventually I was introduced to 
                programming in high school and that is when I realized this is what I 
                was looking for, a way to creatively build things and to problem solve.
            </p>
            <div>
              <p>
                I went on to attend the{" "}
                <a href="https://utoronto.ca" target="_blank">University of Toronto</a>, where I
              </p>
              <ul>
                <li> Majored in Applied Statistics</li>
                <li> Minored in Computer Science</li>
              </ul>
            </div>
            <h3>What I&apos;m up to </h3>
            <p>
              My goals for the year include building some things that I would love
              to use as well as rebuild my reading habit. I&apos;m aiming for 52 books
              read by the end of the year, to go along with a reflection about each
              of them in my blog section.
            </p>
            <p>
              Whenever I&apos;m not working on something, I am either 
              looking up new recipes, new restaurants, burning off the calories from
              said recipes and restaurants, or obsessing over the latest
              news in the NBA and NHL. 
            </p>
          </div>
        </div>
        <CNTowerSvg />
  </div>
  );
} 
