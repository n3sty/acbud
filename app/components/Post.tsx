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
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
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
  useEffect(() => {
    if (session?.user?.id === uid) {
      setOwner(true);
    }
  }, [session?.user?.id, uid]);

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
  useEffect(() => {
    const hasLiked =
      likes.findIndex((like) => like.id === session?.user?.id) !== -1;
    setHasLiked(hasLiked);
  }, [likes, session?.user?.id]);

  // USER LIKED POST
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(db, "posts", id, "likes", session?.user?.id as string)
      );
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.id as string), {
        name: session?.user?.name,
      });
    }
  };

  // UPLOAD COMMENT TYPED BY USER
  const sendComment = async (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      name: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  // DELETE POST
  const deletePost = async (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();

    try {
      await deleteDocAndCol(db, `posts/${id}`, ["/likes", "/comments"]);
    } catch (error) {
      console.error("Error removing document: ", error);
      return;
    }

    console.info("Document with ID", id, "successfully deleted!");
  };

  return (
    <div className="bg-white my-6 border rounded-md">
      {/* Header */}

      <div className="flex items-center p-5 gap-2">
        {/* AVATAR */}

        <div className="avatar">
          <div className="rounded-full">
            <Image src={userImg} alt="" height={30} width={30} />
          </div>
        </div>
        <p className="flex-1 font-bold">{name}</p>

        {/* POST OPTIONS */}

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
              <li className="disabled">
                <a>Edit</a>
              </li>
              <li className="text-red-600">
                <a onClick={deletePost}>Remove</a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Image */}

      <div className="">
        <Image
          className="object-fill w-full select-none drag-none"
          src={img}
          alt=""
          width={1920}
          height={1350}
          // fill={true}
        />
      </div>

      {/* Buttons */}

      {session && (
        <div className="flex items-center justify-between pt-4 px-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="postbtn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="postbtn" />
            )}

            <ChatBubbleOvalLeftIcon className="postbtn" />
            <PaperAirplaneIcon className="postbtn" />
          </div>
          <BookmarkIcon className="postbtn" />
        </div>
      )}

      {/* Caption */}

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <>
            <span className="font-bold mb-1">{likes.length} likes </span>
            <br />
          </>
        )}

        <span className="font-bold mr-1">{name}</span>
        {caption}
      </p>

      {/* Comments */}

      {comments.length > 0 && session && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <Image
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
                height={30}
                width={30}
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().name}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}

      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none outline-none focus:ring-0 flex-1 p-2"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
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
