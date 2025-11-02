import { FC, useState } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

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
              <button
                onClick={handleBack}
                className="text-sm text-blue-600 mb-4 hover:underline"
              >
                ← Back to Awards
              </button>
              <h1 className="text-2xl font-bold mb-6">Choose a publication</h1>

              <div className="space-y-4">
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    onClick={() => handlePublicationSelect(pub)}
                    className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl shadow-sm cursor-pointer transition"
                  >
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {pub.title}
                      </h2>
                      <p className="text-sm text-gray-400">{pub.description}</p>
                    </div>
                    <div className="text-sm text-gray-400">{pub.date}</div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                ))}
              </div>
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
              <button
                onClick={handleBack}
                className="text-sm text-blue-600 mb-4 hover:underline"
              >
                ← Back to Publications
              </button>
              <h1 className="text-2xl font-bold mb-6">
                {selectedAward?.title} Application
              </h1>

              {/* Placeholder for the auto-filled form */}
              <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Auto-filled Award Form
                </h2>

                <div className="text-gray-600 space-y-2">
                  <p>
                    <strong>Applicant:</strong> Joe Burrow (from session or DB)
                  </p>
                  <p>
                    <strong>Selected Award:</strong> {selectedAward?.title}
                  </p>
                  <p>
                    <strong>Publication Title:</strong>{" "}
                    {selectedPublication?.title}
                  </p>
                  <p>
                    <strong>Date of Publication:</strong>{" "}
                    {selectedPublication?.date}
                  </p>
                </div>

                <div className="mt-6 border rounded-lg overflow-hidden">
                  <iframe
                    src="/forms/ipc-award-form.pdf"
                    className="w-full h-[600px]"
                    title="IPC Award Application Form"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>{" "}
    </>
  );
};

export default AwardsPage;
