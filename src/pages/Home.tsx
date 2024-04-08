import CTA from "@/components/CTA";
import Categories from "@/components/Categories";
import CategoryReview from "@/components/CategoryReview";
import Recommended from "@/components/Recommended";
import Hero from "@/components/hero";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <div>
      <Categories />
      <Separator className="my-3" />
      <Hero />
      <Recommended />
      <CategoryReview />
      {!localStorage.getItem("token") && <CTA />}
      {/* <CTA /> */}
    </div>
  );
};

export default Home;
