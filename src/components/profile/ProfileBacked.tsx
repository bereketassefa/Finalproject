import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Card from "../Card";
import Loading from "../Loading";

function ProfileBacked() {
  let { id } = useParams();
  const query = useQuery({
    queryKey: ["ProfileBacked"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/creator/backedprojects/?creatorid=${id}`
      ).then((res) => res.json()),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      {query.data?.error && <h1>You did't back any project yet</h1>}
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {query.data.backedproject &&
          query.data?.backedproject.map((each) => (
            <Card className="col-span-1" data={each.projectid} />
          ))}
      </div>
    </div>
  );
}

export default ProfileBacked;
