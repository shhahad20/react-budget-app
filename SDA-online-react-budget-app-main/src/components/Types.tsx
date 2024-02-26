// -------- TYPES AREA ----------
export type TargetData = {
  targetData: number;
};
export interface TargetFormProps {
  targetSaving: number;
  setTargetSaving: (value: number) => void;
  currentSavings:number | string;
  setCurrentSaving: (value: number | string) => void;
  transferAmount: number | string; 
  setTransferAmount:(value: number | string) => void;
}

export type Expense = {
  source: string;
  amount: number;
  date: string;
};
export type AmountData = {
  amountData: number;
};
export interface ExpenseFormProps {
  totalExpenses: number;
  setTotalExpenses: (value: number) => void;
}
export type IncomeItem = {
  source: string;
  amount: number;
  date: string;
};

export interface IncomeFormProps {
  totalIncome: number;
  setTotalIncome: (value: number) => void;
}

export type TransferData = {
  transferData: number;
};
export interface TransferFormProps {
  targetSaving: number;
  totalIncome: number;
  totalExpenses: number;
  currentSavings: number | string;
  setCurrentSaving: (value: number | string) => void;
  transferAmount: number | string; 
  setTransferAmount:(value: number | string) => void;
}

// -------- TYPES AREA ----------
