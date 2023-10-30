import React from "react";
import Layout from "@/components/Layout";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Process from "@/components/Process";
import Hero from "@/components/Hero";
import "tailwindcss/tailwind.css";
import CallToAction from "@/components/CallToAction";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Process />
      <CallToAction />
    </Layout>
  );
};

export default Home;
