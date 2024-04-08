import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import axios from "axios";

function Hero() {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["hero"],
    queryFn: () =>
      axios
        .get(
          "https://acbcd38f-d4d3-4925-934c-0b79dd02dcf4.mock.pstmn.io/api/projects/stats"
        )
        .then((data) => data.data),
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className=" pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold  sm:text-4xl">
              Trusted by developers from over 80 planets
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repellendus repellat laudantium.
            </p>
          </div>
        </div>
        <div className="mt-10 pb-12  sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 " />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg  shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-border p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Pepperoni
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-primary">
                      {data?.totalnumberofdonations}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-border p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Delivery
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-primary">
                      {data?.numberofprojects}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-border p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Calories
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-primary">
                      {data?.pledges}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
