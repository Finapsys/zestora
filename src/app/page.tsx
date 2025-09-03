"use client";
import React, { useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import Canvas from "../components/Canvas";
import { FormComponentProps } from "../components/FormComponent";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [components, setComponents] = useState<FormComponentProps[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addComponent = (type: FormComponentProps["type"]) => {
    const id = `comp-${Date.now()}`;
    const offset = 10;
    const margin = 10;
    const verticalSpacing = 60;

    let x = offset;
    let y = offset;

    if (components.length > 0) {
      const last = components[components.length - 1];
      const sameRow = Math.abs(last.y - y) < verticalSpacing / 2;
      if (sameRow) {
        x = last.x + last.width + margin;
        y = last.y;
      } else {
        y = last.y + last.height + margin;
      }
    }

    const base: FormComponentProps = {
      id,
      type,
      x,
      y,
      width: type === "text" ? 200 : 150,
      height: 50,
      selected: false,
      onSelect: () => {},
      onDelete: () => {},
      onUpdate: () => {},
    };

    let extra: Partial<FormComponentProps> = {};

    switch (type) {
      case "text":
        extra = { placeholder: "Enter text", value: "" };
        break;
      case "label":
        extra = { labelText: "Label" };
        break;
      case "heading":
        extra = { labelText: "Heading" };
        break;
      case "paragraph":
        extra = { labelText: "Paragraph" };
        break;
      case "link":
        extra = { labelText: "Link" };
        break;
      case "select":
        extra = { options: ["Option 1", "Option 2"] };
        break;
      case "checkbox":
        extra = { checked: false, labelText: "Checkbox" };
        break;
      case "radio":
        extra = { checked: false, labelText: "Radio" };
        break;
      case "checkboxList":
        extra = { options: ["Option 1", "Option 2"] };
        break;
      case "radioList":
        extra = { options: ["Option 1", "Option 2"] };
        break;
      case "countdown":
        extra = { countdownTime: 60, labelText: "Countdown Timer" };
        break;
      case "image":
        extra = { src: "/placeholder.png", labelText: "Image" };
        break;
      case "video":
        extra = { src: "/sample.mp4", labelText: "Video" };
        break;
      case "map":
        extra = {
          src: "https://maps.google.com",
          labelText: "Map",
          width: 300,
          height: 200,
        };
        break;
    }

    setComponents([...components, { ...base, ...extra }]);
  };

  const updateComponent = (id: string, data: Partial<FormComponentProps>) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, ...data, selected: id === selectedId }
          : comp
      )
    );
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleSelect = (id: string) => setSelectedId(id);

  const selectedComponent = components.find((c) => c.id === selectedId);

  return (
    <div className={styles.container}>
      <div className={styles.sidebarLeft}>
        <SidebarLeft onAdd={addComponent} />
      </div>

      <div className={styles.canvas}>
        <Canvas
          components={components.map((c) => ({
            ...c,
            selected: c.id === selectedId,
          }))}
          onSelect={handleSelect}
          onDelete={deleteComponent}
          onUpdate={updateComponent}
          onDeselect={() => setSelectedId(null)}
        />
      </div>

      <div className={styles.sidebarRight}>
        <SidebarRight
          selectedComponent={selectedComponent}
          onUpdate={updateComponent}
        />
      </div>
    </div>
  );
};

export default Home;
