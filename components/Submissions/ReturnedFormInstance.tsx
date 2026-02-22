import { AcceptedForm, IPAFormData, RejectedForm } from "@/lib/types"
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import EditableAwardForm from "../Awards/EditableAwardForm";
import { transformToIPAFormData } from "@/utils/transformRawData";
import { handleDownload } from "@/utils/handleDownload";
import handleSubmit from "@/utils/handleSubmit";
import handleResubmit from "@/utils/handleResubmit";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs", // or pdf.worker.min.js
    import.meta.url,
).toString();

type Props = {
    data: RejectedForm;
    onBack: () => void;
}

export default function ReturnedFormInstance({ data, onBack }: Props) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number>();

    async function download() {
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

    const foo = data.pdf_json_data as unknown as IPAFormData

    return (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-black mb-2"
            >
                <ArrowLeft className="mr-2" /> Back
            </button>

            <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold text-lg">{data.firstName + ' ' + data.lastName}</p>
                <p className="text-sm">{data.award_title}</p>
                <p className="text-xs text-gray-400">{data.date_submitted}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold text-med">{`Remarks:`}</p>
                <p className="text-sm">{data.remarks ?? 'No remarks noted.'}</p>
            </div>


            <EditableAwardForm initialData={foo}
                onSubmit={handleSubmit}
                onResubmit={handleResubmit}
                onDownload={handleDownload}
                isResubmitting={true}
                submitter_id=''
                publication_id=''
                submission_id={data.submission_id} logs={data.logs} />
        </div >
    )
}

