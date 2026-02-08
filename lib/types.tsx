export interface Author {
  authorName?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  university?: string;
  college?: string;
  department?: string;
}

export interface ApplicantData {
  applicantName?: string;
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
  authors: Author[];
  id: number;
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

export interface AcceptedAward {
  firstName: string;
  lastName: string;
  submission_id: string;
  pdfBufferData: string;
  date_submitted: string;
  award_title: string;
}

