import { useState, useEffect } from "react";
import { NoteCard } from "../components";
import { useTitle } from "../hooks/useTitle";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
export const Home = () => {
  const [post, setPost] = useState([]);
  const postRef = collection(db, "post");
  useTitle("Page Home");
  useEffect(() => {
    async function getPost() {
      const data = await getDocs(postRef);
      setPost(
        data.docs.map((document) => ({ ...document.data(), id: document.id }))
      );
    }
    console.log("jdii");
    getPost();
  }, [postRef]);
  return (
    <main className=" mt-8 max-w-screen-xl flex flex-wrap items-center flex-col mx-auto p-4">
      {post.map((post) => (
        <NoteCard key={post.id} post={post} />
      ))}
    </main>
  );
};
