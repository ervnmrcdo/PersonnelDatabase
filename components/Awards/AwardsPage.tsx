import { FC, useState, useEffect } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PublicationSelection from "./PublicationSelection";
import FormEditing from "./FormEditing";
import { Author, ApplicantData, Award, Publication } from "@/lib/types";

interface PendingAward {
  id: number;
  name: string;
  submitterType: string;
  dateSubmitted: string;
  status: string;
  awardId: number;
  awardTitle: string;
}

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
      </div>

      {/* Pending Awards Table */}
      <div className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Pending Awards Status
        </h2>
        {isLoadingPending ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : pendingAwards.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pending awards at this time.
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Submission ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Award Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Submitter Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingAwards.map((award) => (
                  <tr key={award.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{award.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {award.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {award.awardTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {award.submitterType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(award.dateSubmitted).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {award.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AwardsPage;
