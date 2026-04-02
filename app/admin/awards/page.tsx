"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";

interface PublicationType {
  id: number;
  name: string;
}

interface Award {
  award_id: number;
  title: string;
  description: string | null;
  allowed_publication_types: number[];
}

export default function Page() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [publicationTypes, setPublicationTypes] = useState<PublicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/awards/route");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setAwards(data.awards);
      setPublicationTypes(data.publication_types);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (awardId: number, typeId: number) => {
    setAwards((prev) =>
      prev.map((award) => {
        if (award.award_id !== awardId) return award;
        const isChecked = award.allowed_publication_types.includes(typeId);
        return {
          ...award,
          allowed_publication_types: isChecked
            ? award.allowed_publication_types.filter((id) => id !== typeId)
            : [...award.allowed_publication_types, typeId],
        };
      })
    );
  };

  const handleSave = async (awardId: number) => {
    const award = awards.find((a) => a.award_id === awardId);
    console.log(award)
    if (!award) return;

    setSaving(awardId);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/awards/route", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          award_id: awardId,
          allowed_publication_type_ids: award.allowed_publication_types,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      setMessage({ type: "success", text: "Changes saved successfully!" });
    } catch (error) {
      console.error("Error saving:", error);
      setMessage({ type: "error", text: "Failed to save changes" });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0f1117]">
        <AdminSidebar />
        <main className="flex-1 bg-[#0f1117] overflow-y-auto flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0f1117]">
      <AdminSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Awards Settings</h1>
          <p className="text-gray-400 mb-8">
            Configure which publication types are allowed for each award.
          </p>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {awards.map((award) => (
              <div
                key={award.award_id}
                className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700"
              >
                <h2 className="text-lg font-semibold text-white mb-4">{award.title}</h2>
                {award.description && (
                  <p className="text-gray-400 text-sm mb-4">{award.description}</p>
                )}
                <div className="flex flex-wrap gap-4 mb-4">
                  {publicationTypes.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={award.allowed_publication_types.includes(type.id)}
                        onChange={() => handleCheckboxChange(award.award_id, type.id)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-gray-300">{type.name}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => handleSave(award.award_id)}
                  disabled={saving === award.award_id}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  {saving === award.award_id ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
