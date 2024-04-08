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
        `https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/creator/backedprojects/?creatorid=${id}`
      ).then((res) => res.json()),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {query.data.backedproject.backedproject.map((each) => (
          <Card className="col-span-1" data={each} />
        ))}
        {/* <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" /> */}
      </div>
    </div>
  );
}

export default ProfileBacked;
