import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')

    const handleLogin = () =>{

        axios.post('http://localhost:7777/login',{emailId : email ,
            password : password}).then((res) => {
            console.log(res.data)
        })

    }
  return (
    <div><fieldset className="fieldset bg-primary border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email ID</label>
  <input type="text" onChange={(event) => setEmail(event.target.value)} className="input" placeholder="Enter your Email ID" />

  <label className="label">Password</label>
  <input type="password"   onChange={(event) => setPassword(event.target.value)} className="input" placeholder="Password" />

 <button onClick={handleLogin} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Login</button>
</fieldset></div>
  )
}

export default Login