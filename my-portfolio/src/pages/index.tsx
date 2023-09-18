import React from "react";
import Layout from "@/components/Layout";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import "tailwindcss/tailwind.css";

const Home: React.FC = () => {
  return (
    <Layout>
      <div>
        <Hero />
        {/* <h1>Welcome to Your Website</h1> */}
        <Projects />
      </div>

      {/* Add your page content here */}
    </Layout>
  );
};

export default Home;
