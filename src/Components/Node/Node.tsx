import "./node.css";
import { AiOutlinePlusSquare, AiOutlineEdit } from 'react-icons/ai'
import { useState, useEffect, useRef } from "react";

type NodeProps = {
  nodeTitle: string,
  nodeText: string,
  openModal: Function,
  updateText: Function,
}

const Node: React.FC<NodeProps> = ({ nodeTitle, nodeText, openModal, updateText }) => {

  const [editText, setEditText] = useState(false);

  const [newText, setNewText] = useState<string>(nodeText);

  const applyRef = useRef<HTMLDivElement>(null);

  const editRef = useRef<boolean | null>(null);
  editRef.current = editText;

  const textRef = useRef<string | null>(null);
  textRef.current = nodeText;

  const newTextRef = useRef<string | null>(null);
  newTextRef.current = newText;

  // https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
        throw new Error(`Node expected`);
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      assertIsNode(e.target);
      if(applyRef.current && !applyRef.current.contains(e.target) && editRef.current) {
        if(newTextRef.current !== textRef.current) {
          updateText(newTextRef.current);
        }
        setEditText(false);
      }
    }

    document.addEventListener('mousedown', handler);
  }, []);

  return (
    <div className="node" ref={applyRef}>
      <div className="nodeHead">
        <h1>{nodeTitle}</h1>
        {/* <AiOutlineEdit size={30} className='editTitleIcon' /> */}
      </div>
      <div className="nodeBody">
        {editText ?
        <>
          <textarea
            value={newText}
            autoFocus 
            onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} 
            onChange={(e) => setNewText(e.target.value)}
            className="nodeTextarea"
          ></textarea>
          <button onClick={() => {
            setEditText(false);
            setNewText(nodeText);
          }} className="discardTextChangesButton">Discard</button>
        </> :
        <div onDoubleClick={() => {
            setNewText(nodeText);
            setEditText(true);
          }} style={{width: '378px'}}>
          {nodeText}
        </div>
        }
      </div>
      <AiOutlinePlusSquare size={30} className='createChildNodeIcon' onClick={() => openModal()} />
    </div>
  );
};

export default Node;
