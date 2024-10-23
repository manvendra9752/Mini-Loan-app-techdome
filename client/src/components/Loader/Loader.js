import React from "react";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-50">
      <span className="relative inline-block w-12 h-12 border-4 border-solid border-black border-t-transparent border-b-transparent rounded-full animate-spin">
        <span className="absolute inset-0 m-auto w-6 h-6 border-3 border-solid border-orange-500 border-t-transparent border-b-transparent rounded-full animate-[spin_1s_linear_infinite_reverse]"></span>
      </span>
    </div>
  );
}
