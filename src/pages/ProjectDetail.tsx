import Loading from "@/components/Loading";
import MaxCard from "@/components/MaxCard";
import Maxwidth from "@/components/Maxwidth";
import PostCard from "@/components/PostCard";
import RewardCard from "@/components/Reward";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ReactPlayer from "react-player";

const FormSchema = z.object({
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

function ProjectDetail() {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["projectDetail"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:3000/api/projects/single?projectid=${id}&creatorid=${localStorage.getItem(
            "id"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((data) => data.data),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  });
  const makePayment = useMutation({
    mutationFn: (newTodo: any) => {
      return axios
        .post(`http://localhost:3000/api/pay`, newTodo, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => data.data);
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.href = data.paymentUrl;
    },
    onError: () => {
      toast("Error sending request");
    },
  });

  const onPay = (data: any) => {
    if (!localStorage.getItem("id")) {
      toast("please log in first");
      return;
    }
    const newdata = {
      projectid: id,
      payerid: localStorage.getItem("id"),
      amount: data.amount,
      message: data.description,
    };
    console.log(newdata);
    makePayment.mutate(newdata);
  };

  const addFavorite = useMutation({
    mutationFn: () => {
      return axios
        .post(
          `http://localhost:3000/api/addtofavourites`,
          {
            creatorid: localStorage.getItem("id"),
            projectid: id,
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
      queryClient.invalidateQueries({ queryKey: ["projectDetail"] });
      if (data.isalreadyAddedtofavourite) {
        toast.success("Removed from favorite succesfully");
      }
      if (!data.isalreadyAddedtofavourite) {
        toast.success("Added to favorite succesfully");
      }
    },
  });
  const addToFavorite = () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast("Please login first");
      return;
    }
    addFavorite.mutate();
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    <h1>there is error loading page</h1>;
  }

  return (
    <Maxwidth>
      <div className="flex items-center justify-center flex-col py-4">
        <h2 className="font-bold text-3xl py-3">{data?.project.title}</h2>
        <h3 className="font-semibold py-2"></h3>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 md:col-span-3 h-[400px] w-full border">
          <Carousel className="w-full overflow-hidden ">
            <CarouselContent>
              <CarouselItem>
                {data?.project.videoLink && (
                  <ReactPlayer
                    url="http://localhost:3000/videos/video_1714413137902.mp4"
                    crossOrigin="anonymous"
                    loop
                    controls
                    muted
                    playing={true}
                    width={"100%"}
                  />
                )}
              </CarouselItem>
              {Array.from({ length: data?.project.imagesLink.length }).map(
                (_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        alt=""
                        crossOrigin="anonymous"
                        src={`http://localhost:3000/api/projects/readimage?filename=${data.project?.imagesLink[index]}`}
                        className="h-[400px] w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
        <div className="col-span-5 md:col-span-2 h-auto w-full">
          {/* {JSON.stringify(detailstat.data)} */}
          <Progress
            value={Math.trunc(data?.project.percentfunded)}
            className=" rounded-[0] h-2"
          />
          <div className="my-3">
            <h1 className="text-3xl">{data?.project.amountReached}</h1>
            <p className="text-muted-foreground">total raised</p>
          </div>
          <div className="my-3">
            <h1 className="text-3xl">{data?.project.goal}</h1>
            <p className="text-muted-foreground">Target</p>
          </div>
          <div className="my-3">
            <h1 className="text-3xl">
              <Badge variant="outline">{data?.project.catagory[0]}</Badge>
              <Badge variant="outline">{data?.project.catagory[1]}</Badge>
              {/* # {data?.project.catagory[0]} #{data?.project.catagory[1  ]} */}
            </h1>
            <p className="text-muted-foreground pt-2">Category</p>
          </div>
          <div className="my-3">
            <h1 className="text-2xl">
              {data?.project.daysLeft > 0 ? data?.project.daysLeft : "Expired"}
            </h1>
            <p className="text-muted-foreground">Days remaining</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="w-full"
                disabled={data.isalreadyBacked || data.project.daysLeft < 0}
              >
                {data.isalreadyBacked || data.project.completed
                  ? "Already backed"
                  : "Back project"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Please fill the form to start payment</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onPay)}
                  className=" space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          {/* <Input
                            type="password"
                            placeholder="password"
                            {...field}
                          /> */}
                          <Textarea
                            placeholder="Write a biography about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    {makePayment.isPending && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Pay
                  </Button>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
          <Button
            className="w-full mt-4"
            variant={"outline"}
            onClick={() => addToFavorite()}
          >
            {data.isalreadyAddedtofavourite
              ? "Remove from Favorite"
              : "Add to Favorite"}
          </Button>
        </div>
      </div>

      {/* <video src="http://localhost:3000/videos/video_1714413137902.mp4"></video> */}

      <Tabs defaultValue="campaign" className="mt-5">
        <TabsList className="bg-background items-center w-full">
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
          <TabsTrigger value="reward">Reward</TabsTrigger>
          {/* <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger> */}
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
