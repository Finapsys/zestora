declare module "react-resizable" {
  import * as React from "react";

  export interface ResizeCallbackData {
    node: HTMLElement;
    size: {
      width: number;
      height: number;
    };
    handle?: string;
  }

  export interface ResizableBoxProps {
    width: number;
    height: number;
    axis?: "x" | "y" | "both";
    minConstraints?: [number, number];
    maxConstraints?: [number, number];
    resizeHandles?: ("s" | "e" | "se" | "w" | "n" | "nw" | "ne")[];
    onResizeStop?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
    onResizeStart?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
    onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
    draggableOpts?: unknown;
    children?: React.ReactNode; // <-- ADD THIS
  }

  export class ResizableBox extends React.Component<
    ResizableBoxProps,
    unknown
  > {}
}
