import React,{useState,useEffect } from 'react'
import  "./PageNotFound.css";
import {firebase} from '../../Firebase/Firebase'
import { useHistory } from "react-router-dom";



const PageNotFound = () => {

  

  let history = useHistory(); 
  const SignInWithFirebase = () => {
    var google_provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(google_provider)
      .then((res) => {
        console.log(res);
        let path = `/admin`; 
    history.push(path);
    window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function checkBalance() {
    history.push(`/checkbalance`)
    window.location.reload(false);
  }

  return (
    <div className="pnf_wrap">
    <h1>Welcome to E-card </h1>
        <button className="btn btn-sep btn-1 icon-info" onClick={SignInWithFirebase}>
          I am an Admin
        </button>
        <button className="btn btn-sep btn-2 icon-cart" onClick={checkBalance}>
          I am a Student
        </button>
        <button className="btn btn-sep btn-3 icon-send" onClick={SignInWithFirebase}>
          I am a User
        </button>
      
    </div>
  )
}

export default PageNotFound