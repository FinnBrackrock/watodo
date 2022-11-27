import './login.css';
import LoginWindow from '../LoginWindow/LoginWindow';
import SignupWindow from '../SignupWindow/SignupWindow';

type LoginPropsType = {
  signup: boolean,
};

const Login = ({ signup }: LoginPropsType) => {
  return (
    <div className='login'>
      {signup ? 
        <SignupWindow /> :
        <LoginWindow />}
    </div>
  )
}

export default Login