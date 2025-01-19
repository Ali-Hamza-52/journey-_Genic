import React from "react";

const Loading = () => {
  return (
    <div className="w-full grid place-items-center min-h-screen">
      <div className="flex flex-row gap-4">
        <div className="size-16 animate-spin rounded-full border-y border-solid border-cyan-500 border-t-transparent shadow-2xl"></div>

        <div className="size-16 animate-spin rounded-full border-y-2 border-solid border-violet-500 border-t-transparent shadow-2xl"></div>

        <div className="size-16 animate-spin rounded-full border-y-4 border-solid border-pink-500 border-t-transparent shadow-2xl"></div>

        <div className="size-16 animate-spin rounded-full border-y-8 border-solid border-green-500 border-t-transparent shadow-2xl"></div>
      </div>
    </div>
  );
};

export default Loading;
