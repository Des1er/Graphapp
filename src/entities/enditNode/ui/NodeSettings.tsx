import React from 'react';
import { NodeSettingsProps } from '../model/types';



const NodeSettings: React.FC<NodeSettingsProps> = ({ nodeColor, onNodeColorChange, nodeShape, onNodeShapeChange, onApplyChanges }) => {
  return (
    <div>
      <h3>Node Settings</h3>
      <label>
        Node Color:
        <input type="color" value={nodeColor} onChange={onNodeColorChange} />
      </label>
      <br />
      <label>
        Node Shape:
        <select value={nodeShape} onChange={onNodeShapeChange}>
          <option value="ellipse">Ellipse</option>
          <option value="triangle">Triangle</option>
          <option value="rectangle">Rectangle</option>
          <option value="diamond">Diamond</option>
        </select>
      </label>
      <br />
      <button onClick={onApplyChanges}>Apply Changes</button>
    </div>
  );
};

export default NodeSettings;

