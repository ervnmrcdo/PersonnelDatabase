'use client'

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

export type AwardsStep = 'awards' | 'publications' | 'form'

export type FormStep = 'form41' | 'form42' | 'form43' | 'form44' | 'review'

interface AwardsFlowContextValue {
  step: AwardsStep
  setStep: Dispatch<SetStateAction<AwardsStep>>
  formStep: FormStep
  setFormStep: Dispatch<SetStateAction<FormStep>>
  isJournal: boolean
  setIsJournal: Dispatch<SetStateAction<boolean>>
  draftId: string | null
  setDraftId: Dispatch<SetStateAction<string | null>>
  draftUrls: Record<string, string | null>
  setDraftUrls: Dispatch<SetStateAction<Record<string, string | null>>>
}

const AwardsFlowContext = createContext<AwardsFlowContextValue | undefined>(undefined)

export function AwardsFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<AwardsStep>('awards')
  const [formStep, setFormStep] = useState<FormStep>('form44')
  const [isJournal, setIsJournal] = useState(true)
  const [draftId, setDraftId] = useState<string | null>(null)
  const [draftUrls, setDraftUrls] = useState<Record<string, string | null>>({})

  return (
    <AwardsFlowContext.Provider value={{ step, setStep, formStep, setFormStep, isJournal, setIsJournal, draftId, setDraftId, draftUrls, setDraftUrls }}>
      {children}
    </AwardsFlowContext.Provider>
  )
}

export function useAwardsFlow() {
  const ctx = useContext(AwardsFlowContext)
  if (!ctx) throw new Error('useAwardsFlow must be used within AwardsFlowProvider')
  return ctx
}
