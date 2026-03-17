'use client';

import { FileText, ChevronLeft, Send, Loader2 } from 'lucide-react';
import { useAwardsFlow } from '@/context/AwardsFlowContext';

interface FormReviewProps {
  onSubmit: () => void;
  onBack: () => void;
  isJournal: boolean;
  isSubmitting: boolean;
}

export default function FormReview({ onSubmit, onBack, isJournal, isSubmitting }: FormReviewProps) {
  const { setFormStep } = useAwardsFlow();

  const handleBack = () => {
    setFormStep('form43');
    onBack();
  };

  const formsList = isJournal ? (
    <>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <FileText className="w-6 h-6 text-blue-400 mr-3" />
        <div>
          <p className="font-medium text-white">Form 4.1 - IPA Award Application</p>
          <p className="text-sm text-gray-400">PDF Document</p>
        </div>
        <span className="ml-auto text-green-400 text-sm">✓ Completed</span>
      </div>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <FileText className="w-6 h-6 text-blue-400 mr-3" />
        <div>
          <p className="font-medium text-white">Form 4.2 - Journal Certification</p>
          <p className="text-sm text-gray-400">DOCX Document</p>
        </div>
        <span className="ml-auto text-green-400 text-sm">✓ Completed</span>
      </div>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <FileText className="w-6 h-6 text-blue-400 mr-3" />
        <div>
          <p className="font-medium text-white">Form 4.3 - Certification</p>
          <p className="text-sm text-gray-400">DOCX Document</p>
        </div>
        <span className="ml-auto text-green-400 text-sm">✓ Completed</span>
      </div>
    </>
  ) : (
    <>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <FileText className="w-6 h-6 text-blue-400 mr-3" />
        <div>
          <p className="font-medium text-white">Form 4.4 - Book Certification</p>
          <p className="text-sm text-gray-400">DOCX Document</p>
        </div>
        <span className="ml-auto text-green-400 text-sm">✓ Completed</span>
      </div>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <FileText className="w-6 h-6 text-blue-400 mr-3" />
        <div>
          <p className="font-medium text-white">Form 4.3 - Certification</p>
          <p className="text-sm text-gray-400">DOCX Document</p>
        </div>
        <span className="ml-auto text-green-400 text-sm">✓ Completed</span>
      </div>
    </>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Review Your Application</h2>
          <p className="text-gray-400 mt-1">Please review all forms before submitting</p>
        </div>
        <span className="text-sm text-gray-400">Final Step</span>
      </div>

      <div className="bg-[#1b1e2b] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Completed Forms</h3>
        <div className="space-y-3">
          {formsList}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-900/30 border border-blue-800 rounded-lg">
        <p className="text-blue-300 text-sm">
          <strong>Note:</strong> Once you submit, all forms will be sent for review. 
          You won't be able to make changes after submission.
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Form 4.3
        </button>
        
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit All Forms
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
