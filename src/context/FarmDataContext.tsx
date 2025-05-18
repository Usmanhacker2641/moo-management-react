
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Cow {
  id: string;
  name: string;
  breed: string;
  weight: number;
  tagNumber: string;
  dob: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  date: string;
}

export interface MilkRecord {
  id: string;
  amount: number;
  time: string;
  date: string;
  comments: string;
}

interface FarmDataContextType {
  cows: Cow[];
  expenses: Expense[];
  incomes: Income[];
  milkRecords: MilkRecord[];
  addCow: (cow: Omit<Cow, "id">) => void;
  updateCow: (id: string, cow: Partial<Cow>) => void;
  deleteCow: (id: string) => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addIncome: (income: Omit<Income, "id">) => void;
  updateIncome: (id: string, income: Partial<Income>) => void;
  deleteIncome: (id: string) => void;
  addMilkRecord: (record: Omit<MilkRecord, "id">) => void;
  updateMilkRecord: (id: string, record: Partial<MilkRecord>) => void;
  deleteMilkRecord: (id: string) => void;
}

const FarmDataContext = createContext<FarmDataContextType | undefined>(undefined);

export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error("useFarmData must be used within a FarmDataProvider");
  }
  return context;
};

interface FarmDataProviderProps {
  children: ReactNode;
}

export const FarmDataProvider = ({ children }: FarmDataProviderProps) => {
  // Initial sample data
  const [cows, setCows] = useState<Cow[]>([
    { id: "1", name: "Nyakairo", breed: "Ayrshire", weight: 358, tagNumber: "123v", dob: "2023-12-19" },
    { id: "2", name: "Nguno", breed: "Holstein Fresian", weight: 345, tagNumber: "zx444", dob: "2018-10-19" },
    { id: "3", name: "Reedi", breed: "Holstein Fresian", weight: 451, tagNumber: "00912", dob: "2020-05-10" },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "Feeds purchase", amount: 1250, date: "2023-12-18" },
    { id: "2", name: "Workers payment", amount: 1256, date: "2023-12-19" },
    { id: "3", name: "Disease treatment", amount: 1590, date: "2023-12-16" },
    { id: "4", name: "Equipment upgrade", amount: 1500, date: "2023-12-15" },
  ]);

  const [incomes, setIncomes] = useState<Income[]>([
    { id: "1", source: "Cow sale", amount: 1580, date: "2023-12-19" },
    { id: "2", source: "Milk sale", amount: 2200, date: "2023-12-18" },
    { id: "3", source: "Fodder sale", amount: 1005, date: "2023-12-17" },
    { id: "4", source: "Cow sale", amount: 1500, date: "2023-12-15" },
  ]);

  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([
    { id: "1", amount: 12, time: "night", date: "2023-12-19", comments: "Fair" },
    { id: "2", amount: 18, time: "evening", date: "2023-12-19", comments: "Good" },
    { id: "3", amount: 14, time: "mid-morning", date: "2023-12-19", comments: "Fair" },
    { id: "4", amount: 21, time: "morning", date: "2023-12-19", comments: "Good" },
  ]);

  const addCow = (cow: Omit<Cow, "id">) => {
    const newCow = { ...cow, id: Date.now().toString() };
    setCows([...cows, newCow]);
  };

  const updateCow = (id: string, updatedData: Partial<Cow>) => {
    setCows(cows.map(cow => cow.id === id ? { ...cow, ...updatedData } : cow));
  };

  const deleteCow = (id: string) => {
    setCows(cows.filter(cow => cow.id !== id));
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, updatedData: Partial<Expense>) => {
    setExpenses(expenses.map(expense => expense.id === id ? { ...expense, ...updatedData } : expense));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const addIncome = (income: Omit<Income, "id">) => {
    const newIncome = { ...income, id: Date.now().toString() };
    setIncomes([...incomes, newIncome]);
  };

  const updateIncome = (id: string, updatedData: Partial<Income>) => {
    setIncomes(incomes.map(income => income.id === id ? { ...income, ...updatedData } : income));
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  const addMilkRecord = (record: Omit<MilkRecord, "id">) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setMilkRecords([...milkRecords, newRecord]);
  };

  const updateMilkRecord = (id: string, updatedData: Partial<MilkRecord>) => {
    setMilkRecords(milkRecords.map(record => record.id === id ? { ...record, ...updatedData } : record));
  };

  const deleteMilkRecord = (id: string) => {
    setMilkRecords(milkRecords.filter(record => record.id !== id));
  };

  const value = {
    cows,
    expenses,
    incomes,
    milkRecords,
    addCow,
    updateCow,
    deleteCow,
    addExpense,
    updateExpense,
    deleteExpense,
    addIncome,
    updateIncome,
    deleteIncome,
    addMilkRecord,
    updateMilkRecord,
    deleteMilkRecord,
  };

  return <FarmDataContext.Provider value={value}>{children}</FarmDataContext.Provider>;
};
