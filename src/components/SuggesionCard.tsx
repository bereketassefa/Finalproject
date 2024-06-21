import { Link } from "react-router-dom";

function SuggesionCard({ data, className }: { data: any; className?: string }) {
  return (
    <Link to={`/project/${data._id}`}>
      <article
        className={
          "relative overflow-hidden rounded-lg shadow transition hover:shadow-lg " +
          className
        }
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          alt=""
          crossOrigin="anonymous"
          src={`http://localhost:3000/api/projects/readimage?filename=${data.imagesLink[0]}`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative bg-gradient-to-t from-black to-black/42 pt-32 sm:pt-32 lg:pt-32">
          <div className="p-4 sm:p-6">
            <time dateTime="2022-10-10" className="block text-xs text-white/90">
              {/* {Math.trunc((data.goal / data.amountReached) * 100)}% Funded */}
              {Math.trunc(data.percentfunded)}% Funded
            </time>

            <a href="#">
              <h3 className="mt-0.5 text-lg text-white">{data.title}</h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
              {data.descreptons}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default SuggesionCard;
