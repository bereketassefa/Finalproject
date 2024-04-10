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
        `http://localhost:3000/api/creator/createdprojects/?creatorid=${id}`
      ).then((res) => res.json()),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {query.data?.myproject.myproject.length == 0 && (
          <h1>You did't create any project yet</h1>
        )}
        {query.data?.myproject.myproject.map((each) => (
          <Card className="col-span-1" data={each} />
        ))}
        {/* {JSON.stringify(query.data)} */}
      </div>
    </div>
  );
}

export default ProfileProject;
