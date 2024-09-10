// /* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { deleteDocAndCol } from "@/lib/scripts/deleteDocAndCol";
import Moment from "react-moment";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

function Post({
  id,
  name,
  uid,
  userImg,
  img,
  caption,
}: {
  id: string;
  name: string;
  uid: string;
  userImg: string;
  img: string;
  caption: string;
}) {
  const session = true;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [likes, setLikes] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [owner, setOwner] = useState(false);

  // CHECK IF USER IS THE OWNER OF THE POST
  // useEffect(() => {
  //   if (session?.user?.id === uid) {
  //     setOwner(true);
  //     console.log(
  //       "Owner of the post with id:",
  //       id,
  //       " is ",
  //       session?.user?.name
  //     );
  //   }
  // }, [session?.user?.id, id, session?.user?.name, uid]);

  // UPDATE COMMENTS
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  // UPDATE LIKES
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  // CHECK IF USER HAS LIKED THE POST TO SET THE HEART ICON
  // useEffect(() => {
  //   const hasLiked =
  //     likes.findIndex((like) => like.id === session?.user?.id) !== -1;
  //   setHasLiked(hasLiked);
  // }, [likes, session?.user?.id]);

  // USER LIKED POST
  // const likePost = async () => {
  //   if (hasLiked) {
  //     await deleteDoc(
  //       doc(db, "posts", id, "likes", session?.user?.id as string)
  //     );
  //   } else {
  //     await setDoc(doc(db, "posts", id, "likes", session?.user?.id as string), {
  //       name: session?.user?.name,
  //     });
  //   }
  // };

  // UPLOAD COMMENT TYPED BY USER
  // const sendComment = async (e: { preventDefault: () => void } | undefined) => {
  //   e?.preventDefault();

  //   const commentToSend = comment;
  //   setComment("");

  //   await addDoc(collection(db, "posts", id, "comments"), {
  //     comment: commentToSend,
  //     name: session?.user?.name,
  //     uid: session?.user?.id,
  //     userImage: session?.user?.image,
  //     timestamp: serverTimestamp(),
  //   });
  // };

  // DELETE POST
  // TODO: Add a confirmation dialog before deleting the post
  const deletePost = async (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();

    if (!owner) {
      return;
    }

    try {
      await deleteDocAndCol(db, `posts/${id}`, ["/likes", "/comments"]);
    } catch (error) {
      console.error("Error removing document: ", error);
      return;
    }

    console.info("Document with ID", id, "successfully deleted!");
  };

  // EDIT POST
  const editPost = async (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();

    if (!owner) {
      return;
    }

    console.log("Editing post with ID:", id);
  };

  return (
    <div className="bg-white relative my-6 border rounded-xl">
      {/* HEADER */}
      <div className="flex gap-2 w-full items-center p-2 px-5">
        {/* AVATAR */}
        <div className="flex gap-2 items-center w-full">
          <div className="avatar">
            <div className="rounded-full">
              <Image src={userImg} alt="" height={30} width={30} />
            </div>
          </div>
          <p className="flex-1 font-bold">{name}</p>
        </div>

        {/* POST OPTIONS  */}
        {session && (
          <div className="dropdown dropdown-end">
            <EllipsisHorizontalIcon
              className={`btn btn-sm btn-circle btn-ghost ${
                owner ? "" : "disabled"
              }`}
              tabIndex={0}
              role="button"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] shadow"
            >
              <li className="disabled">
                <a>Report</a>
              </li>
              <li className={owner ? `` : `hidden`}>
                <a onClick={editPost}>Edit</a>
              </li>
              <li className={owner ? `text-red-600` : `hidden`}>
                <a onClick={deletePost}>Remove</a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* IMAGE */}
      <div className="relative z-0">
        <Image
          className="object-fill w-full select-none drag-none"
          src={img}
          alt=""
          width={1920}
          height={1350}
        />
        
        <div className="absolute bottom-0 w-full">
        <div
          className="flex w-full items-center justify-between 
          text-base-content bg-white/50 backdrop-blur-sm rounded-t-md"
        >
          <p className="px-4 py-2 truncate">
            <span className="font-bold mr-1">{name}</span>
            {caption}
          </p>

          {session && (
            <div className="flex space-x-2 px-2">
              {hasLiked ? (
                <HeartIconFilled
                  // onClick={likePost}
                  className="postbtn text-red-500 scale-110"
                />
              ) : (
                <HeartIcon 
                // onClick={likePost} 
                className="postbtn" />
              )}

              <PaperAirplaneIcon className="postbtn" />
              <BookmarkIcon className="postbtn" />
            </div>
          )}
        </div>
      </div>
      </div>

      {/* COMMENTS */}
      {comments.length > 0 && session && (
        <div className="ml-4 h-fit max-h-32 overflow-y-scroll">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 m-2">
              <div className="flex gap-2 btn btn-xs no-animation hover:">
                <Image
                  className="rounded-full"
                  src={comment.data().userImage}
                  alt=""
                  height={20}
                  width={20}
                />
                <span className="font-bold">{comment.data().name}</span>
              </div>
              <p className="text-sm flex-1">{comment.data().comment}</p>
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* INPUT BOX */}
      {session && (
        <form className="flex items-center px-4 py-2">
          {/* <FaceSmileIcon className="h-6" /> */}
          <ChatBubbleOvalLeftIcon className="h-6" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={comments.length === 0 ? `Add the first comment!` : `Add a comment...`}
            className="border-none outline-none focus:ring-0 flex-1 p-2"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            // onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
