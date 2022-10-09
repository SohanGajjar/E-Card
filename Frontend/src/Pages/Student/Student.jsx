import React, { useState,useEffect, useRef } from "react";
import "./Student.css";
import Select from "react-select";

const Student = ({ globalarray }) => {
  const [currentBalance, setcurrentBalance] = useState(0);
  const [transaction, settransaction] = useState(0);
  const [addvalue, setaddvalue] = useState(0);
  const methodInputRef = useRef();
  const [methodInput, setMethodInput] = useState(null);

  const [globalArray, setglobalArray] = useState([{}]);
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

  // body: JSON.stringify({ name : globalarray.name, balance : currentBalance-transaction}),
  const options = [
    { value: "canteen", label: "Canteen" },
    { value: "studentstore", label: "Student_store" },
    { value: "xeroxcenter", label: "Xerox_center" },
  ];
  async function submit(e) {
    globalArray.map((data) => {
      if(data.name === methodInputRef.current.getValue()[0].value)
      {
        setaddvalue(data.balance)
      }
    })
    // console.log(methodInputRef.current.getValue()[0].value);
    let result = await fetch("http://localhost:5000/transaction", {
      method: "post",
      body: JSON.stringify({
        name: globalarray.name,
        balance: parseInt(globalarray.balance) - parseInt(transaction),
        addto : methodInputRef.current.getValue()[0].value,
        newBalance : parseInt(addvalue) + parseInt(transaction)
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      alert("Transaction succesfull");
      setcurrentBalance("");
    } else {
      alert("error");
    }
    // window.location.reload();
  }

  return (
    <div className="student_wrap">
      <div className="circle">{globalarray.name[0]}</div>
      <h3>Paying from {globalarray.name}</h3>
      <div className="dropdown">
        <h4>Select the Place :</h4>
        <div>
          <Select
            ref={methodInputRef}
            onChange={(e) => {
              setMethodInput(e.value);
            }}
            options={options}
          />
        </div>
      </div>
      <div className="transaction">
        <span>₹</span>
        <input
          onChange={(e) => settransaction(e.target.value)}
          placeholder="0"
          dir="auto"
          className="Box1"
          type="number"
        />
      </div>
      <div onClick={submit} class="btn btn-3 btn_pay">
        Make Transaction
      </div>
    </div>
  );
};

export default Student;
