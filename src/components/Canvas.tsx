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
const Canvas: React.FC<CanvasProps> = ({
  components,
  onSelect,
  onDelete,
  onUpdate,
  onDeselect,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === canvasRef.current) {
      onDeselect?.();
    }
  };
  return (
    <div ref={canvasRef} className={styles.canvas} onClick={handleCanvasClick}>
      {" "}
      {components.map((comp) => (
        <FormComponent
          key={comp.id}
          {...comp}
          onSelect={onSelect}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}{" "}
    </div>
  );
};
export default Canvas;
