import FeedSkeleton from "./components/skeletons/FeedSkeleton";
import HeaderSkeleton from "./components/skeletons/HeaderSkeleton";
import Suggestions from "./components/Suggestions";

export default function Loading() {
  return (
    <div className="bg-base-200 text-base-content scrollbar-hide">
      <HeaderSkeleton />
      <FeedSkeleton />
    </div>
  );
}
