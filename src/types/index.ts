interface BaseComponent {
  id: string;
  width: number;
}

export interface DragItem {
  type: "Input";
  width: number;
}

export interface InputComponent extends BaseComponent {
  type: "Input";
  properties: {
    placeholder: string;
    label: string;
    required: boolean;
  };
}

export type FormComponentType = InputComponent;
