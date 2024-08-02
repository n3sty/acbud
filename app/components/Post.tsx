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
            <Image src={userImg} alt="" height={30} width={30}/>
          </div>
        </div>
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-6" />
      </div>

      {/* img */}
      <Image className="object-cover w-full" src={img} alt="" height={640} width={640} />

      {/* Buttons */}

      {/* Caption */}

      {/* Comments */}

      {/* Input Box */}
    </div>
  );
}

export default Post;
