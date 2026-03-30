import { useEffect, useState, useMemo, useCallback } from "react";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Application, SubmissionLog } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { useReviewFlow } from "@/context/ReviewFlowContext";
import * as jose from 'jose';
import { DocumentEditor } from "@onlyoffice/document-editor-react";

type Props = {
  data: Application;
  onBack: () => void;
};

interface DocumentConfig {
  document: {
    fileType: string;
    key: string;
    title: string;
    url: string;
  };
  documentType: string;
  editorConfig: {
    mode: string;
    customization: {
      forcesave: boolean;
    };
  };
}

export default function ReviewInstance({ data, onBack }: Props) {
  const { setSelected } = useReviewFlow()
  const [docxConfigs, setDocumentConfigs] = useState<{
    form42?: { config: DocumentConfig; token: string };
    form43?: { config: DocumentConfig; token: string };
  }>({});
  const [pdfConfigs, setPdfConfigs] = useState<{
    form41?: { config: DocumentConfig; token: string };
    form44?: { config: DocumentConfig; token: string };
  }>({});
  const { user, profile } = useAuth()

  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);

  const [errorRemarks, setErrorRemarks] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [showSignConfirmDialog, setShowSignConfirmDialog] = useState<boolean>(false);

  const [expandedForm41, setExpandedForm41] = useState<boolean>(false);
  const [expandedForm42, setExpandedForm42] = useState<boolean>(false);
  const [expandedForm43, setExpandedForm43] = useState<boolean>(false);
  const [expandedForm44, setExpandedForm44] = useState<boolean>(false);


  const detectedIp = useMemo(() => typeof window !== 'undefined' ? window.location.hostname : '', [])

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

      let pdfBase64 = "";

      if (data.form41Url) {
        const response = await fetch(data.form41Url);
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

      const { pdfInBytes } = await signPDF.json()

      const foo = Buffer.from(pdfInBytes, 'base64')

      const payload = {
        pdfBytes: foo.toString('base64'),
        admin_id: user?.id,
        submission_id: data.application_id,
        newLogs
      }


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

  const generateToken = useCallback(async (config: DocumentConfig) => {
    const secret = new TextEncoder().encode('my_super_secret_key');
    return await new jose.SignJWT(config as unknown as jose.JWTPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);
  }, []);

  useEffect(() => {
    const fetchSignedPreview = async () => {
      if (!data || !user?.id || !data.form41Url || !data.form44Url) return;

      const hasForm41 = !!data.form41Url
      const pdfUrl = hasForm41 ? data.form41Url : data.form44Url
      const title = hasForm41 ? '4.1-signed' : '4.1-signed'


      console.log(`http://host.docker.internal:3000/api/admin/preview-signed-form/route?pdfUrl=${pdfUrl}&admin_id=${user.id}`)

      setIsLoadingPreview(true);
      try {
        const documentKey = crypto.randomUUID();
        const config: DocumentConfig = {
          document: {
            fileType: "pdf",
            key: documentKey,
            title: title,
            url: `http://host.docker.internal:3000/api/admin/preview-signed-form/route?pdfUrl=${data.form41Url}&admin_id=${user.id}`,
          },
          documentType: "pdf",
          editorConfig: {
            mode: "view",
            customization: {
              forcesave: false,
            },
          },
        };

        const token = await generateToken(config);
        hasForm41 ?
          setPdfConfigs({ form41: { config: config, token: token }, form44: undefined })
          :
          setPdfConfigs({ form44: { config: config, token: token }, form41: undefined })

        // setPdfConfig(config);
        // setPdfToken(token);
      } catch (err) {
        console.error('Error loading preview:', err);
      } finally {
        setIsLoadingPreview(false);
      }
    };

    if (data) {
      fetchSignedPreview();
    }
  }, [data, user?.id, generateToken]);

  useEffect(() => {
    const generateDocumentConfigs = async () => {
      const configs: typeof docxConfigs = {};

      const generateConfig = async (url: string, key: string, title: string): Promise<{ config: DocumentConfig; token: string }> => {
        const config: DocumentConfig = {
          document: {
            fileType: "docx",
            key: key,
            title: title,
            url: url,
          },
          documentType: "word",
          editorConfig: {
            mode: "view",
            customization: {
              forcesave: false,
            },
          },
        };

        const token = await generateToken(config);
        return { config, token };
      };

      if (data.form42Url) {
        const formUrl = `http://host.docker.internal:3000/api/admin/get-form-file/route?formUrl=${encodeURIComponent(data.form42Url)}`;
        configs.form42 = await generateConfig(formUrl, crypto.randomUUID(), "4.2");
      }
      if (data.form43Url) {
        const formUrl = `http://host.docker.internal:3000/api/admin/get-form-file/route?formUrl=${encodeURIComponent(data.form43Url)}`;
        configs.form43 = await generateConfig(formUrl, crypto.randomUUID(), "4.3");
      }
      setDocumentConfigs(configs);
    };

    if (data) {
      generateDocumentConfigs();
    }
  }, [data, generateToken]);

  // const hasForm42 = !!docxConfigs.form42;
  const hasForm41 = !!pdfConfigs.form41;
  const hasForm42 = !!docxConfigs.form42;
  const hasForm43 = !!docxConfigs.form43;
  const hasForm44 = !!pdfConfigs.form44;

  const getEditorConfig = useCallback((config: DocumentConfig, token: string) => ({
    ...config,
    token: token,
  }), []);

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
          onClick={() => setExpandedForm41(!expandedForm41)}
          className="w-full px-4 py-3 bg-[#252836] hover:bg-gray-700 flex justify-between items-center text-white"
        >
          <span>Form 4.1 - IPA Form (PDF)</span>
          {expandedForm41 ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {expandedForm41 && (
          <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-[#1a1e2b]">
            {isLoadingPreview ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-400">Generating preview with signature...</div>
              </div>
            ) : pdfConfigs.form41?.config && pdfConfigs.form44?.token ? (
              <div style={{ height: '600px' }}>
                <DocumentEditor
                  id="pdfEditor"
                  documentServerUrl={`http://${detectedIp}:8080/`}
                  config={getEditorConfig(pdfConfigs.form41.config, pdfConfigs.form44.token)}
                />
              </div>
            ) : (
              <p className="text-gray-400">No PDF attached.</p>
            )}
          </div>
        )}
      </div>

      {hasForm42 ? (
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedForm42(!expandedForm42)}
            className="w-full px-4 py-3 bg-[#252836] hover:bg-gray-700 flex justify-between items-center text-white"
          >
            <span>Form 4.2 - IPA Form (DOCX)</span>
            {expandedForm42 ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          {expandedForm42 && (
            <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-[#1a1e2b]">
              {isLoadingPreview ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-400">Generating preview with signature...</div>
                </div>
              ) : docxConfigs.form42?.config && docxConfigs.form42?.token ? (
                <div style={{ height: '600px' }}>
                  <DocumentEditor
                    id="pdfEditor"
                    documentServerUrl={`http://${detectedIp}:8080/`}
                    config={getEditorConfig(docxConfigs.form42.config, docxConfigs.form42.token)}
                  />
                </div>
              ) : (
                <p className="text-gray-400">No PDF attached.</p>
              )}
            </div>
          )}
        </div>)
        : ''}

      {hasForm43 ? (
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedForm43(!expandedForm43)}
            className="w-full px-4 py-3 bg-[#252836] hover:bg-gray-700 flex justify-between items-center text-white"
          >
            <span>Form 4.3 - IPA Form (DOCX)</span>
            {expandedForm43 ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          {expandedForm43 && (
            <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-[#1a1e2b]">
              {isLoadingPreview ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-400">Generating preview with signature...</div>
                </div>
              ) : docxConfigs.form43?.config && docxConfigs.form43?.token ? (
                <div style={{ height: '600px' }}>
                  <DocumentEditor
                    id="pdfEditor"
                    documentServerUrl={`http://${detectedIp}:8080/`}
                    config={getEditorConfig(docxConfigs.form43.config, docxConfigs.form43.token)}
                  />
                </div>
              ) : (
                <p className="text-gray-400">No PDF attached.</p>
              )}
            </div>
          )}
        </div>)
        : ''}


      {hasForm44 ? (
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedForm44(!expandedForm44)}
            className="w-full px-4 py-3 bg-[#252836] hover:bg-gray-700 flex justify-between items-center text-white"
          >
            <span>Form 4.4 - IPA Form (DOCX)</span>
            {expandedForm44 ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          {expandedForm44 && (
            <div className="border rounded-lg p-4 max-h-[70vh] overflow-y-scroll bg-[#1a1e2b]">
              {isLoadingPreview ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-400">Generating preview with signature...</div>
                </div>
              ) : pdfConfigs.form44?.config && pdfConfigs.form44?.token ? (
                <div style={{ height: '600px' }}>
                  <DocumentEditor
                    id="pdfEditor"
                    documentServerUrl={`http://${detectedIp}:8080/`}
                    config={getEditorConfig(pdfConfigs.form44.config, pdfConfigs.form44.token)}
                  />
                </div>
              ) : (
                <p className="text-gray-400">No PDF attached.</p>
              )}
            </div>
          )}
        </div>)
        : ''}


      {/* Error Remarks Dialog */}
      {
        showErrorDialog && (
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
        )
      }

      {/* Sign Confirmation Dialog */}
      {
        showSignConfirmDialog && (
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
        )
      }
    </div >
  );
}
