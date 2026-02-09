import { useEffect, useState } from "react";

interface PendingAward {
    id: number;
    name: string;
    submitterType: string;
    dateSubmitted: string;
    status: string;
    awardId: number;
    awardTitle: string;
}


export default function PendingAwardsTable() {

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

    return (
        <div className="bg-white rounded-xl shadow p-6">

            {/* Pending Awards Table */}
            <div className="p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Pending Awards
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

        </div>
    )
}
