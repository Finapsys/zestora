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

  const cssProperties: Record<
    string,
    {
      label: string;
      type: "text" | "number" | "color" | "select";
      options?: string[];
    }
  > = {
    maxWidth: { label: "Max Width", type: "text" },
    minWidth: { label: "Min Width", type: "text" },
    maxHeight: { label: "Max Height", type: "text" },
    minHeight: { label: "Min Height", type: "text" },
    display: {
      label: "Display",
      type: "select",
      options: ["block", "inline", "flex", "grid", "inline-block", "none"],
    },
    position: {
      label: "Position",
      type: "select",
      options: ["static", "relative", "absolute", "fixed", "sticky"],
    },
    top: { label: "Top", type: "text" },
    right: { label: "Right", type: "text" },
    bottom: { label: "Bottom", type: "text" },
    left: { label: "Left", type: "text" },
    zIndex: { label: "Z-Index", type: "number" },
    float: {
      label: "Float",
      type: "select",
      options: ["none", "left", "right", "inline-start", "inline-end"],
    },
    clear: {
      label: "Clear",
      type: "select",
      options: ["none", "left", "right", "both"],
    },
    overflow: {
      label: "Overflow",
      type: "select",
      options: ["visible", "hidden", "scroll", "auto"],
    },
    overflowX: {
      label: "Overflow X",
      type: "select",
      options: ["visible", "hidden", "scroll", "auto"],
    },
    overflowY: {
      label: "Overflow Y",
      type: "select",
      options: ["visible", "hidden", "scroll", "auto"],
    },
    visibility: {
      label: "Visibility",
      type: "select",
      options: ["visible", "hidden", "collapse"],
    },
    margin: { label: "Margin", type: "text" },
    padding: { label: "Padding", type: "text" },
    gap: { label: "Gap", type: "text" },
    rowGap: { label: "Row Gap", type: "text" },
    columnGap: { label: "Column Gap", type: "text" },
    border: { label: "Border", type: "text" },
    borderWidth: { label: "Border Width", type: "text" },
    borderStyle: {
      label: "Border Style",
      type: "select",
      options: [
        "none",
        "solid",
        "dashed",
        "dotted",
        "double",
        "groove",
        "ridge",
        "inset",
        "outset",
      ],
    },
    borderColor: { label: "Border Color", type: "color" },
    borderRadius: { label: "Border Radius", type: "text" },
    borderCollapse: {
      label: "Border Collapse",
      type: "select",
      options: ["separate", "collapse"],
    },
    borderSpacing: { label: "Border Spacing", type: "text" },
    background: { label: "Background", type: "text" },
    backgroundColor: { label: "Background Color", type: "color" },
    backgroundImage: { label: "Background Image", type: "text" },
    backgroundRepeat: {
      label: "Background Repeat",
      type: "select",
      options: ["repeat", "repeat-x", "repeat-y", "no-repeat"],
    },
    backgroundPosition: { label: "Background Position", type: "text" },
    backgroundSize: {
      label: "Background Size",
      type: "select",
      options: ["auto", "cover", "contain"],
    },
    backgroundAttachment: {
      label: "Background Attachment",
      type: "select",
      options: ["scroll", "fixed", "local"],
    },
    color: { label: "Text Color", type: "color" },
    opacity: { label: "Opacity", type: "number" },
    font: { label: "Font", type: "text" },
    fontFamily: { label: "Font Family", type: "text" },
    fontSize: { label: "Font Size", type: "number" },
    fontWeight: {
      label: "Font Weight",
      type: "select",
      options: [
        "normal",
        "bold",
        "lighter",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
      ],
    },
    fontStyle: {
      label: "Font Style",
      type: "select",
      options: ["normal", "italic", "oblique"],
    },
    fontVariant: {
      label: "Font Variant",
      type: "select",
      options: ["normal", "small-caps"],
    },
    lineHeight: { label: "Line Height", type: "text" },
    letterSpacing: { label: "Letter Spacing", type: "text" },
    wordSpacing: { label: "Word Spacing", type: "text" },
    textAlign: {
      label: "Text Align",
      type: "select",
      options: ["left", "center", "right", "justify", "start", "end"],
    },
    textDecoration: {
      label: "Text Decoration",
      type: "select",
      options: ["none", "underline", "overline", "line-through"],
    },
    textTransform: {
      label: "Text Transform",
      type: "select",
      options: ["none", "capitalize", "uppercase", "lowercase"],
    },
    textShadow: { label: "Text Shadow", type: "text" },
    whiteSpace: {
      label: "White Space",
      type: "select",
      options: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"],
    },
    flexDirection: {
      label: "Flex Direction",
      type: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
    flexWrap: {
      label: "Flex Wrap",
      type: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
    justifyContent: {
      label: "Justify Content",
      type: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    alignItems: {
      label: "Align Items",
      type: "select",
      options: ["stretch", "flex-start", "flex-end", "center", "baseline"],
    },
    alignContent: {
      label: "Align Content",
      type: "select",
      options: [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
      ],
    },
    gridTemplateRows: { label: "Grid Template Rows", type: "text" },
    gridTemplateColumns: { label: "Grid Template Columns", type: "text" },
    gridArea: { label: "Grid Area", type: "text" },
    gridGap: { label: "Grid Gap", type: "text" },
    captionSide: {
      label: "Caption Side",
      type: "select",
      options: ["top", "bottom"],
    },
    emptyCells: {
      label: "Empty Cells",
      type: "select",
      options: ["show", "hide"],
    },
    tableLayout: {
      label: "Table Layout",
      type: "select",
      options: ["auto", "fixed"],
    },
    transition: { label: "Transition", type: "text" },
    transitionProperty: { label: "Transition Property", type: "text" },
    transitionDuration: { label: "Transition Duration", type: "text" },
    transitionTimingFunction: {
      label: "Transition Timing Function",
      type: "text",
    },
    animation: { label: "Animation", type: "text" },
    animationName: { label: "Animation Name", type: "text" },
    animationDuration: { label: "Animation Duration", type: "text" },
    animationTimingFunction: {
      label: "Animation Timing Function",
      type: "text",
    },
    animationDelay: { label: "Animation Delay", type: "text" },
    animationIterationCount: {
      label: "Animation Iteration Count",
      type: "text",
    },
    animationDirection: {
      label: "Animation Direction",
      type: "select",
      options: ["normal", "reverse", "alternate", "alternate-reverse"],
    },
    transform: { label: "Transform", type: "text" },
    transformOrigin: { label: "Transform Origin", type: "text" },
    boxShadow: { label: "Box Shadow", type: "text" },
    filter: { label: "Filter", type: "text" },
    mixBlendMode: {
      label: "Mix Blend Mode",
      type: "select",
      options: [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
      ],
    },
    cursor: {
      label: "Cursor",
      type: "select",
      options: [
        "default",
        "pointer",
        "move",
        "text",
        "wait",
        "not-allowed",
        "crosshair",
        "grab",
        "zoom-in",
      ],
    },
    pointerEvents: {
      label: "Pointer Events",
      type: "select",
      options: ["auto", "none"],
    },
    userSelect: {
      label: "User Select",
      type: "select",
      options: ["auto", "text", "none", "contain", "all"],
    },
    resize: {
      label: "Resize",
      type: "select",
      options: ["none", "both", "horizontal", "vertical"],
    },
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
      <tr>
        <td>
          <label htmlFor="required">Required</label>
        </td>
        <td>
          <select
            id="required"
            value={selectedComponent.required ? "true" : "false"}
            onChange={(e) =>
              handleChange("required", e.target.value === "true")
            }
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
    </>
  );

  return (
    <div className={styles.sidebar}>
      <h3>Properties</h3>
      <div className={styles.propertiesContainer}>
        <fieldset>
          <legend>Component Specific Properties</legend>
          <table className={styles.propTable}>
            <tbody>{styleInputs}</tbody>
          </table>
        </fieldset>
        <fieldset>
          <legend>Common</legend>
          <table className={styles.propTable}>
            <tbody>{commonInputs}</tbody>
          </table>
        </fieldset>
        <fieldset>
          <legend>CSS Properties</legend>
          <table className={styles.propTable}>
            <tbody>
              {Object.entries(cssProperties).map(([prop, config]) => {
                const rawValue =
                  selectedComponent[prop as keyof FormComponentProps];
                const value: string | number | readonly string[] | undefined =
                  rawValue === undefined || rawValue === null
                    ? ""
                    : typeof rawValue === "boolean"
                    ? rawValue
                      ? "true"
                      : "false"
                    : typeof rawValue === "number"
                    ? rawValue
                    : String(rawValue);

                return (
                  <tr key={prop}>
                    <td>
                      <label htmlFor={prop}>{config.label}</label>
                    </td>
                    <td>
                      {config.type === "select" ? (
                        <select
                          id={prop}
                          value={value}
                          onChange={(e) =>
                            handleChange(
                              prop as keyof FormComponentProps,
                              e.target.value
                            )
                          }
                        >
                          {config.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={prop}
                          type={config.type}
                          value={value}
                          onChange={(e) =>
                            handleChange(
                              prop as keyof FormComponentProps,
                              config.type === "number"
                                ? parseInt(e.target.value, 10)
                                : e.target.value
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  );
};

export default SidebarRight;
