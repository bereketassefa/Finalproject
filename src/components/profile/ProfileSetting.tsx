import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

export default function ProfileSetting() {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const FormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "username must be at least 2 characters.",
      })
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(2, {
        message: "password must be at least 2 characters.",
      })
      .optional()
      .or(z.literal("")),
    bio: z
      .string()
      .min(2, {
        message: "password must be at least 2 characters.",
      })
      .optional()
      .or(z.literal("")),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newTodo: z.infer<typeof FormSchema>) => {
      return axios.patch(
        "http://localhost:3000/api/creator/updateaccount",
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      toast("You have successfully updated your profile");

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      form.reset();
    },
    onError: () => {
      // toast("Error sending request");
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    let newdata: any = {};
    if (data.username != "") {
      newdata.username = data.username;
    }
    if (data.password != "") {
      newdata.password = data.password;
    }
    if (data.bio != "") {
      newdata.about = data.bio;
    }
    if (Object.keys(newdata).length === 0) {
      toast("Nothing to update");
    }
    // console.log(newdata);
    mutation.mutate(newdata);
  };
  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>Update profile</CardTitle>
        <CardDescription>Update your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a biography about yourself"
                      className="resize-none"
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
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}{" "}
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
