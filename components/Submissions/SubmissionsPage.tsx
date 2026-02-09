'use client'
import { AcceptedAward } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import AcceptedListing from "./AcceptedListing"
import AcceptedFormInstance from "./AcceptedInstance"
import { useEffect } from "react"
import PendingAwardsTable from "../PendingAwardsTable"





export default function SubmissionsPage() {
    const [selected, setSelected] = useState<AcceptedAward | null>(null)

    return (
        <div className="p-6">
            <AnimatePresence mode="wait">
                {!selected ? (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedListing onSelect={setSelected} />
                        <PendingAwardsTable />

                    </motion.div>
                ) : (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedFormInstance data={selected} onBack={() => setSelected(null)} />

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
