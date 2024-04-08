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

function NewProject() {
  const [imageFiles, setImageFiles] = useState();
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
    description: z.string().min(1, { message: "category is required" }),
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
      name: "",
      category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      const data = new FormData();
      data.append("coverimagee", formData.file);
      // Replace with your actual endpoint URL
      return fetch(
        "https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/projects/uploadimages",
        {
          method: "POST",
          body: data,
        }
      );
    },

    onError: (error: any) => {
      console.error(error);
      toast("There is a trouble creating a project");
    },
    onSuccess: () => {
      toast("You have succesfully created a project");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleUpload(values)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImageFiles(data.filenames);
        const project = {
          title: values.name,
          description: values.description,
          category: [values.category, values.secondcategory],
          goal: values.goal,
          deadline: values.deadline,
          coverimage: imageFiles,
        };
        mutation.mutate(values);
      })
      .catch((err) => {
        toast("there is an error saving the pictures");
      });
  }
  const handleUpload = (formData, uploadType = "coverimageee") => {
    const data = new FormData();
    data.append(uploadType, formData.image);
    return fetch(
      "https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/projects/uploadimages",
      {
        method: "POST",
        body: data,
      }
    );
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                          <SelectValue placeholder="Select a verified email to display" />
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
                          <SelectValue placeholder="Select a verified email to display" />
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
                name="description"
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
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload image</FormLabel>
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
                    <FormLabel>Date of birth</FormLabel>
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
                      Your date of birth is used to calculate your age.
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
