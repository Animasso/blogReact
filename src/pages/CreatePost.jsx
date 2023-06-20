import React from "react";
import { useTitle } from "../hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const CreatePost = () => {
  useTitle("Create your Post");
  const postRef = collection(db, "post");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  console.log("selectedImage:", selectedImage);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(ref(storage, file.name));
      console.log("url:", url);
      setImageUrl(url);
      console.log(imageUrl);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const document = {
        title: e.target.title.value,
        description: e.target.message.value,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        name: auth.currentUser.displayName,
        image: imageUrl,
      };
      console.log("document:", document);
      await addDoc(postRef, document);
      navigate("/dashboard");
    }
  }

  return (
    <main className="mt-8 max-w-screen-xl flex flex-wrap items-center flex-col mx-auto p-4">
      <h1 className=" text-3xl font-bold"> Add New Post </h1>
      <form className="w-[300px] sm:w-[500px]" onSubmit={handleSubmit}>
        <input
          className=" my-4 w-full border p-2"
          type="text"
          name="title"
          maxLength={50}
          placeholder="Title"
          required
        />
        <textarea
          id="message"
          name="message"
          rows="4"
          maxLength={600}
          className="block p-2.5 h-60 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your post..."
        ></textarea>

        <label
          className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block mt-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={handleImageUpload}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>

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
