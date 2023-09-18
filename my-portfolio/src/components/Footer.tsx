// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        {/* Footer content here */}
        <p>&copy; {new Date().getFullYear()} Your Website</p>
      </div>
    </footer>
  );
};

export default Footer;
