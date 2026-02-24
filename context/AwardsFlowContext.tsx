'use client'

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

export type AwardsStep = 'awards' | 'publications' | 'form'

interface AwardsFlowContextValue {
  step: AwardsStep
  setStep: Dispatch<SetStateAction<AwardsStep>>
}

const AwardsFlowContext = createContext<AwardsFlowContextValue | undefined>(undefined)

export function AwardsFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<AwardsStep>('awards')

  return (
    <AwardsFlowContext.Provider value={{ step, setStep }}>
      {children}
    </AwardsFlowContext.Provider>
  )
}

export function useAwardsFlow() {
  const ctx = useContext(AwardsFlowContext)
  if (!ctx) throw new Error('useAwardsFlow must be used within AwardsFlowProvider')
  return ctx
}
