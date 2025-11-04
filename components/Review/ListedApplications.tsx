import { Application } from "@/lib/types";
import { ChevronRight } from "lucide-react";

type Props = {
  onSelect: (data: Application) => void;
};

const mockData: Application[] = [
  {
    id: "1",
    name: "Joe Burrow",
    role: "Student",
    award: "International Publication Award",
    dateSubmitted: "2025-02-02",
    pdfUrl: "/sample.pdf",
  },
  {
    id: "2",
    name: "Joe Flacco",
    role: "Student",
    award: "International Publication Award",
    dateSubmitted: "2025-03-03",
    pdfUrl: "/sample.pdf",
  },
  {
    id: "3",
    name: "Lebron Wayde",
    role: "Faculty",
    award: "International Publication Award",
    dateSubmitted: "2025-06-08",
    pdfUrl: "/sample.pdf",
  },
];

export default function ListedApplications({ onSelect }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-6">To Review</h1>

      <div className="space-y-4">
        {mockData.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex justify-between items-center transition"
            onClick={() => onSelect(item)}
          >
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-sm text-gray-500">{item.role}</p>
              <p className="text-sm">{item.award}</p>
              <p className="text-xs text-gray-400">{item.dateSubmitted}</p>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
