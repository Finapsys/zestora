import React, { useRef } from "react";
import { ResizableBox } from "react-resizable";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../styles/FormComponent.module.css";

export interface FormComponentProps {
  id: string;
  type: "text" | "label";
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;

  name?: string;
  value?: string;

  placeholder?: string;
  fontSize?: number;
  color?: string;
  background?: string;
  border?: string;
  padding?: string;

  labelText?: string;
  fontWeight?: string;

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
  type,
  placeholder,
  labelText,
  onSelect,
  onDelete,
  onUpdate,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x, y }}
      onStop={(_e: DraggableEvent, data: DraggableData) =>
        onUpdate(id, { x: data.x, y: data.y })
      }
      onStart={() => onSelect(id)}
    >
      <div ref={nodeRef} className={styles.wrapper}>
        {type === "text" ? (
          <ResizableBox
            width={width}
            height={height}
            axis="x"
            resizeHandles={["e", "w"]}
            minConstraints={[50, height]}
            maxConstraints={[500, height]}
            onResizeStop={(_e, data) =>
              onUpdate(id, { width: data.size.width })
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
              {selected && (
                <AiOutlineDelete
                  size={18}
                  className={styles.deleteIcon}
                  onClick={() => onDelete(id)}
                />
              )}
            </div>
          </ResizableBox>
        ) : (
          <div
            className={`${styles.component} ${
              selected ? styles.selected : ""
            } ${styles.labelWrapper}`}
            onClick={() => onSelect(id)}
          >
            <span className={styles.labelText}>{labelText || "Label"}</span>
            {selected && (
              <AiOutlineDelete
                size={16}
                className={styles.inlineDeleteIcon}
                onClick={() => onDelete(id)}
              />
            )}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default FormComponent;
