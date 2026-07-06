import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Bento from "@/components/sections/Bento";
import ExtraProjects from "@/components/sections/ExtraProjects";
import Journals from "@/components/sections/Journals";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <ExtraProjects />
      <Journals />
      <Bento />
    </>
  );
}
