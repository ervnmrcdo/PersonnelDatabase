import { FC, useState, useEffect } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PublicationSelection from "./PublicationSelection";
import FormEditing from "./FormEditing";
import { Author, Award, Publication, PendingAward } from "@/lib/types";
import { awards, tempPublicationsGenerated } from "@/lib/temp";



const AwardsPage: FC = () => {
  const [step, setStep] = useState<"awards" | "publications" | "form">(
    "awards",
  );
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  const [pendingAwards, setPendingAwards] = useState<PendingAward[]>([]);
  const [isLoadingPending, setIsLoadingPending] = useState(true);


  useEffect(() => {
    const fetchPendingAwards = async () => {
      try {
        const response = await fetch("/api/pendingAwards");
        if (response.ok) {
          const data = await response.json();
          setPendingAwards(data);
        }
      } catch (error) {
        console.error("Failed to fetch pending awards:", error);
      } finally {
        setIsLoadingPending(false);
      }
    };

    fetchPendingAwards();
  }, []);

  const payload = {
    'id': '1',
    'submitterType': 'NONTEACHING'
  }

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
                publications={tempPublicationsGenerated}
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
                autoData={selectedPublication!.authors[0]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </>
  );
};

export default AwardsPage;
