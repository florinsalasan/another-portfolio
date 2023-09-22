import React from "react";
import Layout from "@/components/Layout";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Process from "@/components/Process";
import Hero from "@/components/Hero";
import "tailwindcss/tailwind.css";

const Home: React.FC = () => {
  return (
    <Layout>
      <div>
        <Hero />
        {/* <h1>Welcome to Your Website</h1> */}
        <About />
        <Projects />
        <Process />
      </div>

      {/* Add your page content here */}
    </Layout>
  );
};

export default Home;
