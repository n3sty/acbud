"use client";
import React from "react";

function NewToYouCard({ props }: any) {
  const { subject } = props;

  if (subject === "new_follower") {
    return <NewFollower props={props} />;
  } else if (subject === "new_like") {
    return <NewLike props={props} />;
  } else if (subject === "new_post") {
    return <NewPost props={props} />;
  }
}

// Component displayed when a new post has been reveived
function NewPost({ props }: any) {
  const { user, post } = props;

  const handleViewPost = () => {
    console.log(`User ${user} posted something new with id ${post}`);
  };

  return (
    <div className="border bg-base-200 h-fit w-full rounded-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-gray-600">
          <span className="font-semibold">{user}</span> posted something new
        </p>
        <button
          className="text-blue-500 text-sm text-end overflow-y-auto font-semibold"
          onClick={handleViewPost}
        >
          View post
        </button>
      </div>
    </div>
  );
}

// Component displayed when a new follow has been reveived
function NewFollower({ props }: any) {
  const { user } = props;

  const handleFollowBack = (user: string) => {
    console.log(`User ${user} followed you back`);
  };

  return (
    <div className="border bg-base-200 h-fit w-full rounded-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-gray-600">
          <span className="font-semibold">{user}</span> started following you
        </p>
        <button
          className="text-blue-500 text-sm text-end overflow-y-auto font-semibold"
          onClick={() => {handleFollowBack(user)}}
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
  };

  return (
    <div className="border bg-base-200 h-fit w-full rounded-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-gray-600">
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
