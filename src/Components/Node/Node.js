import './node.css';
import { useState, useEffect } from 'react';

import { db } from '../..';
import { collection, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore'

const Node = () => {
  const [val, setVal] = useState({
    color: 'white',
    text: ''
  })

  const docRef = doc(db, 'notes', 'GPkfQF4PrMNKF7EfGuhV');

  useEffect(() => {
    async function setText() {
      const query = await getDoc(docRef);
        setVal(query.data());
    }
    setText()
  }, [])  

  const update = async (e) => {
    await updateDoc(docRef, {
      text: e,
    });
    const query = await getDoc(docRef);
    setVal(query.data());
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