import './signup-window.css';
import { useState, useEffect } from 'react';

import { auth } from "../..";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Link } from 'react-router-dom';

const SignupWindow = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const createAccount = async (e) => {
        e.preventDefault();
        try {
            if(email && password.length >= 8) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredential.user);
                setEmail('');
                setPassword('');
            } else {
                console.log('Wrong input');
            }
        } catch {
            console.error('Invalid email');
        }
    }

  return (
    <div className='loginWindow'>
        <h1 id='loginText'>Sign up</h1>
        <div id='createAccountTextWrapper'>
            <h3 id='createAccountText1'>Already have an account?</h3>
            <Link to='/login' id='createAccountText2'>Login</Link>
        </div>
        <form className='loginForm'>
            <input placeholder='Email adress' className='loginInput' onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input type='password' placeholder='Password' className='loginInput' onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button type='submit' className='loginButton' onClick={(e) => createAccount(e)}>Sign up</button>
        </form>
    </div>
  )
}

export default SignupWindow