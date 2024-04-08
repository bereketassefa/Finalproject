import { Button } from "@/components/ui/button";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
  interest: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
});

export function Signup() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newTodo: z.infer<typeof FormSchema>) => {
      return axios.post(
        "https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/creator",
        newTodo
      );
    },
    onSuccess: () => {
      toast("You have successfully signed up");
      navigate("/login");
    },
    onError: () => {
      toast("Error sending request");
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    mutation.mutate(data);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="w-full lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and username below to signup
            </p>
          </div>
          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Signup
            </Button>
          </div> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
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
                name={"interest"}
                render={({ field }) => (
                  <FormItem className="m-1">
                    <FormLabel>Interest</FormLabel>
                    <FormControl>
                      <ReactSelect
                        {...field}
                        name={"interest"}
                        isMulti={true}
                        unstyled={true}
                        isSearchable={true}
                        hideSelectedOptions={true}
                        classNames={{
                          control: (e) =>
                            cn(
                              `rounded-md border`,
                              `border-input px-3 py-1 text-sm`,
                              e.isFocused ? "ring-1 ring-ring" : ""
                            ),
                          indicatorSeparator: () => "bg-gray-100 mx-2",
                          dropdownIndicator: () => "text-gray-400",
                          menu: () =>
                            cn(
                              "absolute top-0 mt-1 text-sm z-10 w-full",
                              "rounded-md border bg-popover shadow-md overflow-x-hidden"
                            ),
                          option: () =>
                            cn(
                              "cursor-default",
                              "rounded-sm py-1.5 m-1 px-2 text-sm outline-none",
                              "focus:bg-gray-200 hover:bg-gray-200 w-auto"
                            ),
                          noOptionsMessage: () => "p-5",
                          multiValue: () => "bg-gray-200 px-2 p-1 rounded mr-2",
                          input: () => "text-sm overflow-x-hidden",
                        }}
                        options={options}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Login
              </Button>
            </form>
          </Form>
          {/* <MultiSelectForm /> */}
          <div className="mt-4 text-center text-sm">
            I have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          alt="Image"
          width="1920"
          // height="100vh"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
