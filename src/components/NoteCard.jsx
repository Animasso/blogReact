import React from "react";

export const NoteCard = ({ title, textNote, nameNote }) => {
  return (
    <div className=" border p-4 mb-5 shadow-md">
      <h1 className=" text-2xl font-bold">{title}</h1>
      <p className=" mt-4">{textNote}</p>
      <div className="mt-3 text-lg font-semibold bg-slate-100 max-w-fit p-1">
        {nameNote}
      </div>
    </div>
  );
};
