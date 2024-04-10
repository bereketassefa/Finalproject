import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Maxwidth from "./Maxwidth";
import SuggesionCard from "./SuggesionCard";

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

function Recommended() {
  const { data, isLoading } = useQuery<ProjectsResponse>({
    queryKey: ["featured"],
    queryFn: () =>
      axios
        .get("http://localhost:3000/api/projects/recomended", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => data.data),
  });
  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <Maxwidth>
      <div className="grid grid-cols-1 md:grid-cols-2  mt-16 gap-5 ">
        <div className=" w-full">
          Featured
          <Link to={`/project/${data.projects[0]._id}`}>
            <article className="overflow-hidden rounded-lg border border-border pt-4 shadow-sm">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-96 w-full object-cover"
              />

              <div className="p-4 sm:p-6">
                <a href="#">
                  <h3 className="text-lg font-medium ">
                    {/* {(data.projects[0].goal / data.projects[0].amountReached) *
                      100} */}
                    {data.projects[0].title}
                  </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
                  {data.projects[0].descreptons}
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
          </Link>
        </div>
        <div className="">
          Recommended
          <div className="grid  md:grid-cols-2 gap-3 pt-2">
            {data.projects.map((each, index) => {
              if (index === 0) return;
              return <SuggesionCard data={each} />;
            })}
            {/* <SuggesionCard className="w-full" />
            <SuggesionCard className="w-full" />
            <SuggesionCard className="w-full" />
            <SuggesionCard className="w-full" /> */}
          </div>
        </div>
      </div>
    </Maxwidth>
  );
}

export default Recommended;
