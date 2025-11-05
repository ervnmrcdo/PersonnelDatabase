import { FC, useState } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PublicationSelection from "./PublicationSelection";
import FormEditing from "./FormEditing";
import { Author, ApplicantData, Award, Publication } from "@/lib/types";

const applicant: ApplicantData = {
  applicantName: "",
  firstName: "Jon",
  lastName: "Snow",
  middleName: "Targaryen",
  university: "University of California",
  college: "College of Engineering",
  department: "Software Engineering",
  position: "Senior Developer",
  contactNo: "+1-555-0123",
  emailAddress: "alice.brown@email.com",
};
applicant.applicantName = `${applicant.lastName}, ${applicant.firstName} ${applicant.middleName}`;

const awards: Award[] = [
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

const publications: Publication[] = [
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

const AwardsPage: FC = () => {
  const [step, setStep] = useState<"awards" | "publications" | "form">(
    "awards",
  );
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  const handleAwardSelect = (award: Award) => {
    setSelectedAward(award);
    setStep("publications");
  };

  const handlePublicationSelect = (pub: Publication) => {
    setSelectedPublication(pub);
    setStep("form");
  };

  const handleBack = () => {
    if (step === "form") setStep("publications");
    else if (step === "publications") setStep("awards");
  };
  return (
    <>
      <div className="relative overflow-hidden p-6">
        <AnimatePresence mode="wait">
          {step === "awards" && (
            <motion.div
              key="awards"
              initial={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Awards awards={awards} onSelect={handleAwardSelect} />
            </motion.div>
          )}

          {step === "publications" && (
            <motion.div
              key="publications"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PublicationSelection
                handleBack={handleBack}
                handlePublicationSelect={(pub) => handlePublicationSelect(pub)}
                publications={publications}
              />
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              key="form"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormEditing
                handleBack={handleBack}
                selectedAward={selectedAward!}
                selectedPublication={selectedPublication!}
                autoData={applicant}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>{" "}
    </>
  );
};

export default AwardsPage;
