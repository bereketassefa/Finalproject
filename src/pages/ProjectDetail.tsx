import MaxCard from "@/components/MaxCard";
import Maxwidth from "@/components/Maxwidth";
import PostCard from "@/components/PostCard";
import RewardCard from "@/components/Reward";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownEditor from "@uiw/react-markdown-editor";

function ProjectDetail() {
  const mdStr = `
  ---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules
  `;

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
        <div className="col-span-5 md:col-span-3 h-[400px] w-full border"></div>
        <div className="col-span-5 md:col-span-2 h-auto w-full">
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
      <Tabs defaultValue="campaign" className="mt-5">
        <TabsList className="bg-background items-center w-full">
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
          <TabsTrigger value="reward">Reward</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="campaign">
          <div className="wmde-markdown-var"> </div>

          <MarkdownEditor.Markdown source={mdStr} className="px-5 " />
        </TabsContent>
        <TabsContent value="reward">
          <MaxCard>
            <RewardCard />
          </MaxCard>
        </TabsContent>
        <TabsContent value="faq">faq</TabsContent>
        <TabsContent value="updates">
          <PostCard />
        </TabsContent>
      </Tabs>
    </Maxwidth>
  );
}

export default ProjectDetail;
