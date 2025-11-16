// src/pages/Community.jsx
import React, { useState, useEffect } from "react";
import CreatePost from "../components/community/CreatePost";
import PostCard from "../components/community/PostCard";
import useAuth from "../hooks/useAuth";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts/feed", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "PUT",
        credentials: "include"
      });
      
      if (response.ok) {
        const result = await response.json();
        // Update local state
        setPosts(posts.map(post => 
          post._id === postId 
            ? { 
                ...post, 
                likes: result.liked 
                  ? [...post.likes, user._id] 
                  : post.likes.filter(id => id.toString() !== user._id.toString())
              }
            : post
        ));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Community</h1>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={handleLike}
              onReply={() => console.log("Reply to:", post._id)}
              onRepost={() => console.log("Repost:", post._id)}
            />
          ))}
          
          {posts.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No posts yet. Be the first to share something!
            </div>
          )}
        </div>
        
        <CreatePost onCreatePost={fetchPosts} />
      </div>
    </div>
  );
}
