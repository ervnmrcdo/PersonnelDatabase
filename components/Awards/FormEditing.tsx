import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditableAwardForm from "./EditableAwardForm";
import Form42Editor from "./Form42Editor";
import Form43Editor from "./Form43Editor";
import Form44Editor from "./Form44Editor";
import FormReview from "./FormReview";
import { Author, Award, Publication, RawData, IPAFormData } from "@/lib/types";
import { transformToIPAFormData } from "@/utils/transformRawData";
import { handleDownload } from "@/utils/handleDownload";
import handleSubmit from "@/utils/handleSubmit";
import handleResubmit from "@/utils/handleResubmit";
import { useAuth } from "@/context/AuthContext";
import { useAwardsFlow } from "@/context/AwardsFlowContext";

interface FormEditingProps {
  handleBack: () => void;
  selectedAward: Award;
  selectedPublication: Publication;
  autoData: Author;
}

interface MultiFormData {
  form41: IPAFormData;
  form42: File | null;
  form43: File | null;
  form44: File | null;
}

const FormEditing: FC<FormEditingProps> = ({
  handleBack,
  selectedAward,
  selectedPublication,
  autoData,
}) => {
  const { formStep, setFormStep, isJournal, setIsJournal } = useAwardsFlow();
  const { user } = useAuth();

  const isJournalType = selectedAward.id === 1;
  const isBookType = selectedAward.id === 2;

  const foo: RawData = {
    applicant: autoData,
    authors: selectedPublication.users,
    selectedPublication: selectedPublication,
    selectedAward: selectedAward,
    shouldSubmit: false,
  };

  const [multiFormData, setMultiFormData] = useState<MultiFormData>({
    form41: transformToIPAFormData(foo),
    form42: null,
    form43: null,
    form44: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsJournal(isJournalType);
    
    if (isBookType) {
      setFormStep('form44');
    } else {
      setFormStep('form41');
    }
  }, [selectedAward.id, isJournalType, isBookType, setFormStep, setIsJournal]);

  const handleForm41Submit = (
    submitter_id: string,
    submission_id: string,
    publication_id: string,
    data: { ipaData: IPAFormData; isResubmitting: boolean },
    actor_name: string
  ) => {
    setMultiFormData(prev => ({
      ...prev,
      form41: data.ipaData,
    }));

    setFormStep('form42');
  };

  const handleForm42Next = (file: File) => {
    setMultiFormData(prev => ({
      ...prev,
      form42: file,
    }));
    setFormStep('form43');
  };

  const handleForm44Next = (file: File) => {
    setMultiFormData(prev => ({
      ...prev,
      form44: file,
    }));
    setFormStep('form43');
  };

  const handleForm43Next = (file: File) => {
    setMultiFormData(prev => ({
      ...prev,
      form43: file,
    }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const actor_name = user ? `${user.email}` : 'Unknown';
      await handleSubmit(
        user!.id.toString(),
        selectedAward.id.toString(),
        selectedPublication.publication_id,
        {
          ipaData: multiFormData.form41,
          isResubmitting: false,
          form42: multiFormData.form42,
          form43: multiFormData.form43,
          form44: multiFormData.form44,
        },
        actor_name
      );
      
      if (isBookType) {
        setFormStep('form44');
      } else {
        setFormStep('form41');
      }
      handleBack();
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackFromForm = () => {
    // Navigation handled by the formStep context
  };

  const getAnimationKey = () => {
    if (isJournalType) {
      return formStep;
    } else if (isBookType) {
      if (formStep === 'form43') return 'form43-book';
      if (formStep === 'review') return 'review-book';
      return formStep;
    }
    return formStep;
  };

  return (
    <>
      <button
        onClick={() => {
          if (formStep === 'form41') {
            handleBack();
          } else if (formStep === 'form42') {
            setFormStep('form41');
          } else if (formStep === 'form44') {
            handleBack();
          } else if (formStep === 'form43') {
            if (isJournalType) {
              setFormStep('form42');
            } else {
              setFormStep('form44');
            }
          } else if (formStep === 'review') {
            setFormStep('form43');
          }
        }}
        className="text-sm text-blue-600 mb-4 hover:underline"
      >
        ← Back to {formStep === 'form41' || formStep === 'form44' ? 'Publications' : 'Previous Form'}
      </button>

      <h1 className="text-2xl font-bold mb-2 text-white">
        {selectedAward?.title} Application
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isJournalType
          ? 'Journal Publication (Forms 4.1 → 4.2 → 4.3 → Review → Submit)'
          : 'Book Publication (Forms 4.4 → 4.3 → Review → Submit)'}
      </p>

      <div className="bg-[#1b1e2b] shadow-md rounded-xl p-6">
        <AnimatePresence mode="wait">
          {formStep === 'form41' && isJournalType && (
            <motion.div
              key="form41"
              initial={{ x: formStep === 'form41' ? 0 : 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EditableAwardForm
                initialData={multiFormData.form41}
                onSubmit={handleForm41Submit}
                onResubmit={handleResubmit}
                onDownload={handleDownload}
                isResubmitting={false}
                publication_id={selectedPublication.publication_id}
                submission_id="1"
                submitter_id={user?.id?.toString() || ''}
                logs={null}
              />
            </motion.div>
          )}

          {formStep === 'form42' && isJournalType && (
            <motion.div
              key="form42"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Form42Editor
                onNext={handleForm42Next}
                onBack={handleBackFromForm}
              />
            </motion.div>
          )}

          {formStep === 'form44' && isBookType && (
            <motion.div
              key="form44"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Form44Editor
                onNext={handleForm44Next}
                onBack={handleBackFromForm}
              />
            </motion.div>
          )}

          {formStep === 'form43' && (
            <motion.div
              key={getAnimationKey()}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Form43Editor
                onNext={handleForm43Next}
                onBack={handleBackFromForm}
                isJournal={isJournalType}
              />
            </motion.div>
          )}

          {formStep === 'review' && (
            <motion.div
              key={getAnimationKey()}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormReview
                onSubmit={handleFinalSubmit}
                onBack={handleBackFromForm}
                isJournal={isJournalType}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FormEditing;
