import { awards } from "@/lib/temp";
import { Award } from "@/lib/types";

export default interface FormManagingProps {
  awards: Award[];
}

export default function FormManaging() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Forms</h1>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md">
        Create New Form
      </button>
      <div className="space-y-4 mt-5">
        {awards.map((award) => (
          <div
            key={award.id}
            // add functionality for editing certain pdf forms
            onClick={() => { console.log("selected") }}
            className="flex justify-between items-center p-4 bg-gray-50 hover: bg-gray-100 rounded-xl shadow-sm cursor-pointer transition"
          >
            <div className="font-semibold text-gray-400">
              <h2 className="font-semibold text-gray-800">{award.title}</h2>
              <p className="text-sm text-gray-400">
                {award.description || "No Description"}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
