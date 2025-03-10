


import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
    const [isRegistered, setIsRegistered] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [userName, setUserName] = useState("USER");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="outer-box">
                <div className={isClicked ? "inner hideIt" : "inner"}>
                    <div>
                        <h1>Welcome User! You are a?</h1>
                        <div className='add-space'>
                            <button onClick={() => {
                                setIsClicked(true);
                                setUserName('Doctor');
                            }}>Doctor</button>
                            <h3>OR</h3>
                            <button onClick={() => {
                                setIsClicked(true);
                                setUserName("User");
                            }}>Patient</button>
                            <h3>OR</h3>
                            <button onClick={() => {
                                setIsAdmin(true);
                                setIsClicked(true);
                            }}>Admin</button>
                        </div>
                    </div>
                </div>

                {/* Admin Sign In */}
                <div className={isAdmin ? "container" : "hideIt"} id='admin'>
                    <form>
                        <h1>Admin</h1>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <button type="button" onClick={() => navigate("/dashboard")}>Sign In</button>
                    </form>
                </div>

                {/* User & Doctor Sign In */}
                <div className={(isAdmin || !isClicked) ? 'hideIt' : ""}>
                    <div className={!isRegistered ? "container active" : "container"} id="container">
                        <div className="sign-up">
                            <form>
                                <h1>Create Account</h1>
                                <input type="text" placeholder="Name" />
                                <input className={userName === 'Doctor' ? "" : "hideIt"} type="text" placeholder='Medical License Number' />
                                <input type="text" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <button>Sign Up</button>
                            </form>
                        </div>
                        <div className="sign-in">
                            <form>
                                <h1>Sign In</h1>
                                <input type="text" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <a href="#">Forgot password</a>
                                <button type="button" onClick={() => {
                                    if (userName === "Doctor") navigate("/doctor-dashboard");
                                    else navigate("/patient-dashboard");
                                }}>Sign In</button>
                            </form>
                        </div>
                        <div className="toogle-container">
                            <div className="toogle">
                                <div className="toogle-panel toogle-left">
                                    <h1>Welcome {userName}!</h1>
                                    <p>If you already have an account</p>
                                    <button className="hidden" id="login" onClick={() => setIsRegistered(true)}>Sign In</button>
                                </div>
                                <div className="toogle-panel toogle-right">
                                    <h1>Hello, {userName}</h1>
                                    <p>If you don't have an account</p>
                                    <button className="hidden" id="register" onClick={() => setIsRegistered(false)}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SignIn;
