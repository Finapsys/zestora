"use client";
import React, { useRef } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../styles/FormComponent.module.css";

export interface FormComponentProps {
  id: string;
  type:
    | "text"
    | "label"
    | "heading"
    | "paragraph"
    | "textarea"
    | "number"
    | "email"
    | "mobile"
    | "date"
    | "time"
    | "time24"
    | "file"
    | "image"
    | "signature"
    | "link"
    | "video"
    | "div"
    | "groupbox"
    | "select"
    | "checkbox"
    | "checkboxList"
    | "radio"
    | "radioList";
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  placeholder?: string;
  labelText?: string;
  options?: string[];
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
  src?: string;
  format12h?: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
  onDragStop?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const {
    id,
    type,
    x,
    y,
    width,
    height,
    selected,
    placeholder,
    value,
    checked,
    labelText,
    options,
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
    src,
    format12h,
    onSelect,
    onDelete,
    onUpdate,
    onDragStop,
  } = props;

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

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
        />
      );
    }

    if (type === "time" || type === "time24") {
      return (
        <input
          type="time"
          value={value || ""}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
          aria-label={labelText || "Select time"}
          title={labelText || "Select time"}
        />
      );
    }

    if (["text", "number", "email", "mobile", "date", "file"].includes(type)) {
      return (
        <input
          type={type === "mobile" ? "tel" : type}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
        />
      );
    }

    if (type === "select") {
      return (
        <select
          value={value || ""}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
          aria-label={labelText || "Select an option"}
        >
          {(options || []).map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (type === "checkbox") {
      return (
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="checkbox"
            checked={!!checked}
            onChange={(e) => onUpdate(id, { checked: e.target.checked })}
          />
          {labelText || "Checkbox"}
        </label>
      );
    }

    if (type === "checkboxList" || type === "radioList") {
      const isRadio = type === "radioList";
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(options || []).map((opt, idx) => (
            <label
              key={idx}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <input
                type={isRadio ? "radio" : "checkbox"}
                name={id}
                checked={value === opt}
                onChange={() => onUpdate(id, { value: isRadio ? opt : value })}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    }

    if (type === "radio") {
      return (
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="radio"
            name={id}
            checked={!!checked}
            onChange={(e) => onUpdate(id, { checked: e.target.checked })}
          />
          {labelText || "Radio"}
        </label>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (["label", "heading", "paragraph", "link"].includes(type)) {
      const Tag =
        type === "heading" ? "h3" : type === "paragraph" ? "p" : "span";
      return <Tag style={sharedStyle}>{labelText || type}</Tag>;
    }

    if (type === "image" && src)
      return <img src={src} style={{ width: "100%", height: "100%" }} alt="" />;
    if (type === "video" && src)
      return (
        <video src={src} style={{ width: "100%", height: "100%" }} controls />
      );
    if (type === "signature")
      return (
        <div
          style={{
            ...sharedStyle,
            border: "1px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Signature
        </div>
      );
    if (type === "div" || type === "groupbox")
      return (
        <div
          style={{
            ...sharedStyle,
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {type.toUpperCase()}
        </div>
      );

    return null;
  };

  const isInputType = [
    "text",
    "number",
    "email",
    "mobile",
    "date",
    "time",
    "time24",
    "textarea",
    "file",
    "select",
    "checkbox",
    "checkboxList",
    "radio",
    "radioList",
  ].includes(type);

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
        {isInputType ? (
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
              {renderInput()}
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
            style={{ ...sharedStyle, display: "inline-block", width, height }}
          >
            {renderContent()}
            {selected && (
              <AiOutlineDelete
                size={18}
                className={styles.deleteIcon}
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
