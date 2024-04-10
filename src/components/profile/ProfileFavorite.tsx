import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import Loading from "../Loading";
import { useParams } from "react-router-dom";

function ProfileFavorite() {
  let { id } = useParams();
  const query = useQuery({
    queryKey: ["ProfileFavorite"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/creator/favourites/?creatorid=${id}`
      ).then((res) => res.json()),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      {query.data?.favourites.favourites.length == 0 && (
        <h1>You did't add project to your favorite list</h1>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {query.data?.favourites.favourites.map((each) => (
          <Card className="col-span-1" data={each.projectid} />
        ))}
        {/* {JSON.stringify(query.data)} */}
      </div>
    </div>
  );
}

export default ProfileFavorite;
