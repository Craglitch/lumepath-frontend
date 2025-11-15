import React, { useState } from "react";

export default function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onCreatePost({ content, image: selectedImage });
    setContent("");
    setSelectedImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-4 border border-white/10">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full bg-transparent border-none resize-none text-white placeholder-gray-400 focus:outline-none"
        rows="3"
        maxLength="280"
      />
      <div className="flex justify-between items-center mt-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer text-gray-400 hover:text-white text-lg">
          📷
        </label>
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 rounded-full font-semibold"
        >
          Post
        </button>
      </div>
    </form>
  );
}
