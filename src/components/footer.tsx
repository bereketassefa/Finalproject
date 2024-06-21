import { HandCoins } from "lucide-react";
import { Separator } from "./ui/separator";
import categories from "@/lib/data";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="">
      <Separator />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-primary">
          <HandCoins className="h-6 w-6" />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-muted-foreground">
          Empower creators, unite backers, fuel innovation, democratize funding,
          celebrate dreams.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {categories.map((each, index) => {
            return (
              <Link to={each.link} key={index}>
                <li>
                  <a className="text-muted-foreground transition " href="#">
                    {each.name}
                  </a>
                </li>
              </Link>
            );
          })}
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8 text-muted-foreground">
          &copy; copyright protected
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
