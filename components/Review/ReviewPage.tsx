"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Application } from "@/lib/types";
import ListedApplications from "@/components/Review/ListedApplications";
import SubmissionLogs from "../SubmissionLogs";
import dynamic from 'next/dynamic';
import { ReviewFlowProvider, useReviewFlow } from "@/context/ReviewFlowContext";

const ReviewInstance = dynamic(() => import('@/components/Review/ReviewInstance'), { ssr: false });

function ReviewPageContent() {
  const { selected, setSelected } = useReviewFlow()

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

export default function ReviewPage() {
  return (
    <ReviewFlowProvider>
      <ReviewPageContent />
    </ReviewFlowProvider>
  )
}
