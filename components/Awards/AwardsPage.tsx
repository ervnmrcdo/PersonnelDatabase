import { FC, useState, useEffect } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import PublicationSelection from "./PublicationSelection";
import FormEditing from "./FormEditing";
import { Author, Award, Publication, PendingAward } from "@/lib/types";
import { awards, } from "@/lib/temp";
import { AuthClient } from "@supabase/supabase-js";
import { useAuth } from "@/context/AuthContext";


const AwardsPage: FC = () => {
  const [step, setStep] = useState<"awards" | "publications" | "form">(
    "awards",
  );
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoadingPublications, setIsLoadingPublications] = useState(false);

  const [pendingAwards, setPendingAwards] = useState<PendingAward[]>([]);
  const [isLoadingPending, setIsLoadingPending] = useState(true);

  const { user } = useAuth();
  const ADMIN_UUID = user?.id;
  const payload = {
    'id': ADMIN_UUID,
    'submitterType': 'NONTEACHING'
  }

  useEffect(() => {
    if (!user) return;

    setIsLoadingPublications(true);
    fetch("/api/get/publications", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((result) => {
        setPublications(result);
        setIsLoadingPublications(false);
      })
      .catch((err) => {
        console.error('Failed to fetch publications:', err);
        setIsLoadingPublications(false);
      });
  }, [user]);


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
                isLoading={isLoadingPublications}
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
                setStep={setStep}
                handleBack={handleBack}
                selectedAward={selectedAward!}
                selectedPublication={selectedPublication!}
                autoData={selectedPublication!.users[0]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </>
  );
};
export default AwardsPage
