import { SubmissionLog } from '@/lib/types';
import React from 'react';

interface SubmissionLogsProps {
    logs: SubmissionLog[];
}

function SubmissionLogs({ logs }: SubmissionLogsProps) {
    function getActionColor(action: SubmissionLog['action']) {
        const colors = {
            RETURNED: 'bg-red-900/30 text-red-400',
            SUBMITTED: 'bg-blue-900/30 text-blue-400',
            VALIDATED: 'bg-green-900/30 text-green-400',
            RESUBMITTED: 'bg-yellow-900/30 text-yellow-400'
        };
        return colors[action];
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleString();
    }


    if (!logs) {
        return (
            <div className="p-4 text-center text-gray-400">
                No submission logs available
            </div>
        );
    }

    return (
        <div className="bg-[#1b1e2b] rounded-xl shadow p-6 space-y-4 mt-5">
            <h2 className="text-xl font-bold mb-4 text-white">Submission History</h2>

            <div className="space-y-3">
                {logs.map(function(log, index) {
                    return (
                        <div
                            key={index}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                                        log.action
                                    )}`}
                                >
                                    {log.action}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {formatDate(log.date)}
                                </span>
                            </div>
                            {log.actor_name && (
                                <p className="text-gray-300 mt-2 ml-2">{log.actor_name}</p>
                            )}


                            {log.remarks && (
                                <p className="text-gray-300 mt-2">{log.remarks}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SubmissionLogs;
