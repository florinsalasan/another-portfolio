import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4 hidden">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Website name */}
        <h1>Florin / Salasan</h1>

        {/* Right side: Navigation links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/page1">
                <div className="text-white hover:underline">About</div>
              </Link>
            </li>
            <li>
              <Link href="/page2">
                <div className="text-white hover:underline">Projects</div>
              </Link>
            </li>
            <li>
              <Link href="/page3">
                <div className="text-white hover:underline">Contact</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
