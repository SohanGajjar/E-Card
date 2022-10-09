import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import User from "./Pages/User/User";
import Student from "./Pages/Student/Student";
import PageNotFound from "./Pages/PNF/PageNotFound";
import firebase from "firebase";
import CheckBalance from "./Pages/CB/CheckBalance";

function App() {
  const [globalArray, setglobalArray] = useState([{}]);
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/allusers").then(data => {
      return data.json();
      })
      .then(resp => {
        resp.map((dataArray) =>{
          setglobalArray(oldArray => [...oldArray, dataArray]);
        })
      });
  }, [])

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      return setisAdmin(true);
    } else {
      return setisAdmin(false);
    }
  });
  

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/admin">
            <Admin
              globalArray={globalArray}
              setglobalArray={setglobalArray}
              isAdmin={isAdmin}
            />

          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/checkbalance">
            <CheckBalance/>
          </Route>
          {globalArray.map((globalarray, i) => (
            <Route key={i} path={"/" + globalarray.name}>
              <Student globalarray={globalarray} />
            </Route>
          ))}
          <Route path="/">
          <PageNotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
