import React from "react";
import { HeartIcon, ArrowPathRoundedSquareIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import useAuth from "../../hooks/useAuth";



export default function PostActions({ post, onLike, onReply, onRepost }) {
  const { user } = useAuth(); 
  const isLiked = post.likes?.includes(user?.id); // You'll need user context

  return (
    <div className="flex space-x-6 mt-4 text-gray-400">
      <button 
        onClick={() => onLike(post._id)} 
        className="flex items-center space-x-1 hover:text-red-400"
      >
        {isLiked ? <HeartSolid className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5" />}
        <span>{post.likes?.length || 0}</span>
      </button>
      
      <button 
        onClick={() => onReply(post._id)}
        className="flex items-center space-x-1 hover:text-green-400"
      >
        <ChatBubbleLeftIcon className="w-5 h-5" />
        <span>Reply</span>
      </button>
      
      <button 
        onClick={() => onRepost(post._id)}
        className="flex items-center space-x-1 hover:text-cyan-400"
      >
        <ArrowPathRoundedSquareIcon className="w-5 h-5" />
        <span>{post.reposts?.length || 0}</span>
      </button>
    </div>
  );
}
