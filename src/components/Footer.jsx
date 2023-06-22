import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900   ">
      <div className="w-full  max-w-screen-xl mx-auto p-4 md:py-8">
        {/* <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
        <span className="block font-lobster text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 My Blog Note™ . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
