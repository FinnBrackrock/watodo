import './login.css';
import LoginWindow from '../LoginWindow/LoginWindow';
import SignupWindow from '../SignupWindow/SignupWindow';

const Login = ({ signup }) => {
  return (
    <div className='login'>
      {signup ? 
        <SignupWindow /> :
        <LoginWindow />}
    </div>
  )
}

export default Login