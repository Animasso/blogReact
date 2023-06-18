import React from "react";
import { auth, db } from "../firebase/config";

import { doc, deleteDoc } from "firebase/firestore";

export const NoteCard = ({ post, toggle, setToggle }) => {
  console.log("post:", post);
  const { id, title, description, name } = post;
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  async function handleDelete() {
    const document = doc(db, "post", id);

    await deleteDoc(document);
    setToggle(!toggle);
  }
  console.log("auth:", auth);
  return (
    <section className=" border p-4 mb-5 shadow-md">
      <h1 className=" text-2xl font-bold">{title}</h1>
      <p className=" mt-4">{description}</p>
      <div className="mt-3 text-lg font-semibold p-1 flex justify-between">
        <div className=" bg-slate-200 p-1 rounded ">{name}</div>
        {isAuth && id === auth.currentUser.uid && (
          <div>
            <i onClick={handleDelete} className="bi bi-trash text-red-500"></i>
          </div>
        )}
      </div>
    </section>
  );
};
