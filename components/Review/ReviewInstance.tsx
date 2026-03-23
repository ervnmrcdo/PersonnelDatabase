import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Application, SubmissionLog } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { useReviewFlow } from "@/context/ReviewFlowContext";
import { DocxEditor, type DocxEditorRef } from '@eigenpal/docx-js-editor';
import '@eigenpal/docx-js-editor/styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  data: Application;
  onBack: () => void;
};

export default function ReviewInstance({ data, onBack }: Props) {
  const { setSelected } = useReviewFlow()
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const { user, profile } = useAuth()

  const [errorRemarks, setErrorRemarks] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [showSignConfirmDialog, setShowSignConfirmDialog] = useState<boolean>(false);

  const [expandedPdf, setExpandedPdf] = useState<boolean>(false);
  const [expandedDocx, setExpandedDocx] = useState<boolean>(false);
  const [docxBuffers, setDocxBuffers] = useState<{
    form42?: ArrayBuffer;
    form43?: ArrayBuffer;
    form44?: ArrayBuffer;
  }>({});
  const [activeDocxTab, setActiveDocxTab] = useState<'form42' | 'form43' | 'form44'>('form42');

  const getActorName = () => {
    return profile ? `${profile.first_name} ${profile.last_name}` : 'Admin';
  };

  const acceptPDF = async () => {
    try {
      const verifiedLog: SubmissionLog = {
        action: 'VALIDATED',
        remarks: '',
        date: Date().toLocaleString(),
        actor_name: getActorName(),
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
          admin_id: user?.id,
        })
      });

      // const blob = await signPDF.blob()
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "ipc-award-form.pdf";
      // a.click();
      //

      const { pdfInBytes } = await signPDF.json()

      const foo = Buffer.from(pdfInBytes, 'base64')

      const payload = {
        pdfBytes: foo.toString('base64'),
        // change admin id to correspond to uid of admin user
        admin_id: user?.id,
        submission_id: data.application_id,
        newLogs
      }

      console.log(payload)

      const response = await fetch('/api/admin/post-signed-award/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Form Signed and Returned')
        setSelected(null)
      } else {
        alert('Failed to return signed form')
      }
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
      actor_name: getActorName(),
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
        setSelected(null)
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    if (data) {
      if (data.pdfUrl) {
        setPdfUrl(data.pdfUrl);
      } else if (data.pdfBase64) {
        const blob = new Blob(
          [Uint8Array.from(atob(data.pdfBase64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" },
        );
        setPdfUrl(URL.createObjectURL(blob));
      }
    }
  }, [data]);

  useEffect(() => {
    const fetchDocx = async () => {
      const buffers: typeof docxBuffers = {};
      
      if (data.form42Url) {
        try {
          const res = await fetch(data.form42Url);
          buffers.form42 = await res.arrayBuffer();
        } catch (err) {
          console.error('Failed to fetch Form 4.2:', err);
        }
      }
      if (data.form43Url) {
        try {
          const res = await fetch(data.form43Url);
          buffers.form43 = await res.arrayBuffer();
        } catch (err) {
          console.error('Failed to fetch Form 4.3:', err);
        }
      }
      if (data.form44Url) {
        try {
          const res = await fetch(data.form44Url);
          buffers.form44 = await res.arrayBuffer();
        } catch (err) {
          console.error('Failed to fetch Form 4.4:', err);
        }
      }
      
      setDocxBuffers(buffers);
      if (buffers.form42) setActiveDocxTab('form42');
      else if (buffers.form44) setActiveDocxTab('form44');
      else if (buffers.form43) setActiveDocxTab('form43');
    };
    
    if (data) fetchDocx();
  }, [data]);

  const hasForm42 = !!docxBuffers.form42;
  const hasForm43 = !!docxBuffers.form43;
  const hasForm44 = !!docxBuffers.form44;
  const hasAnyDocx = hasForm42 || hasForm43 || hasForm44;

  return (
    <div className="bg-[#1b1e2b] rounded-xl shadow p-6 space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-white mb-2"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      <div className="p-4 bg-[#252836] rounded-lg">
        <p className="font-bold text-lg text-white">{data.name}</p>
        <p className="text-sm text-gray-400">{data.role}</p>
        <p className="text-sm">{data.award}</p>
        <p className="text-xs text-gray-400">{data.dateSubmitted}</p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => setShowSignConfirmDialog(true)}>
          Sign and Return
        </button>
        <button className="px-4 py-2 border rounded-md"
          onClick={() => setShowErrorDialog(true)}
        >Return with Errors</button>
      </div>

      {/* Expandable PDF Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedPdf(!expandedPdf)}
          className="w-full px-4 py-3 bg-[#252836] hover:bg-gray-700 flex justify-between items-center text-white"
        >
          <span>Form 4.1 - IPA Form (PDF)</span>
          {expandedPdf ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedPdf && (
          <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-[#1a1e2b]">
            {pdfUrl ? (
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
            ) : (
              <p className="text-gray-400">No PDF attached.</p>
            )}
          </div>
        )}
      </div>

      {/* Expandable DOCX Section */}
      {hasAnyDocx && (
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedDocx(!expandedDocx)}
            className="w-full px-4 py-3 bg-[#252836] hover:bg-gray-700 flex justify-between items-center text-white"
          >
            <span>Form 4.2 and Form 4.4 Documents</span>
            {expandedDocx ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {expandedDocx && (
            <div className="p-4 bg-[#1a1e2b]">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-4">
                {hasForm42 && (
                  <button
                    onClick={() => setActiveDocxTab('form42')}
                    className={`px-4 py-2 rounded ${activeDocxTab === 'form42' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    Form 4.2
                  </button>
                )}
                {hasForm44 && (
                  <button
                    onClick={() => setActiveDocxTab('form44')}
                    className={`px-4 py-2 rounded ${activeDocxTab === 'form44' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    Form 4.4
                  </button>
                )}
                {hasForm43 && (
                  <button
                    onClick={() => setActiveDocxTab('form43')}
                    className={`px-4 py-2 rounded ${activeDocxTab === 'form43' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    Form 4.3
                  </button>
                )}
              </div>
              
              {/* DOCX Viewer */}
              <div style={{ height: '600px' }} className="overflow-hidden rounded-lg">
                {activeDocxTab === 'form42' && docxBuffers.form42 && (
                  <DocxEditor
                    documentBuffer={docxBuffers.form42}
                    mode="viewing"
                    onChange={() => {}}
                  />
                )}
                {activeDocxTab === 'form43' && docxBuffers.form43 && (
                  <DocxEditor
                    documentBuffer={docxBuffers.form43}
                    mode="viewing"
                    onChange={() => {}}
                  />
                )}
                {activeDocxTab === 'form44' && docxBuffers.form44 && (
                  <DocxEditor
                    documentBuffer={docxBuffers.form44}
                    mode="viewing"
                    onChange={() => {}}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}


      {/* Error Remarks Dialog */}
      {showErrorDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1b1e2b] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Return with Errors</h3>
            <p className="text-sm text-gray-300 mb-2">
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
                className="px-4 py-2 border rounded-md hover:bg-gray-700"
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

      {/* Sign Confirmation Dialog */}
      {showSignConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1b1e2b] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Confirm Sign Form</h3>
            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to sign this form? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-700"
                onClick={() => setShowSignConfirmDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => {
                  setShowSignConfirmDialog(false);
                  acceptPDF();
                }}
              >
                Confirm Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
