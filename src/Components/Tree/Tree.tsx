import Node from "../Node/Node";
import SignInState from "../SignInState/SignInState";
import Navbar from "../Navbar/Navbar";
import CreateModal from "../CreateModal/CreateModal";
import './tree.css'
import { useCallback, useEffect, useRef, useState } from "react";
import { Unsubscribe, User } from "firebase/auth";
import { db } from "../..";
import { addDoc, collection, doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { AiOutlinePlusSquare } from 'react-icons/ai';

type TreeProps = {
  user: User | null | undefined;
};

const Tree: React.FC<TreeProps> = ({ user }) => {
  const [showTreeModal, setShowTreeModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);

  const [treeName, setTreeName] = useState('');
  const [nodeName, setNodeName] = useState('');

  const [trees, setTrees] = useState<{id: string, name: string}[]>([]);

  const [selectedTree, setSelectedTree] = useState<string>('');

  const [nodes, setNodes] = useState<{id: string, title: string, text: string}[] | null>(null); //maybe object with ids as keys??

  const [treeUnsub, setTreeUnsub] = useState<Unsubscribe | null>(null);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if(event.ctrlKey && event.key === 'q') {
      setShowTreeModal(true);
    }
    if(event.ctrlKey && event.key === 'b') {
      setShowNodeModal(true);
    }
    if(event.key === 'Escape') {
      setShowTreeModal(false);
      setShowNodeModal(false);
      setTreeName('');
      setNodeName('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const selectedTreeRef = useRef<string | null>(null);
  selectedTreeRef.current = selectedTree;

  useEffect(() => {
    if(user !== null && user !== undefined) {
      const unsubSnap = onSnapshot(collection(db, 'users', user.uid, 'trees'), (treeDocs) => {
        let treeDocsArray: {id: string, name: string, created: number, lastEdit: number}[] = [];
        treeDocs.forEach((treeDoc) => {
          const treeDocContent = treeDoc.data();
          treeDocsArray.push({id: treeDoc.id, name: treeDocContent.name, created: treeDocContent.created, lastEdit: treeDocContent.lastEdit});
        });
        setTrees(treeDocsArray.sort((a, b) => b.lastEdit - a.lastEdit));
        if(selectedTreeRef.current && !treeDocsArray.map((tree) => tree.id).includes(selectedTreeRef.current)) {
          setSelectedTree('');
        }
      });

      return () => {
        unsubSnap();
        // if(treeUnsub) treeUnsub();
      }
    }
  }, []);

  const getNodes = async () => {
    // if(treeUnsub) treeUnsub();
    if(user !== null && user !== undefined && selectedTree.length >= 1) {
      const unsubSnapshot = onSnapshot(collection(db, 'users', user.uid, 'trees', selectedTree, 'nodes'), (treeNodes) => {
        let nodesArray: {id: string, title: string, text: string}[] = [];
        treeNodes.forEach((treeNode) => {
          const nodeContent: DocumentData = treeNode.data();
          nodesArray.push({id: treeNode.id, title: nodeContent.title, text: nodeContent.text});
        });
        setNodes(nodesArray);
        // setTreeUnsub(unsubSnapshot);
      });
    } else setNodes(null);
  }

  const updateLastEdit = async () => {
    const localTimestamp = Date.now();

    if(user !== null && user !== undefined) {
      try {
        await updateDoc(doc(db, 'users', user.uid, 'trees', selectedTree), {
          lastEdit: localTimestamp,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getNodes();
  }, [selectedTree]);

  const createTree = async (e: React.MouseEvent) => {
    e.preventDefault();

    const localTimestamp = Date.now();

    if(user !== null && user !== undefined && treeName.length >= 1) {
      try {
        const treeReference = await addDoc(collection(db, 'users', user.uid, 'trees'), {
          name: treeName,
          created: localTimestamp,
          lastEdit: localTimestamp,
        });
        setSelectedTree(treeReference.id);
      } catch (err) {
        console.error(err);
      }
      setShowTreeModal(false);
      setTreeName('');
    }
  }

  const createNode = async (e: React.MouseEvent) => {
    e.preventDefault();

    if(user !== null && user !== undefined && nodeName.length >= 1) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'trees', selectedTree, 'nodes'), {
          title: nodeName,
          text: '',
        });
        await updateLastEdit();
      } catch (err) {
        console.error(err);
      }
      setShowNodeModal(false);
      setNodeName('');
      getNodes();
    }
  }

  const updateText = async (nodeId: string, newText: string) => {
    if(nodes) {
      const currentNodeIndex = nodes.indexOf(nodes.filter((node) => node.id === nodeId)[0]);
      let updatedNodes = [...nodes];
      updatedNodes[currentNodeIndex] = {...updatedNodes[currentNodeIndex], text: newText};
      setNodes(updatedNodes);
    }
    if(user !== null && user !== undefined) {
      try {
        await updateDoc(doc(db, 'users', user.uid, 'trees', selectedTree, 'nodes', nodeId), {
          text: newText,
        });
        await updateLastEdit(); // Do I need await here?
      } catch (err) {
        console.error(err);
      }
    }
  }


  return (
    <div className="tree">
      {showTreeModal && 
        <CreateModal closeModal={() => {
          setShowTreeModal(false);
           setTreeName('');
           }}>
          <>
            <h2>Create Tree</h2>
            <form className="modalForm">
              <input autoFocus placeholder="Enter a name for your tree..." value={treeName} onChange={(e) => setTreeName(e.target.value)} className="modalNameInput"></input>
              <input type='submit' onClick={(e) => createTree(e)} value='Create' className="modalButton"></input>
            </form>
          </> 
        </CreateModal>
      }
      {showNodeModal && 
        <CreateModal closeModal={() => {
          setShowNodeModal(false);
           setTreeName('');
           }}>
          <>
            <h2>Create Node</h2>
            <form className="modalForm">
              <input autoFocus placeholder="Enter a name for your node..." value={nodeName} onChange={(e) => setNodeName(e.target.value)} className="modalNameInput"></input>
              <input type='submit' onClick={(e) => createNode(e)} value='Create' className="modalButton"></input>
            </form>
          </> 
        </CreateModal>
      }
      <div className={`modalBlurWrapper ${showTreeModal || showNodeModal ? 'modalBlur' : ''}`} onClick={() => {
       if(showTreeModal || showNodeModal) {
        setShowTreeModal(false);
        setShowNodeModal(false);
        setTreeName('');
        setNodeName('');
       }
      }}>
          <Navbar>
            <>
              <button onClick={() => setShowTreeModal(true)} className="navButton navButtonTop navButtonSelected">Create Tree</button>
              {trees.length >= 1 ?
               trees.map((tree, index) => 
                <button onClick={() => setSelectedTree(selectedTree === tree.id ? '' : tree.id)}
                  className={`navButton ${index === 0 && 'navButtonTop'} ${selectedTree === tree.id && 'navButtonSelected'}`} 
                  key={tree.id}>{tree.name}</button>) : 
                <h3>No trees</h3>}
            </>
          </Navbar>
        <div className="treeViewer">
          {trees.length >= 1 ?
          <>
            {selectedTree.length >= 1 ? 
              nodes === null ? 
                <></> :
                nodes.length >= 1 ? 
                  <>
                    {nodes.map((node) => <Node 
                      key={node.id} 
                      nodeTitle={node.title} 
                      nodeText={node.text}
                      openModal={() => setShowNodeModal(true)}
                      updateText={(newText: string) => updateText(node.id, newText)} />)}
                  </> :
                  <>
                    <h3>Create a node (Ctrl + b)</h3>
                    <AiOutlinePlusSquare onClick={() => setShowNodeModal(true)} size={30} className='createNodeIcon'/>
                  </> 
              :
              <h3>Select a tree first</h3>
            }
          </> :
          <h3>Create a tree first</h3>
          }
          <SignInState/>
        </div>
      </div>
    </div>
  )
}
  
  export default Tree;