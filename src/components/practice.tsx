const posts = [
  { id: 1, title: "title 1" },
  { id: 2, title: "title 2" },
];

export default function Practice() {
  //   const postQuery = useQuery({
  //     querykey: ["posts"],
  //     queryFn: () => wait(5000).then(() => [...posts]),
  //   });
  // if(postQuery.loading) return <h1>loading</h1>
  return <h1>what is up</h1>;
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
