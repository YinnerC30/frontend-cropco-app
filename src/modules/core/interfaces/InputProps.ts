import { Control } from "react-hook-form";

export interface InputProps {
    control: Control;
    description: string;
    label: string;
    name: string;
    placeholder: string;
    readOnly: boolean;
  }