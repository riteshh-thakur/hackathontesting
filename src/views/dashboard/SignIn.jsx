import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
    const [userState, setUserState] = useState({
        isClicked: false,
        isAdmin: false,
        isRegistered: true,
        userName: "USER"
    });

    const navigate = useNavigate();

    const handleUserSelection = (role) => {
        setUserState({
            ...userState,
            isClicked: true,
            userName: role,
            isAdmin: role === "Admin"
        });
    };

    const handleSignIn = () => {
        const route = userState.isAdmin
            ? "/dashboard"
            : userState.userName === "Doctor"
            ? "/docdashboard"
            : "/main";
        navigate(route);
    };

    return (
        <div className="outer-box">
            {!userState.isClicked ? (
                <div className="inner">
                    <h1>Welcome User! You are a?</h1>
                    <div className="add-space">
                        <button onClick={() => handleUserSelection("Doctor")}>Doctor</button>
                        <h3>OR</h3>
                        <button onClick={() => handleUserSelection("User")}>Patient</button>
                        <h3>OR</h3>
                        <button onClick={() => handleUserSelection("Admin")}>Admin</button>
                    </div>
                </div>
            ) : userState.isAdmin ? (
                <div className="container" id="admin">
                    <form>
                        <h1>Admin</h1>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="button" onClick={handleSignIn}>Sign In</button>
                    </form>
                </div>
            ) : (
                <div className="container" id="container">
                    <div className={userState.isRegistered ? "sign-in" : "sign-up"}>
                        <form>
                            <h1>{userState.isRegistered ? "Sign In" : "Create Account"}</h1>
                            {!userState.isRegistered && (
                                <input type="text" placeholder="Name" />
                            )}
                            {!userState.isRegistered && userState.userName === "Doctor" && (
                                <input type="text" placeholder="Medical License Number" />
                            )}
                            <input type="text" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button type="button" onClick={handleSignIn}>
                                {userState.isRegistered ? "Sign In" : "Sign Up"}
                            </button>
                        </form>
                        <p>
                            {/* {userState.isRegistered
                                ? ""
                                : "Already have an account? "} */}
                            <button
                                className="toggle-button"
                                onClick={() => setUserState({
                                    ...userState,
                                    isRegistered: !userState.isRegistered
                                })}
                            >
                                {userState.isRegistered ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignIn;