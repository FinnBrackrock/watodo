import "./node.css";
import { AiOutlinePlusSquare } from 'react-icons/ai'

type NodeProps = {
  nodeTitle: string,
  nodeText: string,
  openModal: Function,
}

const Node: React.FC<NodeProps> = ({ nodeTitle, nodeText, openModal }) => {
  return (
    <div className="node">
      <div className="nodeHead">
        <h1>{nodeTitle}</h1>
      </div>
      <div className="nodeBody">
        <textarea
          value={nodeText}
          onChange={(e) => {}}
          className="nodeTextarea"
        ></textarea>
      </div>
      <AiOutlinePlusSquare size={30} className='createChildNodeIcon' onClick={() => openModal()} />
    </div>
  );
};

export default Node;
