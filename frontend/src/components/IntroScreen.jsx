import React, { useEffect } from 'react'
import disport from '../assets/Disport.png';

const IntroScreen = () => {
  function authenticate(){
    //window.open("")
    window.open("http://127.0.0.1:8000/strava/auth/","_self");
  }
  return (
 
      <div className="App">
      
      
      <div className='h-full'>
          <h1 className='text-5xl mt-32'>Get back on Track, Chase your Ideal Self!</h1>
          <button onClick={()=> authenticate()} className='text-3xl bg-yellow-400 border border-black rounded-full py-2 px-5 mt-10 inline-block'>Login</button>
      </div>
    </div>
   
  )
}

export default IntroScreen
