import { FC, useState } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PublicationSelection from "./PublicationSelection";
import FormEditing from "./FormEditing";

interface Award {
  id: number;
  title: string;
  description: string;
}

interface Publication {
  id: number;
  title: string;
  date: string;
  description: string;
}

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
    title: "Title of Article (from database)",
    date: "2024-05-01",
    description: "Description of article",
  },
  {
    id: 2,
    title: "Another Publication",
    date: "2024-07-10",
    description: "Description of second article",
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
                selectedAward={selectedAward}
                selectedPublication={selectedPublication}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>{" "}
    </>
  );
};

export default AwardsPage;
