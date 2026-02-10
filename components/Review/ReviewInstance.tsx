import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Application } from "@/lib/types";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs", // or pdf.worker.min.js
  import.meta.url,
).toString();

type Props = {
  data: Application;
  onBack: () => void;
};

export default function ReviewInstance({ data, onBack }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>();

  const acceptPDF = async () => {

    try {
      const signPDF = await fetch('/api/admin/sign-form/route', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: data.pdfBase64
        })
      });

      const { pdfInBytes } = await signPDF.json()
      console.log(pdfInBytes.length)

      const pdfUInt8 = new Uint8Array(Object.values(pdfInBytes));
      const foo = Buffer.from(pdfUInt8)

      const payload = {
        pdfBytes: foo,
        // change admin id to correspond to uid of admin user
        admin_id: '1',
        submission_id: data.id,
      }

      const response = await fetch('api/admin/post-signed-award/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Form Signed and Returned')
      }
    } catch (err) {
      alert(err)
    }
  }

  const returnPDF = async () => {

    try {
      const payload = {
        admin_id: '1',
        submission_id: data.id,
      }

      const rejectPdf = await fetch('/api/admin/return-form/route', {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (rejectPdf.ok) {
        alert('Form returned.')
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    if (data.pdfBase64) {
      console.log(data.pdfBase64);
      const blob = new Blob(
        [Uint8Array.from(atob(data.pdfBase64), (c) => c.charCodeAt(0))],
        { type: "application/pdf" },
      );
      setPdfUrl(URL.createObjectURL(blob));
    }
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-black mb-2"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.role}</p>
        <p className="text-sm">{data.award}</p>
        <p className="text-xs text-gray-400">{data.dateSubmitted}</p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => acceptPDF()}>
          Sign and Return
        </button>
        <button className="px-4 py-2 border rounded-md"
          onClick={() => returnPDF()}
        >Return with Errors</button>
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
  );
}
