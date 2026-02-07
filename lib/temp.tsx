import { Award, Publication } from "./types";

export const awards: Award[] = [
  {
    id: 1,
    title: "International Publication Award",
    description: "Given for indexed journal publications.",
    pages: [
      {
        id: "123",
        page_number: 1,
        background_image_url: "",
        field: [],
      }
    ],
  },
  {
    id: 1,
    title: "Research Excellence Award",
    description: "For outstanding research output.",
    pages: [
      {
        id: "123",
        page_number: 1,
        background_image_url: "",
        field: [],
      }
    ],
  },
];

export const publications: Publication[] = [
  {
    id: 1,
    title: "Advanced Machine Learning Techniques for Climate Prediction",
    authors: [
      {
        authorName: "Smith John",
        firstName: "John",
        lastName: "Smith",
        university: "University of Technology",
        department: "Computer Science",
      },
      {
        authorName: "Johnson Sarah",
        firstName: "Sarah",
        lastName: "Johnson",
        university: "State University",
      },
    ],
    date: "2023-03-15",
    journalName: "Journal of Artificial Intelligence Research",
    volumeNumber: "45",
    pageNumber: "123-145",
    publisher: " Some International Publishing Company",
  },
  {
    id: 2,
    title: "Quantum Computing: Breaking New Grounds",
    authors: [
      {
        authorName: "Chen Michael",
        firstName: "Michael",
        lastName: "Chen",
        middleName: "Wei",
        university: "Tech University",
        college: "College of Physics",
      },
    ],
    date: "2023-07-22",
    journalName: "Physical Review Letters",
    volumeNumber: "130",
    pageNumber: "250601",
    publisher: " Some International Publishing Company",
  },
];
