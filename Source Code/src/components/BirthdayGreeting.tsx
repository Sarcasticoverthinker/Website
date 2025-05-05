import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import ReactSound from 'react-sound'; // Import sound effects

const messages = [
  "Hello Khadijah,",
  "It's Your Special Day, Yeyey!",
  "I had to make something unforgettable for you, because you are so special to me!",
  "Do you want to see what I've created just for you?"
];

const BirthdayGreeting = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Confetti state
  const [soundPlaying, setSoundPlaying] = useState(false); // For playing sound effects
  const navigate = useNavigate();

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        if (currentMessageIndex === messages.length - 1) {
          setShowButtons(true);
        } else {
          setCurrentMessageIndex((prev) => prev + 1);
        }
      }, 5000); // Display each message for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  const handleYesButtonClick = () => {
    setShowButtons(false);
    setShowFinalMessage(true);
    setShowConfetti(true); // Trigger confetti
    setSoundPlaying(true); // Play sound on button click
    setTimeout(() => {
      navigate('/surprise');
    }, 3000);
  };

  const handleNoButtonClick = () => {
    setShowButtons(false);
    setTimeout(() => {
      alert("Nah, you will have to see it!"); // Display funny message
      handleYesButtonClick(); // Proceed to the surprise
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-700 to-indigo-600 flex items-center justify-center relative overflow-hidden">
      {showConfetti && (
        <Confetti
          colors={['#9b4dca', '#7a3f9f', '#c084fc', '#d4d1e3']} // Purple-themed confetti
        />
      )}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw' }}
            animate={{
              y: '-10vh',
              x: Math.random() * 100 + 'vw',
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Heart className="text-purple-300" size={24} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full mx-4">
        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center"
            >
              <Sparkles className="inline-block text-purple-400 mb-4" size={32} />
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-2xl font-semibold text-purple-800 mb-6"
              >
                {messages[currentMessageIndex]}
              </motion.p>

              {showButtons && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="space-x-4"
                >
                  <motion.button
                    onClick={handleYesButtonClick}
                    className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transform hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Yes! Show me!
                  </motion.button>
                  <motion.button
                    onClick={handleNoButtonClick}
                    className="px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transform hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    No, thank you!
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center"
            >
              <motion.p className="text-2xl font-semibold text-purple-700 mb-6">
                Have a look at it, Khadijah! 🎉✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sound effect for button click */}
      {soundPlaying && (
        <ReactSound
          url="/sounds/button-click.mp3" // Add path to your sound file here
          playStatus={ReactSound.status.PLAYING}
          onFinishedPlaying={() => setSoundPlaying(false)}
        />
      )}
    </div>
  );
};

export default BirthdayGreeting;
