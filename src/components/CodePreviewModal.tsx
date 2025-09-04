"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import styles from "../styles/CodePreviewModal.module.css";
import { FormComponentProps } from "./FormComponent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: FormComponentProps[];
  title?: string;
}

const CodePreviewModal: React.FC<CodePreviewModalProps> = ({
  isOpen,
  onClose,
  components,
  title = "Form Code Preview",
}) => {
  const [activeTab, setActiveTab] = useState<"html" | "css">("html");

  const generateHTML = () => {
    return components
      .map((c) => {
        const commonStyle = `position:absolute; left:${c.x}px; top:${c.y}px; width:${c.width}px; height:${c.height}px;`;

        switch (c.type) {
          case "label":
          case "heading":
          case "paragraph":
            return `<div style="${commonStyle}">${
              c.labelText || c.label || c.type
            }</div>`;
          case "text":
          case "number":
          case "email":
          case "mobile":
          case "date":
          case "time":
            return `<input type="${
              c.type === "mobile" ? "tel" : c.type
            }" placeholder="${c.placeholder || ""}" value="${
              c.value || ""
            }" style="${commonStyle}" />`;
          case "textarea":
            return `<textarea placeholder="${
              c.placeholder || ""
            }" style="${commonStyle}">${c.value || ""}</textarea>`;
          case "select":
            const optionsHTML = (c.options || [])
              .map((opt) => `<option>${opt}</option>`)
              .join("");
            return `<select style="${commonStyle}">${optionsHTML}</select>`;
          case "checkbox":
            return `<input type="checkbox" ${
              c.checked ? "checked" : ""
            } style="${commonStyle}" />`;
          case "radio":
            return `<input type="radio" ${
              c.checked ? "checked" : ""
            } style="${commonStyle}" />`;
          case "button":
            return `<button style="${commonStyle}">${
              c.labelText || c.label || "Button"
            }</button>`;
          default:
            return `<div style="${commonStyle}">${
              c.labelText || c.label || c.type
            }</div>`;
        }
      })
      .join("\n");
  };

  const generateCSS = () => {
    return components
      .map(
        (c) => `#${c.id} {
  position: absolute;
  left: ${c.x}px;
  top: ${c.y}px;
  width: ${c.width}px;
  height: ${c.height}px;
}`
      )
      .join("\n\n");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.tabHeader}>
        <button
          className={activeTab === "html" ? styles.active : ""}
          onClick={() => setActiveTab("html")}
        >
          HTML
        </button>
        <button
          className={activeTab === "css" ? styles.active : ""}
          onClick={() => setActiveTab("css")}
        >
          CSS
        </button>
      </div>

      <div className={styles.tabContent}>
        <SyntaxHighlighter
          language={activeTab === "html" ? "html" : "css"}
          style={vs}
          wrapLines={true}
          showLineNumbers
          className={styles.tabContentPre}
          codeTagProps={{ className: styles.tabContentCode }}
        >
          {activeTab === "html" ? generateHTML() : generateCSS()}
        </SyntaxHighlighter>
      </div>
    </Modal>
  );
};

export default CodePreviewModal;
