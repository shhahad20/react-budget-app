import { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./ValidationSchema";
import { IncomeItem, AmountData, IncomeFormProps } from "./Types";


const IncomeForm: React.FC<IncomeFormProps> = ({
  totalIncome,
  setTotalIncome,
}) => {
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AmountData>({ resolver: zodResolver(validationSchema) });

  const submitData = (data: AmountData) => {
    const newIncomeItem = {
      source: source,
      amount: data.amountData,
      date: date,
    };
    setIncomeItems([...incomeItems, newIncomeItem]);
    setDate("");
    setSource("");
    setAmount("");
    setTotalIncome(totalIncome + data.amountData);
  };
  // -------- DELETE FUNCTION ----------
  const handleDeleteIncome = (index: number) => {
    const updatedIncomeItems = [...incomeItems];
    updatedIncomeItems.splice(index, 1);
    setIncomeItems(updatedIncomeItems);
  };

  return (
    <div  className="income-form">
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <label htmlFor="income">Income source:</label>
          <input
            type="text"
            id="income-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of Income:</label>
          <input
            type="number"
            id="income-amount"
            {...register("amountData", { valueAsNumber: true })}
            value={amount === "" ? "" : amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
          {errors.amountData && <span>{errors.amountData.message}</span>}
        </div>
        <div>
          <label htmlFor="income-date">Date of Income:</label>
          <input
            type="date"
            id="income-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Income</button>
      </form>
      <div>
        <ul>
          {incomeItems.map((item, index) => (
            <li key={index}>
              <p>
                {item.source}:    {item.amount}   EUR on    {item.date}.
                <button id="delete-btn" onClick={() => handleDeleteIncome(index)}>
                  Delete
                </button>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeForm;
