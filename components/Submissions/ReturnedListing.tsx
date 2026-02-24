import { useAuth } from "@/context/AuthContext";
import { RejectedForm } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    onSelect: (data: RejectedForm) => void;
}

export default function ReturnedListing({ onSelect }: Props) {

    const [step, setStep] = useState<'listing' | 'accepted-review'>('listing')

    // stores retrieved data
    const [returnedData, setReturnedData] = useState<RejectedForm[]>([])
    const { user } = useAuth()

    //hard-coded id of sudent need to be changed
    const payload = {
        id: user?.id,
    }

    useEffect(() => {
        fetch("/api/get/returned-forms", {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then((res) => res.json()).then((result) => {
            console.log(result)
            setReturnedData(result.map((item: any) => ({
                submission_id: item.submission_id,
                // NEW: Use pdfUrl from Supabase Storage instead of attached_files
                pdfBufferData: item.pdfUrl || item.attached_files,
                first_name: item.authors.first_name,
                last_name: item.authors.last_name,
                date_submitted: item.date_submitted,
                award_title: item.awards.title,
                pdf_json_data: item.pdf_json_data,
                remarks: item.remarks,
                logs: item.logs
            })))
        })
    }, [])

    console.log(returnedData)

    return (<div>
        <div className="bg-white rounded-xl shadow p-6 mt-5">
            <h1 className="text-2xl font-bold mb-6">Returned</h1>


            <div className="space-y-4">
                {returnedData.map((item) => (
                    <div
                        key={item.submission_id}
                        className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex justify-between items-center transition"
                        onClick={() => { onSelect(item) }}
                    >
                        <div>
                            <p className="font-semibold text-lg">{item.first_name + ' ' + item.last_name}</p>
                            <p className="text-sm">{item.award_title}</p>
                            {/* <p className="text-xs text-gray-400">{item.date_submitted}</p> */}
                            <p className="text-xs text-red-400">{(item.remarks) ? ` ${item.remarks}` : ''}</p>
                        </div>
                        <ChevronRight className="text-gray-400" />
                    </div>
                ))}
            </div>
        </div>


    </div>);
}
