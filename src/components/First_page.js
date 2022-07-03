
import { useState } from 'react'
import{useHistory} from 'react-router-dom'
import { Form } from "react-bootstrap";
import * as React from 'react';
import './First_page.css'
import Kle from './Kle.jpeg'


export default function Login(){

    const [name , setName]=useState([])
    const [pass, setPass] = useState([])
    const history = useHistory()

    const checkuser = () =>{
        if (name === "college" && pass === "college")
        {
            history.push("/form")
            alert("Login successfull")
        } 

        else if(name==='company' && pass==='company')
                {
                    history.push('/verify')
                }
        else {alert("invalid username or password")}
    }

    return(
        <>


       <div className='bg'>
           <div className="box">
           <div className="user">
                    
                    <div className="text">
                    <input type="text"  class="shadow-lg p-3 mb-5 bg-body rounded" name="name" placeholder="USERNAME" id="name" autoComplete='off' value={name}
                    onChange={(e) => setName(e.target.value)}  className="input1"/> </div>
                </div>

                <div className="pass">
                    <div className="ptext">
                    <input type="password" name="password" placeholder="PASSWORD" id="password" autoComplete='off' value={pass}
                    onChange={(e) => setPass(e.target.value)}  className="input1"/>
                    </div>
                   
                </div>

            </div>

            <div className="btn2">
            <button type="button" class="btn btn-primary btn-lg" onClick={checkuser}>Login</button>
            {/* <button  type="button" class="btn btn-success"  </button> */}



           </div>
                   
                </div>

          
         
        </>
    )


}




// import{useHistory} from 'react-router-dom'
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import './First_page.css'

// const Login = () => {
//     const [name , setName]=useState([])
//     const [pass, setPass] = useState([])

//     const history = useHistory()

//     const submitForm = (e) => {
//         e.preventDefault();
        

       
   
//             if (name === "s" && pass === "s")
//                     {
//                         history.push("/form")
//                     } 
            
//                     else if(name==='kk' && pass==='ka')
//                             {
//                                 history.push('/verify')
//                             }
//                     else {alert("invalid")}
                   
//         }
       
//     }
//     return (
//         <div className="background">
//             <h1>PLEASE  FILL  THE  FEEDBACK   FORM </h1>
//             <form>
//                 <div>
//                     <div className="user">
//                         <div className="username">
//                             <label htmlFor="username">Username  </label><br />
//                         </div>
//                         <div className="text">
//                         <input type="text" value={name} placeholder="username"  onChange={(e)=>setName(e.target.value)} /><br/>
//                         </div>
//                     </div>
//                     <div className="pass">
//                         <div className="password">
//                         <label htmlFor="password">Password</label><br/>
//                         </div>
//                         <div className="ptext">
//                         <input type="password" name="password" placeholder="password" id="password" autoComplete='off' value={pass}
//                         onChange={(e) => setPass(e.target.value)}  className="input1"/>
//                         </div>
                       
//                     </div>

//                 </div>
  
//                 <div className="btn2">
//                 <button  type="button" class="btn btn-success"  onClick={submitForm}>Login</button>
  

//                 </div>
//                         </form>

//         </div>

//     )

// export default Login;