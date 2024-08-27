import React from "react";
import NewToYouCard from "./NewToYouCard";

{
  /* Add some sort of "recent uploads" or "useful for you" section,
where users can find certain actions performed by other users ("posts has been liked by ... people",
"try this function!" or "maybe you can find purpose in this way? (with link to article
regarding productivity on other websites??)") */
}

{
  /* NEW TO YOU: section for useful (new) info */
}

function NewToYou() {
  // For now, we will just display two fake cards
  const fakeCards = {
    card1: {
      subject: "new_follower",
      user: "Noah Siemerink",
    },
    card2: {
      subject: "new_follower",
      user: "Mees Siemerink",
    },
    card3: {
      subject: "new_like",
      user: "Noah Siemerink",
      post: "post_id#1234"
    }
  };

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">New to you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      <div className="flex flex-col items-center space-y-4 px-1 bg-gray-100 rounded-lg">
        <NewToYouCard props={fakeCards.card1} />
        <NewToYouCard props={fakeCards.card2} />
        <NewToYouCard props={fakeCards.card3} />
      </div>
    </div>
  );
}

export default NewToYou;
