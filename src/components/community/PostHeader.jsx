import React from "react";

export default function PostHeader({ author, createdAt }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center font-semibold">
        {author?.username?.charAt(0).toUpperCase()}
      </div>
      <div>
        <div className="font-semibold">{author?.username}</div>
        <div className="text-gray-400 text-sm">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
