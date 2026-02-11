"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Application } from "@/lib/types";
import ListedApplications from "@/components/Review/ListedApplications";
import ReviewInstance from "@/components/Review/ReviewInstance";
import SubmissionLogs from "../SubmissionLogs";

export default function ReviewPage() {
  const [selected, setSelected] = useState<Application | null>(null);

  return (
    <div className="p-6">
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="list"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ListedApplications onSelect={setSelected} />
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewInstance data={selected} onBack={() => setSelected(null)} />
            <SubmissionLogs logs={selected.logs} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
