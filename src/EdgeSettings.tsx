import React from 'react';

interface Attribute {
    value: string;
    label: string;
}

interface EdgeSettingsProps {
    edgeThickness: number;
    onThicknessChange: React.ChangeEventHandler<HTMLInputElement>;
    attributes: Attribute[];
    selectedAttribute: string;
    onAttributeChange: React.ChangeEventHandler<HTMLSelectElement>;
    edgeTypes: Attribute[];
    selectedEdgeType: string;
    onEdgeTypeChange: React.ChangeEventHandler<HTMLSelectElement>;
    edgeDirections: Attribute[];
    selectedEdgeDirection: string;
    onEdgeDirectionChange: React.ChangeEventHandler<HTMLSelectElement>;
    lineStyles: Attribute[];
    selectedLineStyle: string;
    onLineStyleChange: React.ChangeEventHandler<HTMLSelectElement>;
    onApplyChanges: React.MouseEventHandler<HTMLButtonElement>;
}

const EdgeSettings: React.FC<EdgeSettingsProps> = ({
    edgeThickness, onThicknessChange,
    attributes,
    selectedAttribute,
    onAttributeChange,
    edgeTypes,
    selectedEdgeType,
    onEdgeTypeChange,
    edgeDirections,
    selectedEdgeDirection,
    onEdgeDirectionChange,
    lineStyles,
    selectedLineStyle,
    onLineStyleChange,
    onApplyChanges
}) => {
    return (
        <div>
            <div>
                <label>Select Edge Attribute: </label>
                <select onChange={onAttributeChange} value={selectedAttribute}>
                    <option value="">Select an attribute</option>
                    {attributes.map(attr => (
                        <option key={attr.value} value={attr.value}>{attr.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Edge Type: </label>
                <select onChange={onEdgeTypeChange} value={selectedEdgeType}>
                    <option value="">Select an edge type</option>
                    {edgeTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Edge Direction: </label>
                <select onChange={onEdgeDirectionChange} value={selectedEdgeDirection}>
                    <option value="">Select direction</option>
                    {edgeDirections.map(direction => (
                        <option key={direction.value} value={direction.value}>{direction.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Line Style: </label>
                <select onChange={onLineStyleChange} value={selectedLineStyle}>
                    <option value="">Select a line style</option>
                    {lineStyles.map(style => (
                        <option key={style.value} value={style.value}>{style.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>
                    Edge Thickness:
                    <input
                        type="number"
                        value={edgeThickness}
                        onChange={onThicknessChange}
                        min="1"
                    />
                </label>
            </div>

            <button onClick={onApplyChanges}>Apply Changes</button>
        </div>
    );
};

export default EdgeSettings;

