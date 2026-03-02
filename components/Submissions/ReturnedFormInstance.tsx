import { AcceptedForm, IPAFormData, RejectedForm } from "@/lib/types"
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import EditableAwardForm from "../Awards/EditableAwardForm";
import { transformToIPAFormData } from "@/utils/transformRawData";
import { handleDownload } from "@/utils/handleDownload";
import handleSubmit from "@/utils/handleSubmit";
import handleResubmit from "@/utils/handleResubmit";
import { useSubmissionsFlow } from "@/context/SubmissionsFlowContext";
import { useAuth } from "@/context/AuthContext";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs", // or pdf.worker.min.js
//     import.meta.url,
// ).toString();
//
type Props = {
    data: RejectedForm;
    onBack: () => void;
}

export default function ReturnedFormInstance({ data, onBack }: Props) {
    const { setSelected } = useSubmissionsFlow()
    const { profile } = useAuth()
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number>();
    const submitter_id = useAuth().user!.id.toString()

    async function download() {
        // NEW: Handle both URL and Buffer data
        if (data.pdfBufferData && data.pdfBufferData.startsWith('http')) {
            // It's a signed URL - use it directly
            const a = document.createElement("a");
            a.href = data.pdfBufferData;
            a.download = "ipc-award-form.pdf";
            a.click();
        } else {
            // It's a Buffer (old format) - convert to blob
            const foo = Buffer.from(data.pdfBufferData).toString('base64')
            const blob = new Blob(
                [Uint8Array.from(atob(foo), (c) => c.charCodeAt(0))],
                { type: "application/pdf" },
            );
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "ipc-award-form.pdf";
            a.click();
        }
    }

    const rawPdfJson = data.pdf_json_data;
    const foo = typeof rawPdfJson === 'string'
        ? JSON.parse(rawPdfJson) as unknown as IPAFormData
        : rawPdfJson as unknown as IPAFormData;

    return (
        <div className="bg-[#1b1e2b] rounded-xl shadow p-6 space-y-4">
            <button
                onClick={onBack}
                className="flex items-center text-gray-400 hover:text-white mb-2"
            >
                <ArrowLeft className="mr-2" /> Back
            </button>

            <div className="p-4 bg-[#252836] rounded-lg">
                <p className="font-bold text-lg text-white">{data.first_name + ' ' + data.last_name}</p>
                <p className="text-sm text-gray-300">{data.award_title}</p>
                <p className="text-xs text-gray-400">{data.date_submitted}</p>
            </div>

            <div className="p-4 bg-[#252836] rounded-lg">
                <p className="font-bold text-med text-white">{`Remarks:`}</p>
                <p className="text-sm text-gray-300">{data.remarks ?? 'No remarks noted.'}</p>
            </div>


            <EditableAwardForm initialData={foo}
                onSubmit={handleSubmit}
                onResubmit={async (formData, submissionId, logs) => {
                    const actor_name = profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown';
                    await handleResubmit(formData, submissionId, logs, actor_name, submitter_id)
                    setSelected(null)
                }}
                onDownload={handleDownload}
                isResubmitting={true}
                submitter_id=''
                publication_id=''
                submission_id={data.submission_id} logs={data.logs} />
        </div >
    )
}

