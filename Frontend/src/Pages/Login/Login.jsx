import './Login.css';
import { Link } from 'react-router-dom';
import { useStates } from '../../States';
import { TextField } from '@mui/material';

function Login() {

  // UseStates
  const { setEmail, setPassword, logincheck, googleLogin } = useStates();
  return (
    <>
      <div className='login-page'>
        <div className='logo-pic1'>
        </div>
        <div className='login-box'>
        
  

          <div className='login-div'>
            <span className='login-text'><b>SIGN IN</b></span>
          </div>

          <form onSubmit={logincheck}>
          <div className='mail-div'>
          <TextField  className='mail-in' type='email' label="Email" variant="filled" required
              onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='pw-div'>
          <TextField className='pw-in' type='password' label="Password" variant="filled" required
              onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className='loginbtn-div'>
            <button className='login-btn'>Log In</button>
          </div>
          </form>

          <div className='google-div'>
            <button onClick={googleLogin} className='google-btn'>Log In using Google</button>
          </div>

          <div className='signuplink-div'>
            <span className='signuplink-txt1'>Haven't Visited our page Yet!!!</span>
            <Link to='/signup'>
              <span className='signuplink-txt2'><u>Sign up now</u></span>
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Login;