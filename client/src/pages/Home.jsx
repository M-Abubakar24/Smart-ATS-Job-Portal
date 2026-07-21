import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedJobs from "../components/FeaturedJobs";
import Features from "../components/Features";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedJobs />
      <Features />
        <Footer />
    </>
  );
};

export default Home;