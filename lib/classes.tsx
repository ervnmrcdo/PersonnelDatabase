import { IPAFormData } from "./types";

export class initialIPAFormData implements IPAFormData {
  articleTitle: string = '';
  completeCitation: string = '';
  author1NameLastFirst: string = '';
  author1UniversityAndDept: string = '';
  totalAuthorNumber: string = '';
  journalName: string = '';
  WSCC: boolean = false;
  AHCI: boolean = false;
  SCIE: boolean = false;
  SSCI: boolean = false;
  CPCI: boolean = false;
  scopus: boolean = false;
  impactFactor: string = '';
  impactFactorYear: string = '';
  dateOfPublication: string = '';
  publisherName: string = '';
  upSystemFunding: boolean = false;
  upCUGrant: boolean = false;
  dost: boolean = false;
  otherFunding: boolean = false;
  author1Name: string = '';
  author1University: string = '';
  author1College: string = '';
  author1Department: string = '';
  author1Contact: string = '';
  author1Position: string = '';
  author1Personnel: boolean = false;
  author1Faculty: boolean = false;
  author1ResearchFaculty: boolean = false;
  author1REPS: boolean = false;
  author1AdminStaff: boolean = false;
  author1UpAffiliated: boolean = false;
  author1Student: boolean = false;
  author1ProjectPersonnell: boolean = false;
  author1Permanent: boolean = false;
  author1Temporary: boolean = false;
  author1UpContractual: boolean = false;
  author1NonUpContractual: boolean = false;
  author1EmailAddress: string = '';

  constructor(data: Partial<IPAFormData> = {}) {
    Object.assign(this, data);
  }
}
