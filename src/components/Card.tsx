function Card({ className }: { className?: string }) {
  return (
    <div className={"p-1 " + className}>
      <article className="overflow-hidden rounded-lg shadow transition ">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="h-44 w-full object-cover"
        />

        <div className=" p-4 sm:p-6">
          <time
            dateTime="2022-10-10"
            className="block text-xs text-muted-foreground"
          >
            {" "}
            10th Oct 2022{" "}
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg ">
              How to position your furniture for positivity
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
            dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque
            minus soluta, voluptates neque explicabo tempora nisi culpa eius
            atque dignissimos. Molestias explicabo corporis voluptatem?
          </p>
        </div>
      </article>
    </div>
  );
}

export default Card;
