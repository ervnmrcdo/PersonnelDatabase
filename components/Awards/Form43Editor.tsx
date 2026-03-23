'use client'
import * as jose from 'jose';
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import { useState, useEffect, useMemo } from "react";

interface FormEditorProps {
  publicationId: string;
}

export default function Form43Editor({ publicationId }: FormEditorProps) {
  const [token, setToken] = useState("");
  const [documentKey] = useState(() => `8${Date.now()}`)
  const detectedIp = useMemo(() => typeof window !== 'undefined' ? window.location.hostname : '', [])

  const config = useMemo(() => ({
    document: {
      fileType: "docx",
      key: documentKey,
      title: "4.3-template",
      url: `http://host.docker.internal:3000/4.3-template.docx`,
    },
    documentType: "word",
    editorConfig: {
      mode: "edit",
      customization: {
        macros: true,
        macrosMode: "enable",
      }
    },

  }), [publicationId, documentKey]);

  useEffect(() => {
    const generateToken = async () => {
      const secret = new TextEncoder().encode('my_super_secret_key');
      const signedToken = await new jose.SignJWT(config)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret);
      setToken(signedToken);
    };

    generateToken();
  }, [config]);

  if (!token) return <div>Generating secure access...</div>;

  return (
    <div style={{ height: "600px" }}>
      <DocumentEditor
        id="docxEditor"
        documentServerUrl={`http://${detectedIp}:8080/`}
        config={{
          ...config,
          token: token,
        }}
      />
    </div>
  );
}
