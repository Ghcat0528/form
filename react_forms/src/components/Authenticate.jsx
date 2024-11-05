import axios from "axios"
import React, { useState } from "react"
import './Authenticate.css'

export default function Authenticate({ token }) {
   
    const[successMessage, setSuccessMessage] = useState(null)
    const[error, setError] = useState(null)
    const[username, setUsername] = useState(null)
   
   
 
    const handleClick = async () => {
    console.log("You clicked the button! Lets authenticate?")

    try{
        const getApi = await axios.get("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }})
       
        setSuccessMessage(getApi.data.message)
        const username = getApi.data?.data?.username
        if (username) {
            setUsername(username)
        } else {
            console.warn("Username not found blud"); 
        }
    } catch (error) {
        setError(error.message)
    }
}

    return(
    <div className="divvy">
    <h2>Authenticate!</h2>
        {successMessage && <p>{successMessage}</p>}
        {username && <p>Hey {username}!</p>} {/*Display the username*/}
         {error && <p>{error}</p>}

        

    <button type="button" className="btn btn-info" onClick={handleClick} >Authenticate Token</button>

</div>
    )};