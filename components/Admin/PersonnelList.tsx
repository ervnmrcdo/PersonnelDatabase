"use client";

import { useState, useEffect, useCallback } from "react";

interface PersonnelData {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  email: string | null;
  position: string | null;
  department: string | null;
  role: string;
  applicationsSubmitted: number;
  applicationsListedOn: number;
}

interface PersonnelListProps {
  role: "teaching" | "nonteaching";
}

export default function PersonnelList({ role }: PersonnelListProps) {
  const [personnel, setPersonnel] = useState<PersonnelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchPersonnel = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ role });
      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }

      const response = await fetch(`/api/admin/get-personnel/route?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch personnel");
      }
      const data = await response.json();
      setPersonnel(data);
    } catch (error) {
      console.error("Error fetching personnel:", error);
    } finally {
      setLoading(false);
    }
  }, [role, debouncedSearch]);

  useEffect(() => {
    fetchPersonnel();
  }, [fetchPersonnel]);

  const getFullName = (person: PersonnelData) => {
    const parts = [
      person.first_name,
      person.middle_name,
      person.last_name
    ].filter(Boolean);
    return parts.join(" ") || "N/A";
  };

  const title = role === "teaching" ? "Teaching Personnel" : "Non-Teaching Personnel";

  return (
    <div className="flex-1 overflow-auto bg-[#0f1117] text-gray-300 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">
            {role === "teaching"
              ? "View and search teaching personnel"
              : "View and search non-teaching personnel"}
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, position, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-[#1b1e2b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : personnel.length === 0 ? (
          <div className="bg-[#1b1e2b] rounded-lg p-8 border border-gray-700 text-center">
            <p className="text-gray-400">
              {debouncedSearch
                ? "No personnel found matching your search."
                : "No personnel found."}
            </p>
          </div>
        ) : (
          <div className="bg-[#1b1e2b] rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#252836]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Applications Submitted
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Applications Listed On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {personnel.map((person) => (
                    <tr key={person.id} className="hover:bg-[#2d3142] transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">
                          {getFullName(person)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300">
                          {person.email || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300">
                          {person.position || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300">
                          {person.department || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-200">
                          {person.applicationsSubmitted}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-200">
                          {person.applicationsListedOn}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && personnel.length > 0 && (
          <div className="mt-4 text-sm text-gray-400">
            Showing {personnel.length} personnel
          </div>
        )}
      </div>
    </div>
  );
}
