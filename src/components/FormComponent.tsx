import React, { useRef } from "react";
import { ResizableBox } from "react-resizable";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../styles/FormComponent.module.css";

export interface FormComponentProps {
  id: string;
  type: "text";
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  placeholder?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  id,
  x,
  y,
  width,
  height,
  selected,
  placeholder,
  onSelect,
  onDelete,
  onUpdate,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x, y }}
      onStop={(_e, data) => onUpdate(id, { x: data.x, y: data.y })}
      onStart={() => onSelect(id)}
    >
      <div ref={nodeRef} className={styles.wrapper}>
        <ResizableBox
          width={width}
          height={height}
          onResizeStop={(_e, data) =>
            onUpdate(id, { width: data.size.width, height: data.size.height })
          }
        >
          <div
            className={`${styles.component} ${
              selected ? styles.selected : ""
            } ${styles.inputWrapper}`}
            onClick={() => onSelect(id)}
          >
            <input
              type="text"
              placeholder={placeholder || "Text Input"}
              className={styles.inputField}
            />
          </div>
        </ResizableBox>

        <AiOutlineDelete
          size={18}
          className={styles.deleteIcon}
          onClick={() => onDelete(id)}
        />
      </div>
    </Draggable>
  );
};

export default FormComponent;
