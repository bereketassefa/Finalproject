import { CardContent, Card } from "@/components/ui/card";

export default function RewardCard(reward: any) {
  return (
    <>
      {/* {JSON.stringify(reward)} */}
      {reward.reward.map((each) => (
        <Card key="1" className="w-full max-w-sm rounded-lg border">
          <CardContent className="flex gap-4 p-6">
            <div className="flex-shrink-0" />
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium">shadcn</div>
                <div className="text-secondary-variant-600 dark:text-secondary-variant-500">
                  3m
                </div>
              </div>
              <div className="prose-sm max-w-none w-full line-clamp-10">
                {each}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
