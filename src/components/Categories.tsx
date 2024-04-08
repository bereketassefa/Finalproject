import { Button } from "./ui/button";
import categories from "@/lib/data";

function Categories() {
  return (
    <div className="flex w-full items-center justify-center flex-wrap">
      <div className="flex flex-row flex-wrap items-center justify-center">
        {categories.map((category) => (
          <Button variant={"ghost"} key={category.name} className="mr-2">
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
