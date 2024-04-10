import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

type Project = {
  _id: string;
  title: string;
  descreptons: string;
  catagory: string[];
  goal: number;
  imagesLink: string[];
  creator: {
    username: string;
    userid: string;
  };
  amountReached: number;
  __v: number;
  percentfunded: number;
  daysLeft: number;
};

type ProjectsResponse = {
  projects: Project[];
};

function CategoryReview() {
  const { data, isLoading } = useQuery<ProjectsResponse>({
    queryKey: ["recommended"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/projects").then((data) => data.data),
  });
  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <section className=" body-font">
      <div className="container px-5 py-10 mx-auto flex flex-wrap">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <div className="flex w-full mb-10 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  lg:w-1/3 lg:mb-0 mb-2">
              Discover
            </h1>
            <p className="lg:pl-6 lg:w-1/3 mx-auto leading-relaxed text-base text-muted-foreground">
              Discover all top projects under art category
            </p>
          </div>
          <div className="w-full">
            <CarouselContent>
              {/* {JSON.stringify(data)} */}
              {data.projects.map((each, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <Card data={each} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default CategoryReview;
