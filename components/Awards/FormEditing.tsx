import { FC } from "react";
import EditableAwardForm from "./EditableAwardForm";

interface Award {
  id: number;
  title: string;
  description: string;
}

interface Publication {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface Data {
  userName?: string;
  awardTitle?: string;
  pubTitle?: string;
  pubDate?: string;
  pubDescription?: string;
}
interface FormEditingProps {
  handleBack: () => void;
  selectedAward: Award | null;
  selectedPublication: Publication | null;
  autoData: Data;
}
const FormEditing: FC<FormEditingProps> = ({
  handleBack,
  selectedAward,
  selectedPublication,
  autoData,
}) => {
  const handleDownload = async (data: any) => {
    const response = await fetch("/api/generate-award-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ipc-award-form.pdf";
    a.click();
  };

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
            <strong>Applicant:</strong> Joe Burrow (from session or DB)
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
            initialData={{
              applicantName: autoData.userName,
              awardType: selectedAward?.title,
              publicationTitle: selectedPublication?.title,
              publicationDate: selectedPublication?.date,
              description: selectedPublication?.description,
            }}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </>
  );
};

export default FormEditing;
