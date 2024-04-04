import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "./ui/card";
function CategoryReview() {
  return (
    <section className="text-gray-600 body-font">
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
            <p className="lg:pl-6 lg:w-1/3 mx-auto leading-relaxed text-base">
              Discover all top projects under art category
            </p>
          </div>
          <div className="w-full">
            <CarouselContent>
              {Array.from({ length: 7 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <Card className="p-1">
                    <article className="overflow-hidden rounded-lg shadow transition ">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        className="h-56 w-full object-cover"
                      />

                      <div className=" p-4 sm:p-6">
                        <time
                          dateTime="2022-10-10"
                          className="block text-xs text-gray-500"
                        >
                          {" "}
                          10th Oct 2022{" "}
                        </time>

                        <a href="#">
                          <h3 className="mt-0.5 text-lg ">
                            How to position your furniture for positivity
                          </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae dolores, possimus pariatur animi
                          temporibus nesciunt praesentium dolore sed nulla ipsum
                          eveniet corporis quidem, mollitia itaque minus soluta,
                          voluptates neque explicabo tempora nisi culpa eius
                          atque dignissimos. Molestias explicabo corporis
                          voluptatem?
                        </p>
                      </div>
                    </article>
                  </Card>
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
