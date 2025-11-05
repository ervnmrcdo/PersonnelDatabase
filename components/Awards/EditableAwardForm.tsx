import Image from "next/image";
import { useState } from "react";
import IpaFormTemplate from "./IpaAwardTemplate";
import { Author, ApplicantData, Award, Publication } from "@/lib/types";

interface EditableAwardFormProps {
  initialData: {
    applicant: ApplicantData;
    authors: Author[];
    selectedPublication: Publication;
    selectedAward: Award | null;
    shouldSubmit: boolean;
  };
  onDownload: (data: any, shouldSubmit: boolean) => void;
}

export default function EditableAwardForm({
  initialData,
  onDownload,
}: EditableAwardFormProps) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev };

      switch (key) {
        case "publicationTitle":
          updated.selectedPublication = {
            ...updated.selectedPublication,
            title: value,
          };
          break;

        case "date":
          updated.selectedPublication = {
            ...updated.selectedPublication,
            date: value,
          };
          break;

        case "journalName":
          updated.selectedPublication = {
            ...updated.selectedPublication,
            journalName: value,
          };
          break;

        case "applicantName":
        case "university":
        case "college":
        case "department":
          updated.applicant = {
            ...updated.applicant,
            [key]: value,
          };
          break;

        default:
          (updated as any)[key] = value;
      }

      return updated;
    });
  };
  return (
    <div className="relative w-[700px] mx-auto mt-6">
      <div className="flex">
        <button
          onClick={() => {
            formData.shouldSubmit = true;
            onDownload(formData, true);
          }}
          className="mt-4 mb-4 block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
        <button
          onClick={() => onDownload(formData, false)}
          className="mt-4 mb-4 block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Filled PDF
        </button>
      </div>
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
        value={formData.applicant.applicantName || ""}
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[775px] h-[20px] w-[350px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={formData.selectedPublication.date || ""}
        onChange={(e) => handleChange("date", e.target.value)}
        className="absolute left-[100px] top-[1300px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Date of Publication"
      />
      <input
        type="text"
        value={formData.selectedPublication.journalName || ""}
        onChange={(e) => handleChange("journalName", e.target.value)}
        className="absolute left-[100px] top-[1330px] w-[450px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Date of Publication"
      />

      <input
        type="text"
        value={formData.applicant.applicantName || ""}
        onChange={(e) => handleChange("applicantName", e.target.value)}
        className="absolute left-[100px] top-[2150px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={`${formData.applicant.university}` || ""}
        onChange={(e) => handleChange("university", e.target.value)}
        className="absolute left-[100px] top-[2180px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={`${formData.applicant.college}` || ""}
        onChange={(e) => handleChange("college", e.target.value)}
        className="absolute left-[100px] top-[2205px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
      <input
        type="text"
        value={`${formData.applicant.department}` || ""}
        onChange={(e) => handleChange("department", e.target.value)}
        className="absolute left-[100px] top-[2230px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />
    </div>
  );
}
