import Maxwidth from "@/components/Maxwidth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxCard from "@/components/MaxCard";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import categories from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewProject() {
  const [imageFiles, setImageFiles] = useState();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    category: z
      .string({
        required_error: "Please select a category",
      })
      .min(1, { message: "category is required" }),
    secondcategory: z
      .string({
        required_error: "Please select a category",
      })
      .min(1, { message: "category is required" }),
    descriptions: z.string().min(1, { message: "category is required" }),
    image: z.any(),
    // .refine((files) => {
    //   console.log(files?.[0]?.type);
    //   return files?.length == 1;
    // }, "Image is required.")
    // .refine((files) => files?.[0]?.size <= 2048576, `Max file size is 20MB.`)
    // .refine(
    //   (files) => ["jpg", "png"].includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // )
    // .optional(),
    video: z.any().optional(),
    goal: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
    deadline: z.date({
      required_error: "Please enter ending date of the project",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "final project",
      category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      return axios.post("http://localhost:3000/api/projects", formData, config);
    },

    onError: (error: any) => {
      console.error(error);
      toast("There is a trouble creating a project");
    },
    onSuccess: () => {
      toast("You have succesfully created a project");
      navigate(`/profile/${localStorage.getItem("id")}`);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleUpload(values)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImageFiles(data.filenames);
        console.log(imageFiles);
        const project = {
          title: values.name,
          descreptons: values.descriptions,
          catagory: [values.category, values.secondcategory],
          goal: values.goal,
          deadline: values.deadline,
          imagesLink: data.filenames,
          // imagesLink: ["coverimage_1712652282051.png"],
          creator: {
            username: localStorage.getItem("name"),
            userid: localStorage.getItem("id"),
          },
        };
        mutation.mutate(project);
      })
      .catch((err) => {
        console.log(err);
        toast("there is an error saving the pictures");
      });
  }
  const handleUpload = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const formData = new FormData();

    formData.append("coverimage", data.image);
    // data = { ...data, image: data.image[0].name };
    formData.append("recipe", data.image.name);

    return fetch("http://localhost:3000/api/projects/uploadimages", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  return (
    <Maxwidth>
      <Tabs defaultValue="basic" className=" mt-7">
        <Separator className="mb-2 mt-1" />
        <Form {...form}>
          <MaxCard>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the project</FormLabel>
                    <FormControl>
                      <Input placeholder="project name" {...field} />
                    </FormControl>
                    <FormDescription>project name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((categorie) => (
                          <SelectItem value={categorie.value}>
                            {categorie.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose another category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a second category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((categorie) => (
                          <SelectItem value={categorie.value}>
                            {categorie.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description of the project</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a description of your project"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a description for your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                rules={{ required: "Recipe picture is required" }}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Upload image</FormLabel>
                    <FormControl>
                      <Input
                        multiple
                        type="file"
                        placeholder="upload profile for your project"
                        value={value?.fileName}
                        onChange={(event: any) => {
                          onChange(event.target.files[0]);
                        }}
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Video(optional)</FormLabel>
                    <FormControl>
                      <Input
                        multiple
                        type="file"
                        placeholder="upload profile for your project"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Input
                        multiple
                        type="number"
                        placeholder="Enter your financial goal"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Campaign ending</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the campaign ending
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </MaxCard>
        </Form>
      </Tabs>
    </Maxwidth>
  );
}

export default NewProject;
