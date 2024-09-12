export interface Attribute {
    value: string;
    label: string;
}

export interface EdgeSettingsProps {
    edgeThickness: number;
    onThicknessChange: React.ChangeEventHandler<HTMLInputElement>;

    selectedAttribute: string;
    onAttributeChange: React.ChangeEventHandler<HTMLSelectElement>;

    selectedEdgeType: string;
    onEdgeTypeChange: React.ChangeEventHandler<HTMLSelectElement>;

    selectedEdgeDirection: string;
    onEdgeDirectionChange: React.ChangeEventHandler<HTMLSelectElement>;

    selectedLineStyle: string;
    onLineStyleChange: React.ChangeEventHandler<HTMLSelectElement>;
    onApplyChanges: React.MouseEventHandler<HTMLButtonElement>;
}
export const lineStyles = [
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' }
  ];
export const edgeAttributes = [
    { value: 'hosted_on', label: 'Hosted on' },
    { value: 'depends_on', label: 'Depends on' },
    { value: 'communicates_with', label: 'Communicates with' }
  ];
  
export const edgeTypes = [
    { value: 'dependency', label: 'Dependency' },
    { value: 'influence', label: 'Influence' }
  ];
  
export const edgeDirections = [
    { value: 'forward', label: 'Forward' },
    { value: 'backward', label: 'Backward' },
    { value: 'both', label: 'Both Directions' }
  ];
  