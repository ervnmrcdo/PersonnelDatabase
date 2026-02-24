import { Dispatch, FC, SetStateAction } from "react";
import EditableAwardForm from "./EditableAwardForm";
import { Author, Award, Publication, RawData } from "@/lib/types";
import { transformToIPAFormData } from "@/utils/transformRawData";
import { handleDownload } from "@/utils/handleDownload";
import handleSubmit from "@/utils/handleSubmit";
import handleResubmit from "@/utils/handleResubmit";
import { useAuth } from "@/context/AuthContext";

interface FormEditingProps {
  handleBack: () => void;
  setStep: (value: SetStateAction<"awards" | "publications" | "form">) => void;
  selectedAward: Award;
  selectedPublication: Publication;
  autoData: Author;
}

const FormEditing: FC<FormEditingProps> = ({
  handleBack,
  setStep,
  selectedAward,
  selectedPublication,
  autoData,

}) => {

  const foo: RawData = {
    applicant: autoData,
    authors: selectedPublication.users,
    selectedPublication: selectedPublication,
    selectedAward: selectedAward,
    shouldSubmit: false,
  }


  return (
    <>
      <button
        onClick={handleBack}
        className="text-sm text-blue-600 mb-4 hover:underline"
      >
        ← Back to Publications
      </button>
      <h1 className="text-2xl font-bold mb-6">
        {selectedAward?.title} Application
      </h1>

      {/* Placeholder for the auto-filled form */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Auto-filled Award Form</h2>

        <div className="text-gray-600 space-y-2">
          <p>
            <strong>Applicant:</strong> {selectedPublication.users[0].first_name + ' ' + selectedPublication.users[0].last_name}
          </p>
          <p>
            <strong>Selected Award:</strong> {selectedAward?.title}
          </p>
          <p>
            <strong>Publication Title:</strong> {selectedPublication?.title}
          </p>
          <p>
            <strong>Date of Publication:</strong> {selectedPublication?.date_published}
          </p>
        </div>
        <div className="mt-6 border rounded-lg overflow-visible">
          <EditableAwardForm
            setStep={setStep}
            initialData={transformToIPAFormData(foo)}
            onSubmit={handleSubmit}
            onResubmit={handleResubmit}
            onDownload={handleDownload}
            isResubmitting={false}
            publication_id={foo.selectedPublication.publication_id}
            submission_id='1'
            submitter_id={useAuth().user!.id.toString()}
            logs={null}
          />
        </div>
      </div>
    </>
  );
};

export default FormEditing;
