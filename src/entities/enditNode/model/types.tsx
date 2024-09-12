export interface NodeSettingsProps {
  nodeColor: string;
  onNodeColorChange: React.ChangeEventHandler<HTMLInputElement>;
  nodeShape: 'ellipse' | 'triangle' | 'rectangle' | 'diamond';
  onNodeShapeChange: React.ChangeEventHandler<HTMLSelectElement>;
  onApplyChanges: React.MouseEventHandler<HTMLButtonElement>;
}
