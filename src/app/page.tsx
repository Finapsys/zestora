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

  const addComponent = (type: "text" | "label") => {
    const id = `comp-${Date.now()}`;
    const offset = 10;
    const verticalSpacing = 60;

    setComponents([
      ...components,
      {
        id,
        type,
        x: offset,
        y: offset + components.length * verticalSpacing,
        width: type === "text" ? 200 : 150,
        height: 50,
        selected: false,
        placeholder: "",
        labelText: "",
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
          ? {
              ...comp,
              ...data,
              selected: id === selectedId,
            }
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
