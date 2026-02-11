import { Award, Publication, SubmissionLog } from "./types";

export const tempPublicationsGenerated: Publication[] = [
  {
    id: 1,
    title: "Advances in Quantum Computing",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-05-14",
    journalName: "Nature Physics",
    volumeNumber: "19",
    pageNumber: "45-52",
    publisher: "Nature Publishing",
  },
  {
    id: 2,
    title: "Quantum Entanglement and Communication",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-08-20",
    journalName: "Physical Review Letters",
    volumeNumber: "131",
    pageNumber: "210501",
    publisher: "American Physical Society",
  },
  {
    id: 3,
    title: "Superconducting Qubits: Design and Implementation",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-11-15",
    journalName: "IEEE Transactions on Quantum Engineering",
    volumeNumber: "4",
    pageNumber: "1-12",
    publisher: "IEEE",
  },
  {
    id: 4,
    title: "Quantum Error Correction Algorithms",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-03-10",
    journalName: "Quantum Science and Technology",
    volumeNumber: "8",
    pageNumber: "035001",
    publisher: "IOP Publishing",
  },
  {
    id: 5,
    title: "Topological Quantum Computing",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-09-05",
    journalName: "Nature Reviews Physics",
    volumeNumber: "5",
    pageNumber: "627-641",
    publisher: "Nature Publishing",
  },
  {
    id: 6,
    title: "Quantum Machine Learning Applications",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-01-30",
    journalName: "Quantum Machine Intelligence",
    volumeNumber: "5",
    pageNumber: "25",
    publisher: "Springer",
  },
  {
    id: 7,
    title: "Photonic Quantum Computing Platforms",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-07-12",
    journalName: "Optica Quantum",
    volumeNumber: "1",
    pageNumber: "15-23",
    publisher: "Optica Publishing Group",
  },
  {
    id: 8,
    title: "Quantum Cryptography Protocols",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-04-18",
    journalName: "Journal of Cryptology",
    volumeNumber: "36",
    pageNumber: "15",
    publisher: "Springer",
  },
  {
    id: 9,
    title: "Quantum Simulation of Molecular Systems",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-10-25",
    journalName: "Chemical Physics Reviews",
    volumeNumber: "4",
    pageNumber: "041301",
    publisher: "AIP Publishing",
  },
  {
    id: 10,
    title: "Noise-Resilient Quantum Algorithms",
    authors: [
      {
        firstName: "Ervin",
        lastName: "Mercado",
        middleName: "Poblete",
        university: "University of the Philippines",
        college: "College of Engineering",
        department: "Computer Science",
        position: "Student",
        contactNo: "+1-555-0123",
        emailAddress: "epmercado2@up.edu.ph",
      }
    ],
    date: "2023-12-05",
    journalName: "PRX Quantum",
    volumeNumber: "4",
    pageNumber: "040331",
    publisher: "American Physical Society",
  },
];


export const awards: Award[] = [
  {
    id: 1,
    title: "International Publication Award",
    description: "Given for indexed journal publications.",
  },
  {
    id: 2,
    title: "Research Excellence Award",
    description: "For outstanding research output.",
  },
];


export const fileSubmissionLogs: SubmissionLog[] = [
  {
    remarks: "Contract draft v1.pdf - Initial upload",
    date: "2024-03-15T09:23:00",
    action: "SUBMITTED"
  },
  {
    remarks: "Missing signatures on page 3 and 4",
    date: "2024-03-16T14:12:00",
    action: "RETURNED"
  },
  {
    remarks: "Contract draft v2.pdf - Signatures added",
    date: "2024-03-17T11:45:00",
    action: "RESUBMITTED"
  },
  {
    remarks: "All signatures verified, document approved",
    date: "2024-03-18T16:30:00",
    action: "VALIDATED"
  }
];
