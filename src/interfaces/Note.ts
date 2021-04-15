import { Label } from "./Label";

export interface Note {
  _id: string;
  title: string;
  description?: string;
  favorite: boolean;
  label: Array<Label>;
}
