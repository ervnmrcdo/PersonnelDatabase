'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { DocxEditor, type DocxEditorRef } from '@eigenpal/docx-js-editor';
import '@eigenpal/docx-js-editor/styles.css';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useAwardsFlow } from '@/context/AwardsFlowContext';

interface Form43EditorProps {
  onNext: (file: File) => void;
  onBack: () => void;
  isJournal: boolean;
}

export default function Form43Editor({ onNext, onBack, isJournal }: Form43EditorProps) {
  const { setFormStep } = useAwardsFlow();
  const [isLoading, setIsLoading] = useState(true);
  const [documentBuffer, setDocumentBuffer] = useState<ArrayBuffer | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<DocxEditorRef>(null);

  useEffect(() => {
    fetch('/IPA-Form4.3-2023Rev042023-1.docx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        setDocumentBuffer(buffer);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load document:', err);
        setIsLoading(false);
      });
  }, []);

  const handleNext = useCallback(async () => {
    if (!editorRef.current) return;
    
    setIsSaving(true);
    try {
      const buffer = await editorRef.current.save();
      if (!buffer) {
        console.error('No buffer returned from save');
        return;
      }
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const file = new File([blob], 'Form4.3.docx');
      setFormStep('review');
      onNext(file);
    } catch (error) {
      console.error('Failed to export document:', error);
    } finally {
      setIsSaving(false);
    }
  }, [onNext, setFormStep]);

  const handleBackClick = () => {
    if (isJournal) {
      setFormStep('form42');
    } else {
      setFormStep('form44');
    }
    onBack();
  };

  const backLabel = isJournal ? 'Back to Form 4.2' : 'Back to Form 4.4';

  if (isLoading || !documentBuffer) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-400">Loading form...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Form 4.3 - Certification</h2>
        <span className="text-sm text-gray-400">
          {isJournal ? 'Step 3 of 4' : 'Step 2 of 3'}
        </span>
      </div>

      <div className="bg-[#1b1e2b] rounded-lg overflow-hidden" style={{ height: '600px' }}>
        <DocxEditor
          ref={editorRef}
          documentBuffer={documentBuffer}
          mode="editing"
          onChange={() => {}}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleBackClick}
          className="flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {backLabel}
        </button>
        
        <button
          onClick={handleNext}
          disabled={isSaving}
          className="flex items-center px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Review & Submit
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
