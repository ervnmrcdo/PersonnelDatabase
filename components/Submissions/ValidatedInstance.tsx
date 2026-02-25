import { AcceptedForm } from "@/lib/types"
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

type Props = {
    data: AcceptedForm;
    onBack: () => void;
}

export default function AcceptedFormInstance({ data, onBack }: Props) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number>();

    async function download() {
        const a = document.createElement("a");
        a.href = data.pdfBufferData;
        a.download = "ipc-award-form.pdf";
        a.click();
    }

    useEffect(() => {
        if (data) {
            setPdfUrl(data.pdfBufferData);
        }
    }, [data])


    return (

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-black mb-2"
            >
                <ArrowLeft className="mr-2" /> Back
            </button>

            <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold text-lg">{data.first_name + ' ' + data.last_name}</p>
                <p className="text-sm">{data.award_title}</p>
                <p className="text-xs text-gray-400">{data.date_submitted}</p>
            </div>

            <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={download}>
                    Download for Printing
                </button>
            </div>
            {
                pdfUrl ? (
                    <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-gray-50">
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        >
                            {Array.from(new Array(numPages), (_, i) => (
                                <Page
                                    key={i}
                                    pageNumber={i + 1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="mb-4 shadow"
                                />
                            ))}
                        </Document>
                    </div>
                ) : (
                    <p>No PDF attached.</p>
                )
            }
        </div >
    )
}
