import React, { useEffect, useState } from "react";
import "./CheckBalance.css";

const CheckBalance = () => {

  const [globalArray, setglobalArray] = useState([{}]);
  const [viewBalance, setviewBalance] = useState(false)
  const [balance, setbalance] = useState()
  useEffect(() => {
    fetch("http://localhost:5000/allusers")
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        resp.map((dataArray) => {
          setglobalArray((oldArray) => [...oldArray, dataArray]);
        });
      });
  }, []);

  const [username, setusername] = useState("");

  function submit(e) {
      e.preventDefault();
      globalArray.map((globalarray) => {
          console.log(globalarray)
          if(globalarray.name == username){
            setviewBalance(true)
            setbalance("Your current balance is " + globalarray.balance)
          }
      })
  }

  return (
    <div className="cb_wrap">
      <div className="enter">
        <label>Username :</label>
        <input
          onChange={(e) => {
            setusername(e.target.value);
          }}
          type="text"
        />
      </div>

      <button onClick={submit} className="btn btn-1">
        Check balance
      </button>
      {viewBalance && <div className="check_balance">
        <h4>
           {balance}
        </h4>
      </div>}
    </div>
  );
};

export default CheckBalance;
