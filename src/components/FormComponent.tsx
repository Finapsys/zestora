import React, { useRef } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
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
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  color?: string;
  background?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  boxShadow?: string;
  labelText?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
  onDragStop?: () => void;
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
  value,
  labelText,
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  color,
  background,
  border,
  borderRadius,
  padding,
  margin,
  boxShadow,
  onSelect,
  onDelete,
  onUpdate,
  onDragStop,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const sharedStyle: React.CSSProperties = {
    fontSize: fontSize ? `${fontSize}px` : undefined,
    fontFamily,
    fontWeight,
    textAlign,
    color,
    background,
    border,
    borderRadius,
    padding,
    margin,
    boxShadow,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x, y }}
      onStart={() => onSelect(id)}
      onStop={(e, data) => {
        onUpdate(id, { x: data.x, y: data.y });
        onDragStop?.();
      }}
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
                value={value || ""}
                onChange={(e) => onUpdate(id, { value: e.target.value })}
                style={sharedStyle}
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
            style={{
              ...sharedStyle,
              display: "inline-block",
              width,
              height,
            }}
          >
            <span>{labelText || "Label"}</span>
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

