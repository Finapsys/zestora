import React, { useRef } from "react";
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

const Canvas: React.FC<CanvasProps> = ({
  components,
  onSelect,
  onDelete,
  onUpdate,
  onDeselect,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

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

    for (const other of components) {
      if (other.id === id) continue;

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
        const snapRight = other.x + other.width + H_MARGIN;
        const snapLeft = other.x - current.width - H_MARGIN;

        const distToRight = Math.abs(snapRight - newX);
        const distToLeft = Math.abs(snapLeft - newX);

        const candidateX = distToRight <= distToLeft ? snapRight : snapLeft;

        newX = candidateX;

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
        />
      ))}
    </div>
  );
};

export default Canvas;
