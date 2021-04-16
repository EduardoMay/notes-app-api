export interface Label {
  _id: string;
  description: string;
  color: string;
  notes: Array<{ id: string }>;
}
