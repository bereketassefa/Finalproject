import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import ProfileCard from "../ProfileCard";

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
        {query.data?.error ? (
          <h1>The user did't create any project yet</h1>
        ) : (
          query.data.myproject &&
          query.data?.myproject.map((each) => {
            if (localStorage.getItem("id") === id) {
              return (
                <ProfileCard className="col-span-1" data={each.projectid} />
              );
            }
            return <Card className="col-span-1" data={each.projectid} />;
          })
        )}
      </div>
    </div>
  );
}

export default ProfileProject;
