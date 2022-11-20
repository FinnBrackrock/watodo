import './login-window.css';
import { useState, useEffect } from 'react';

import { auth } from "../..";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Link } from 'react-router-dom';

const LoginWindow = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = async (e) => {
        e.preventDefault();
        try {
            if(email && password) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
                setEmail('');
                setPassword('');
            } else {
                console.log('Wrong input');
            }
        } catch {
            console.error('Invalid email or password');
        }
    }

  return (
    <div className='loginWindow'>
        <h1 id='loginText'>Log In</h1>
        <div id='createAccountTextWrapper'>
            <h3 id='createAccountText1'>New User?</h3>
            <Link to='/signup' id='createAccountText2'>Create an account</Link>
        </div>
        <form className='loginForm'>
            <input autoComplete='on' placeholder='Email adress' className='loginInput' onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input autoComplete='on' type='password' placeholder='Password' className='loginInput' onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button type='submit' className='loginButton' onClick={(e) => signIn(e)}>Log In</button>
        </form>
            <a href='' onClick={() => alert('Pech gehabt')} style={{color: 'white', marginTop: '10px'}}>Forgot password?</a>
    </div>
  )
}

export default LoginWindow