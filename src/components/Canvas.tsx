"use client";
import React, { useRef, useState } from "react";
import FormComponent, { FormComponentProps } from "./FormComponent";
import styles from "../styles/Canvas.module.css";
import {
  AiOutlineEye,
  AiOutlineCode,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import Modal from "./Modal";
import CodePreviewModal from "./CodePreviewModal";

interface CanvasProps {
  components: FormComponentProps[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
  onDeselect?: () => void;
  formName: string;
  setFormName: (name: string) => void;
  oldFormName: string | null;
  setOldFormName: (name: string) => void;
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
}


const H_MARGIN = 10;
const V_MARGIN = 10;
const ALIGN_THRESHOLD = 5;

const Canvas: React.FC<CanvasProps> = ({
  components,
  onSelect,
  onDelete,
  onUpdate,
  onDeselect,
  formName,
  setFormName,
  oldFormName,
  setOldFormName,
  isUpdating,
  setIsUpdating,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [verticalLine, setVerticalLine] = useState<number | null>(null);
  const [horizontalLine, setHorizontalLine] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCodePreviewOpen, setIsCodePreviewOpen] = useState(false);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === canvasRef.current) onDeselect?.();
  };

  const overlaps = (
    ax: number,
    ay: number,
    aw: number,
    ah: number,
    bx: number,
    by: number,
    bw: number,
    bh: number
  ) => ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

  const handleUpdatePosition = (id: string, x: number, y: number) => {
    const current = components.find((c) => c.id === id);
    if (!current) return;

    let newX = x;
    let newY = y;
    setVerticalLine(null);
    setHorizontalLine(null);

    for (const other of components) {
      if (other.id === id) continue;

      if (Math.abs(newY - other.y) <= ALIGN_THRESHOLD) {
        newY = other.y;
        setHorizontalLine(other.y + other.height / 2);
      }
      if (Math.abs(newX - other.x) <= ALIGN_THRESHOLD) {
        newX = other.x;
        setVerticalLine(other.x + other.width / 2);
      }

      if (
        overlaps(
          newX,
          newY,
          current.width,
          current.height,
          other.x,
          other.y,
          other.width,
          other.height
        )
      ) {
        const verticallyAligned = Math.abs(newY - other.y) < V_MARGIN * 2;
        if (verticallyAligned) {
          const snapRight = other.x + other.width + H_MARGIN;
          const snapLeft = other.x - current.width - H_MARGIN;
          newX =
            Math.abs(snapRight - newX) <= Math.abs(snapLeft - newX)
              ? snapRight
              : snapLeft;
        } else {
          newY = other.y + other.height + V_MARGIN;
        }
      }
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      if (newX < 0) newX = 0;
      const maxX = Math.max(0, rect.width - current.width);
      if (newX > maxX) newX = maxX;
      if (newY < 0) newY = 0;
    }

    onUpdate(id, { x: newX, y: newY });
  };

  const handleFormPreview = () => setIsPreviewOpen(true);
  const handleFormCodePreview = () => setIsCodePreviewOpen(true);

  const handleSaveForm = async () => {
    if (!formName) return alert("Enter a form name!");

    try {
      if (isUpdating) {
        const res = await fetch(`/api/forms/${oldFormName}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newName: formName, data: components }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update");

        alert(data.message);

        if (formName !== oldFormName) {
          setOldFormName(formName);
        }
      } else {
        const res = await fetch(`/api/forms/${formName}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(components),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to save");

        alert(data.message);
        setIsUpdating(true);
        setOldFormName(formName);
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to ${isUpdating ? "update" : "create"} form`);
    }
  };

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.canvasHeader}>
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Untitled Form"
          className={styles.formNameInput}
        />
        <div className={styles.headerButtons}>
          <button type="button" onClick={handleFormPreview}>
            <AiOutlineEye style={{ marginRight: 5 }} />
            Form Preview
          </button>
          <button type="button" onClick={handleFormCodePreview}>
            <AiOutlineCode style={{ marginRight: 5 }} />
            Form Code Preview
          </button>
          <button type="button" onClick={handleSaveForm}>
            <AiOutlinePlusCircle style={{ marginRight: 5 }} />
            {isUpdating ? "Update Form" : "Create Form"}
          </button>
        </div>
      </div>

      <div
        ref={canvasRef}
        className={styles.canvas}
        onClick={handleCanvasClick}
      >
        {components.map((comp) => (
          <FormComponent
            key={comp.id}
            {...comp}
            onSelect={onSelect}
            onDelete={onDelete}
            onUpdate={(id, data) => {
              if (typeof data.x === "number" && typeof data.y === "number") {
                handleUpdatePosition(id, data.x, data.y);
              } else {
                onUpdate(id, data);
              }
            }}
            onDragStop={() => {
              setVerticalLine(null);
              setHorizontalLine(null);
            }}
          />
        ))}

        {verticalLine !== null && (
          <div
            className={`${styles.alignmentLine} ${styles.verticalLine}`}
            style={
              { "--line-left": `${verticalLine}px` } as React.CSSProperties
            }
          />
        )}
        {horizontalLine !== null && (
          <div
            className={`${styles.alignmentLine} ${styles.horizontalLine}`}
            style={
              { "--line-top": `${horizontalLine}px` } as React.CSSProperties
            }
          />
        )}
      </div>

      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Form Preview"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "500px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
          }}
        >
          {components.map((comp) => (
            <FormComponent
              key={comp.id}
              {...comp}
              style={{ position: "absolute", left: comp.x, top: comp.y }}
            />
          ))}
        </div>
      </Modal>

      <CodePreviewModal
        isOpen={isCodePreviewOpen}
        onClose={() => setIsCodePreviewOpen(false)}
        components={components}
      />
    </div>
  );
};

export default Canvas;
