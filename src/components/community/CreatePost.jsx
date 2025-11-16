// components/community/CreatePost.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

// 🎯 CHANGE THIS LINE - Match component name to file name
export default function CreatePost({ onCreatePost }) {  // ✅ Changed from FloatingPostButton to CreatePost
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // In CreatePost.jsx - Update handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!content.trim()) return;

  try {
    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ 
        content: content,
      }),
    });

  if (!response.ok) {
      throw new Error('Failed to create post');
  }

  const result = await response.json(); // Parse response
  console.log("Post created:", result);

  setContent("");
  setSelectedImage(null);
  setIsOpen(false);
  onCreatePost(); // Refresh feed
  } catch (error) {
       console.error('Error creating post:', error);
      // Add user notification here
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-cyan-600 hover:bg-cyan-500 rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        <PlusIcon className="w-8 h-8 text-white" />
      </motion.button>

      {/* Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#0b0b1a] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create Post</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-500"
                  rows="4"
                  autoFocus
                />
                
                {/* Image Preview */}
                {selectedImage && (
                  <div className="relative">
                    <img 
                      src={URL.createObjectURL(selectedImage)} 
                      alt="Preview" 
                      className="rounded-lg max-h-40 object-cover w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70"
                    >
                      <XMarkIcon className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer text-gray-400 hover:text-white text-2xl">
                    📷
                  </label>
                  
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 rounded-full font-semibold transition-all"
                  >
                    Post
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
