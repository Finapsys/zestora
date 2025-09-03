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

    const defaultLabelTextMap: Record<string, string> = {
      label: "Label",
      heading: "Heading",
      paragraph: "Paragraph",
      link: "Link",
      select: "Select",
      checkbox: "Checkbox",
      checkboxList: "Checkbox List",
      radio: "Radio Button",
      radioList: "Radio List",
    };

    const defaultOptionsMap: Record<string, string[]> = {
      select: ["Option 1", "Option 2"],
      checkboxList: ["Option 1", "Option 2"],
      radioList: ["Option 1", "Option 2"],
    };

    setComponents([
      ...components,
      {
        id,
        type,
        x,
        y,
        width: type === "text" ? 200 : 150,
        height: 50,
        selected: false,
        placeholder: type === "text" ? "Enter text" : undefined,
        labelText: defaultLabelTextMap[type] || "",
        value: "",
        options: defaultOptionsMap[type] || undefined,
        checked: type === "checkbox" || type === "radio" ? false : undefined,
        onSelect: () => {},
        onDelete: () => {},
        onUpdate: () => {},
      },
    ]);
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
