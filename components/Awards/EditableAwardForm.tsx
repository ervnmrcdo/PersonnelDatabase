import Image from "next/image";
import { useEffect, useState } from "react";
import IpaFormTemplate from "./IpaAwardTemplate";
import { Author, Award, EditableAwardFormData, IPAFormData, Publication, RawData, SubmissionLog } from "@/lib/types";
import { initialIPAFormData } from "@/lib/classes";
import { transformToIPAFormData } from "@/utils/transformRawData";

export interface EditableAwardFormProps {
  initialData: IPAFormData;
  isResubmitting: boolean;
  onSubmit: (data: any) => void;
  onResubmit: (data: any, submission_id: string, logs: SubmissionLog[]) => void;
  onDownload: (data: any) => void;
  submission_id: string;
  logs: SubmissionLog[] | null;
}

export default function EditableAwardForm({
  initialData,
  isResubmitting,
  onSubmit,
  onResubmit,
  onDownload,
  submission_id,
  logs
}: EditableAwardFormProps) {

  console.log(submission_id)

  const initialFormData: EditableAwardFormData = {
    ipaData: initialData,
    isResubmitting: false,
  }
  const [formData, setFormData] = useState<EditableAwardFormData>(initialFormData);

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev };

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

  function constraints(formData: IPAFormData): boolean {
    const indexedCount = [formData.WSCC, formData.AHCI, formData.SCIE, formData.SSCI, formData.CPCI, formData.scopus].filter(Boolean).length;
    const affiliationCount = [formData.author1Faculty, formData.author1ResearchFaculty, formData.author1REPS, formData.author1AdminStaff, formData.author1Student, formData.author1ProjectPersonnell].filter(Boolean).length;
    const appointmentCount = [formData.author1Permanent, formData.author1Temporary, formData.author1UpContractual, formData.author1NonUpContractual].filter(Boolean).length;


    if (indexedCount !== 1) { alert('Need exactly 1 indexed location'); return false; }
    if (!formData.impactFactor && !formData.impactFactorYear) { alert('Missing Impact Factor Data'); return false; }
    if (!formData.upSystemFunding && !formData.upCUGrant && !formData.dost && !formData.otherFunding) { alert('Missing at least 1 funding source.'); return false; }
    if (formData.otherFunding && !formData.otherFundingSpecfics) { alert('Specify other funding sources.'); return false; }
    if (!formData.author1Personnel && !formData.author1UpAffiliated) { alert('Missing general type of affiliation'); return false; }

    if ((formData.author1Personnel && formData.author1UpAffiliated)) {
      alert('Only 1 general affiliation'); return false;
    }

    if (formData.author1Personnel && !formData.author1Faculty && !formData.author1ResearchFaculty && !formData.author1REPS && !formData.author1AdminStaff) {
      alert('Missing specific type of UP Personnel'); return false;
    }
    if (formData.author1UpAffiliated && !formData.author1Student && !formData.author1ProjectPersonnell) {
      alert('Missing specific type of UP affiliated'); return false;
    }

    if (formData.author1UpAffiliated && !formData.author1Student && !formData.author1ProjectPersonnell) {
      alert('Missing specific type of UP affiliated'); return false;
    }
    if (affiliationCount !== 1) { alert('Exactly 1 specific selection.'); return false; }
    if (appointmentCount !== 1) { alert('Exactly 1 status of appointment.'); return false; }
    // incomplete, should be exactly 1 status of appointment 
    return true;

  }

  return (
    <div className="relative w-[700px] mx-auto mt-6">
      {(isResubmitting) ? (
        <div className="flex">
          <button
            onClick={() => {
              //need to fix submitting variables, too much ambiguity
              formData.isResubmitting = true;
              constraints(formData.ipaData) && onResubmit(formData, submission_id, logs!);
            }}
            className="mt-4 mb-4 block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Resubmit
          </button>
        </div>) : (
        <div className="flex">
          <button
            onClick={() => {
              constraints(formData.ipaData) && onSubmit(formData);
            }}
            className="mt-4 mb-4 block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
          <button
            onClick={() => constraints(formData.ipaData) && onDownload(formData)}
            className="mt-4 mb-4 block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Filled PDF
          </button>
        </div>)
      }

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
        value={formData.ipaData.impactFactor || ""}
        onChange={(e) => handleChange("impactFactor", e.target.value)}
        className="absolute left-[390px] top-[1270px] w-[60px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="IF"
      />

      <input
        type="text"
        value={formData.ipaData.impactFactorYear || ""}
        onChange={(e) => handleChange("impactFactorYear", e.target.value)}
        className="absolute left-[480px] top-[1270px] w-[60px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="IF Year"
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

      <input
        type='checkbox'
        checked={formData.ipaData.upSystemFunding}
        onChange={(e) => handleChange("upSystemFunding", e.target.checked)}
        className="absolute left-[-30px] top-[1382px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.upCUGrant}
        onChange={(e) => handleChange("upCUGrant", e.target.checked)}
        className="absolute left-[-30px] top-[1397px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.dost}
        onChange={(e) => handleChange("dost", e.target.checked)}
        className="absolute left-[-30px] top-[1412px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.otherFunding}
        onChange={(e) => handleChange("otherFunding", e.target.checked)}
        className="absolute left-[-30px] top-[1427px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='text'
        value={formData.ipaData.otherFundingSpecfics}
        onChange={(e) => handleChange("otherFundingSpecfics", e.target.value)}
        className="absolute left-[180px] top-[1425px] h-[15px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="specifics"
      />

      <input
        type="text"
        value={formData.ipaData.author1Name || ""}
        onChange={(e) => handleChange("author1Name", e.target.value)}
        className="absolute left-[100px] top-[2165px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={`${formData.ipaData.author1University}` || ""}
        onChange={(e) => handleChange("author1University", e.target.value)}
        className="absolute left-[100px] top-[2195px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={`${formData.ipaData.author1College}` || ""}
        onChange={(e) => handleChange("author1College", e.target.value)}
        className="absolute left-[100px] top-[2220px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={`${formData.ipaData.author1Department}` || ""}
        onChange={(e) => handleChange("author1Department", e.target.value)}
        className="absolute left-[100px] top-[2250px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={`${formData.ipaData.author1Contact}` || ""}
        onChange={(e) => handleChange("author1Contact", e.target.value)}
        className="absolute left-[500px] top-[2250px] h-[20px] w-[150px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type="text"
        value={`${formData.ipaData.author1Position}` || ""}
        onChange={(e) => handleChange("author1Position", e.target.value)}
        className="absolute left-[150px] top-[2275px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1Personnel}
        onChange={(e) => handleChange("author1Personnel", e.target.checked)}
        className="absolute left-[-30px] top-[2320px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1Faculty}
        onChange={(e) => handleChange("author1Faculty", e.target.checked)}
        className="absolute left-[-14px] top-[2337px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1ResearchFaculty}
        onChange={(e) => handleChange("author1ResearchFaculty", e.target.checked)}
        className="absolute left-[-14px] top-[2352px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1REPS}
        onChange={(e) => handleChange("author1REPS", e.target.checked)}
        className="absolute left-[-14px] top-[2367px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1AdminStaff}
        onChange={(e) => handleChange("author1AdminStaff", e.target.checked)}
        className="absolute left-[-14px] top-[2383px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1UpAffiliated}
        onChange={(e) => handleChange("author1UpAffiliated", e.target.checked)}
        className="absolute left-[-30px] top-[2410px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1Student}
        onChange={(e) => handleChange("author1Student", e.target.checked)}
        className="absolute left-[-14px] top-[2440px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1ProjectPersonnell}
        onChange={(e) => handleChange("author1ProjectPersonnell", e.target.checked)}
        className="absolute left-[-14px] top-[2455px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1Permanent}
        onChange={(e) => handleChange("author1Permanent", e.target.checked)}
        className="absolute left-[-14px] top-[2517px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1Temporary}
        onChange={(e) => handleChange("author1Temporary", e.target.checked)}
        className="absolute left-[-14px] top-[2532px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1UpContractual}
        onChange={(e) => handleChange("author1UpContractual", e.target.checked)}
        className="absolute left-[-14px] top-[2547px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />

      <input
        type='checkbox'
        checked={formData.ipaData.author1NonUpContractual}
        onChange={(e) => handleChange("author1NonUpContractual", e.target.checked)}
        className="absolute left-[-14px] top-[2562px] w-[200px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
      />


      <input
        type="text"
        value={`${formData.ipaData.author1EmailAddress}` || ""}
        onChange={(e) => handleChange("author1EmailAddress", e.target.value)}
        className="absolute left-[150px] top-[2590px] h-[20px] w-[300px] border border-gray-300 bg-transparent px-2 py-1 text-sm"
        placeholder="Applicant Name"
      />

    </div>
  );
}
