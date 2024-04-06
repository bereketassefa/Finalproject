import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import Loading from "../Loading";

function ProfileProject() {
  const query = useQuery({
    queryKey: ["profileproject"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
      </div>
    </div>
  );
}

export default ProfileProject;
