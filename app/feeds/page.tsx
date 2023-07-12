import AddFeed from "./addFeed";
import DeleteFeed from "./deleteFeed";
import UpdateFeed from "./updateFeed";

type Feed = {
  id: number;
  username: string;
  loc: string;
  title: string;
  desc: string;
};

async function getFeeds() {
  const res = await fetch("http:localhost:5000/feeds", {
    cache: "no-store",
  });
  return res.json();
}

export default async function FeedList() {
  const feed: Feed[] = await getFeeds();
  return (
    <div>
      <div className="navigation-bar w-full h-15 bg-blue-950">
        <div className=" py-2 white-text text-2xl font-extrabold text-center animate-pulse">
          Lapor bang
        </div>
      </div>
      <div className=" py-4 md:w-2/3 sm:w-full mx-auto sticky top-0 z-50">
        <AddFeed />
      </div>
      {feed.reverse().map((feed, index) => (
        <div key={feed.id}>
          <div className="md:w-2/3 h-min sm:w-full group mx-auto relative">
            <div className="bg-gray-900 px-2.5 py-1 rounded-md mb-5 ">
              <div className="mx-1 py-2">
                <h2 className="inline-grid">{feed.username},</h2>
                <h3 className="inline-grid">{feed.loc}</h3>
              </div>
              <div className="mx-1 my-1 py-2 border-t-2">
                <h2>{feed.title}</h2>
              </div>
              <div className="mx-1 py-1">
                <p>{feed.desc}</p>
              </div>
              <div className="absolute -top-3 -right-3 ">
                <div className="inline-grid">
                  <UpdateFeed {...feed} />
                </div>
                <div className="inline-grid">
                  <DeleteFeed {...feed} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
