import Node from "../Node/Node";
import SignInState from "../SignInState/SignInState";
import './tree.css'

const Tree = () => {
    return (
      <div className="tree">
          <Node/>
          <SignInState />
      </div>
    )
  }
  
  export default Tree;