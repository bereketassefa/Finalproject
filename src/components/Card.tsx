import { Link } from "react-router-dom";

function Card({ data, className }: { data: any; className?: string }) {
  return (
    <Link to={`/project/${data._id}`}>
      <div className={"p-1 " + className}>
        <article className="overflow-hidden rounded-lg shadow transition ">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-44 w-full object-cover"
          />

          <div className=" p-4 sm:p-6">
            <p className="block text-xs text-muted-foreground">
              {(data.goal / data.amountReached) * 100}% Funded
            </p>

            <a href="#">
              <h3 className="mt-0.5 text-lg ">{data.title}</h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
              {data.descreptons}
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}

export default Card;
