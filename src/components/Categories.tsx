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
    <div className="flex w-full items-center justify-center flex-wrap">
      <div className="flex flex-row flex-wrap items-center justify-center">
        {categoes.map((category) => (
          <Button variant={"ghost"} key={category.name} className="mr-2">
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
