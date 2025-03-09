// import React,{useState} from 'react'
// import { use } from 'react';

// import { useNavigate } from "react-router-dom";
// import "./SignIn.css";

// function SignIn(){
//     const[isRegistered,setIsRegistered]=useState(true);
//     const [isDoctor ,setIsDoctor]=useState(false);
//     const [isClicked ,setIsClicked]=useState(false);
//     const nam="container";
//     const nam2 ='inner';
//     const [userName,setUserName]=useState("USER");
//     const[isAdmin,setIsAdmin]=useState(false);
    

//     return(<>
    

//  <div className="outer-box">

//  <div className={isClicked?nam2+' hideIt':nam2}>
//         <div>
//            <h1>Welcome User! You are a?</h1> 
//            <div className='add-space'>
//             <button onClick={()=>{
//                                 setIsClicked(true)
//                                 setUserName('Doctor')}}>Doctor</button><p></p>
           
//            <h3>OR</h3>                       
//             <button onClick={()=>{
//                 setIsClicked(true)
//                 setUserName("User")}}>Patient</button>
//                 <h3>OR <br></br></h3>
//             <button onClick={()=>{
//                 setIsAdmin(true)
//                 setIsClicked(true)
//             } }>
//                 Admin 
//             </button>
//             </div>
//             </div>
//     </div>
//     <div className={isAdmin?nam:"hideIt"} id='admin'>

//         <form >           
//            <h1>  Admin <br /></h1>
//            <input type="text" placeholder='username' />
//            <input type="password" placeholder='password' />
//            {/* <button>Sign In</button>            */}
//            <button onClick={() => navigate("./dashboard")}>Sign In</button>
//         </form>

        

//     </div>
//             <div className={(isAdmin==true)||(isAdmin==false&&isClicked==false)?' hideIt':""}>
//             <div className={!isRegistered ? nam+' active': nam } id="container"  >
//       <div className="sign-up">
//         <form>
//           <h1>Create Account</h1>

//           <input type="text" placeholder="Name" />
//           <input className={userName =='Doctor'? "":"hideIt"} type="text" placeholder='Medical License Number' />
//           <input type="text" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <button>Sign Up</button>
//         </form>
//       </div>
//       <div className="sign-in">
//         <form>
//           <h1>Sign In</h1>
//           <input type="text" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <a href="#">Forgot password</a>
//           <button>Sign In</button>
//         </form>
//       </div>
//       <div className="toogle-container">
//         <div className="toogle">
//           <div className="toogle-panel toogle-left">
//             <h1>Welcome {userName}!</h1>
//             <p>If you already have an account</p>
//             <button className="hidden" id="login" onClick={()=>setIsRegistered(true)}>Sign In</button>
//           </div>
//           <div className="toogle-panel toogle-right">
//             <h1>Hello, {userName}</h1>
//             <p>If you don't have an account</p>
//             <button className="hidden" id="register" onClick={()=>setIsRegistered(false)}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>

//  </div>
//  </div>

//  </>

//     );

// }

// export default SignIn



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SignIn() {
//   const [isRegistered, setIsRegistered] = useState(true);
//   const [isClicked, setIsClicked] = useState(false);
//   const [userName, setUserName] = useState("USER");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//       <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
//         {!isClicked ? (
//           <div className="text-center space-y-4">
//             <h1 className="text-xl font-bold">Welcome User! You are a?</h1>
//             <div className="space-y-3">
//               <button
//                 className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//                 onClick={() => {
//                   setIsClicked(true);
//                   setUserName("Doctor");
//                 }}
//               >
//                 Doctor
//               </button>
//               <h3 className="text-gray-600">OR</h3>
//               <button
//                 className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 onClick={() => {
//                   setIsClicked(true);
//                   setUserName("Patient");
//                 }}
//               >
//                 Patient
//               </button>
//               <h3 className="text-gray-600">OR</h3>
//               <button
//                 className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//                 onClick={() => {
//                   setIsAdmin(true);
//                   setIsClicked(true);
//                 }}
//               >
//                 Admin
//               </button>
//             </div>
//           </div>
//         ) : isAdmin ? (
//           <div className="space-y-4">
//             <h1 className="text-xl font-bold text-center">Admin</h1>
//             <form className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//                 onClick={() => navigate("/admin-dashboard")}
//               >
//                 Sign In
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="text-center">
//               <h1 className="text-xl font-bold">{isRegistered ? "Sign In" : "Create Account"}</h1>
//             </div>
//             <form className="space-y-3">
//               {!isRegistered && (
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               )}
//               {!isRegistered && userName === "Doctor" && (
//                 <input
//                   type="text"
//                   placeholder="Medical License Number"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               )}
//               <input
//                 type="text"
//                 placeholder="Email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//               >
//                 {isRegistered ? "Sign In" : "Sign Up"}
//               </button>
//             </form>
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 {isRegistered ? "Don't have an account? " : "Already have an account? "}
//                 <button
//                   className="text-blue-600 hover:underline"
//                   onClick={() => setIsRegistered(!isRegistered)}
//                 >
//                   {isRegistered ? "Sign Up" : "Sign In"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SignIn;



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
