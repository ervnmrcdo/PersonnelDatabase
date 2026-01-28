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

export interface FormField {
  id: string;
  field_name: string;
  field_type: string;
  x_pos: number;
  y_pos: number;
  width: number;
  height: number;
  required: boolean;
}

export interface FormPage {
  id: string;
  page_number: number;
  background_image_url: string;
  field: FormField[];
}

export interface Award {
  id: number;
  title: string;
  description: string;
  pages: FormPage[];
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
