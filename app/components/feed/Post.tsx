"use client";
import React, { useEffect, useState } from "react";
import { emojiPickerState } from "@/atoms/emojiPickerAtom";
import {
  BookmarkIcon,
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
import { User } from "@supabase/supabase-js";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
} from "emoji-picker-react";
import { useRecoilState } from "recoil";

function Post({
  user,
  id,
  name,
  uid,
  userImg,
  img,
  caption,
}: {
  user: User | null;
  id: string;
  name: string;
  uid: string;
  userImg: string;
  img: string;
  caption: string;
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [likes, setLikes] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [owner, setOwner] = useState(false);
  const [openEmojiPickerID, setOpenEmojiPickerID] = useRecoilState(emojiPickerState);
  
  // CHECK IF USER IS THE OWNER OF THE POST
  useEffect(() => {
    if (user?.id === uid) {
      setOwner(true);
      console.log(
        "Owner of the post with id:",
        id,
        " is ",
        user.user_metadata.name
      );
    }
  }, [user?.id, id, user?.user_metadata.name, uid]);

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
    const hasLiked = likes.findIndex((like) => like.id === user?.id) !== -1;
    setHasLiked(hasLiked);
  }, [likes, user?.id]);

  // USER LIKED POST
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user?.id as string));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user?.id as string), {
        name: user?.user_metadata.name,
      });
    }
  };

  const togglePicker = (
    e: { preventDefault: () => void },
    pickerID: string
  ) => {
    e.preventDefault();

    console.log("Current: ", openEmojiPickerID, "\n\n\n", "New: ", pickerID);

    if (openEmojiPickerID === pickerID) {
      setOpenEmojiPickerID('');
    } else {
      setOpenEmojiPickerID(pickerID);
    }
  };

  // HANDLE EMOJI CLICKS
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setComment((prevInput) => prevInput + emojiData.emoji);
  };

  // UPLOAD COMMENT TYPED BY USER
  const sendComment = async (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      name: user?.user_metadata.name,
      uid: user?.id,
      userImage: user?.user_metadata.picture,
      timestamp: serverTimestamp(),
    });
  };

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
    <div className="bg-base-100/75 relative my-6 border rounded-xl">
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
        {user && (
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
      <div className="relative z-0 ">
        <Image
          className={`object-fill w-full select-none drag-none ${user ?? 'rounded-b-xl'}`}
          src={img}
          alt=""
          width={1920}
          height={1350}
        />

        <div className="absolute bottom-0 w-full ">
          <div
            className={`flex w-full items-center justify-between ${user ?? 'rounded-b-xl'}
          text-base-content bg-white/60 backdrop-blur-sm rounded-t-md`}
          >
            <p className="px-4 py-2 truncate">
              <span className="font-bold mr-1">{name}</span>
              {caption}
            </p>

            {user && (
              <div className="flex space-x-2 px-2">
                {hasLiked ? (
                  <HeartIconFilled
                    onClick={likePost}
                    className="postbtn text-red-500 scale-110"
                  />
                ) : (
                  <HeartIcon onClick={likePost} className="postbtn" />
                )}

                <PaperAirplaneIcon className="postbtn" />
                <BookmarkIcon className="postbtn" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      {comments.length > 0 && user && (
        <div className="ml-4 h-fit max-h-32 overflow-y-scroll">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 m-2">
              <div className="flex gap-2 btn btn-xs no-animation hover:">
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
      {user && (
        <>
          <form className="flex static items-center py-2 px-4 space-x-4 justify-around rounded-box border m-2 bg-base-100">
            <button
              onClick={(e) => togglePicker(e, `emojipicker_${id}` as string)}
              className={`btn btn-sm btn-circle btn-ghost ${
                openEmojiPickerID === `emojipicker_${id}` && "btn-active"
              }`}
            >
              <FaceSmileIcon className="h-6 absolute" />
            </button>
            <input
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onFocus={(e) => togglePicker(e, "")}
              placeholder={
                comments.length === 0
                  ? `Add the first comment!`
                  : `Add a comment...`
              }
              className="input input-sm text-base border-none outline-none focus:ring-0 flex-1 p-4 bg-transparent"
            />
            <button
              disabled={!comment.trim()}
              onClick={(e) => {
                sendComment(e);
                togglePicker(e, "");
              }}
              className={`font-semibold text-blue-400 ${
                comment.trim() && "hover:cursor-pointer"
              }`}
            >
              Post
            </button>
          </form>

          {openEmojiPickerID === `emojipicker_${id}` && (
            <div className="absolute bottom-16 left-2 mt-2 z-[2]">
              <EmojiPicker
                key={`emojipicker_${id}`}
                onEmojiClick={onEmojiClick}
                emojiStyle={EmojiStyle.NATIVE}
                lazyLoadEmojis={true}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Post;
