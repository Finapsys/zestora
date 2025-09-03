import React from "react";
import { FormComponentProps } from "./FormComponent";
import styles from "../styles/Sidebar.module.css";

interface SidebarRightProps {
  selectedComponent?: FormComponentProps;
  onUpdate: (id: string, data: Partial<FormComponentProps>) => void;
}

type LimitedTextAlign = "left" | "center" | "right";

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

  const commonInputs = (
    <>
      <tr>
        <td>
          <label htmlFor="id">ID</label>
        </td>
        <td>
          <input id="id" type="text" value={selectedComponent.id} readOnly />
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
            onChange={(e) =>
              handleChange("name", e.target.value.replace(/\s+/g, ""))
            }
            placeholder="Enter name"
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
            value={selectedComponent.x ?? 0}
            onChange={(e) => handleChange("x", parseInt(e.target.value, 10))}
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
            onChange={(e) => handleChange("y", parseInt(e.target.value, 10))}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="width">Width</label>
        </td>
        <td>
          <input
            id="width"
            type="number"
            value={selectedComponent.width}
            onChange={(e) =>
              handleChange("width", parseInt(e.target.value, 10))
            }
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="height">Height</label>
        </td>
        <td>
          <input
            id="height"
            type="number"
            value={selectedComponent.height}
            onChange={(e) =>
              handleChange("height", parseInt(e.target.value, 10))
            }
          />
        </td>
      </tr>
    </>
  );

  const styleInputs = (
    <>
      {["label", "heading", "paragraph", "link"].includes(
        selectedComponent.type
      ) && (
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
            />
          </td>
        </tr>
      )}
      {[
        "text",
        "textarea",
        "number",
        "email",
        "mobile",
        "date",
        "time",
        "time24",
        "file",
        "checkbox",
        "checkboxList",
        "radio",
        "radioList",
      ].includes(selectedComponent.type) && (
        <tr>
          <td>
            <label htmlFor="placeholder">Placeholder</label>
          </td>
          <td>
            <input
              id="placeholder"
              type="text"
              value={selectedComponent.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
            />
          </td>
        </tr>
      )}
      {["text", "label", "heading", "paragraph", "link"].includes(
        selectedComponent.type
      ) && (
        <>
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
              <label htmlFor="fontFamily">Font Family</label>
            </td>
            <td>
              <input
                id="fontFamily"
                type="text"
                value={selectedComponent.fontFamily || "Arial, sans-serif"}
                onChange={(e) => handleChange("fontFamily", e.target.value)}
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
              <label htmlFor="textAlign">Text Align</label>
            </td>
            <td>
              <select
                id="textAlign"
                value={
                  (selectedComponent.textAlign as LimitedTextAlign) || "left"
                }
                onChange={(e) =>
                  handleChange("textAlign", e.target.value as LimitedTextAlign)
                }
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </td>
          </tr>
        </>
      )}
      {["checkbox", "radio"].includes(selectedComponent.type) && (
        <tr>
          <td>
            <label htmlFor="labelText">Text</label>
          </td>
          <td>
            <input
              id="labelText"
              type="text"
              value={selectedComponent.labelText || ""}
              onChange={(e) => handleChange("labelText", e.target.value)}
            />
          </td>
        </tr>
      )}
      {["checkboxList", "radioList", "select"].includes(
        selectedComponent.type
      ) && (
        <tr>
          <td>
            <label htmlFor="options">Options (comma separated)</label>
          </td>
          <td>
            <input
              id="options"
              type="text"
              value={(selectedComponent.options || []).join(", ")}
              onChange={(e) =>
                onUpdate(selectedComponent.id, {
                  options: e.target.value.split(",").map((o) => o.trim()),
                })
              }
            />
          </td>
        </tr>
      )}
      {["image", "video"].includes(selectedComponent.type) && (
        <tr>
          <td>
            <label htmlFor="src">Source File</label>
          </td>
          <td>
            <input
              id="src"
              type="file"
              accept={
                selectedComponent.type === "image" ? "image/*" : "video/*"
              }
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleChange("src", URL.createObjectURL(file));
                }
              }}
            />
          </td>
        </tr>
      )}
      {["button", "toggleButton"].includes(selectedComponent.type) && (
        <>
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
              <label htmlFor="fontFamily">Font Family</label>
            </td>
            <td>
              <input
                id="fontFamily"
                type="text"
                value={selectedComponent.fontFamily || "Arial, sans-serif"}
                onChange={(e) => handleChange("fontFamily", e.target.value)}
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
              <label htmlFor="color">Text Color</label>
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
              <label htmlFor="borderRadius">Border Radius</label>
            </td>
            <td>
              <input
                id="borderRadius"
                type="text"
                value={selectedComponent.borderRadius || "4px"}
                onChange={(e) => handleChange("borderRadius", e.target.value)}
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
          <tr>
            <td>
              <label htmlFor="margin">Margin</label>
            </td>
            <td>
              <input
                id="margin"
                type="text"
                value={selectedComponent.margin || "0px"}
                onChange={(e) => handleChange("margin", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="boxShadow">Box Shadow</label>
            </td>
            <td>
              <input
                id="boxShadow"
                type="text"
                value={selectedComponent.boxShadow || "none"}
                onChange={(e) => handleChange("boxShadow", e.target.value)}
              />
            </td>
          </tr>
          {selectedComponent.type === "toggleButton" && (
            <tr>
              <td>
                <label htmlFor="checked">Checked</label>
              </td>
              <td>
                <input
                  id="checked"
                  type="checkbox"
                  checked={!!selectedComponent.checked}
                  onChange={(e) => handleChange("checked", e.target.checked)}
                />
              </td>
            </tr>
          )}
        </>
      )}
      {selectedComponent.type === "countdown" && (
        <tr>
          <td>
            <label htmlFor="countdownTime">Time (seconds)</label>
          </td>
          <td>
            <input
              id="countdownTime"
              type="number"
              value={selectedComponent.countdownTime || 60}
              onChange={(e) =>
                handleChange("countdownTime", parseInt(e.target.value, 10))
              }
            />
          </td>
        </tr>
      )}
      {selectedComponent.type === "signature" && (
        <>
          <tr>
            <td>
              <label htmlFor="src">Signature Image</label>
            </td>
            <td>
              <input
                id="src"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleChange("src", URL.createObjectURL(file));
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="labelText">Alt Text / Label</label>
            </td>
            <td>
              <input
                id="labelText"
                type="text"
                value={selectedComponent.labelText || ""}
                onChange={(e) => handleChange("labelText", e.target.value)}
                placeholder="Optional label or alt text"
              />
            </td>
          </tr>
        </>
      )}
      {selectedComponent.type === "map" && (
        <tr>
          <td>
            <label htmlFor="src">Map Coordinates (lat,lng)</label>
          </td>
          <td>
            <input
              id="src"
              type="text"
              value={selectedComponent.src || "20.5937,78.9629"}
              onChange={(e) => handleChange("src", e.target.value)}
              placeholder="Enter coordinates like 20.5937,78.9629"
            />
          </td>
        </tr>
      )}
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
          <label htmlFor="borderRadius">Border Radius</label>
        </td>
        <td>
          <input
            id="borderRadius"
            type="text"
            value={selectedComponent.borderRadius || "4px"}
            onChange={(e) => handleChange("borderRadius", e.target.value)}
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
      <tr>
        <td>
          <label htmlFor="margin">Margin</label>
        </td>
        <td>
          <input
            id="margin"
            type="text"
            value={selectedComponent.margin || "0px"}
            onChange={(e) => handleChange("margin", e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="boxShadow">Box Shadow</label>
        </td>
        <td>
          <input
            id="boxShadow"
            type="text"
            value={selectedComponent.boxShadow || "none"}
            onChange={(e) => handleChange("boxShadow", e.target.value)}
          />
        </td>
      </tr>
    </>
  );

  return (
    <div className={styles.sidebar}>
      <h3>Properties</h3>
      <fieldset>
        <legend>Common</legend>
        <table className={styles.propTable}>
          <tbody>{commonInputs}</tbody>
        </table>
      </fieldset>
      <fieldset>
        <legend>{`Component Styling & Specific`}</legend>
        <table className={styles.propTable}>
          <tbody>{styleInputs}</tbody>
        </table>
      </fieldset>
    </div>
  );
};

export default SidebarRight;
