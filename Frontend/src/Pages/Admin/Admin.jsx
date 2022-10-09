import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = ({ isAdmin }) => {
  const [active_button, setactive_button] = useState(1);
  const [currentStudent, setcurrentStudent] = useState("");
  const [currentBalance, setcurrentBalance] = useState(0);
  const [updatedBalance, setupdatedBalance] = useState(0);
  const [globalArray, setglobalArray] = useState([{}]);

  

  useEffect(() => {
    fetch("http://localhost:5000/allusers")
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        resp.map((dataArray) => {
          setglobalArray((oldArray) => [...oldArray, dataArray])
        });
      });
  }, []);

  let flag = 0;
  async function submit(e) {
    e.preventDefault();
    for (let globalarray of globalArray) {
      if (globalarray.name == currentStudent) {
        console.log(globalarray.name);
        alert("User already exist !");
        flag = 1;
        break;
      }
    }
    // globalArray.forEach((globalarray) => {
    //   if(globalarray.name === currentStudent)
    //   {
    //     console.log(globalarray.name)
    //     console.log("User already exist !");
    //     cnt++;
    //     flag = 1;
    //     return;
    //   }
    // })

    if (!flag) {
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name: currentStudent, balance: currentBalance }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        alert("Data saved succesfully");
        window.location.reload(false);
      } else {
        alert("User alread exist");
      }
    }
  }
  async function update(e) {
    e.preventDefault();
    let oldBalance = 0;
    globalArray.map((globalarray) => {
      if(globalarray.name == currentStudent)
      {
        oldBalance = globalarray.balance;
        console.log(oldBalance)
      }
    })
      let result = await fetch("http://localhost:5000/update", {
        method: "post",
        body: JSON.stringify({ name: currentStudent, balance: parseInt(oldBalance) + parseInt(updatedBalance) }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        alert("Balance added succesfully");
        window.location.reload(false);
      } else {
        alert("Something went wrong");
      }
  }
  return (
    <>
      {isAdmin && (
        <div className="admin_wrap">
          <h1>Admin</h1>
          <div className="option">
            <button
              className="btn_add btn-1"
              onClick={() => setactive_button(1)}
            >
              Add user
            </button>
            <button
              className="btn_add btn-2"
              onClick={() => setactive_button(2)}
            >
              update user
            </button>
          </div>
          {active_button === 1 && (
            <div className="add_user_wrap">
              <div className="username">
                <label>Username :</label>
                <input onChange={(e) => {setcurrentStudent(e.target.value)}}  type="text" />
              </div>

              <div className="balance">
                <label>Balance :</label>
                <input onChange={(e) => {setcurrentBalance(e.target.value)}} type="number" />
              </div>

              <button onClick={submit} className="btn_add_new">Add New User</button>
            </div>

            
          )}
          {active_button === 2 && (
            <div className="add_user_wrap2">
            <div className="username">
                <label>Username :</label>
                <input onChange={(e) => {setcurrentStudent(e.target.value)}}  type="text" />
              </div>

              <div className="balance">
                <label>Add Balance :</label>
                <input onChange={(e) => {setupdatedBalance(e.target.value)}} type="number" />
              </div>

              <button onClick={update} className="btn_add_new">Update User</button>
            </div>
          )}
        </div>
      )}
      {!isAdmin && "you are not an admin"}
    </>
  );
};

export default Admin;
