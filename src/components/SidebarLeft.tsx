import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { FormComponentType } from "../types";
import {
  AiOutlineFileText,
  AiOutlineFontSize,
  AiOutlineFile,
  AiOutlineEdit,
  AiOutlineNumber,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUpload,
  AiOutlinePicture,
  AiOutlineVideoCamera,
  AiOutlineLink,
  AiOutlineGlobal,
  AiOutlineHourglass,
} from "react-icons/ai";
import { BsCheckSquare, BsCheckSquareFill, BsCircle } from "react-icons/bs";

interface SidebarLeftProps {
  onAdd: (type: FormComponentType["type"]) => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ onAdd }) => {
  const components: {
    label: string;
    type: FormComponentType["type"];
    icon: JSX.Element;
    category: string;
  }[] = [
    {
      label: "Text Input",
      type: "text",
      icon: <AiOutlineFileText />,
      category: "Inputs",
    },
    {
      label: "Textarea",
      type: "textarea",
      icon: <AiOutlineEdit />,
      category: "Inputs",
    },
    {
      label: "Number",
      type: "number",
      icon: <AiOutlineNumber />,
      category: "Inputs",
    },
    {
      label: "Email",
      type: "email",
      icon: <AiOutlineMail />,
      category: "Inputs",
    },
    {
      label: "Mobile",
      type: "mobile",
      icon: <AiOutlinePhone />,
      category: "Inputs",
    },
    {
      label: "Date",
      type: "date",
      icon: <AiOutlineCalendar />,
      category: "Inputs",
    },
    {
      label: "Time (12h)",
      type: "time",
      icon: <AiOutlineClockCircle />,
      category: "Inputs",
    },
    {
      label: "Time (24h)",
      type: "time24",
      icon: <AiOutlineClockCircle />,
      category: "Inputs",
    },
    {
      label: "File Upload",
      type: "file",
      icon: <AiOutlineUpload />,
      category: "Inputs",
    },
    {
      label: "Select / Dropdown",
      type: "select",
      icon: <AiOutlineFileText />,
      category: "Inputs",
    },
    {
      label: "Checkbox",
      type: "checkbox",
      icon: <BsCheckSquare />,
      category: "Inputs",
    },
    {
      label: "Checkbox List",
      type: "checkboxList",
      icon: <BsCheckSquareFill />,
      category: "Inputs",
    },
    { label: "Radio", type: "radio", icon: <BsCircle />, category: "Inputs" },
    {
      label: "Radio List",
      type: "radioList",
      icon: <BsCircle />,
      category: "Inputs",
    },
    {
      label: "Countdown Timer",
      type: "countdown",
      icon: <AiOutlineHourglass />,
      category: "Inputs",
    },

    {
      label: "Heading",
      type: "heading",
      icon: <AiOutlineFontSize />,
      category: "Text",
    },
    {
      label: "Paragraph",
      type: "paragraph",
      icon: <AiOutlineFileText />,
      category: "Text",
    },
    {
      label: "Label",
      type: "label",
      icon: <AiOutlineFile />,
      category: "Text",
    },
    { label: "Link", type: "link", icon: <AiOutlineLink />, category: "Text" },

    {
      label: "Image",
      type: "image",
      icon: <AiOutlinePicture />,
      category: "Media",
    },
    {
      label: "Video",
      type: "video",
      icon: <AiOutlineVideoCamera />,
      category: "Media",
    },
    {
      label: "Signature",
      type: "signature",
      icon: <AiOutlineEdit />,
      category: "Media",
    },
    {
      label: "Map",
      type: "map",
      icon: <AiOutlineGlobal />,
      category: "Media",
    },

    {
      label: "Div",
      type: "div",
      icon: <AiOutlineFile />,
      category: "Containers",
    },
    {
      label: "GroupBox",
      type: "groupbox",
      icon: <AiOutlineFile />,
      category: "Containers",
    },
  ];

  const categories = Array.from(new Set(components.map((c) => c.category)));
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    categories[0],
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={styles.sidebar}>
      {categories.map((category) => {
        const isExpanded = expandedCategories.includes(category);
        const items = components.filter((c) => c.category === category);

        return (
          <div key={category}>
            <div
              className={styles.categoryHeader}
              onClick={() => toggleCategory(category)}
            >
              <span>{category}</span>
              <span>{isExpanded ? "▲" : "▼"}</span>
            </div>
            <div
              className={`${styles.categoryItems} ${
                isExpanded ? styles.expanded : ""
              }`}
            >
              {items.map((comp) => (
                <div
                  key={comp.type}
                  className={styles.sidebarItem}
                  onClick={() => onAdd(comp.type)}
                >
                  <span className={styles.sidebarIcon}>{comp.icon}</span>
                  <span>{comp.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarLeft;
