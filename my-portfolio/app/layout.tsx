import "./globals.css";
import clsx from "clsx";
import { DM_Sans } from "next/font/google";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import { Github, LinkedinIcon, MailIcon } from "lucide-react";
import ToTopBtn from "./components/toTopBtn";
import CNTowerSvg from "./components/CNTowerSvg";

export const metadata = {
  title: "Florin / Salasan",
  description: "My portfolio / blog, hope you can find something that interests you in here"
};

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx("dark h-full", sans.variable)}>
      <body className="mx-auto h-full max-w-7xl px-4 pt-10 bg-neutral-50 text-gray-900 transition-colors dark:bg-neutral-800 sm:px-6 lg:px-8">
        <div className="flex min-h-full flex-col pb-20">
          <div className="flex items-center justify-between pb-8">
            <div className="flex items-center gap-10">
              <Link
                className="text-lg font-medium hover:underline dark:text-white"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-lg font-medium hover:underline dark:text-white"
                href="/projects"
              >
                Projects
              </Link>
              <Link
                className="text-lg font-medium hover:underline dark:text-white"
                href="/blog"
              >
                Blog
              </Link>
            </div>
            <ToggleTheme />
          </div>
          <div className="bg-red-600 text-white text-center">Still working on the site, some things may be broken</div>
          <div className="animate-slideUp transition-opacity flex flex-row md:justify-between md:align-top relative">
              {children}
              <CNTowerSvg />
              <ToTopBtn />
          </div>
          <div className="flex-col prose mt-auto flex justify-between gap-8 
                        pt-8 dark:prose-invert prose-h3:mt-0 md:flex-row 
                        max-w-lg">
            <div>
              <h3 className="">Contact me</h3>
              <div className="flex gap-3 pt-1">
                <a
                  aria-label="Link to my email"
                  className="transition-all hover:text-blue-800 dark:hover:text-orange-500"
                  href="mailto:me@florinsalasan.dev"
                >
                  <MailIcon />
                </a>
                <a
                  aria-label="Link to my github"
                  className="transition-all hover:text-blue-800 dark:hover:text-orange-500"
                  href="https://github.com/florinsalasan"
                >
                  <Github />
                </a>
                <a
                  aria-label="Link to my linkedin"
                  className="transition-all hover:text-blue-800 dark:hover:text-orange-500"
                  href="https://www.linkedin.com/in/florinsalasan/"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>
            <div className="">
              <a 
                aria-label="Link to designer's webpage"
                className="transition-all hover:text-blue-800 dark:hover:text-orange-500"
                href="https://imjosh.dev" target="_blank"
              >
                Design by @im.josh
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
