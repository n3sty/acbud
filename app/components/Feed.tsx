import Posts from "./Posts";
import Stories from "./Stories";

function Feed() {
  return (
    <main className="grid text-base-content w-full grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <div className="col-span-2">
        <Stories />
        <Posts />
      </div>

      <section>
        {/* Mini Profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}

export default Feed;
