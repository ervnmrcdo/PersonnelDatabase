import { FC } from "react";
import EditableAwardForm from "./EditableAwardForm";
import { Author, Award, Publication, RawData } from "@/lib/types";
import { transformToIPAFormData } from "@/utils/transformRawData";
import { handleDownload } from "@/utils/handleDownload";
import handleSubmit from "@/utils/handleSubmit";
import handleResubmit from "@/utils/handleResubmit";
import SubmissionLogs from "../SubmissionLogs";

interface FormEditingProps {
  handleBack: () => void;
  selectedAward: Award;
  selectedPublication: Publication;
  autoData: Author;
}

const FormEditing: FC<FormEditingProps> = ({
  handleBack,
  selectedAward,
  selectedPublication,
  autoData,

}) => {

  const foo: RawData = {
    applicant: autoData,
    authors: selectedPublication.publication_authors,
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
            <strong>Applicant:</strong> {selectedPublication.publication_authors[0].firstName + ' ' + selectedPublication.publication_authors[0].lastName}
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
            initialData={transformToIPAFormData(foo)}
            onSubmit={handleSubmit}
            onResubmit={handleResubmit}
            onDownload={handleDownload}
            isResubmitting={false}
            submission_id=''
            logs={null}
          />
        </div>
      </div>
    </>
  );
};

export default FormEditing;
