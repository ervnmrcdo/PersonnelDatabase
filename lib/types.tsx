export interface Author {
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

export interface Award {
  id: number;
  title: string;
  description: string;
}

export interface Publication {
  id: number;
  authors: Author[];
  title: string;
  date: string;
  journalName: string;
  volumeNumber: string;
  pageNumber: string;
  publisher: string;
}

export type Application = {
  id: string;
  name: string;
  role: "Student" | "Faculty";
  award: string;
  dateSubmitted: string;
  pdfBase64: string;
};

export interface AcceptedForm {
  firstName: string;
  lastName: string;
  submission_id: string;
  pdfBufferData: string;
  date_submitted: string;
  award_title: string;
}

export interface RejectedForm {
  firstName: string;
  lastName: string;
  submission_id: string;
  pdfBufferData: string;
  date_submitted: string;
  award_title: string;
  pdf_json_data: JSON;
  remarks: string;
}

export interface PendingAward {
  id: number;
  name: string;
  submitterType: string;
  dateSubmmitted: string;
  status: string;
  awardId: number;
  awardTitle: string;
}

export interface EditableAwardFormData {
  ipaData: IPAFormData;
  isResubmitting: boolean;
}

export interface RawData {
  applicant: Author;
  authors: Author[];
  selectedPublication: Publication;
  selectedAward: Award | null;
  shouldSubmit: boolean;
}

export interface IPAFormData {
  articleTitle: string;
  completeCitation: string;
  author1NameLastFirst: string;
  author1UniversityAndDept: string;
  totalAuthorNumber: string;
  journalName: string;
  WSCC: boolean;
  AHCI: boolean;
  SCIE: boolean;
  SSCI: boolean;
  CPCI: boolean;
  scopus: boolean;
  impactFactor: string;
  impactFactorYear: string;
  dateOfPublication: string;
  publisherName: string
  upSystemFunding: boolean;
  upCUGrant: boolean;
  dost: boolean;
  otherFunding: boolean;
  otherFundingSpecfics: string;
  author1Name: string;
  author1University: string;
  author1College: string;
  author1Department: string;
  author1Contact: string;
  author1Position: string
  author1Personnel: boolean;
  author1Faculty: boolean;
  author1ResearchFaculty: boolean;
  author1REPS: boolean;
  author1AdminStaff: boolean;
  author1UpAffiliated: boolean;
  author1Student: boolean;
  author1ProjectPersonnell: boolean;
  author1Permanent: boolean;
  author1Temporary: boolean;
  author1UpContractual: boolean;
  author1NonUpContractual: boolean;
  author1EmailAddress: string;
}


