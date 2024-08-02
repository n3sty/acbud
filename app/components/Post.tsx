/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import Image from "next/image";

function Post({
  id,
  username,
  userImg,
  img,
  caption,
}: {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}) {
  return (
    <div className="bg-white my-6 border rounded-md">
      {/* Header */}
      <div className="flex items-center p-5 gap-2">
        <div className="avatar">
          <div className="rounded-full">
            <Image src={userImg} alt="" height={30} width={30} />
          </div>
        </div>
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-6" />
      </div>

      {/* Image */}
      <Image
        className="object-cover w-full"
        src={img}
        alt=""
        height={640}
        width={640}
      />

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4 px-4">
        <div className="flex space-x-4">
          <HeartIcon className="postbtn" />
          <ChatBubbleOvalLeftIcon className="postbtn" />
          <PaperAirplaneIcon className="postbtn" />
        </div>
        <BookmarkIcon className="postbtn" />
      </div>

      {/* Caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
      {/* Comments */}

      {/* Input Box */}
      <div>
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-none outline-none focus:ring-0 flex-1 p-2"
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
