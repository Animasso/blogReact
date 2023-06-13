import React from "react";
import Skeleton from "react-loading-skeleton";
export const SkeletonCardNote = () => {
  return (
    <section className=" border p-4 mb-5 shadow-md">
      <h1 className=" text-2xl font-bold">
        <Skeleton />{" "}
      </h1>
      <p className=" mt-4">
        <Skeleton count={3} />
      </p>
      <div className="mt-3 text-lg font-semibold p-1 flex justify-between">
        <div className=" bg-slate-200 p-1 rounded ">
          <Skeleton width={"70px"} />{" "}
        </div>
      </div>
    </section>
  );
};
