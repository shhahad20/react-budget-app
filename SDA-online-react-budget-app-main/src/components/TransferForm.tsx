import { useState, FormEvent } from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferValidationSchema } from "./ValidationSchema";
import {TransferData, TransferFormProps} from "./Types";


const TransferForm: React.FC<TransferFormProps> = ({ targetSaving, totalIncome, totalExpenses, transferAmount,setTransferAmount }) => {
  const [currentBalance, setCurrentBalance] = useState(0);
  // const [transferAmount, setTransferAmount] = useState<number | "">("");

  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferData>({ resolver: zodResolver(transferValidationSchema) });

 const submitData = (data: TransferData) => {
    const transferValue = data.transferData;
    
    // Update currentBalance using the passed props
    setCurrentBalance(totalIncome - totalExpenses - transferValue);

    // Clear the input after the transfer
    setTransferAmount('');
  };


  

  return (
    <div className="transfer-form">
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <p>Current balance: {currentBalance}</p>
        </div>
        <div>
          <label htmlFor="transfer">Transfer to saving account:</label>
          <input
            type="number"
            id="transfer-input"
            {...register("transferData", { valueAsNumber: true })}
            value={transferAmount === "" ? "" : transferAmount}
            onChange={(e) =>
              setTransferAmount(e.target.value === "" ? "" : Number(e.target.value)|| "")
            }
          />
          {errors.transferData && <span>{errors.transferData.message}</span>}
        </div>
        <button type="submit" >Transfer</button>
      </form>
    </div>
  );
};

export default TransferForm;
