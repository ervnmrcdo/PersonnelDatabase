import { ChevronRight } from "lucide-react";
import { FC } from "react";
import { Author, ApplicantData, Award, Publication } from "@/lib/types";

interface PublicationSelectionProps {
  handleBack: () => void;
  handlePublicationSelect: (pub: Publication) => void;
  publications: Publication[];
}

const PublicationSelection: FC<PublicationSelectionProps> = ({
  handleBack,
  handlePublicationSelect,
  publications,
}) => {
  return (
    <>
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
              <h2 className="font-semibold text-gray-800">{pub.title}</h2>
              {/* <p className="text-sm text-gray-400">{pub.description}</p> */}
            </div>
            <div className="text-sm text-gray-400">{pub.date}</div>
            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </>
  );
};

export default PublicationSelection;
