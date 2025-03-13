import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [userRole, setUserRole] = useState(null);  // 'doctor', 'patient', 'admin'
    const [isRegistered, setIsRegistered] = useState(true);

    const handleRoleSelection = (role) => setUserRole(role);
const navigate=useNavigate();
    return (
        <div className="outer-box">

            {/* Role Selection Section */}
            {!userRole && (
                <div className="inner">
                    <h1>Welcome User! You are a?</h1>
                    <div className='add-space'>
                        <button onClick={() => handleRoleSelection('doctor')}>Doctor</button>
                        <h3>OR</h3>
                        <button onClick={() => handleRoleSelection('patient')}>Patient</button>
                        <h3>OR</h3>
                        <button onClick={() => handleRoleSelection('admin')}>Admin</button>
                    </div>
                </div>
            )}

            {/* Admin Sign-in */}
            {userRole === 'admin' && (
                <div className="container" id='admin'>
                    <form>
                        <h1>Admin</h1>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <button onClick={navigate('/dashboard')}>Sign In</button>
                    </form>
                </div>
            )}

            {/* Doctor/Patient Sign-in & Sign-up */}
            {(userRole === 'doctor' || userRole === 'patient') && (
                <div className={isRegistered ? 'container' : 'container active'} id="container">
                    {/* Sign-Up Form */}
                    <div className="sign-up">
                        <form>
                            <h1>Create Account</h1>
                            <input type="text" placeholder="Name" />
                            {userRole === 'doctor' && (
                                <input type="text" placeholder='Medical License Number' />
                            )}
                            <input type="text" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button 
    onClick={(e) => {
        e.preventDefault();  // Prevents form submission
        if (userRole === 'doctor') {
            navigate('/docdashboard');
        } else if (userRole === 'patient') {
            navigate('/main');
        }
    }}
> SignUp</button>
                        </form>
                    </div>

                    {/* Sign-In Form */}
                    <div className="sign-in">
                        <form>
                            <h1>Sign In</h1>
                            <input type="text" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forgot password?</a>
                            <button  onClick={(e) => {
        e.preventDefault();  // Prevents form submission
        if (userRole === 'doctor') {
            navigate('/docdashboard');
        } else if (userRole === 'patient') {
            navigate('/main');
        }
    }}>Sign In</button>
                        </form>
                    </div>

                    {/* Toggle Panel */}
                    <div className="toogle-container">
                        <div className="toogle">
                            <div className="toogle-panel toogle-left">
                                <h1>Welcome {userRole}!</h1>
                                <p>If you already have an account</p>
                                <button className="" id="login" onClick={() => setIsRegistered(true)}>
                                    Sign In
                                </button>
                            </div>
                            <div className="toogle-panel toogle-right">
                                <h1>Hello, {userRole}!</h1>
                                <p>If you don't have an account</p>
                                <button className="text-white" id="register" onClick={() => setIsRegistered(false)}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignIn;
