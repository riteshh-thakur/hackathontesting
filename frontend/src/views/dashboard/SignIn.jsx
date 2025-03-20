import React, { useState } from "react";
import "./SignIn.css";
import background from "../../assets/background.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [plainMode, setPlainMode] = useState(false); // New state to toggle plain mode
  const [userRole, setUserRole] = useState(null);
  const [isRegistered, setIsRegistered] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    bloodGroup: "",
    licenseNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // When user selects a role, trigger plain mode
  const handleRoleSelection = (role) => {
    setUserRole(role);
    setPlainMode(true); // Toggle plain mode ON
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint =
        userRole === "doctor"
          ? "http://localhost:8080/api/doc/login"
          : "http://localhost:8080/api/auth/signin";

      const bodyData =
        userRole === "doctor"
          ? { doctorname: formData.name, password: formData.password }
          : { name: formData.name, password: formData.password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const rawData = await response.text();
      const data = JSON.parse(rawData);
      if (!response.ok) throw new Error(data.message || "Sign In Failed");

      if (!data.token) {
        throw new Error("Invalid token received. Please try again.");
      }

      localStorage.setItem("token", data.token);

      alert("Sign In Successful!");
      // Navigate normally without opening a new window
      if (userRole === "doctor") navigate("/docdashboard");
      else if (userRole === "patient") navigate("/main");
      else if (userRole === "admin") navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="signin-container"
      style={{
        backgroundImage: plainMode ? "none" : `url(${background})`,
        backgroundColor: plainMode ? "#ffffff" : "transparent",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Only show Navbar and Intro if not in plain mode */}
      {!plainMode && (
        <>
          {/* Navbar */}
          <div className="signin-navbar">
            <div className="signin-logo">
              <img src={logo} alt="Him Aarogya Logo" />
            </div>
          </div>

          {/* Introduction Section */}
          <div className="signin-content">
            <h3>WELCOME TO Him Aarogya</h3>
            <h1>
              Get care from the <br /> people who care.
            </h1>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
              fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <button className="signin-appointment-btn">
              Get an Appointment
            </button>
          </div>
        </>
      )}

      {/* Sign-In/Sign-Up Section */}
      <div id="signin-section" className="signin-section">
        <div className="outer-box">
          {!userRole && (
            <div className="inner">
              <div className="add-space">
                <h1>Welcome User! You are a?</h1>
                <button onClick={() => handleRoleSelection("doctor")}>
                  Doctor
                </button>
                <h3>OR</h3>
                <button onClick={() => handleRoleSelection("patient")}>
                  Patient
                </button>
                <h3>OR</h3>
                <button onClick={() => handleRoleSelection("admin")}>
                  Admin
                </button>
              </div>
            </div>
          )}

{userRole && (
  <div
    className={`${isRegistered ? "container" : "container active"} ${
      plainMode ? "centered-container" : ""
    }`}
    id="container"
  >

              {/* Sign Up */}
              <div className="sign-up">
                <form onSubmit={handleSignUp}>
                  <h1>Create Account</h1>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                  />
                  {userRole === "doctor" && (
                    <input
                      type="text"
                      name="licenseNumber"
                      placeholder="Medical License Number"
                      onChange={handleChange}
                      required
                    />
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                  {userRole === "patient" && (
                    <>
                      <input
                        type="text"
                        name="bloodGroup"
                        placeholder="Blood Group"
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        min="0"
                        onChange={handleChange}
                        required
                      />
                    </>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Sign Up</button>
                  {error && <p className="error">{error}</p>}
                </form>
              </div>

              {/* Sign In */}
              <div className="sign-in">
                <form onSubmit={handleSignIn}>
                  <h1>Sign In</h1>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <a href="#">Forgot password?</a>
                  <button type="submit">Sign In</button>
                  {error && <p className="error">{error}</p>}
                </form>
              </div>

              {/* Toggle Container */}
              <div className="toogle-container">
                <div className="toogle">
                  <div className="toogle-panel toogle-left">
                    <h1>Welcome {userRole}!</h1>
                    <p>If you already have an account</p>
                    <button onClick={() => setIsRegistered(true)}>
                      Sign In
                    </button>
                  </div>
                  <div className="toogle-panel toogle-right">
                    <h1>Hello, {userRole}!</h1>
                    <p>If you don't have an account</p>
                    <button onClick={() => setIsRegistered(false)}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
