import React from "react";

function NewToYouCard({ props }: any) {
  const { subject } = props;
  
  if (subject === "new_follower") {
    return <NewFollower props={props} />;
  } else if (subject === "new_like") {
    return <NewLike props={props} />;
  }
}


// Component displayed when a new follow has been reveived
function NewFollower({ props }: any) {
  const { user } = props;
  return (
    <div className="border bg-gray-200 h-16 w-full rounded-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="font-serif text-gray-600">
          <span className="font-semibold">{user}</span> started following you
        </p>
        <button
          className="text-blue-500 text-sm text-end overflow-y-auto font-semibold"
        >
          Follow back
        </button>
      </div>
    </div>
  );
}

// Component displayed when a new like has been received
function NewLike({ props }: any) {
  const { user, post } = props;

  const handleLike = () => {
    console.log(`User ${user} liked your post with id ${post}`);
  }

  return (
    <div className="border bg-gray-200 h-16 w-full rounded-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="font-serif text-gray-600">
          <span className="font-semibold">{user}</span> liked your post
        </p>
        <button
          className="text-blue-500 text-sm text-end overflow-y-auto font-semibold"
          onClick={handleLike}
        >
          View post
        </button>
      </div>
    </div>
  );
}



export default NewToYouCard;
