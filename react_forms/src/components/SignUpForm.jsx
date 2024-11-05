import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import './SignUpForm.css'



export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const[error, setError] = useState(null)
    const [validationError, setValidationError] = useState("")

    const validateForm = () => {
        if (username.length < 5 ) {
            setValidationError("Username should be at least 5 characters :)")
            return false
        }
        setValidationError("")
        return true
    }


    const getApi = async () => {
        try{
        const { data } = await axios.post("https://fsa-jwt-practice.herokuapp.com/signup",{ username, password })
        console.log(data)
        setToken(data.token);

    } catch (error) {
        console.error("nah, what the flip...", (error))
        setError("girlie, theres an error...")
    }
}
async function handleSubmit(event) {
    
    event.preventDefault();
    console.log("Hello")
    if (!validateForm()) {
        return;
    }
await getApi()
}

   return (
    <div className="big-form">
    <h2>Sign Up!</h2>
    {error && <p>{error}</p>}
    {validationError && <p>{validationError}</p>}
    <form onSubmit ={handleSubmit}>
    
  <div className="form-group">
    <label htmlFor="formGroupExampleInput">Username</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username"
     value = {username} 
     onChange={(e) => setUsername(e.target.value)}/>
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
    value = {password} 
    onChange={(e) => setPassword(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  
</form>
</div>
)
    }