// src/components/work/WorkFilterBar.jsx

import React from "react";
import { motion } from "framer-motion";

export default function WorkFilterBar({ tags = [], active, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 mt-8 mb-10">
      {tags.map((t, i) => (
        <motion.button
          key={t}
          onClick={() => onChange(t)}
          className={`
            px-4 py-2 rounded-full border text-sm
            transition-all
            ${active === t
              ? "bg-white text-black border-white"
              : "border-neutral-700 text-neutral-300 hover:border-neutral-500"}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          {t}
        </motion.button>
      ))}
    </div>
  );
}
