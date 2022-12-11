import "./node.css";
import { useState, useEffect } from "react";

import { db, auth } from "../..";
import { getDoc, updateDoc, doc, onSnapshot, getDocs, collection, Unsubscribe, DocumentData } from "firebase/firestore";
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';

const Node = () => {
  const [nodeText, setNodeText] = useState("");

  const [typing, setTyping] = useState(false);
  const [timeoutHandle, setTimeoutHandle] = useState(0);

  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
      let unsubSnapshot: Unsubscribe | undefined;
      const unsubAuth = onAuthStateChanged(auth, userObject => {
        setUserId(userObject?.uid);
        if(userObject?.uid !== null && userObject?.uid !== undefined) {
          const colRef = collection(db, 'users', userObject.uid, 'nodes');
          unsubSnapshot = onSnapshot(colRef, (newDocs) => {
            let initialDocsArray: DocumentData[] = [];
            newDocs.forEach((newDoc) => {
              initialDocsArray.push(newDoc.data());
            });
            setNodeText(initialDocsArray[0].text);
          });
         }
      });

      /*if(userId !== null && userId !== undefined) {
        const colRef = collection(db, 'users', userId, 'nodes');
        const initialDocs = await getDocs(colRef);
        let initialDocsArray: DocumentData[] = [];
        initialDocs.forEach((doc) => {
          initialDocsArray.push(doc.data());
        });
        setNodeText(initialDocsArray[0].text);
      }
      */

      return () => {
        unsubAuth();
        if(unsubSnapshot) unsubSnapshot();
      };
  }, []);


  const update = async (e: string) => {
    /*
    setNodeText(e);
    const updateText = async (e: string) => {
      await updateDoc(docRef, {
        text: e,
      });
      setTyping(false);
    };

    if (!typing) {
      setTyping(true);
      const timeoutId = window.setTimeout(() => updateText(e), 500);
      setTimeoutHandle(timeoutId);
    } else {
      const timeoutId = window.setTimeout(() => updateText(e), 500);
      setTimeoutHandle(timeoutId);
      window.clearTimeout(timeoutHandle);
    }
    */
  };


  return (
    <div className="node">
      <div className="nodeHead">
        <h1>test</h1>
      </div>
      <div className="nodeBody">
        <textarea
          value={nodeText}
          onChange={(e) => update(e.target.value)}
          className="nodeTextarea"
        ></textarea>
      </div>
    </div>
  );
};

export default Node;
