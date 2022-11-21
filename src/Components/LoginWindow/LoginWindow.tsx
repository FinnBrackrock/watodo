import './login-window.css';
import { useState, useEffect } from 'react';

import { auth, db } from "../..";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore'

import { Link } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const LoginWindow = () => {
    
    const [login, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const usermailDocument = doc(db, 'usernamesCollection', 'userMail');
    
    const signIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        if(login && password) {
            if(login.includes('@')) {
                try {
                    await signInWithEmailAndPassword(auth, login, password);
                } catch {
                    console.error('Wrong email or password');
                }
            } else {
                const usermailDoc = await getDoc(usermailDocument);
                const usermail = usermailDoc.data()?.[login];
                if(usermail !== undefined && usermail !== null) {
                    try {
                        await signInWithEmailAndPassword(auth, usermail, password);
                    } catch {
                        console.error('Wrong username or password')
                    }
                } else console.error('Wrong username or password');
            }
            setEmail('');
            setPassword('');
        } else {
            console.error('Wrong input');
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
            <div className='inputWrapper'>
            <input autoComplete='on' placeholder='Username or email address' className='loginInput' onChange={(e) => setEmail(e.target.value)} value={login}></input>
            </div>
            <div className='inputWrapper'>
                <input autoComplete='on' type={showPassword ? 'text' : 'password'} placeholder='Password' className='loginInput' onChange={(e) => setPassword(e.target.value)} value={password}></input>
                {showPassword ? 
                    <AiOutlineEye size={20} onClick={() => setShowPassword(false)} className='showPasswordToggle' /> :
                    <AiOutlineEyeInvisible size={20} onClick={() => setShowPassword(true)} className='showPasswordToggle' />
                }
            </div>
            <button type='submit' className='loginButton' onClick={(e) => signIn(e)}>Log In</button>
        </form>
            <a href='' onClick={() => alert('Pech gehabt')} style={{color: 'white', marginTop: '10px'}}>Forgot password?</a>
    </div>
  )
}

export default LoginWindow