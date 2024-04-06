import Card from "./Card";
import Maxwidth from "./Maxwidth";
import SuggesionCard from "./SuggesionCard";

function Recommended() {
  return (
    <Maxwidth>
      <div className="grid grid-cols-1 md:grid-cols-2  mt-16 gap-5 ">
        <div className=" w-full">
          Featured
          <article className="overflow-hidden rounded-lg border border-border pt-4 shadow-sm">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-96 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
              <a href="#">
                <h3 className="text-lg font-medium ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae dolores, possimus pariatur animi temporibus nesciunt
                praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora
                nisi culpa eius atque dignissimos. Molestias explicabo corporis
                voluptatem?
              </p>

              <a
                href="#"
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
              >
                Find out more
                <span
                  aria-hidden="true"
                  className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                >
                  &rarr;
                </span>
              </a>
            </div>
          </article>
        </div>
        <div className="">
          Recommended
          <div className="grid  md:grid-cols-2 gap-3 pt-2">
            <SuggesionCard className="w-full" />
            <SuggesionCard className="w-full" />
            <SuggesionCard className="w-full" />
            <SuggesionCard className="w-full" />
          </div>
        </div>
      </div>
    </Maxwidth>
  );
}

export default Recommended;
