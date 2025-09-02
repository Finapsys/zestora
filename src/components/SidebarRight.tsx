import React from "react";
import { FormComponentProps } from "./FormComponent";
import styles from "../styles/Sidebar.module.css";

interface SidebarRightProps {
  selectedComponent?: FormComponentProps;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({
  selectedComponent,
  onUpdate,
}) => {
  if (!selectedComponent)
    return <div className={styles.sidebar}>No component selected</div>;

  return (
    <div className={styles.sidebar}>
      <h3>Properties</h3>
      {selectedComponent.type === "text" && (
        <label>
          Placeholder:
          <input
            type="text"
            value={selectedComponent.placeholder || ""}
            onChange={(e) =>
              onUpdate(selectedComponent.id, {
                placeholder: e.target.value,
              })
            }
          />
        </label>
      )}

      {selectedComponent.type === "label" && (
        <label>
          Label Text:
          <input
            type="text"
            value={selectedComponent.labelText || ""}
            onChange={(e) =>
              onUpdate(selectedComponent.id, {
                labelText: e.target.value,
              })
            }
          />
        </label>
      )}
    </div>
  );
};

export default SidebarRight;
