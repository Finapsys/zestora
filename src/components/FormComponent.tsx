"use client";
import React, { useRef } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../styles/FormComponent.module.css";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), { ssr: false });

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
    | "radioList"
    | "countdown"
    | "map";
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
  countdownTime?: number;
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
    countdownTime,
    onSelect,
    onDelete,
    onUpdate,
    onDragStop,
  } = props;

  const nodeRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = React.useState(countdownTime || 60);

  React.useEffect(() => {
    if (type !== "countdown") return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [type, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

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
          id={id}
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
          aria-label={labelText || placeholder || type}
          title={labelText || placeholder || type}
        />
      );
    }

    if (type === "time") {
      return (
        <input
          id={id}
          type="time"
          value={value || ""}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
          aria-label={labelText || "Select time"}
          title={labelText || "Select time"}
        />
      );
    }

    if (type === "time24") {
      const getDefaultTime = () => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        return `${hh}:${mm}:${ss}`;
      };

      const initial = value || getDefaultTime();
      const [h, m, s] = initial.split(":").map((v) => parseInt(v, 10));

      const handleChange = (unit: "h" | "m" | "s", val: number) => {
        let hours = h,
          minutes = m,
          seconds = s;
        if (unit === "h") hours = val;
        if (unit === "m") minutes = val;
        if (unit === "s") seconds = val;

        hours = Math.max(0, Math.min(23, hours));
        minutes = Math.max(0, Math.min(59, minutes));
        seconds = Math.max(0, Math.min(59, seconds));

        onUpdate(id, {
          value: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`,
        });
      };

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            ...sharedStyle,
          }}
        >
          <input
            id={`${id}-h`}
            type="number"
            value={h}
            min={0}
            max={23}
            step={1}
            onChange={(e) => handleChange("h", parseInt(e.target.value) || 0)}
            style={{ width: 50 }}
            aria-label="Hours"
            title="Hours"
          />
          <span>:</span>
          <input
            id={`${id}-m`}
            type="number"
            value={m}
            min={0}
            max={59}
            step={1}
            onChange={(e) => handleChange("m", parseInt(e.target.value) || 0)}
            className={styles.inputFieldT24}
            aria-label="Minutes"
            title="Minutes"
          />
          <span>:</span>
          <input
            id={`${id}-s`}
            type="number"
            value={s}
            min={0}
            max={59}
            step={1}
            onChange={(e) => handleChange("s", parseInt(e.target.value) || 0)}
            className={styles.inputFieldT24}
            aria-label="Seconds"
            title="Seconds"
          />
        </div>
      );
    }

    if (["text", "number", "email", "mobile", "date", "file"].includes(type)) {
      return (
        <input
          id={id}
          type={type === "mobile" ? "tel" : type}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
          aria-label={labelText || placeholder || type}
          title={labelText || placeholder || type}
        />
      );
    }

    if (type === "select") {
      return (
        <select
          id={id}
          value={value || ""}
          onChange={(e) => onUpdate(id, { value: e.target.value })}
          style={sharedStyle}
          aria-label={labelText || "Select an option"}
          title={labelText || "Select an option"}
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
            id={id}
            type="checkbox"
            checked={!!checked}
            onChange={(e) => onUpdate(id, { checked: e.target.checked })}
            aria-label={labelText || "Checkbox"}
            title={labelText || "Checkbox"}
          />
          {labelText || "Checkbox"}
        </label>
      );
    }

    if (type === "radio") {
      return (
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            id={id}
            type="radio"
            name={id}
            checked={!!checked}
            onChange={(e) => onUpdate(id, { checked: e.target.checked })}
            aria-label={labelText || "Radio"}
            title={labelText || "Radio"}
          />
          {labelText || "Radio"}
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
                value={opt}
                checked={isRadio ? value === opt : value?.includes(opt)}
                onChange={() => onUpdate(id, { value: isRadio ? opt : opt })}
                aria-label={opt}
                title={opt}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    }

    if (type === "countdown") {
      return (
        <div
          style={{
            ...sharedStyle,
            fontSize: fontSize ? `${fontSize}px` : "16px",
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {formatTime(timeLeft)}
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    const renderDeleteIcon = () => {
      if (!selected) return null;
      return (
        <AiOutlineDelete
          size={18}
          className={styles.deleteIcon}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        />
      );
    };

    const containerStyle: React.CSSProperties = {
      position: "relative",
      width,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border:
        type === "signature"
          ? "1px dashed #ccc"
          : type === "div" || type === "groupbox"
          ? "1px solid #ccc"
          : undefined,
      backgroundColor:
        type === "div" || type === "groupbox" ? "#f5f5f5" : undefined,
      ...(["label", "heading", "paragraph", "link", "signature"].includes(type)
        ? sharedStyle
        : {}),
    };

    if (["label", "heading", "paragraph", "link"].includes(type)) {
      const Tag =
        type === "heading" ? "h3" : type === "paragraph" ? "p" : "span";
      return (
        <div style={containerStyle}>
          <Tag style={sharedStyle}>{labelText || type}</Tag>
          {renderDeleteIcon()}
        </div>
      );
    }

    if (type === "image" && src) {
      return (
        <div style={containerStyle}>
          <Image
            src={src}
            alt={labelText || "image"}
            width={width || 200}
            height={height || 200}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
          {renderDeleteIcon()}
        </div>
      );
    }

    if (type === "video" && src) {
      return (
        <div
          style={containerStyle}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
        >
          <video
            src={src}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              pointerEvents: "none",
            }}
            controls
          />
          {renderDeleteIcon()}
        </div>
      );
    }
    
    if (type === "map") {
      const defaultCoords: [number, number] = [20.5937, 78.9629];
      const coords: [number, number] = src
        ? (() => {
            const arr = src.split(",").map(Number);
            if (arr.length === 2 && !arr.some(isNaN))
              return [arr[0], arr[1]] as [number, number];
            return defaultCoords;
          })()
        : defaultCoords;

      return (
        <div
          style={{
            ...containerStyle,
            position: "relative",
            overflow: "hidden",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
        >
          <MapLeaflet coords={coords} />
          {selected && (
            <AiOutlineDelete
              size={18}
              className={styles.deleteIcon}
              style={{ zIndex: 1000 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            />
          )}
        </div>
      );
    }

    if (type === "signature") {
      return (
        <div style={containerStyle}>
          Signature
          {renderDeleteIcon()}
        </div>
      );
    }

    if (type === "div" || type === "groupbox") {
      return (
        <div style={containerStyle}>
          {type.toUpperCase()}
          {renderDeleteIcon()}
        </div>
      );
    }

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
    "countdown",
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
              style={{ position: "relative" }}
            >
              {renderInput()}
              {selected && type === "countdown" && (
                <AiOutlineDelete
                  size={18}
                  className={styles.deleteIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                  }}
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
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default FormComponent;
