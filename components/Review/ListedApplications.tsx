import { Application, SubmissionLog } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import A from "../AllAwards";
import AllAwards from "../AllAwards";

type Props = {
  onSelect: (data: Application) => void;
};

export default function ListedApplications({ onSelect }: Props) {
  const [data, setData] = useState<Application[]>([]);

  useEffect(() => {
    fetch("/api/pendingAwards")
      .then((res) => res.json())
      .then((result) => {
        setData(
          result.map((item: any) => ({
            id: item.id,
            name: item.name,
            role: item.submitterType,
            award: item.awardTitle,
            dateSubmitted: item.dateSubmitted,
            pdfBase64: item.pdfBase64,
            logs: item.logs as SubmissionLog,
          })),
        );
      });
  }, []);
  console.log(data)
  return (
    <>
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">To Review</h1>


        <div className="space-y-4">
          {data.map((item) => (
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
      <AllAwards />
    </>
  );
}
