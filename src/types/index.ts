interface BaseComponent {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
}

export interface InputComponent extends BaseComponent {
  type: "text";
  placeholder: string;
}

export interface LabelComponent extends BaseComponent {
  type: "label";
  labelText: string;
}

export type FormComponentType = InputComponent | LabelComponent;
