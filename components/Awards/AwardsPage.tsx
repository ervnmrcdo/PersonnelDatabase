import { FC, useState, useEffect } from "react";
import Awards from "./Awards";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PublicationSelection from "./PublicationSelection";
import FormEditing from "./FormEditing";
import { Author, Award, Publication, PendingAward } from "@/lib/types";
import { awards, tempPublicationsGenerated } from "@/lib/temp";
import { useAuth } from "@/context/AuthContext";

//
// interface ApiPublicationData {
//   nonteaching_id: number;
//   up_id: string;
//   first_name: string;
//   last_name: string;
//   position_id: number;
//   entry_date: string;
//   publication_id: number;
//   author_type: string;
//   author_teaching_id: number | null;
//   author_nonteaching_id: number | null;
//   type: string;
//   title: string;
//   publisher: string;
//   publication_status: string;
//   date_published: string;
//   page_number: string;
//   issue_number: string;
//   page_numbers: string;
//   journal_publication: string;
//   volume_number: string;
//   total_authors: number;
// }
//
// const applicant: ApplicantData = {
//   applicantName: "",
//   firstName: "Ervin",
//   lastName: "Mercado",
//   middleName: "Poblete",
//   university: "University of the Philippines",
//   college: "College of Engineering",
//   department: "Computer Science",
//   position: "Student",
//   contactNo: "+1-555-0123",
//   emailAddress: "epmercado2@up.edu.ph",
// };
//
// applicant.applicantName = `${applicant.lastName}, ${applicant.firstName} ${applicant.middleName}`;

const AwardsPage: FC = () => {
  const { user } = useAuth(); // logged-in user

  const [step, setStep] = useState<"awards" | "publications" | "form">(
    "awards",
  );
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const [pendingAwards, setPendingAwards] = useState<PendingAward[]>([]);
  const [isLoadingPending, setIsLoadingPending] = useState(true);

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loadingPublications, setLoadingPublications] = useState(true);


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

    useEffect(() => {
    const fetchPublications = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`/api/publications?authorId=${user.id}`);

        const data = await response.json();

        const formatted = data.map((p:any) => ({
              id: p.publication_id,
              title: p.title,
              authors: p.authors ?? [],

              date: p.date_published,
              journalName: p.journal_publication,
              volumeNumber: p.volume_number,
              pageNumber: p.page_number,
              issueNumber: p.issue_number,
              publisher: p.publisher,
            }));


        if (response.ok) {
          setPublications(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch pending awards:", error);
      } finally {
        setLoadingPublications(false);
      }
    };

    fetchPublications();
  }, [user]);

  // const payload = {
  //   'id': '1',
  //   'submitterType': 'NONTEACHING'
  // }

  // useEffect(() => {
  //   console.log('allo');
  //
  //   fetch('api/get/publications', {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   })
  //     .then((res) => res.json())
  //     .then((result: PublicationData[]) => { // Assuming result is an array
  //       // Transform the API response to match your Publication interface
  //       const transformedPublications: Publication[] = result.map((item: PublicationData) => ({
  //         id: item.publication_id,
  //         title: item.title,
  //         date: item.publication_date,
  //         journalName: item.journal_publication,
  //         volumeNumber: item.volume_number,
  //         pageNumber: item.pag_number,
  //         publisher: item.publisher // Fixed typo
  //       }));
  //
  //       // Update state with the transformed array
  //       setPublications(transformedPublications);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching publications:', error);
  //     });
  // }, []); // Make sure to include dependencies if needed

  // const publications: Publication[] = []
  // useEffect(() => {
  //   console.log('allo')
  //   fetch('api/get/publications', {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   }).then((res) => res.json())
  //     .then((result) => {
  //       publications.push(
  //         result.map((item: any) => ({
  //           id: item.publication_id,
  //           title: item.title,
  //           date: item.publication_date,
  //           journalName: item.journal_publication,
  //           volumeNumber: item.volume_number,
  //           pageNumber: item.pag_number,
  //           publishe: item.publisher
  //         }))
  //       )
  //     })
  // }, [])
  //




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
