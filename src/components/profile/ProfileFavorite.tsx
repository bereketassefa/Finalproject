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
        `https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/creator/favourites/?creatorid=${id}`
      ).then((res) => res.json()),
  });
  if (query.isLoading) return <Loading />;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {query.data.favourites.favourites.map((each) => (
          <Card className="col-span-1" data={each} />
        ))}
        {/* <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" /> */}
      </div>
    </div>
  );
}

export default ProfileFavorite;
