import React, { useRef, useState } from "react";
import FormComponent, { FormComponentProps } from "./FormComponent";
import styles from "../styles/Canvas.module.css";

interface CanvasProps {
  components: FormComponentProps[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
  onDeselect?: () => void;
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
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [verticalLine, setVerticalLine] = useState<number | null>(null);
  const [horizontalLine, setHorizontalLine] = useState<number | null>(null);

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
  ) => {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  };

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

          const distToRight = Math.abs(snapRight - newX);
          const distToLeft = Math.abs(snapLeft - newX);

          newX = distToRight <= distToLeft ? snapRight : snapLeft;
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

  return (
    <div ref={canvasRef} className={styles.canvas} onClick={handleCanvasClick}>
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
          style={{
            position: "absolute",
            top: 0,
            left: verticalLine,
            width: 1,
            height: "100%",
            backgroundColor: "red",
            pointerEvents: "none",
          }}
        />
      )}
      {horizontalLine !== null && (
        <div
          style={{
            position: "absolute",
            top: horizontalLine,
            left: 0,
            width: "100%",
            height: 1,
            backgroundColor: "red",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default Canvas;
