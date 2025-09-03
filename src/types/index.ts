interface BaseComponent {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
}

export interface InputComponent extends BaseComponent {
  type:
    | "text"
    | "number"
    | "email"
    | "mobile"
    | "date"
    | "time"
    | "time24"
    | "textarea"
    | "file"
    | "select"
    | "checkbox"
    | "checkboxList"
    | "radio"
    | "radioList"
    | "countdown";
  placeholder?: string;
  value?: string;
  format12h?: boolean;
  options?: string[];
  checked?: boolean;
  countdownTime?: number;
}

export interface LabelComponent extends BaseComponent {
  type: "label" | "heading" | "paragraph" | "link";
  labelText: string;
  fontSize?: number;
  fontWeight?: string;
}

export interface MediaComponent extends BaseComponent {
  type: "image" | "video" | "signature" | "map";
  src?: string;
}

export interface ContainerComponent extends BaseComponent {
  type: "div" | "groupbox";
}

export interface ButtonComponent extends BaseComponent {
  type: "button" | "toggleButton";
  labelText: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  color?: string;
  background?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  boxShadow?: string;
}

export type FormComponentType =
  | InputComponent
  | LabelComponent
  | MediaComponent
  | ContainerComponent
  | ButtonComponent;
