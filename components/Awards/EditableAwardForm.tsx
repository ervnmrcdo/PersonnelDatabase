import Image from "next/image";
import { useEffect, useState } from "react";
import IpaFormTemplate from "./IpaAwardTemplate";
import { Author, Award, EditableAwardFormData, IPAFormData, Publication } from "@/lib/types";
import { initialIPAFormData } from "@/lib/classes";

interface RawData {
  applicant: Author;
  authors: Author[];
  selectedPublication: Publication;
  selectedAward: Award | null;
  shouldSubmit: boolean;
}

export interface EditableAwardFormProps {
  initialData: RawData;
  onDownload: (data: any, shouldSubmit: boolean) => void;
}


export default function EditableAwardForm({
  initialData,
  onDownload,
}: EditableAwardFormProps) {

  const initialFormData: EditableAwardFormData = {
    ipaData: transformToIPAFormData(initialData),
    shouldSubmit: initialData.shouldSubmit
  }
  const [formData, setFormData] = useState<EditableAwardFormData>(initialFormData);


  function transformToIPAFormData(rawData: RawData): IPAFormData {
    const result = new initialIPAFormData({
      articleTitle: rawData.selectedPublication.title,
      completeCitation: `${rawData.selectedPublication.title}, ${rawData.selectedPublication.journalName}, ${rawData.selectedPublication.volumeNumber}, ${rawData.selectedPublication.pageNumber}`,
      author1NameLastFirst: `${rawData.authors[0].lastName}, ${rawData.authors[0].firstName}, ${rawData.authors[0].middleName}`,
      author1UniversityAndDept: `${rawData.authors[0].university}/${rawData.authors[0].department}`,
      totalAuthorNumber: rawData.authors.length.toString(),
      journalName: rawData.selectedPublication.journalName,
      dateOfPublication: rawData.selectedPublication.date,
      publisherName: rawData.selectedPublication.publisher

    })
    return result
  }


  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev };

      console.log(value)

      switch (key) {
        case 'WSCC':
        case 'AHCI':
        case 'SCIE':
        case 'SSCI':
        case 'CPCI':
        case 'scopus':
        case 'upSystemFunding':
        case 'upCUGrant':
        case 'dost':
        case 'otherFunding':
        case 'author1Personnel':
        case 'author1Faculty':
        case 'author1ResearchFaculty':
        case 'author1REPS':
        case 'author1AdminStaff':
        case 'author1UpAffiliated':
        case 'author1Student':
        case 'author1ProjectPersonnell':
        case 'author1Permanent':
        case 'author1Temporary':
        case 'author1UpContractual':
        case 'author1NonUpContractual':
          updated.ipaData = {
            ...updated.ipaData,
            [key]: value === true,
          };
          break; default:
          updated.ipaData = {
            ...updated.ipaData,
            [key]: value,
          };
          break;
      }

      console.log(updated)
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
        value={formData.ipaData.articleTitle || ""}
        onChange={(e) => handleChange("articleTitle", e.target.value)}
        className="absolute left-[100px] top-[670px] w-[500px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Publication Title"
      />

      <input
        type="text"
        value={formData.ipaData.completeCitation || ''}
        onChange={(e) => handleChange("completeCitation", e.target.value)}
        className="absolute left-[100px] top-[720px] h-[20px] w-[500px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={formData.ipaData.author1NameLastFirst || ""}
        onChange={(e) => handleChange("author1NameLastFirst", e.target.value)}
        className="absolute left-[100px] top-[790px] h-[20px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={formData.ipaData.author1UniversityAndDept || ""}
        onChange={(e) => handleChange("author1UniversityAndDept", e.target.value)}
        className="absolute left-[350px] top-[790px] h-[20px] w-[400px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="University and Department"
      />

      <input
        type="text"
        value={formData.ipaData.totalAuthorNumber || ""}
        onChange={(e) => handleChange("totalAuthorNumber", e.target.value)}
        className="absolute left-[300px] top-[905px] h-[20px] w-[100px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={formData.ipaData.journalName || ""}
        onChange={(e) => handleChange("journalName", e.target.value)}
        className="absolute left-[150px] top-[930px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.WSCC}
        onChange={(e) => handleChange("WSCC", e.target.checked)}
        className="absolute left-[-30px] top-[1180px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.AHCI}
        onChange={(e) => handleChange("AHCI", e.target.checked)}
        className="absolute left-[-14px] top-[1193px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.SCIE}
        onChange={(e) => handleChange("SCIE", e.target.checked)}
        className="absolute left-[-14px] top-[1208px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.SSCI}
        onChange={(e) => handleChange("SSCI", e.target.checked)}
        className="absolute left-[-14px] top-[1223px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.CPCI}
        onChange={(e) => handleChange("CPCI", e.target.checked)}
        className="absolute left-[-14px] top-[1238px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.scopus}
        onChange={(e) => handleChange("scopus", e.target.checked)}
        className="absolute left-[-30px] top-[1265px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type="text"
        value={formData.ipaData.dateOfPublication || ""}
        onChange={(e) => handleChange("dateOfPublication", e.target.value)}
        className="absolute left-[100px] top-[1315px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Date of Publication"
      />

      <input
        type="text"
        value={formData.ipaData.publisherName || ""}
        onChange={(e) => handleChange("publisherName", e.target.value)}
        className="absolute left-[100px] top-[1345px] w-[500px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Publisher Name"
      />
      {/* <input */}
      {/*   type="text" */}
      {/*   value={formData.selectedPublication.journalName || ""} */}
      {/*   onChange={(e) => handleChange("journalName", e.target.value)} */}
      {/*   className="absolute left-[100px] top-[935px] w-[450px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Date of Publication" */}
      {/* /> */}
      {/**/}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={formData.authors[0].firstName + ' ' + formData.authors[0].lastName || ""} */}
      {/*   onChange={(e) => handleChange("applicantName", e.target.value)} */}
      {/*   className="absolute left-[100px] top-[2165px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={`${formData.applicant.university}` || ""} */}
      {/*   onChange={(e) => handleChange("university", e.target.value)} */}
      {/*   className="absolute left-[100px] top-[2195px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={`${formData.applicant.college}` || ""} */}
      {/*   onChange={(e) => handleChange("college", e.target.value)} */}
      {/*   className="absolute left-[100px] top-[2220px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={`${formData.applicant.department}` || ""} */}
      {/*   onChange={(e) => handleChange("department", e.target.value)} */}
      {/*   className="absolute left-[100px] top-[2250px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={`${formData.applicant.position}` || ""} */}
      {/*   onChange={(e) => handleChange("postion", e.target.value)} */}
      {/*   className="absolute left-[150px] top-[2275px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={`${formData.applicant.contactNo}` || ""} */}
      {/*   onChange={(e) => handleChange("contactNo", e.target.value)} */}
      {/*   className="absolute left-[500px] top-[2250px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={`${formData.applicant.emailAddress}` || ""} */}
      {/*   onChange={(e) => handleChange("emailAddress", e.target.value)} */}
      {/*   className="absolute left-[150px] top-[2590px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm" */}
      {/*   placeholder="Applicant Name" */}
      {/* /> */}
    </div>
  );
}
