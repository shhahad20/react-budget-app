import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import TargetForm from "./components/TargetForm";
import TransferForm from "./components/TransferForm";
import Home from "./components/Home";
import { UserContext } from "../UseContext";
import "./App.css";
import Nav from "./components/Nav";

export default function App() {
  const [targetSaving, setTargetSaving] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [transferAmount, setTransferAmount] = useState<number | string>("");
  const [currentSavings, setCurrentSaving] = useState<number | string>("");
  // const [newPercentage, setNewPercentage] = useState(0);

  return (
    <UserContext.Provider value={{ totalIncome, setTotalIncome }}>
      <BrowserRouter>
        <div id="forms-container">
          <Nav />
          <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/income" element={<IncomeForm totalIncome={totalIncome} setTotalIncome={setTotalIncome}/>} />
            <Route path="/expenses" element={<ExpenseForm totalExpenses={totalExpenses} setTotalExpenses={setTotalExpenses} />} />
            <Route path="/target" element={<TargetForm targetSaving={targetSaving} setTargetSaving={setTargetSaving} currentSavings={currentSavings} setCurrentSaving={setCurrentSaving} transferAmount={transferAmount} setTransferAmount={setTransferAmount} />} />
            <Route path="/transfer" element={<TransferForm targetSaving={targetSaving} totalIncome={totalIncome} totalExpenses={totalExpenses} transferAmount={transferAmount} setTransferAmount={setTransferAmount} currentSavings={currentSavings} setCurrentSaving={setCurrentSaving} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
