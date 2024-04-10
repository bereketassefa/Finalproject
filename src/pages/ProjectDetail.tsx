import Loading from "@/components/Loading";
import MaxCard from "@/components/MaxCard";
import Maxwidth from "@/components/Maxwidth";
import PostCard from "@/components/PostCard";
import RewardCard from "@/components/Reward";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProjectDetail() {
  let { id } = useParams();

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["projectDetail"],
    queryFn: () =>
      axios
        .get(`http://localhost:3000/api/projects/single?projectid=${id}`)
        .then((data) => data.data),
  });
  const detailstat = useQuery<any>({
    queryKey: ["detailstat"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:3000/api/projects/singleprojectmetrics?projectid=${id}`
        )
        .then((data) => data.data),
  });
  if (isLoading || detailstat.isLoading) {
    return <Loading />;
  }
  if (isError || detailstat.isError) {
    <h1>there is error loading page</h1>;
  }

  return (
    <Maxwidth>
      <div className="flex items-center justify-center flex-col py-4">
        <h2 className="font-bold text-3xl py-3">{data?.project.title}</h2>
        <h3 className="font-semibold py-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
          dolore
        </h3>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 md:col-span-3 h-[400px] w-full border"></div>
        <div className="col-span-5 md:col-span-2 h-auto w-full">
          {JSON.stringify(detailstat.data)}
          <Progress
            value={(data?.project.goal / data?.project.amountReached) * 100}
            className=" rounded-[0] h-2"
          />
          <div className="my-3">
            <h1 className="text-3xl">{data?.project.amountReached}</h1>
            <p className="text-muted-foreground">total raised</p>
          </div>
          <div className="my-3">
            <h1 className="text-3xl">5 </h1>
            <p className="text-muted-foreground">Backers</p>
          </div>
          <div className="my-3">
            <h1 className="text-3xl">{data?.project.daysLeft}</h1>
            <p className="text-muted-foreground">Days remaining</p>
          </div>
          <Button className="w-full">Back project</Button>
          <Button className="w-full mt-4" variant={"outline"}>
            Add to Favorite
          </Button>
        </div>
      </div>
      <Tabs defaultValue="campaign" className="mt-5">
        <TabsList className="bg-background items-center w-full">
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
          <TabsTrigger value="reward">Reward</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="campaign">
          <div className="wmde-markdown-var"> </div>

          <MarkdownEditor.Markdown
            source={data?.project.descreptons}
            className="px-5 "
          />
        </TabsContent>
        <TabsContent value="reward">
          <MaxCard>
            <RewardCard reward={data?.project.reward} />
          </MaxCard>
        </TabsContent>
        <TabsContent value="faq">faq</TabsContent>
        <TabsContent value="updates">
          <PostCard updates={data?.project.updates} />
        </TabsContent>
      </Tabs>
    </Maxwidth>
  );
}

export default ProjectDetail;
