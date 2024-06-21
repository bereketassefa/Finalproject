import { Withdraw } from "../Withdraw";
import OverallCampaign from "./OverallCampaign";
import RecentFive from "./RecentFive";

function Campaign() {
  return (
    <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8">
      <OverallCampaign />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <RecentFive />
        <div className="border w-full">
          <Withdraw />
        </div>
      </div>
    </main>
  );
}

export default Campaign;
