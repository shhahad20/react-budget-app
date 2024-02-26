import { useState, FormEvent } from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./ValidationSchema";
import {Expense, AmountData, ExpenseFormProps} from "./Types";

interface ExpenseData {
  source: string;
  amount: number | "";
  date: string;
}


const ExpenseForm: React.FC<ExpenseFormProps> = ({ totalExpenses, setTotalExpenses })=> {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // const [expenseSource, setExpenseSource] = useState("");
  // const [expenseAmount, setExpenseAmount] = useState<number | "">("");
  // const [expenseDate, setExpenseDate] = useState("");
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    source: "",
    amount: "",
    date: "",
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AmountData>({ resolver: zodResolver(validationSchema) });

  const submitData = (data: AmountData) => {
    const { source, amount, date } = expenseData;


    const newExpense = {
      source ,
      amount: data.amountData,
      date ,
    };
    setExpenses([...expenses, newExpense]);
    setExpenseData({ source: "", amount: "", date: "" });
    setTotalExpenses(totalExpenses + Number(amount));
  };

  // const deleteExpense = (index: number) => {
  //   const updatedExpenses = [...expenses];
  //   updatedExpenses.splice(index, 1);
  //   setExpenses(updatedExpenses);
  // };
  const deleteExpense = (index: number) => {
    const updatedExpenses = [...expenses];
    const deletedExpense = updatedExpenses.splice(index, 1)[0];
    setExpenses(updatedExpenses);
    setTotalExpenses(totalExpenses - deletedExpense.amount);
  };

  return (
    <div className="income-form">
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <label htmlFor="income">Expense source:</label>
          <input
            type="text"
            id="Expense-input"
            name="source"
            value={expenseData.source}
            onChange={(e) => setExpenseData({ ...expenseData, source: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of Expense:</label>
          <input
            type="number"
            id="income-amount"
            {...register("amountData", { valueAsNumber: true })}
            value={expenseData.amount === "" ? "" : expenseData.amount}
            // onChange={(e) =>
            //   setExpenseAmount(e.target.value === "" ? "" : Number(e.target.value))
            // }          
            
            onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value=== "" ? "" : Number(e.target.value) })}
            />
            {errors.amountData && <span>{errors.amountData.message}</span>}

        </div>
        <div>
          <label htmlFor="expense-date">Date of Expense:</label>
          <input
            type="date"
            id="expense-date"
            value={expenseData.date}
            onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <div>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} >
              <p>
                {expenseData.source}:    {expense.amount}   EUR on   {expense.date}.   
                <button id="delete-btn" onClick={() => deleteExpense(index)}>Delete</button>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseForm;
