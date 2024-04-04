import { Button } from "./ui/button";

function Categories() {
  const categoes = [
    {
      name: "Art",
      link: "#",
    },
    {
      name: "Design",
      link: "#",
    },
    {
      name: "Fashion",
      link: "#",
    },
    {
      name: "Film",
      link: "#",
    },
    {
      name: "Game",
      link: "#",
    },
    {
      name: "Music",
      link: "#",
    },
    {
      name: "Photography",
      link: "#",
    },
    {
      name: "Publishing",
      link: "#",
    },
    {
      name: "Technology",
      link: "#",
    },
  ];
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-row">
        {categoes.map((category) => (
          <Button variant={"ghost"} className="mr-2">
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
