"use client"

import { motion, AnimatePresence } from "framer-motion"

interface HandPlacementGuideProps {
  show: boolean
}

export default function HandPlacementGuide({ show }: HandPlacementGuideProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-slate-800 rounded-2xl p-8 max-w-2xl mx-4"
          >
            <motion.h3
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white mb-6 text-center"
            >
              Hand Placement Guide
            </motion.h3>

            <div className="space-y-6">
              {/* Blurred Hands Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative h-48 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 blur-[2px]"
                  style={{ backgroundImage: "url('/placeholder.svg?height=300&width=500')" }}
                ></div>
                <div className="relative z-10 text-center text-white">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg font-medium"
                  >
                    Place your hands on the home row
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm text-slate-300 mt-2"
                  >
                    Fingers on A-S-D-F and J-K-L-;
                  </motion.p>
                </div>
              </motion.div>

              {/* Keyboard Layout */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900 rounded-xl p-6"
              >
                <div className="grid grid-cols-10 gap-1 text-center text-sm">
                  {/* Top Row */}
                  <div className="col-span-10 grid grid-cols-10 gap-1 mb-2">
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key, i) => (
                      <motion.div
                        key={key}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className="bg-slate-700 text-slate-300 p-2 rounded"
                      >
                        {key}
                      </motion.div>
                    ))}
                  </div>

                  {/* Home Row */}
                  <div className="col-span-10 grid grid-cols-10 gap-1 mb-2">
                    {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"].map((key, i) => (
                      <motion.div
                        key={key}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        className={`p-2 rounded ${
                          ["F", "J"].includes(key)
                            ? "bg-amber-400 text-slate-900 font-bold"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {key}
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Row */}
                  <div className="col-span-10 grid grid-cols-10 gap-1">
                    {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map((key, i) => (
                      <motion.div
                        key={key}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.05 }}
                        className="bg-slate-700 text-slate-300 p-2 rounded"
                      >
                        {key}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-slate-300 space-y-3 text-lg"
              >
                {[
                  { text: "Place your left fingers on A S D F", highlight: "A S D F" },
                  { text: "Place your right fingers on J K L ;", highlight: "J K L ;" },
                  { text: "Feel the bumps on F and J keys", highlight: "F and J" },
                  { text: "Press any key to start typing!", highlight: "any key" },
                ].map((instruction, index) => (
                  <motion.p
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>
                      {instruction.text.split(instruction.highlight)[0]}
                      <strong className="text-amber-400">{instruction.highlight}</strong>
                      {instruction.text.split(instruction.highlight)[1]}
                    </span>
                  </motion.p>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center mt-6"
            >
              <p className="text-slate-400 text-lg">This guide will disappear when you press any key</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
