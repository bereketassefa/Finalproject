import Loading from "@/components/Loading";
import Maxwidth from "@/components/Maxwidth";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashIcon } from "lucide-react";

import { NavLink, Outlet, useParams } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type profileSchema = {
  _id: string;
  username: string;
  about: string;
  myproject: {
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
    deadline: string; // This could be converted to a Date object if needed
    __v: number;
  }[];
  favourites: string[];
  interest: string[];
  __v: number;
};

export default function Profile() {
  let { id } = useParams();

  const { data, isLoading } = useQuery<{ creator: profileSchema } | null>({
    queryKey: ["profile"],
    queryFn: () =>
      axios
        .get(
          `https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/creator/?creatorid=${id}`
        )
        .then((data) => data.data),
  });
  if (isLoading) {
    return <Loading />;
  }

  const tabs = [
    { name: "Created", href: `/profile/${id}/`, current: true },
    { name: "Backed", href: `/profile/${id}/backed`, current: false },
    { name: "Favorite", href: `/profile/${id}/favorite`, current: false },
  ];
  return (
    <>
      <div className="min-h-full">
        <Maxwidth>
          <header className=" py-8">
            <div className="  xl:flex xl:items-center xl:justify-between">
              <div className="flex-1 min-w-0">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol role="list" className="flex items-center space-x-4">
                    <li>
                      <div>
                        <a
                          href="#"
                          className="text-sm font-medium text-muted-foreground   hover:text-gray-700"
                        >
                          Profile
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <a
                          href="#"
                          className="ml-4 text-sm font-medium text-muted-foreground  hover:text-gray-700"
                        >
                          Detail
                        </a>
                      </div>
                    </li>
                  </ol>
                </nav>
                <h1 className="mt-2 text-2xl font-bold leading-7  sm:text-3xl sm:truncate">
                  {data?.creator?.username}
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                  {data?.creator?.interest.map((each) => {
                    return (
                      <div className="mt-2 flex items-center text-sm text-muted-foreground  ">
                        <HashIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {each}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5 flex xl:mt-0 xl:ml-4">
                <span className="">
                  <Button>Follow</Button>
                </span>
              </div>
            </div>
          </header>
          <div>{data?.creator?.about}</div>

          <main className="pt-8 pb-16">
            <div className="">
              <div className="px-4 sm:px-0 mb-4">
                <div className="">
                  <div className="border-b border-border">
                    <nav
                      className="mt-2 -mb-px flex space-x-8"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab) => (
                        <NavLink
                          end
                          key={tab.name}
                          to={tab.href}
                          className={(isActive) => {
                            return classNames(
                              isActive.isActive
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground  ",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            );
                          }}
                        >
                          {tab.name}
                          {/* {tab.count ? (
                            <Badge className="ml-2">{tab.count}</Badge>
                          ) : null} */}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </main>
        </Maxwidth>
      </div>
    </>
  );
}
