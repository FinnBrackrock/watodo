import './sign-in-state.css'

import { auth } from '../..'

const SignInState = () => {
    const user = auth.currentUser;

  return (
    <div className='signInState'>
        {user && <div>Signed in as:<br />{user.email}</div>}
    </div>  
  )
}

export default SignInState