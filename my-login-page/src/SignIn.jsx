import React,{useState} from 'react'
import { use } from 'react';

function SignIn(){
    const[isRegistered,setIsRegistered]=useState(true);
    const [isDoctor ,setIsDoctor]=useState(false);
    const [isClicked ,setIsClicked]=useState(false);
    const nam="container";
    const nam2 ='inner';
    const [userName,setUserName]=useState("USER");
    const[isAdmin,setIsAdmin]=useState(false);
    

    return(<>
    

 <div className="outer-box">

 <div className={isClicked?nam2+' hideIt':nam2}>
        <div>
           <h1>Welcome User! You are a?</h1> 
           <div className='add-space'>
            <button onClick={()=>{
                                setIsClicked(true)
                                setUserName('Doctor')}}>Doctor</button><p></p>
           
           <h3>OR</h3>                       
            <button onClick={()=>{
                setIsClicked(true)
                setUserName("User")}}>Patient</button>
                <h3>OR <br></br></h3>
            <button onClick={()=>{
                setIsAdmin(true)
                setIsClicked(true)
            } }>
                Admin 
            </button>
            </div>
            </div>
    </div>
    <div className={isAdmin?nam:"hideIt"} id='admin'>

        <form >           
           <h1>  Admin <br /></h1>
           <input type="text" placeholder='username' />
           <input type="password" placeholder='password' />
           <button>Sign In</button>           
        </form>

        

    </div>
            <div className={(isAdmin==true)||(isAdmin==false&&isClicked==false)?' hideIt':""}>
            <div className={!isRegistered ? nam+' active': nam } id="container"  >
      <div className="sign-up">
        <form>
          <h1>Create Account</h1>

          <input type="text" placeholder="Name" />
          <input className={userName =='Doctor'? "":"hideIt"} type="text" placeholder='Medical License Number' />
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
          <button>Sign In</button>
        </form>
      </div>
      <div className="toogle-container">
        <div className="toogle">
          <div className="toogle-panel toogle-left">
            <h1>Welcome {userName}!</h1>
            <p>If you already have an account</p>
            <button className="hidden" id="login" onClick={()=>setIsRegistered(true)}>Sign In</button>
          </div>
          <div className="toogle-panel toogle-right">
            <h1>Hello, {userName}</h1>
            <p>If you don't have an account</p>
            <button className="hidden" id="register" onClick={()=>setIsRegistered(false)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>

 </div>
 </div>

 </>

    );

}

export default SignIn