import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "./Card";

function CategoryReview() {
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
              {Array.from({ length: 7 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <Card />
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
