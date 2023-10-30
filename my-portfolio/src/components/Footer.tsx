// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        {/* Footer content here */}
        <p>&copy; {new Date().getFullYear()} Florin Salasan</p>
        <a target="_blank" href="https://icons8.com/icon/12580/email">
          Email
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </footer>
  );
};

export default Footer;
