import Card from "@/components/Card";
import Categories from "@/components/Categories";
import Loading from "@/components/Loading";
import Maxwidth from "@/components/Maxwidth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function SearchByTag() {
  const { tag } = useParams();

  const query = useQuery({
    queryKey: ["SearchByTag", tag],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/projects/searchbytag?searchtag=${tag}`
      ).then((res) => res.json()),
    // enabled: false,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("what is up");
    queryClient.invalidateQueries({ queryKey: ["profile", tag] });
  }, [useLocation().pathname]);

  return (
    <Maxwidth>
      <Categories />
      <div className="min-h-[500px]">
        <div className="flex items-center justify-center flex-col ">
          <div className="flex w-full max-w-md items-center space-x-2 mb-5"></div>
          {(query.isLoading || query.isFetching) && <Loading />}
          {/* {JSON.stringify(query.data)} */}
          {query.data?.projects?.length == 0 && (
            <p>There is no project that match your searchs</p>
          )}
          {query.data?.message && <p>{query.data?.message}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 ">
            {query.data?.projects?.map((each) => (
              <Card className="col-span-1" data={each} />
            ))}
          </div>
        </div>
      </div>
    </Maxwidth>
  );
}

export default SearchByTag;
