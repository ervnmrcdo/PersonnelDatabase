// components/ui/DraggableField.tsx
"use client";

import { useState, useCallback } from "react";

interface DraggableFieldProps {
  field: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    type: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function DraggableField({
  field,
  isSelected,
  onSelect,
  onUpdate,
  containerRef,
}: DraggableFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fieldStart, setFieldStart] = useState({ x: field.x, y: field.y });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    setIsDragging(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setFieldStart({ x: field.x, y: field.y });
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const newX =
        fieldStart.x + (e.clientX - rect.left - dragStart.x) / containerWidth;
      const newY =
        fieldStart.y + (e.clientY - rect.top - dragStart.y) / containerHeight;

      onUpdate({
        x: Math.max(0, Math.min(1 - field.width, newX)),
        y: Math.max(0, Math.min(1 - field.height, newY)),
      });
    },
    [isDragging, dragStart, fieldStart, field.width, field.height, onUpdate],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`absolute border-2 pointer-events-auto cursor-move ${
        isSelected
          ? "border-blue-500 bg-blue-50 bg-opacity-50"
          : "border-gray-400 bg-gray-100 bg-opacity-30"
      }`}
      style={{
        left: `${field.x * 100}%`,
        top: `${field.y * 100}%`,
        width: `${field.width * 100}%`,
        height: `${field.height * 5}rem`, // Fixed height for better UX
        minHeight: "2rem",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-1 text-xs font-medium truncate">{field.label}</div>

      {/* Resize handles */}
      {isSelected && (
        <>
          <div
            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              // Handle resize logic here
            }}
          />
        </>
      )}
    </div>
  );
}
