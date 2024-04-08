import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import Loading from "../Loading";
import { useParams } from "react-router-dom";

function ProfileProject() {
  let { id } = useParams();
  const query = useQuery({
    queryKey: ["profileproject"],
    queryFn: () =>
      fetch(
        `https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/creator/createdprojects/?creatorid=${id}`
      ).then((res) => res.json()),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {query.data.myproject.myproject.map((each) => (
          <Card className="col-span-1" data={each} />
        ))}
        {/* <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" /> */}
      </div>
    </div>
  );
}

export default ProfileProject;
