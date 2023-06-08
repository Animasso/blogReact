import React from "react";
import { NoteCard } from "../components";

export const Home = () => {
  return (
    <main className=" mt-8 max-w-screen-xl flex flex-wrap items-center flex-col mx-auto p-4">
      <NoteCard
        title={"FirstCard"}
        textNote={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur eaque accusamus delectus adipisci voluptatem maxime rerum in ad doloremque asperiores harum, laudantium illo officia cupiditate odio obcaecati? Ullam, ab animi."
        }
        nameNote={"Asid Sid"}
      />
      <NoteCard
        title={"FirstCard"}
        textNote={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur eaque accusamus delectus adipisci voluptatem maxime rerum in ad doloremque asperiores harum, laudantium illo officia cupiditate odio obcaecati? Ullam, ab animi."
        }
        nameNote={"Asid Sid"}
      />
    </main>
  );
};
