import React, { useEffect } from "react";
import Post from "./Post";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase";

function Posts() {
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
        />
      ))}
    </div>
  );
}

export default Posts;
