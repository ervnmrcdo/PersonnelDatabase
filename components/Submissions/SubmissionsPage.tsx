'use client'
import { AcceptedForm, RejectedForm } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import AcceptedListing from "./ValidatedListing"
import PendingAwardsTable from "../PendingAwardsTable"
import ReturnedListing from "./ReturnedListing"
import SubmissionLogs from "../SubmissionLogs"
import dynamic from 'next/dynamic'
import { SubmissionsFlowProvider, useSubmissionsFlow } from "@/context/SubmissionsFlowContext"
import { AwardsFlowProvider } from "@/context/AwardsFlowContext"

const AcceptedFormInstance = dynamic(() => import('./ValidatedInstance'), { ssr: false })
const ReturnedFormInstance = dynamic(() => import('./ReturnedFormInstance'), { ssr: false })



function SubmissionsPageContent() {
    const { selected, setSelected } = useSubmissionsFlow()
    const selectedAccepted = selected && !('pdf_json_data' in selected) ? selected as AcceptedForm : null
    const selectedReturned = selected && 'pdf_json_data' in selected ? selected as RejectedForm : null

    return (
        <div className="p-6">
            <AnimatePresence mode="wait">
                {!selected && (
                    <motion.div
                        key='list'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedListing onSelect={setSelected} />
                        <ReturnedListing onSelect={setSelected} />
                        <PendingAwardsTable />
                    </motion.div>
                )}

                {selectedAccepted && (
                    <motion.div
                        key='accepted'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AcceptedFormInstance data={selectedAccepted} onBack={() => setSelected(null)} />
                        <SubmissionLogs logs={selectedAccepted.logs} />
                    </motion.div>
                )}

                {selectedReturned && (
                    <motion.div
                        key='returned'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ReturnedFormInstance data={selectedReturned} onBack={() => setSelected(null)} />
                        <SubmissionLogs logs={selectedReturned.logs} />
                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    )
}

export default function SubmissionsPage() {
    return (
        <SubmissionsFlowProvider>
            <AwardsFlowProvider>
                <SubmissionsPageContent />
            </AwardsFlowProvider>
        </SubmissionsFlowProvider >
    )
}
