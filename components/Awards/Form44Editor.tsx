'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { DocxEditor, type DocxEditorRef } from '@eigenpal/docx-js-editor';
import '@eigenpal/docx-js-editor/styles.css';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useAwardsFlow } from '@/context/AwardsFlowContext';

interface Form44EditorProps {
  onNext: (file: File) => void;
  onBack: () => void;
}

export default function Form44Editor({ onNext, onBack }: Form44EditorProps) {
  const { setFormStep } = useAwardsFlow();
  const [isLoading, setIsLoading] = useState(true);
  const [documentBuffer, setDocumentBuffer] = useState<ArrayBuffer | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<DocxEditorRef>(null);

  useEffect(() => {
    fetch('/IPA-Form4.4_2021Rev072021.docx')
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

  const handleExport = useCallback(async () => {
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
      const file = new File([blob], 'Form4.4.docx');
      onNext(file);
    } catch (error) {
      console.error('Failed to export document:', error);
    } finally {
      setIsSaving(false);
    }
  }, [onNext]);

  const handleBackClick = () => {
    onBack();
  };

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
        <h2 className="text-xl font-bold text-white">Form 4.4 - Book Certification</h2>
        <span className="text-sm text-gray-400">Step 1 of 2</span>
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
          Back to Publications
        </button>
        
        <button
          onClick={handleExport}
          disabled={isSaving}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Next: Form 4.3
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
