"use client";
import React, { useState, useEffect } from "react";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import Canvas from "../components/Canvas";
import { FormComponentProps } from "../components/FormComponent";
import styles from "../styles/Home.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import PopupModal from "../components/PopupModal";

interface SavedForm {
  name: string;
  category?: string;
  data: FormComponentProps[];
}

const Home: React.FC = () => {
  const [components, setComponents] = useState<FormComponentProps[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"builder" | "saved">("builder");
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const [formName, setFormName] = useState<string>("Untitled Form");
  const [oldFormName, setOldFormName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState<string | undefined>();
  const [modalMessage, setModalMessage] = React.useState<string | undefined>();
  const [isConfirm, setIsConfirm] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState<(() => void) | null>(
    null
  );

  useEffect(() => {
    if (activeTab === "saved") {
      fetchSavedForms();
    }
  }, [activeTab]);

  const fetchSavedForms = async () => {
    try {
      const res = await fetch("/api/forms");
      if (!res.ok) throw new Error("Failed to fetch saved forms");
      const data: { forms: SavedForm[] } = await res.json();
      setSavedForms(data.forms || []);
    } catch (err) {
      console.error("Failed to fetch saved forms", err);
    }
  };

  const loadForm = (selectedFormName: string) => {
    const form = savedForms.find((f) => f.name === selectedFormName);
    if (!form) return;

    setComponents(form.data as FormComponentProps[]);
    setSelectedId(null);
    setFormName(form.name);
    setOldFormName(form.name);
    setSelectedCategory(form.category || "");
    setIsUpdating(true);
    setActiveTab("builder");
  };

  const componentCounters: Record<string, number> = {};

  const addComponent = (type: FormComponentProps["type"]) => {
    componentCounters[type] = (componentCounters[type] || 0) + 1;
    const id = `${type}-${Date.now()}`;
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
          src: "20.5937,78.9629",
          labelText: "Map",
          width: 300,
          height: 200,
        };
        break;
      case "signature":
        extra = { labelText: "Signature" };
        break;
      case "button":
        extra = {
          labelText: "Button",
          width: 120,
          height: 40,
          fontSize: 14,
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",
          background: "#007bff",
          border: "1px solid #007bff",
          borderRadius: "4px",
        };
        break;
      case "toggleButton":
        extra = {
          labelText: "Toggle",
          width: 120,
          height: 40,
          fontSize: 14,
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",
          background: "#28a745",
          border: "1px solid #28a745",
          borderRadius: "4px",
          checked: false,
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
      <div className={styles.tabHeader}>
        <button
          type="button"
          className={activeTab === "builder" ? styles.active : ""}
          onClick={() => setActiveTab("builder")}
        >
          Form Builder
        </button>
        <button
          type="button"
          className={activeTab === "saved" ? styles.active : ""}
          onClick={() => setActiveTab("saved")}
        >
          Saved Forms
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "builder" && (
          <div className={styles.builderContainer}>
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
                formName={formName}
                setFormName={setFormName}
                oldFormName={oldFormName}
                setOldFormName={setOldFormName}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                setCategories={setCategories}
              />
            </div>

            <div className={styles.sidebarRight}>
              <SidebarRight
                selectedComponent={selectedComponent}
                onUpdate={updateComponent}
              />
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className={styles.savedForms}>
            {savedForms.length === 0 && <p>No saved forms available.</p>}
            <div className={styles.formCards}>
              {savedForms.map((form) => (
                <div key={form.name} className={styles.formCard}>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    aria-label={`Delete form ${form.name}`}
                    onClick={() => {
                      setModalTitle("Confirm Delete");
                      setModalMessage(
                        `Are you sure you want to delete "${form.name}"?`
                      );
                      setIsConfirm(true);
                      setPendingAction(() => async () => {
                        try {
                          const res = await fetch(`/api/forms/${form.name}`, {
                            method: "DELETE",
                          });
                          const data = await res.json();
                          setModalTitle("Deleted");
                          setModalMessage(data.message);
                          setIsConfirm(false);
                          setModalOpen(true);

                          setSavedForms((prev) =>
                            prev.filter((f) => f.name !== form.name)
                          );
                        } catch (err) {
                          console.error(err);
                          setModalTitle("Error");
                          setModalMessage("Failed to delete form");
                          setIsConfirm(false);
                          setModalOpen(true);
                        }
                      });
                      setModalOpen(true);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>

                  <h3>{form.name}</h3>
                  <button
                    type="button"
                    className={styles.loadButton}
                    onClick={() => loadForm(form.name)}
                  >
                    Load Form
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <PopupModal
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        input={false}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (isConfirm && pendingAction) {
            pendingAction();
          }
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
