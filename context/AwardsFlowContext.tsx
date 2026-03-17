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
}

const AwardsFlowContext = createContext<AwardsFlowContextValue | undefined>(undefined)

export function AwardsFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<AwardsStep>('awards')
  const [formStep, setFormStep] = useState<FormStep>('form44')
  const [isJournal, setIsJournal] = useState(true)

  return (
    <AwardsFlowContext.Provider value={{ step, setStep, formStep, setFormStep, isJournal, setIsJournal }}>
      {children}
    </AwardsFlowContext.Provider>
  )
}

export function useAwardsFlow() {
  const ctx = useContext(AwardsFlowContext)
  if (!ctx) throw new Error('useAwardsFlow must be used within AwardsFlowProvider')
  return ctx
}
