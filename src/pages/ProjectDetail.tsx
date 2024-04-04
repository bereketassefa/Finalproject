import Maxwidth from "@/components/Maxwidth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

function ProjectDetail() {
  return (
    <Maxwidth>
      <div className="flex items-center justify-center flex-col py-4">
        <h2 className="font-bold text-3xl py-3">project name</h2>
        <h3 className="font-semibold py-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
          dolore
        </h3>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 h-[400px] w-full border"></div>
        <div className="col-span-2 h-auto w-full">
          <Progress value={80} className=" rounded-[0] h-2" />
          <div className="my-3">
            <h1 className="text-3xl">$300</h1>
            <p className="text-muted-foreground">total raised</p>
          </div>
          <div className="my-3">
            <h1 className="text-3xl">5 </h1>
            <p className="text-muted-foreground">Backers</p>
          </div>
          <div className="my-3">
            <h1 className="text-3xl">20 </h1>
            <p className="text-muted-foreground">Days remaining</p>
          </div>
          <Button className="w-full">Back project</Button>
        </div>
      </div>
    </Maxwidth>
  );
}

export default ProjectDetail;
