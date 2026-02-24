import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Application, SubmissionLog } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  data: Application;
  onBack: () => void;
};

export default function ReviewInstance({ data, onBack }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const { user } = useAuth()

  const [errorRemarks, setErrorRemarks] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

  const acceptPDF = async () => {
    try {
      const verifiedLog: SubmissionLog = {
        action: 'VALIDATED',
        remarks: '',
        date: Date().toLocaleString(),
      }

      const newLogs = [...data.logs]
      newLogs.push(verifiedLog)

      // NEW: Handle both URL and Buffer data
      let pdfBase64 = data.pdfBase64;
      
      // If we have a pdfUrl (signed URL), fetch the PDF and convert to base64
      if (data.pdfUrl && !pdfBase64) {
        const response = await fetch(data.pdfUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        pdfBase64 = Buffer.from(uint8Array).toString('base64');
      }

      const signPDF = await fetch('/api/admin/sign-form/route', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: pdfBase64,
        })
      });

      // const blob = await signPDF.blob()
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "ipc-award-form.pdf";
      // a.click();


      const { pdfInBytes } = await signPDF.json()

      const pdfUInt8 = new Uint8Array(Object.values(pdfInBytes));
      const foo = Buffer.from(pdfUInt8)

      const payload = {
        pdfBytes: foo,
        // change admin id to correspond to uid of admin user
        admin_id: user?.id,
        submission_id: data.application_id,
        newLogs
      }

      console.log(payload)

      // const response = await fetch('api/admin/post-signed-award/route', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // if (response.ok) {
      //   alert('Form Signed and Returned')
      // } else {
      //   alert('Failed to return signed form')
      // }
    } catch (err) {
      alert(err)
    }
  }

  const returnPDF = async () => {
    if (!errorRemarks.trim()) {
      alert('Please provide error remarks');
      return;
    }

    // console.log(errorRemarks);
    const returnedLog: SubmissionLog = {
      action: 'RETURNED',
      remarks: errorRemarks,
      date: new Date().toISOString(),
    }

    const newLogs = [...data.logs]
    newLogs.push(returnedLog)

    try {
      const payload = {
        admin_id: user?.id,
        submission_id: data.application_id,
        remarks: errorRemarks,
        logs: newLogs,
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
    if (data) {
      // NEW: Handle both URL and Buffer data
      if (data.pdfUrl) {
        // It's a signed URL - use it directly
        setPdfUrl(data.pdfUrl);
      } else if (data.pdfBase64) {
        // It's a Buffer (old format) - convert to blob
        const blob = new Blob(
          [Uint8Array.from(atob(data.pdfBase64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" },
        );
        setPdfUrl(URL.createObjectURL(blob));
      }
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
          onClick={() => setShowErrorDialog(true)}
        >Return with Errors</button>
      </div>


      {/* Error Remarks Dialog */}
      {showErrorDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Return with Errors</h3>
            <p className="text-sm text-gray-600 mb-2">
              Please specify the errors or issues found in this submission:
            </p>
            <textarea
              className="w-full border rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Missing signatures on page 3, Incorrect dates, etc."
              value={errorRemarks}
              onChange={(e) => setErrorRemarks(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                onClick={() => {
                  setErrorRemarks("");
                  setShowErrorDialog(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                onClick={returnPDF}
                disabled={!errorRemarks.trim()}
              >
                Submit Errors
              </button>
            </div>
          </div>
        </div>
      )}

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
