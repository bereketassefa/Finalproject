import { Link } from "react-router-dom";

function ProfileCard({ data, className }: { data: any; className?: string }) {
  return (
    <Link to={`/dash/${data?._id}`}>
      <div className={"p-1 " + className}>
        <article className="overflow-hidden rounded-lg shadow transition ">
          <img
            alt=""
            crossOrigin="anonymous"
            src={`http://localhost:3000/api/projects/readimage?filename=${data?.imagesLink[0]}`}
            className="h-44 w-full object-cover"
          />

          <div className=" p-4 sm:p-6">
            <p className="block text-xs text-muted-foreground">
              {/* {Math.trunc((data?.goal / data.amountReached) * 100)}% Funded */}
              {Math.trunc(data?.percentfunded)}% Funded
            </p>

            <a>
              <h3 className="mt-0.5 text-lg ">{data?.title}</h3>
            </a>
            <Link to={`/profile/${data?.creator?.userid}`}>
              <h3 className="mt-0.5 text-sm ">{data?.creator?.username}</h3>
            </Link>
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
              {data?.descreptons}
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}

export default ProfileCard;
