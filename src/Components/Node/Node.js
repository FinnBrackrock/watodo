import './node.css';
import { useState, useEffect } from 'react';

import { db } from '../..';
import { getDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore'

const Node = () => {
  const [val, setVal] = useState({
    color: 'white',
    text: ''
  });

  const [typing, setTyping] = useState(false);

  const [timeoutHandle, setTimeoutHandle] = useState(null);

  const docRef = doc(db, 'notes', 'GPkfQF4PrMNKF7EfGuhV');

  useEffect(() => {
    async function setText() {
      const query = await getDoc(docRef);
        setVal(query.data());
    }
    setText()


    const unsub = onSnapshot(docRef, (doc) => {
      setVal(doc.data());
    });
  }, [])

  const update = async (e) => {
    setVal({...val, text: e})

    const updateText = async (e) => {
      await updateDoc(docRef, {
        text: e,
      });
      setTyping(false);
    }

    if(!typing) {
      setTyping(true);
      const timeoutId = setTimeout(() => updateText(e), 500);
      setTimeoutHandle(timeoutId);
    } else {
      const timeoutId = setTimeout(() => updateText(e), 500);
      setTimeoutHandle(timeoutId);
      window.clearTimeout(timeoutHandle);
    }
  }


  return (
    <div className="node">
        <div className='nodeHead'>
            <h1>test</h1>
        </div>
        <div className='nodeBody'>
          <textarea value={val.text} style={{color: val.color}} onChange={(e) => update(e.target.value)} className='nodeTextarea'>
          </textarea>
        </div>
    </div>
  )
}

export default Node;