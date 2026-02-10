'use client'
import { AcceptedForm, RejectedForm } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import AcceptedListing from "./AcceptedListing"
import AcceptedFormInstance from "./AcceptedInstance"
import { useEffect } from "react"
import PendingAwardsTable from "../PendingAwardsTable"
import RejectedListing from "./RejectedListing"
import RejectedFormInstance from "./RejectedFormInstance"



export default function SubmissionsPage() {
    const [selectedAccepted, setSelectedAccepted] = useState<AcceptedForm | null>(null)
    const [selectedRejected, setSelectedRejected] = useState<RejectedForm | null>(null)

    return (
        <div className="p-6">
            <AnimatePresence mode="wait">
                {(!selectedAccepted && !selectedRejected) && (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedListing onSelect={setSelectedAccepted} />
                        <RejectedListing onSelect={setSelectedRejected} />
                        <PendingAwardsTable />
                    </motion.div>
                )}

                {(selectedAccepted && !selectedRejected) && (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedFormInstance data={selectedAccepted} onBack={() => setSelectedAccepted(null)} />

                    </motion.div>
                )}

                {(!selectedAccepted && selectedRejected) && (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <RejectedFormInstance data={selectedRejected} onBack={() => setSelectedRejected(null)} />

                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    )
}
