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
