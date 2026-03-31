import { ChevronRight, Loader2 } from "lucide-react";
import { FC } from "react";
import { Author, Award, Publication } from "@/lib/types";

interface PublicationSelectionProps {
  handleBack: () => void;
  handlePublicationSelect: (pub: Publication) => void;
  publications: Publication[];
  isLoading?: boolean;
}

const PublicationSelection: FC<PublicationSelectionProps> = ({
  handleBack,
  handlePublicationSelect,
  publications,
  isLoading = false,
}) => {
  return (
    <>
      <button
        onClick={handleBack}
        className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1 rounded transition text-sm mb-4"
      >
        ← Back to Awards
      </button>
      <h1 className="text-2xl font-bold mb-6 text-white">Choose a publication</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-400">Loading publications...</span>
        </div>
      ) : publications.length === 0 ? (
        <p className="text-gray-400">No publications found.</p>
      ) : (
        <div className="space-y-4">
          {publications.map((pub) => (
            <div
              key={pub.publication_id}
              onClick={() => handlePublicationSelect(pub)}
              className="flex justify-between items-center p-4 bg-[#1a1e2b] hover:bg-gray-700 rounded-xl shadow-sm cursor-pointer transition"
            >
              <div>
                <h2 className="font-semibold text-gray-200">{pub.title}</h2>
              </div>
              <div className="text-sm text-gray-400">{pub.date_published}</div>
              <ChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PublicationSelection;
