import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, HandCoins, Menu, Package2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Maxwidth from "./Maxwidth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

function Header() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));
  // let isLogged = localStorage.getItem("token");
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
      link: "/profile/66150dffbadbcfe68b11d2db",
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
      link: "/project/66123bb07c600676ffb1bd15",
    },
  ];
  const navigate = useNavigate();
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
                {/* <Package2 className="h-6 w-6" /> */}
                <HandCoins className="h-6 w-6" />
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
                  {isLogged ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full"
                        >
                          <CircleUser className="h-5 w-5" />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            let id = localStorage.getItem("id");
                            navigate(`/profile/${id}`);
                          }}
                        >
                          profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("id");
                            setIsLogged("");
                          }}
                        >
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button asChild>
                      <Link to={"/login"}>Login</Link>
                    </Button>
                  )}
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
