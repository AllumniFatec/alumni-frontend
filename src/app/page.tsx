import Header from "@/components/Home/Header";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Benefits from "@/components/Home/Benefits";
import Companies from "@/components/Home/Companies";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <Hero />
      <About />
      <Benefits />
      <Companies />
    </div>
  );
}
