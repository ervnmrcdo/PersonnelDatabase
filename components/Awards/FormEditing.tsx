import { FC } from "react";

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

interface FormEditingProps {
  handleBack: () => void;
  selectedAward: Award | null;
  selectedPublication: Publication | null;
}

const FormEditing: FC<FormEditingProps> = ({
  handleBack,
  selectedAward,
  selectedPublication,
}) => {
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

        <div className="mt-6 border rounded-lg overflow-hidden">
          <iframe
            src="/forms/ipc-award-form.pdf"
            className="w-full h-[600px]"
            title="IPC Award Application Form"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default FormEditing;
