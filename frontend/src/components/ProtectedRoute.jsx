import React,{useState, useEffect} from 'react';
import api from '../api';
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants.js";


const ProtectedRoute = ({children}) => {
    const [isAuthorized,setIsAuthorized] = useState(null);
    useEffect(()=>{
        auth().catch(() => setIsAuthorized(false));
    },[])
    const refreshToken = async() => {
        try {
            const response = await api.get("strava/refresh_token/");
            const refreshToken = response.data["refresh_token"];
            
            console.log("Fetched Refresh Token:", refreshToken);
    
            
            if (refreshToken) {
                const refreshResponse = await api.post("strava/refresh/", {
                    "refresh_token": refreshToken
                });
    
                
                localStorage.setItem(ACCESS_TOKEN, refreshResponse.data["access_token"]);
    
                setIsAuthorized(true);
    
                // console.log("Access Token Refreshed:", refreshResponse.data["access_token"]);
            } else {
                console.error("No refresh token found.");
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Error during token refresh:", error);
            setIsAuthorized(false);
        }
    } 
    
    const auth = async() => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        let tokenExpiration = localStorage.getItem("expires_in");
    if (!token || !tokenExpiration || tokenExpiration === null) {
        try {
            const res = await api.get("strava/access_token/");
            token = res.data["access_token"];
            tokenExpiration = res.data["expires_in"];
            
            localStorage.setItem(ACCESS_TOKEN, token);
            localStorage.setItem("expires_in", tokenExpiration);

            // console.log("New Token Retrieved:", token);
            // console.log("Expires In:", tokenExpiration);
        } catch (error) {
            console.error("Error fetching access token:", error);
            return;
        }
    }

   
        // console.log("Current Token Expiration:", tokenExpiration);
        // console.log(token);     
        if(!token || token=="null"){
            setIsAuthorized(false);
            return;
        }
        
        console.log(tokenExpiration);
        const now = Date.now()/1000;
        if(tokenExpiration<now){
            await refreshToken();
        }
        else{
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null){
        return <div>Loading...</div>
    }
  return (
    isAuthorized ? children : "hello"
    // children
  )
}

export default ProtectedRoute
