// import React, { useState } from 'react';
// import './SignIn.css';
// import { useNavigate } from 'react-router-dom';

// function SignIn() {
//     const [userRole, setUserRole] = useState(null);  // 'doctor', 'patient', 'admin'
//     const [isRegistered, setIsRegistered] = useState(true);

//     const handleRoleSelection = (role) => setUserRole(role);
// const navigate=useNavigate();
//     return (
//         <div className="outer-box">

//             {/* Role Selection Section */}
//             {!userRole && (
//                 <div className="inner">
                  
//                     <div className='add-space'>
//                     <h1  >Welcome User! You are a?</h1>
//                         <button onClick={() => handleRoleSelection('doctor')}>Doctor</button>
//                         <h3>OR</h3>
//                         <button onClick={() => handleRoleSelection('patient')}>Patient</button>
//                         <h3>OR</h3>
//                         <button onClick={() => handleRoleSelection('admin')}>Admin</button>
//                     </div>
//                 </div>
//             )}

//             {/* Admin Sign-in */}
//             {userRole === 'admin' && (
//                 <div className="container" id='admin'>
//                     <form>
//                         <h1>Admin</h1>
//                         <input type="text" placeholder='Username' />
//                         <input type="password" placeholder='Password' />
//                         <button onClick={navigate('/dashboard')}>Sign In</button>
//                     </form>
//                 </div>
//             )}

//             {/* Doctor/Patient Sign-in & Sign-up */}
//             {(userRole === 'doctor' || userRole === 'patient') && (
//                 <div className={isRegistered ? 'container' : 'container active'} id="container">
//                     {/* Sign-Up Form */}
//                     <div className="sign-up">
//                         <form>
//                             <h1>Create Account</h1>
//                             <input type="text" placeholder="Name" />
//                             {userRole === 'doctor' && (
//                                 <input type="text" placeholder='Medical License Number' />
//                             )}
//                             <input type="text" placeholder="Email" />
//                             {userRole === 'patient' && (
//                                 <input type="text" placeholder='Blood Group' />
//                             )}
//                             {userRole === 'patient' && (
//                                 <input type="number" placeholder="Age" min="0" />
//                             )}
//                             <input type="password" placeholder="Password" />
//                             <button 
//     onClick={(e) => {
//         e.preventDefault();  // Prevents form submission
//         if (userRole === 'doctor') {
//             navigate('/docdashboard');
//         } else if (userRole === 'patient') {
//             navigate('/main');
//         }
//     }}
// > SignUp</button>
//                         </form>
//                     </div>

//                     {/* Sign-In Form */}
//                     <div className="sign-in">
//                         <form>
//                             <h1>Sign In</h1>
//                             <input type="text" placeholder="Email" />
//                             <input type="password" placeholder="Password" />
//                             <a href="#">Forgot password?</a>
//                             <button  onClick={(e) => {
//         e.preventDefault();  // Prevents form submission
//         if (userRole === 'doctor') {
//             navigate('/docdashboard');
//         } else if (userRole === 'patient') {
//             navigate('/main');
//         }
//     }}>Sign In</button>
//                         </form>
//                     </div>

//                     {/* Toggle Panel */}
//                     <div className="toogle-container">
//                         <div className="toogle">
//                             <div className="toogle-panel toogle-left">
//                                 <h1>Welcome {userRole}!</h1>
//                                 <p>If you already have an account</p>
//                                 <button className="" id="login" onClick={() => setIsRegistered(true)}>
//                                     Sign In
//                                 </button>
//                             </div>
//                             <div className="toogle-panel toogle-right">
//                                 <h1>Hello, {userRole}!</h1>
//                                 <p>If you don't have an account</p>
//                                 <button className="text-white" id="register" onClick={() => setIsRegistered(false)}>
//                                     Sign Up
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SignIn;



import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [userRole, setUserRole] = useState(null);  // 'doctor', 'patient', 'admin'
    const [isRegistered, setIsRegistered] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", age: "", bloodGroup: "", licenseNumber: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRoleSelection = (role) => setUserRole(role);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Sign Up API Call
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: userRole }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Sign Up Failed");
            
            alert("Sign Up Successful! Please Sign In.");
            setIsRegistered(true);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle Sign In API Call
    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Sign In Failed");

            alert("Sign In Successful!");
            if (userRole === "doctor") navigate("/docdashboard");
            else if (userRole === "patient") navigate("/main");
            else if (userRole === "admin") navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="outer-box">
            {!userRole && (
                <div className="inner">
                    <div className="add-space">
                        <h1>Welcome User! You are a?</h1>
                        <button onClick={() => handleRoleSelection("doctor")}>Doctor</button>
                        <h3>OR</h3>
                        <button onClick={() => handleRoleSelection("patient")}>Patient</button>
                        <h3>OR</h3>
                        <button onClick={() => handleRoleSelection("admin")}>Admin</button>
                    </div>
                </div>
            )}

            {userRole && (
                <div className={isRegistered ? "container" : "container active"} id="container">
                    {/* Sign-Up Form */}
                    <div className="sign-up">
                        <form onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                            {userRole === "doctor" && (
                                <input type="text" name="licenseNumber" placeholder="Medical License Number" onChange={handleChange} required />
                            )}
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            {userRole === "patient" && (
                                <>
                                    <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required />
                                    <input type="number" name="age" placeholder="Age" min="0" onChange={handleChange} required />
                                </>
                            )}
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            <button type="submit">Sign Up</button>
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>

                    {/* Sign-In Form */}
                    <div className="sign-in">
                        <form onSubmit={handleSignIn}>
                            <h1>Sign In</h1>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            <a href="#">Forgot password?</a>
                            <button type="submit">Sign In</button>
                            {error && <p className="error">{error}</p>}
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



