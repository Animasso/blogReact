import React from "react";

export const CreatePost = () => {
  return (
    <main className="mt-8 max-w-screen-xl flex flex-wrap items-center flex-col mx-auto p-4">
      <h1 className=" text-3xl font-bold"> Add New Post </h1>
      <form className="w-[500px]">
        <input
          className=" my-4 w-full border p-2"
          type="text"
          name="title"
          placeholder="Title"
        />
        <textarea
          id="message"
          name="message"
          rows="4"
          className="block p-2.5 h-60 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your post..."
        ></textarea>
        <button
          className=" mt-3 rounded w-full p-2 text-white bg-green-400"
          type="submit"
        >
          Create
        </button>
      </form>
    </main>
  );
};
