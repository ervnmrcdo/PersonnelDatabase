'use client'

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { Application } from '@/lib/types'

export type ReviewSelected = Application | null

interface ReviewFlowContextValue {
  selected: ReviewSelected
  setSelected: Dispatch<SetStateAction<ReviewSelected>>
}

const ReviewFlowContext = createContext<ReviewFlowContextValue | undefined>(undefined)

export function ReviewFlowProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ReviewSelected>(null)

  return (
    <ReviewFlowContext.Provider value={{ selected, setSelected }}>
      {children}
    </ReviewFlowContext.Provider>
  )
}

export function useReviewFlow() {
  const ctx = useContext(ReviewFlowContext)
  if (!ctx) throw new Error('useReviewFlow must be used within ReviewFlowProvider')
  return ctx
}
