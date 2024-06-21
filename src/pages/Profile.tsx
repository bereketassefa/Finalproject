import Loading from "@/components/Loading";
import Maxwidth from "@/components/Maxwidth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HashIcon, Loader } from "lucide-react";
import { useEffect } from "react";

import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type profileSchema = {
  _id: string;
  username: string;
  visibility: string;
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

  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("what is up");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  }, [useLocation().pathname]);

  const { data, isLoading } = useQuery<{
    creator: profileSchema;
    isalreadyFollowedCreator: boolean;
  } | null>({
    queryKey: ["profile"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:3000/api/creator/?creatorid=${id}&followerid=${localStorage.getItem(
            "id"
          )}`
        )
        .then((data) => data.data),
  });
  const sendFollow = useMutation({
    mutationFn: () => {
      return axios
        .post(
          `http://localhost:3000/api/follow`,
          {
            followerid: localStorage.getItem("id"),
            followedid: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((data) => data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (data?.isalreadyFollowedCreator) {
        toast.success("You have succesfully unfollowed the creator");
      }
      if (!data?.isalreadyFollowedCreator) {
        toast.success("You have succesfully followed the creator");
      }
    },
  });

  const changeVisibiltiy = useMutation({
    mutationFn: () => {
      return axios
        .patch(
          `http://localhost:3000/api/creator/visibility`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((data) => data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (data?.creator.visibility == "private") {
        toast.success("You profile is now public");
      }
      if (!(data?.creator.visibility == "private")) {
        toast.success("Your profile is private now ");
      }
    },
  });

  const followUser = () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast("Please login first");
      return;
    }
    sendFollow.mutate();
  };
  if (isLoading) {
    return <Loading />;
  }

  const tabs = [
    { name: "Created", href: `/profile/${id}`, current: true },
    { name: "Backed", href: `/profile/${id}/backed`, current: false },
    { name: "Favorite", href: `/profile/${id}/favorite`, current: false },
    // { name: "Followers", href: `/profile/${id}/follower`, current: false },
    // { name: "Following", href: `/profile/${id}/following`, current: false },
    { name: "Setting", href: `/profile/${id}/setting`, current: false },
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
              {localStorage.getItem("id") == id && (
                <div className="flex items-center space-x-2 pt-4 lg:pt-0">
                  <Switch
                    id="airplane-mode"
                    checked={
                      data?.creator?.visibility == "public" ? true : false
                    }
                    onCheckedChange={() => {
                      changeVisibiltiy.mutate();
                    }}
                  />
                  <Label htmlFor="airplane-mode">visibility</Label>
                </div>
              )}
              <div className="mt-5 flex xl:mt-0 xl:ml-4">
                {localStorage.getItem("id") == id ? (
                  ""
                ) : (
                  <span className="">
                    <Button onClick={() => followUser()}>
                      {sendFollow.isPending && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {data?.isalreadyFollowedCreator ? "Unfollow" : "Follow"}
                    </Button>
                  </span>
                )}
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
                      {tabs.map((tab) => {
                        if (
                          (tab.name == "Setting" &&
                            id !== localStorage.getItem("id")) ||
                          localStorage.getItem("id") == null
                        ) {
                          return "";
                        }
                        return (
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
                          </NavLink>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </div>
              {/* {JSON.stringify(data?.creator.visibility)} */}
              {data?.creator?.visibility == "public" ? (
                <Outlet />
              ) : localStorage.getItem("id") == id ? (
                <Outlet />
              ) : (
                <div>User profile is private</div>
              )}
            </div>
          </main>
        </Maxwidth>
      </div>
    </>
  );
}
