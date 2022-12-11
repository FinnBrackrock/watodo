import Node from "../Node/Node";
import SignInState from "../SignInState/SignInState";
import { User } from "@firebase/auth";
import './tree.css'

const Tree: React.FC = () => {
    return (
      <div className="tree">
          <Node/>
          <SignInState/>
      </div>
    )
  }
  
  export default Tree;