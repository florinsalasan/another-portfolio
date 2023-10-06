import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Website name */}
        <h2>Florin / Salasan</h2>

        <p className="bg-red-500">Still under construction!</p>
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
