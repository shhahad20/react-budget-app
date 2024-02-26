import { useState, FormEvent, useEffect } from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tragetValidationSchema } from "./ValidationSchema";
import {TargetData, TargetFormProps} from "./Types";


const TargetForm: React.FC<TargetFormProps> = ({
  targetSaving,
  setTargetSaving,
  transferAmount,
  setTransferAmount,
  currentSavings, 
  setCurrentSaving,
}) => {
  // const [currentSaving, setCurrentSaving] = useState(0);
  const [targetInputValue, setTargetInputValue] = useState<number | "">("");
  const [transferValue, setTransferValue] = useState(transferAmount);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TargetData>({ resolver: zodResolver(tragetValidationSchema) });

  const calculatePercentage = () => {
    if (targetSaving > 0) {
      return (Number(currentSavings) / targetSaving) * 100;
    }
    return 0;
  };

  // useEffect(() => {
  //   setCurrentSaving(currentSavings + Number(transferAmount));
  //   setCurrentPercentage(calculatePercentage());
  // }, [currentSavings, transferAmount]);

  const submitData = (data: TargetData) => {
    const targetValue = data.targetData;
    setTargetSaving(targetValue);
    setTargetInputValue('');
  
  };
const handelPercentageSaving = () =>{
  setCurrentSaving(Number(currentSavings) + Number(transferAmount));
  setCurrentPercentage(calculatePercentage());
}
  // useEffect(() => {
  //   setCurrentPercentage(calculatePercentage());
  // }, [targetSaving, Number(currentSavings), transferAmount]);

  return (
    <div className="target-form">
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <label htmlFor="target">Set Target:</label>
          <input
            type="number"
            id="target-input"
            {...register("targetData", { valueAsNumber: true })}
            value={targetInputValue === "" ? "" : targetInputValue}
            onChange={(e) =>
              setTargetInputValue(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          />
          {errors.targetData && <span>{errors.targetData.message}</span>}
        </div>
        <button type="submit">
          Set Target
        </button>

        <div>
          <p>Current saving: {Number(currentSavings) + Number(transferValue)}</p>
          <p>Target: {targetSaving ? targetSaving : "0"}</p>
          <progress max={targetSaving} value={Number(currentSavings) + Number(transferValue)} />
          <p>Percentage: {currentPercentage}%</p>
          <button onClick={handelPercentageSaving}>Caluclate</button>
        </div>
      </form>
    </div>
  );
};

export default TargetForm;
