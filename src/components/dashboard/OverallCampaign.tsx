import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreditCard, DollarSign, Users } from "lucide-react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";

function OverallCampaign() {
  let { id } = useParams();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["Single project metrics"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:3000/api/projects/singleprojectmetrics?projectid=${id}`
        )
        .then((data) => data.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.singlestats.length ? data.singlestats[0]?.donors : "0"}
          </div>
          <p className="text-xs text-muted-foreground">
            {/* +20.1% from last month */}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Donation
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.singlestats.length
              ? data.singlestats[0]?.averageDonationAmount
              : "0"}
          </div>
          <p className="text-xs text-muted-foreground">
            {/* +180.1% from last month */}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.singlestats.length ? data.singlestats[0]?.totalFunds : "0"}
          </div>
          {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card> */}
    </div>
  );
}

export default OverallCampaign;
