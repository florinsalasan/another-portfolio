// import React from "react";
// import Link from "next/link";

// const Header: React.FC = () => {
//   return (
//     <header className="bg-blue-500 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Left side: Website name */}
//         <h2>Florin / Salasan</h2>

//         <p className="bg-red-500">Still under construction!</p>
//         {/* Right side: Navigation links */}
//         <nav>
//           <ul className="flex space-x-4">
//             <li>
//               <Link href="/page1">
//                 <div className="text-white hover:underline">About</div>
//               </Link>
//             </li>
//             <li>
//               <Link href="/page2">
//                 <div className="text-white hover:underline">Projects</div>
//               </Link>
//             </li>
//             <li>
//               <Link href="/page3">
//                 <div className="text-white hover:underline">Contact</div>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css"; // Make sure to import your CSS module

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  function scrollToSection(id: string) {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }

    event?.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setIsSticky(heroRect.bottom <= 64);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="top" className={`${styles.stickyPlaceholder}`}>
      <header
        className={`bg-blue-500 text-white p-4 h-[64px] ${
          isSticky ? styles.stickyCustom : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Website name */}
          <a href="#" onClick={() => scrollToSection("top")}>
            <h2>Florin / Salasan</h2>
          </a>

          {/* Right side: Mobile menu icon */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="block text-2xl text-white focus:outline-none"
            >
              &#8801; {/* This is the hamburger icon */}
            </button>
          </div>

          {/* Right side: Navigation links for desktop */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-4">
              <li>
                <a href="#" onClick={() => scrollToSection("about")}>
                  About
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("projects")}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("process")}>
                  Process
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div
            className={` ${
              mobileMenuOpen
                ? `${styles.mobileMenu} ${styles.open}`
                : styles.mobileMenu
            }`}
          >
            <button
              onClick={closeMobileMenu}
              className="block text-2xl text-white absolute top-4 right-4 focus:outline-none"
            >
              &times; {/* This is the close icon */}
            </button>
            <ul className="pt-16 pb-8 text-2xl text-center">
              <li>
                <a href="#" onClick={() => scrollToSection("about")}>
                  About
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("projects")}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#" onClick={() => scrollToSection("process")}>
                  Process
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
