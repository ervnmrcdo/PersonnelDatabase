'use client'
import { AcceptedForm, RejectedForm } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import AcceptedListing from "./ValidatedListing"
import AcceptedFormInstance from "./ValidatedInstance"
import PendingAwardsTable from "../PendingAwardsTable"
import ReturnedListing from "./ReturnedListing"
import ReturnedFormInstance from "./ReturnedFormInstance"



export default function SubmissionsPage() {
    const [selectedAccepted, setSelectedAccepted] = useState<AcceptedForm | null>(null)
    const [selectedReturned, setSelectedReturned] = useState<RejectedForm | null>(null)

    return (
        <div className="p-6">
            <AnimatePresence mode="wait">
                {(!selectedAccepted && !selectedReturned) && (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedListing onSelect={setSelectedAccepted} />
                        <ReturnedListing onSelect={setSelectedReturned} />
                        <PendingAwardsTable />
                    </motion.div>
                )}

                {(selectedAccepted && !selectedReturned) && (
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

                {(!selectedAccepted && selectedReturned) && (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ReturnedFormInstance data={selectedReturned} onBack={() => setSelectedReturned(null)} />

                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    )
}
