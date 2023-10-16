import React from "react";
import Layout from "@/components/Layout";
// import Projects from "@/components/Projects";
import About from "@/components/About";
import Process from "@/components/Process";
import Hero from "@/components/Hero";
import "tailwindcss/tailwind.css";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      {/* <Projects /> */}
      <Process />
    </Layout>
  );
};

export default Home;
