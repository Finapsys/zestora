import React from "react";
import FormComponent, { FormComponentProps } from "./FormComponent";
import styles from "../styles/Canvas.module.css";

interface CanvasProps {
  components: FormComponentProps[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  onSelect,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className={styles.canvas}>
      {components.map((comp) => (
        <FormComponent
          key={comp.id}
          {...comp}
          onSelect={onSelect}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default Canvas;
