// src/components/AIChatBox.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon, XMarkIcon, ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. Ask me anything about your habits, productivity, or goals!",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showComingSoon]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI typing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add AI response
    const aiResponse = {
      id: Date.now() + 1,
      text: "I understand your question! This feature is currently in development with advanced AI capabilities.",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);

    // Show coming soon card after AI response
    setTimeout(() => {
      setShowComingSoon(true);
    }, 1000);
  };

  const resetChat = () => {
    setShowComingSoon(false);
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. Ask me anything about your habits, productivity, or goals!",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
  };

  const floatingShapes = [
    { icon: "🧠", delay: 0 },
    { icon: "⚡", delay: 1 },
    { icon: "🎯", delay: 2 },
    { icon: "🚀", delay: 3 },
  ];

  return (
    <>
      {/* Floating Chat Button with Animated Shapes */}
      <div className="fixed bottom-8 right-8 z-40">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3,
              delay: shape.delay,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 60 - 30}px`,
              top: `${Math.random() * 60 - 30}px`,
            }}
          >
            {shape.icon}
          </motion.div>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-white relative z-10" />
        </motion.button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-end p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl w-full max-w-md h-96 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                  >
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs text-green-400 flex items-center">
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full mr-2"
                      />
                      Coming Soon
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                          : "bg-white/5 text-gray-300 rounded-bl-none border border-white/10"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-50 mt-1 text-right">
                        {message.timestamp}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-2">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Coming Soon Feature Card */}
                <AnimatePresence>
                  {showComingSoon && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 50, scale: 0.8 }}
                      className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/50 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-white font-bold text-lg">🚀</span>
                        </motion.div>
                        <div className="flex-1">
                          <motion.h4
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-bold text-purple-300 mb-2 text-lg"
                          >
                            Advanced AI Coming Soon!
                          </motion.h4>
                          
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-3 text-sm"
                          >
                            <p className="text-gray-200">
                              We're building something extraordinary with cutting-edge technology:
                            </p>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {["Llama 3.1", "Mixtral 8x22B", "Qwen2 72B", "Gemma 2"].map((tech, index) => (
                                <motion.div
                                  key={tech}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                  className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded"
                                >
                                  <span className="text-green-400">✦</span>
                                  <span>{tech}</span>
                                </motion.div>
                              ))}
                            </div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                              className="mt-3 p-3 bg-black/40 rounded-lg border border-white/10"
                            >
                              <h5 className="font-semibold text-cyan-400 mb-2">Revolutionary Features:</h5>
                              <ul className="text-xs space-y-1">
                                {[
                                  "Real-time behavior analysis",
                                  "Predictive habit optimization",
                                  "Personalized growth plans",
                                  "Advanced pattern recognition"
                                ].map((feature, index) => (
                                  <motion.li
                                    key={feature}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 + index * 0.1 }}
                                    className="flex items-center space-x-2"
                                  >
                                    <span className="text-purple-400">▸</span>
                                    <span>{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.4 }}
                              className="flex justify-between items-center text-xs"
                            >
                              <span className="text-yellow-400">🌟 Estimated Launch: ??/??/20??</span>
                            </motion.div>
                          </motion.div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetChat}
                            className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold transition-all"
                          >
                            Amazing! Can't Wait! ✨
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex space-x-2">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about your habits, goals, or productivity..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                    disabled={showComingSoon || isTyping}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!inputMessage.trim() || showComingSoon || isTyping}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold transition-all flex items-center space-x-2"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </motion.button>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-400 text-center mt-2"
                >
                  Preview Mode • Real AI integration coming soon!
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
