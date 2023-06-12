import React from "react";

export const NoteCard = ({ post }) => {
  const { title, description, username } = post;
  const isMine = false;
  return (
    <section className=" border p-4 mb-5 shadow-md">
      <h1 className=" text-2xl font-bold">{title}</h1>
      <p className=" mt-4">{description}</p>
      <div className="mt-3 text-lg font-semibold p-1 flex justify-between">
        <div className=" bg-slate-200 p-1 rounded ">{username}</div>
        {isMine && (
          <div>
            <i className="bi bi-trash text-red-500"></i>
          </div>
        )}
      </div>
    </section>
  );
};
