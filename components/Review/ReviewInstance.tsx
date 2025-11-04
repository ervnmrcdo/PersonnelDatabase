import { Application } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

type Props = {
  data: Application;
  onBack: () => void;
};

export default function ReviewInstance({ data, onBack }: Props) {
  const [numPages, setNumPages] = useState<number>();

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-black mb-2"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      {/* User info section */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.role}</p>
        <p className="text-sm">{data.award}</p>
        <p className="text-xs text-gray-400">{data.dateSubmitted}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          Accept & Print for Signing
        </button>
        <button className="px-4 py-2 border rounded-md">Mark Errors</button>
      </div>

      {/* Scrollable PDF Viewer */}
      <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-gray-50">
        <Document
          file={data.pdfUrl}
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
    </div>
  );
}
