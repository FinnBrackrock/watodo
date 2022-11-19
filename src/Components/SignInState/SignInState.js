import './sign-in-state.css';

import { auth } from '../..';

import { signOut } from 'firebase/auth';

const SignInState = () => {
    const user = auth.currentUser;

    const logOut = async () => {
      await signOut(auth);
    }

  return (
    <div className='signInState'>
        {user && <div>Signed in as:<br />{user.email}<br /><div id='signout' onClick={logOut}>Sign out</ div></div>}
        
    </div>  
  )
}

export default SignInState