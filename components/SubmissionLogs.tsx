import { SubmissionLog } from '@/lib/types';
import React from 'react';

interface SubmissionLogsProps {
    logs: SubmissionLog[];
}

function SubmissionLogs({ logs }: SubmissionLogsProps) {
    function getActionColor(action: SubmissionLog['action']) {
        const colors = {
            RETURNED: 'bg-red-100 text-red-800',
            SUBMITTED: 'bg-blue-100 text-blue-800',
            VALIDATED: 'bg-green-100 text-green-800',
            RESUBMITTED: 'bg-yellow-100 text-yellow-800'
        };
        return colors[action];
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleString();
    }


    if (!logs) {
        return (
            <div className="p-4 text-center text-gray-500">
                No submission logs available
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Submission History</h2>

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
                                <span className="text-sm text-gray-500">
                                    {formatDate(log.date)}
                                </span>
                            </div>

                            {log.remarks && (
                                <p className="text-gray-700 mt-2">{log.remarks}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SubmissionLogs;
