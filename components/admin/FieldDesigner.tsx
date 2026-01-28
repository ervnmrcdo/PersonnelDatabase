// components/admin/FieldDesigner.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { DraggableField } from "../ui/DraggableField";

interface FieldDefinition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: string;
  required: boolean;
}

interface FieldDesignerProps {
  pdfUrl: string;
  formId: string;
  existingFields?: FieldDefinition[];
}

export default function FieldDesigner({
  pdfUrl,
  formId,
  existingFields = [],
}: FieldDesignerProps) {
  const [fields, setFields] = useState<FieldDefinition[]>(existingFields);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const addField = (type: string) => {
    const newField: FieldDefinition = {
      id: `field_${Date.now()}`,
      x: 0.1,
      y: 0.1,
      width: 0.2,
      height: 0.05,
      label: `Field ${fields.length + 1}`,
      type,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FieldDefinition>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  const saveFields = async () => {
    try {
      const response = await fetch(`/api/forms/${formId}/fields`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      });

      if (response.ok) {
        alert("Fields saved successfully!");
      }
    } catch (error) {
      console.error("Error saving fields:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex">
        {/* PDF Viewer with Overlay */}
        <div className="flex-1 relative" ref={pdfContainerRef}>
          <iframe src={pdfUrl} className="w-full h-full" title="PDF Form" />

          {/* Field Overlay */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {fields.map((field) => (
              <DraggableField
                key={field.id}
                field={field}
                isSelected={selectedField === field.id}
                onSelect={() => setSelectedField(field.id)}
                onUpdate={(updates) => updateField(field.id, updates)}
                containerRef={pdfContainerRef}
              />
            ))}
          </div>
        </div>

        {/* Field Properties Panel */}
        <div className="w-80 border-l p-4">
          <div className="mb-4">
            <h3 className="font-bold mb-2">Add Field</h3>
            <div className="flex gap-2">
              {["text", "date", "email", "signature"].map((type) => (
                <button
                  key={type}
                  onClick={() => addField(type)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {selectedField && (
            <FieldProperties
              field={fields.find((f) => f.id === selectedField)!}
              onUpdate={(updates) => updateField(selectedField, updates)}
            />
          )}

          <button
            onClick={saveFields}
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Form Design
          </button>
        </div>
      </div>
    </div>
  );
}

// Field Properties Editor Component
function FieldProperties({
  field,
  onUpdate,
}: {
  field: FieldDefinition;
  onUpdate: (updates: Partial<FieldDefinition>) => void;
}) {
  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-bold mb-2">Field Properties</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            value={field.type}
            onChange={(e) => onUpdate({ type: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
            <option value="signature">Signature</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="required">Required Field</label>
        </div>
      </div>
    </div>
  );
}
