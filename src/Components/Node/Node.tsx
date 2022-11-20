import "./node.css";
import { useState, useEffect } from "react";

import { db } from "../..";
import { getDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";

const Node = () => {
  const [nodeText, setNodeText] = useState("");

  const [typing, setTyping] = useState(false);
  const [timeoutHandle, setTimeoutHandle] = useState(null);

  const docRef = doc(db, "notes", "GPkfQF4PrMNKF7EfGuhV");
  useEffect(() => {
    async function setText() {
      const initialDoc = await getDoc(docRef);
      let initialText = initialDoc.data()?.text;
      if (initialText === undefined || initialText === null) {
        return;
      }
      setNodeText(initialText);
    }

    setText();

    const unsub = onSnapshot(docRef, (updatedDoc) => {
      let updatedText = updatedDoc.data()?.text;
      if (updatedText === undefined || updatedText === null) {
        return;
      }
      setNodeText(updatedText);
    });

    return () => {
      unsub();
    };
  }, []);

  const update = async (e) => {
    setText(e);

    const updateText = async (e) => {
      await updateDoc(docRef, {
        text: e,
      });
      setTyping(false);
    };

    if (!typing) {
      setTyping(true);
      const timeoutId = setTimeout(() => updateText(e), 500);
      setTimeoutHandle(timeoutId);
    } else {
      const timeoutId = setTimeout(() => updateText(e), 500);
      setTimeoutHandle(timeoutId);
      window.clearTimeout(timeoutHandle);
    }
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
