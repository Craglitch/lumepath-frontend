import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreatePost from "../components/community/CreatePost";
import PostCard from "../components/community/PostCard";

export default function Community() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts/feed", { credentials: "include" });
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const createPost = async (postData) => {
    try {
      const formData = new FormData();
      formData.append("content", postData.content);
      if (postData.image) formData.append("image", postData.image);

      await fetch("/api/posts/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      fetchPosts(); // Refresh feed
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`/api/posts/like/${postId}`, {
        method: "PUT",
        credentials: "include",
      });
      fetchPosts(); // Refresh to update likes
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleReply = (postId) => {
    // TODO: Implement reply functionality
    console.log("Reply to post:", postId);
  };

  const handleRepost = async (postId) => {
    try {
      await fetch(`/api/posts/repost/${postId}`, {
        method: "POST",
        credentials: "include",
      });
      fetchPosts(); // Refresh feed
    } catch (error) {
      console.error("Failed to repost:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="min-h-screen px-6 py-24 bg-[#0b0b1a] text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Community
          </h1>
          <p className="text-gray-400">Share your journey and connect with others</p>
        </div>

        {/* Create Post Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CreatePost onCreatePost={createPost} />
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                onLike={handleLike}
                onReply={handleReply}
                onRepost={handleRepost}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-10">
              No posts yet. Be the first to share!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
