import React from "react";
import { motion } from "framer-motion";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

export default function PostCard({ post, onLike, onReply, onRepost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl p-4 border border-white/10"
    >
      <PostHeader author={post.author} createdAt={post.createdAt} />
      
      <p className="mt-3 text-white">{post.content}</p>
      
      {post.images?.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.images.map((img, index) => (
            <img key={index} src={img} alt="Post image" className="rounded-lg max-h-60 object-cover w-full" />
          ))}
        </div>
      )}

      <PostActions 
        post={post} 
        onLike={onLike}
        onReply={onReply}
        onRepost={onRepost}
      />
    </motion.div>
  );
}
