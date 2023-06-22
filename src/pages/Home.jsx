import { useState, useEffect, useRef } from "react";
import { NoteCard, SkeletonCardNote } from "../components";
import { useTitle } from "../hooks/useTitle";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
export const Home = () => {
  const [post, setPost] = useState(new Array(3).fill(false));
  const [toggle, setToggle] = useState(false);
  const postRef = useRef(collection(db, "post"));
  useTitle("Page Home");
  useEffect(() => {
    async function getPost() {
      const data = await getDocs(postRef.current);
      setPost(
        data.docs.map((document) => ({ ...document.data(), id: document.id }))
      );
    }
    getPost();
  }, [postRef, toggle]);
  return (
    <div className="dark:bg-gray-900">
      <main className="dark:bg-gray-900 dark:text-white h-auto mt-8 max-w-screen-xl flex flex-wrap  flex-col mx-auto p-4">
        {post.map((post, index) =>
          post ? (
            <NoteCard
              key={post.id}
              post={post}
              setToggle={setToggle}
              toggle={toggle}
            />
          ) : (
            <SkeletonCardNote key={index} />
          )
        )}
      </main>
    </div>
  );
};
