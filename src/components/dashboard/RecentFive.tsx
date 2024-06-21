import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";
import { Badge } from "../ui/badge";
import { useParams } from "react-router-dom";

function RecentFive() {
  let { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["Recent five backer"],

    queryFn: () =>
      axios
        .get(
          `http://localhost:3000/api/projects/recentfivebackers?projectid=${id}`
        )
        .then((data) => data.data)
        .catch((err) => {
          return err.response.data;
        }),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>{data.error}</div>;
  }

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {data?.error ? (
          <p>{data.error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden xl:table-column">Type</TableHead>
                <TableHead className="hidden xl:table-column">Status</TableHead>
                <TableHead className="hidden xl:table-column">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {JSON.stringify(data.data)} data */}
              {data?.payers &&
                data.payers?.map((each, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{each.payerid.username}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {each.payerid.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$25000.00</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentFive;
