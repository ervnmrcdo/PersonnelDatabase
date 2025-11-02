import { FC } from "react";
import { ChevronRight } from "lucide-react";

interface Award {
  id: number;
  title: string;
  description: string;
}

interface AwardsProps {
  awards: Award[];
  onSelect?: (award: Award) => void;
}

const Awards: FC<AwardsProps> = ({ awards, onSelect }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Awards</h1>

      <div className="space-y-4">
        {awards.map((award) => (
          <div
            key={award.id}
            onClick={() => onSelect && onSelect(award)}
            className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl shadow-sm cursor-pointer transition"
          >
            <div>
              <h2 className="font-semibold text-gray-800">{award.title}</h2>
              <p className="text-sm text-gray-400">
                {award.description || "Description"}
              </p>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
