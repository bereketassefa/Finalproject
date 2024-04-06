import Maxwidth from "@/components/Maxwidth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const tabs = [
  { name: "About", href: "/profile/about", count: "2", current: false },
  { name: "Backed", href: "/profile/backed", count: "4", current: false },
  { name: "Created", href: "/profile/", count: "6", current: true },
  { name: "Favorite", href: "/profile/favorite", current: false },
];
const candidates = [
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
];
const publishingOptions = [
  {
    name: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const [selected, setSelected] = useState(publishingOptions[0]);

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
                  Bereket Assefa
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                  <div className="mt-2 flex items-center text-sm text-muted-foreground  ">
                    <BriefcaseIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Backer and Creater
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground  ">
                    <BriefcaseIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Remote
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground  ">
                    <CurrencyDollarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    $120k &ndash; $140k
                  </div>
                </div>
              </div>
              <div className="mt-5 flex xl:mt-0 xl:ml-4">
                <span className="">
                  <Button>Follow</Button>
                </span>
              </div>
            </div>
          </header>

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
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-muted-foreground  ",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            );
                          }}
                        >
                          {tab.name}
                          {tab.count ? (
                            <Badge className="ml-2">{tab.count}</Badge>
                          ) : null}
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
