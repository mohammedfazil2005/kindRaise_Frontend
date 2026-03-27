'use client';

import { motion } from 'framer-motion';
const steps = [
  {
    number: '1',
    title: 'Create Your Campaign',
    description: 'Start a fundraising campaign in minutes by adding your story, goal, and details.',
  },
  {
    number: '2',
    title: 'Share with Your Community',
    description: 'Spread your campaign through social media, WhatsApp, and email to reach more donors.',
  },
  {
    number: '3',
    title: 'Receive Donations & Make Impact',
    description: 'Collect funds securely and use them to create meaningful change in people’s lives.',
  },
];

const StepCard = ({ step, index }: { step: (typeof steps)[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      {/* Curved line */}
      <motion.svg
        width="150"
        height="60"
        viewBox="0 0 150 60"
        className="mb-4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
        viewport={{ once: true }}
      >
        <path
          d="M 10 50 Q 75 10 140 50"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Number */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
        viewport={{ once: true }}
        className="mb-6 flex items-center justify-center"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="absolute">
          <text
            x="50"
            y="70"
            fontSize="80"
            fontWeight="bold"
            textAnchor="middle"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {step.number}
          </text>
        </svg>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
          className="text-6xl font-bold text-white relative z-10"
        >
          {step.number}
        </motion.span>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        viewport={{ once: true }}
        className="mb-3 text-xl font-semibold text-white"
      >
        {step.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
        className="text-sm leading-relaxed text-gray-300 max-w-xs"
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
};

export default function HomeTwo() {
  return (
    <main className=" bg-gradient-to-br  h-screen from-emerald-700 via-emerald-600 to-emerald-800 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs tracking-widest text-gray-300 uppercase font-semibold mb-4"
          >
           How KindRaise Works
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-2 leading-tight"
          >
             Three simple steps to{" "}
  <span className="text-emerald-400">make a difference</span>
          </motion.h1>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
