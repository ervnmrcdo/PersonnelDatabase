import { FC } from "react";
import EditableAwardForm from "./EditableAwardForm";
import { Author, Award, Publication, RawData } from "@/lib/types";
import { transformToIPAFormData } from "@/utils/transformRawData";

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
  const handleDownload = async (data: any, shouldSubmit: boolean) => {
    try {
      const response = await fetch("/api/generate-ipc-award/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (shouldSubmit) {
        if (response.ok) {
          alert('Form successfully Submitted.')
        } else {
          alert('Failed to submit application.')
        }
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ipc-award-form.pdf";
      a.click();

    } catch (err) {
      alert('Submission Failed');
      console.log(`Internal Server Error: ${err}`)
    }
  };

  const foo: RawData = {
    applicant: autoData,
    authors: selectedPublication.authors,
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
            <strong>Applicant:</strong> {selectedPublication.authors[0].firstName + ' ' + selectedPublication.authors[0].lastName}
          </p>
          <p>
            <strong>Selected Award:</strong> {selectedAward?.title}
          </p>
          <p>
            <strong>Publication Title:</strong> {selectedPublication?.title}
          </p>
          <p>
            <strong>Date of Publication:</strong> {selectedPublication?.date}
          </p>
        </div>
        <div className="mt-6 border rounded-lg overflow-visible">
          <EditableAwardForm
            initialData={transformToIPAFormData(foo)}
            shouldSubmit={false}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </>
  );
};

export default FormEditing;
