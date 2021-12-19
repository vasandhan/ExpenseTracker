// This is a basic page of expense tracker
// used hooks concept to build
// datas are stored and retrieved from localstorage
// used moment to show date as in given format
// implemented material-ui for UI design

import React, { useState } from "react";
import moment from "moment";
import "./styles.css";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody
} from "@material-ui/core";

const App = () => {
  // initial state defines here
  const [values, setValues] = useState({
    balance: localStorage.getItem("balance") || 0,
    amount: 0,
    error: false
  });

  // used to get transaction data from localstorage to render transaction list
  const TArray = localStorage.getItem("transaction");
  const TArrayParsed = TArray ? JSON.parse(TArray) : [];
  const [transaction, setTransaction] = useState(TArrayParsed);

  // this function triggers when add button is clicked
  const AddRecord = () => {
    if (values.amount === 0 || values.amount === "") {
      setValues((values) => ({
        ...values,
        error: true
      }));
      document.getElementById("amount").focus();
      return false;
    } else {
      let frame = {
        date: new Date(),
        amount: values.amount,
        case: "Add"
      };
      setValues((values) => ({
        ...values,
        amount: 0,
        error: false
      }));
      setTransaction([...transaction, frame]);
      updateLocalStorage("add", frame);
    }
  };

  // this function triggers when remove button is clicked
  const RemoveRecord = () => {
    if (values.amount === 0 || values.amount === "") {
      setValues((values) => ({
        ...values,
        error: true
      }));
      document.getElementById("amount").focus();
      return false;
    } else {
      let frame = {
        date: new Date(),
        amount: values.amount,
        case: "Remove"
      };
      setValues((values) => ({
        ...values,
        amount: 0,
        error: false
      }));
      setTransaction([...transaction, frame]);
      updateLocalStorage("remove", frame);
    }
  };

  // This function updates the datas to the local storage
  const updateLocalStorage = (key, value) => {
    let calc = 0;
    if (key === "add") {
      calc = Number(values.balance) + Number(values.amount);
    } else if (key === "remove") {
      calc = Number(values.balance) - Number(values.amount);
    }
    const array = localStorage.getItem("transaction");
    const parsedArray = array ? JSON.parse(array) : [];
    const newArray = [...parsedArray, value];
    setValues((values) => ({
      ...values,
      balance: calc
    }));
    localStorage.setItem("balance", calc);
    localStorage.setItem("transaction", JSON.stringify(newArray));
  };

  // This function is onchange of amount field
  const amountChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      amount: event.target.value
    }));
  };

  // here the UI gets rendered
  return (
    <div className="App ">
      <div
        className="text-center"
        style={{ border: "1px solid black", backgroundColor: "#B2D7DA" }}
      >
        <h1>Expense Tracker - Basic</h1>
        <Typography variant="h5">Balance : {values.balance}</Typography>
        <TextField
          variant="outlined"
          type="number"
          id={"amount"}
          value={values.amount}
          onChange={amountChanges}
        />
        {values.error && (
          <p style={{ color: "red" }}>Please enter a valid amount</p>
        )}
        <div
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className="m-2"
        >
          <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: "5px" }}
            onClick={AddRecord}
          >
            Add
          </Button>
          <Button color="primary" variant="outlined" onClick={RemoveRecord}>
            Remove
          </Button>
        </div>
      </div>
      <div
        className="text-left"
        style={{
          marginTop: "10px",
          border: "1px solid black",
          backgroundColor: "#85D2D0"
        }}
      >
        <h3>Transaction :</h3>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bolder" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Amount</TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.map((item, i) => {
                return (
                  <TableRow>
                    <TableCell>{moment(item.date).format()}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.case}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default App;
