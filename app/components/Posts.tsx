"use client";

import React, { useEffect } from "react";
import Post from "./feed/Post";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "@supabase/supabase-js";

function Posts({ user }: { user: User | null }) {
  const [posts, setPosts] = React.useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );



  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.data().name}
          uid={post.data().uid}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          user={user}
        />
      ))}
    </div>
  );
}

export default Posts;
