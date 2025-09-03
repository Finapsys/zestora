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

  const handleChange = <K extends keyof FormComponentProps>(
    field: K,
    value: FormComponentProps[K]
  ) => {
    onUpdate(selectedComponent.id, { [field]: value });
  };

  return (
    <div className={styles.sidebar}>
      <h3>Properties</h3>

      <fieldset>
        <legend>Common</legend>
        <table className={styles.propTable}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="id">ID</label>
              </td>
              <td>
                <input
                  id="id"
                  type="text"
                  value={selectedComponent.id}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">Name</label>
              </td>
              <td>
                <input
                  id="name"
                  type="text"
                  value={selectedComponent.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter name"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="value">Value</label>
              </td>
              <td>
                <input
                  id="value"
                  type="text"
                  value={selectedComponent.value || ""}
                  onChange={(e) => handleChange("value", e.target.value)}
                  placeholder="Enter value"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="x">X</label>
              </td>
              <td>
                <input
                  id="x"
                  type="number"
                  value={selectedComponent.x}
                  onChange={(e) =>
                    handleChange("x", parseInt(e.target.value, 10))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="y">Y</label>
              </td>
              <td>
                <input
                  id="y"
                  type="number"
                  value={selectedComponent.y}
                  onChange={(e) =>
                    handleChange("y", parseInt(e.target.value, 10))
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      {selectedComponent.type === "text" && (
        <fieldset>
          <legend>Text Input</legend>
          <table className={styles.propTable}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="placeholder">Placeholder</label>
                </td>
                <td>
                  <input
                    id="placeholder"
                    type="text"
                    value={selectedComponent.placeholder || ""}
                    onChange={(e) =>
                      handleChange("placeholder", e.target.value)
                    }
                    placeholder="Enter placeholder"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="fontSize">Font Size</label>
                </td>
                <td>
                  <input
                    id="fontSize"
                    type="number"
                    value={selectedComponent.fontSize || 14}
                    onChange={(e) =>
                      handleChange("fontSize", parseInt(e.target.value, 10))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="color">Color</label>
                </td>
                <td>
                  <input
                    id="color"
                    type="color"
                    value={selectedComponent.color || "#000000"}
                    onChange={(e) => handleChange("color", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="background">Background</label>
                </td>
                <td>
                  <input
                    id="background"
                    type="color"
                    value={selectedComponent.background || "#ffffff"}
                    onChange={(e) => handleChange("background", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="border">Border</label>
                </td>
                <td>
                  <input
                    id="border"
                    type="text"
                    value={selectedComponent.border || "1px solid #ccc"}
                    onChange={(e) => handleChange("border", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="padding">Padding</label>
                </td>
                <td>
                  <input
                    id="padding"
                    type="text"
                    value={selectedComponent.padding || "4px"}
                    onChange={(e) => handleChange("padding", e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      )}

      {selectedComponent.type === "label" && (
        <fieldset>
          <legend>Label</legend>
          <table className={styles.propTable}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="labelText">Label Text</label>
                </td>
                <td>
                  <input
                    id="labelText"
                    type="text"
                    value={selectedComponent.labelText || ""}
                    onChange={(e) => handleChange("labelText", e.target.value)}
                    placeholder="Enter label"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="labelFontSize">Font Size</label>
                </td>
                <td>
                  <input
                    id="labelFontSize"
                    type="number"
                    value={selectedComponent.fontSize || 16}
                    onChange={(e) =>
                      handleChange("fontSize", parseInt(e.target.value, 10))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="fontWeight">Font Weight</label>
                </td>
                <td>
                  <select
                    id="fontWeight"
                    value={selectedComponent.fontWeight || "normal"}
                    onChange={(e) => handleChange("fontWeight", e.target.value)}
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="lighter">Light</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="labelColor">Color</label>
                </td>
                <td>
                  <input
                    id="labelColor"
                    type="color"
                    value={selectedComponent.color || "#000000"}
                    onChange={(e) => handleChange("color", e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      )}
    </div>
  );
};

export default SidebarRight;
