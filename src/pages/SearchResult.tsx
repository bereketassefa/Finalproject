import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Maxwidth from "@/components/Maxwidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchResult() {
  // const { key } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const query = useQuery({
    queryKey: ["Search", search],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/projects/search?searchquery=${search}`
      ).then((res) => res.json()),
    enabled: false,
  });

  return (
    <Maxwidth>
      <div className="min-h-[500px]">
        <div className="flex items-center justify-center flex-col ">
          <div className="flex w-full max-w-md items-center space-x-2 mb-5">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <Button
              type="submit"
              onClick={() => {
                // navigate(`/search/${search}`);
                query.refetch();
              }}
            >
              Search
              {/* <Link to={`/search/${search}`}>Search</Link> */}
            </Button>
          </div>
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

export default SearchResult;
