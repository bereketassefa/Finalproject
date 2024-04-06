import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu, Package2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Maxwidth from "./Maxwidth";

function Header() {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Dashboard",
      link: "/dash",
    },
    {
      name: "Profile",
      link: "/profile",
    },
    {
      name: "Trial",
      link: "/trial",
    },
    {
      name: "Search",
      link: "/search",
    },
    {
      name: "Project",
      link: "/project",
    },
  ];
  return (
    <header className="">
      <Maxwidth>
        <div className=" ">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {links.map((each, index) => {
                    return (
                      <li key={index}>
                        <Button variant={"ghost"}>
                          <Link to={each.link}>{each.name}</Link>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <ModeToggle />
                <Button variant={"outline"} asChild>
                  <Link to="/new">Start a project</Link>
                </Button>

                <div className="hidden sm:flex">
                  <Button asChild>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                </div>
              </div>

              <div className="block md:hidden">
                {/* <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
               
              </button> */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant={"ghost"}>
                      <Menu color="#fff" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      {/* <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription> */}
                    </SheetHeader>
                    <nav aria-label="Global">
                      <ul className="flex flex-col items-center gap-6 text-sm">
                        {links.map((each, index) => {
                          return (
                            <li>
                              <Button variant={"ghost"} key={index}>
                                <Link to={each.link}>{each.name}</Link>
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                    <SheetFooter>
                      <SheetClose asChild></SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </Maxwidth>
    </header>
  );
}

export default Header;
