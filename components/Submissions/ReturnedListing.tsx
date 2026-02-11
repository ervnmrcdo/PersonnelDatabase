import { RejectedForm } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    onSelect: (data: RejectedForm) => void;
}

export default function ReturnedListing({ onSelect }: Props) {

    const [step, setStep] = useState<'listing' | 'accepted-review'>('listing')
    //
    // should store selected data to be viewed later
    const [rejectedForm, setRejectedForm] = useState<RejectedForm | null>(null)
    //
    // stores retrieved data
    const [rejectedData, setRejectedData] = useState<RejectedForm[]>([])
    // const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    //hard-coded id of sudent need to be changed
    const payload = {
        id: '1',
        submitterType: 'NONTEACHING'
    }

    useEffect(() => {
        fetch("/api/get/returned-forms", {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then((res) => res.json()).then((result) => {
            setRejectedData(result.map((item: any) => ({
                submission_id: item.submission_id,
                pdfBufferData: item.attached_files,
                firstName: item.first_name,
                lastName: item.last_name,
                date_submitted: item.date_submitted,
                award_title: item.title,
                pdf_json_data: item.pdf_json_data,
                remarks: item.remarks
            })))
        })
    }, [])

    return (<div>
        <div className="bg-white rounded-xl shadow p-6 mt-5">
            <h1 className="text-2xl font-bold mb-6">Returned</h1>


            <div className="space-y-4">
                {rejectedData.map((item) => (
                    <div
                        key={item.submission_id}
                        className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex justify-between items-center transition"
                        onClick={() => { onSelect(item) }}
                    >
                        <div>
                            <p className="font-semibold text-lg">{item.firstName + item.lastName}</p>
                            <p className="text-sm">{item.award_title}</p>
                            <p className="text-xs text-gray-400">{item.date_submitted}</p>
                            <p className="text-xs text-gray-400">{item.remarks}</p>
                        </div>
                        <ChevronRight className="text-gray-400" />
                    </div>
                ))}
            </div>
        </div>


    </div>);
}
