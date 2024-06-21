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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import Loading from "./Loading";

export function Withdraw() {
  let { id } = useParams();
  const projectData = useQuery<any>({
    queryKey: ["projectforback"],
    queryFn: () =>
      axios
        .get(`http://localhost:3000/api/projects/single?projectid=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => data.data),
  });

  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const makePayment = useMutation({
    mutationFn: (newTodo: any) => {
      return axios
        .post(`http://localhost:3000/api/pay/refund`, newTodo, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => data.data);
    },
    onSuccess: (data) => {
      console.log(data);
      toast("Payment successfull");
    },
    onError: () => {
      toast.error("The email is not associated with paypal");
    },
  });
  const onPay = (data: any) => {
    console.log(data);
    let newData = {
      projectid: id,
      paymentemail: data?.email,
      isAmount: "50",
      //   isAmount: projectData.data.project.amountReached,
    };
    makePayment.mutate(newData);
  };

  if (projectData.isLoading) {
    return <Loading />;
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Withdraw money</CardTitle>
        <CardDescription>withdraw your money .</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Button
          onClick={() => {}}
          className="w-full"
          disabled={projectData.data.project.status !== "approved"}
        >
          Withdraw money
        </Button> */}
        <Sheet>
          <SheetTrigger asChild>
            {projectData.data.project && (
              <Button
                className="w-full"
                disabled={
                  projectData.data.project.status !== "approved" ||
                  projectData.data.project.completed
                }
              >
                Withdraw money
              </Button>
            )}
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Please fill the form to start payment</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onPay)} className=" space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
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
      </CardContent>
    </Card>
  );
}
