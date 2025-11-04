import Image from "next/image";
import { useState } from "react";
import IpaFormTemplate from "./IpaAwardTemplate";

interface Author {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  university?: string;
  college?: string;
  department?: string;
}

interface ApplicantData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  university?: string;
  college?: string;
  department?: string;
  position: string;
  contactNo: string;
  emailAddress: string;
}
interface Award {
  id: number;
  title: string;
  description: string;
}

interface Publication {
  authors: Author[];
  id: number;
  title: string;
  date: string;
  journalName: string;
  volumeNumber: string;
  pageNumber: string;
}

interface EditableAwardFormProps {
  initialData: {
    applicant: ApplicantData;
    authors: Author[];
    selectedPublication: Publication;
    selectedAward: Award | null;
  };
  onDownload: (data: any) => void;
}

export default function EditableAwardForm({
  initialData,
  onDownload,
}: EditableAwardFormProps) {
  const [formData, setFormData] = useState(initialData);
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="relative w-[700px] mx-auto mt-6">
      <button
        onClick={() => onDownload(formData)}
        className="mt-4 mb-4 block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Filled PDF
      </button>

      <IpaFormTemplate />

      <input
        type="text"
        value={formData.selectedPublication.title || ""}
        onChange={(e) => handleChange("publicationTitle", e.target.value)}
        className="absolute left-[100px] top-[655px] w-[500px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Publication Title"
      />

      <input
        type="text"
        value={
          `${formData.applicant.lastName}, ${formData.applicant.middleName} ${formData.applicant.firstName}` ||
          ""
        }
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[775px] h-[20px] w-[350px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={formData.selectedPublication.date || ""}
        onChange={(e) => handleChange("publicationDate", e.target.value)}
        className="absolute left-[100px] top-[1300px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Date of Publication"
      />
      <input
        type="text"
        value={formData.selectedPublication.journalName || ""}
        onChange={(e) => handleChange("publicationDate", e.target.value)}
        className="absolute left-[100px] top-[1330px] w-[450px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Date of Publication"
      />

      <input
        type="text"
        value={
          `${formData.applicant.lastName}, ${formData.applicant.middleName} ${formData.applicant.firstName}` ||
          ""
        }
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[2150px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={`${formData.applicant.university}` || ""}
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[2180px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={`${formData.applicant.college}` || ""}
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[2205px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={`${formData.applicant.department}` || ""}
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[2230px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
    </div>
  );
}
