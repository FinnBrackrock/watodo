import './view.css'

import Tree from "../Tree/Tree";
import Login from "../Login/Login";

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { auth } from "../..";
import { onAuthStateChanged } from  'firebase/auth'

type ViewPropsType = {
  signin: boolean,
  signup: boolean,
};

const View = ({ signin, signup }: ViewPropsType) => {
    const navigate = useNavigate();

  
    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if(user) {
          navigate('/');
        } else {
          navigate('/login');
        }
      })
    }, []);


  return (
    <div className='view'>
        {signin ? 
            <Login signup={signup} /> :
            <Tree />
        }
    </div>
  )
}

export default View