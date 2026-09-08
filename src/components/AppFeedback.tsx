// AppFeedback.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Feedback = {
  message: string;
  emoji: string;
  timestamp: string;
};

const EMOJIS = ["👍", "❤️", "🚀", "🌟", "💡"];

export default function AppFeedback() {
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("👍");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [showThanks, setShowThanks] = useState(false);

  // Load feedback from localStorage
  useEffect(() => {
    const storedFeedback = localStorage.getItem("appFeedback");
    if (storedFeedback) setFeedbackList(JSON.parse(storedFeedback));
  }, []);

  const saveFeedback = (newList: Feedback[]) => {
    localStorage.setItem("appFeedback", JSON.stringify(newList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFeedback: Feedback = {
      message: message.trim(),
      emoji,
      timestamp: new Date().toISOString(),
    };

    const updatedList = [newFeedback, ...feedbackList];
    setFeedbackList(updatedList);
    saveFeedback(updatedList);
    setMessage("");
    setEmoji("👍");

    // Show thanks message
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">💬 App Feedback</h1>

      {/* Thank You Toast */}
      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg z-50"
          >
            Thank you for your feedback! 🚀
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4"
      >
        <label className="block mb-1 font-semibold text-indigo-300 text-lg">
          Your Feedback
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none placeholder-gray-400 resize-none"
          placeholder="Write your feedback here..."
          rows={4}
        />

        {/* Emoji Selector */}
        <div className="flex items-center gap-3">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              className={`text-2xl transition-transform ${
                emoji === e ? "scale-125" : "hover:scale-110"
              }`}
              onClick={() => setEmoji(e)}
            >
              {e}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors w-full py-3 rounded-xl font-bold text-lg"
        >
          Submit Feedback
        </button>
      </form>

      {/* Feedback List */}
      <div className="max-w-xl mx-auto mt-12 space-y-4">
        {feedbackList.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">No feedback yet. Be the first! ✨</p>
        ) : (
          feedbackList.map((fb, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 p-4 rounded-2xl shadow-md hover:shadow-indigo-500/50 transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl">{fb.emoji}</span>
                <span className="text-gray-400 text-sm">
                  {new Date(fb.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-200 text-lg">{fb.message}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
