
import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { useFarmData } from "@/context/FarmDataContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const ReportsPage = () => {
  const { incomes, expenses, milkRecords } = useFarmData();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Format month display
  const formattedMonth = format(currentMonth, "MMMM yyyy");
  
  // Get income data for the chart
  const incomeData = incomes.reduce((acc, income) => {
    const existingSource = acc.find(item => item.name === income.source);
    
    if (existingSource) {
      existingSource.value += income.amount;
    } else {
      acc.push({ name: income.source, value: income.amount });
    }
    
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  // Calculate totals
  const totalRevenue = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenditure = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netRevenue = totalRevenue - totalExpenditure;
  
  // Calculate milk production totals
  const totalMilk = milkRecords.reduce((sum, record) => sum + record.amount, 0);
  
  const previousMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };
  
  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    
    // Don't allow selecting future months
    if (next <= new Date()) {
      setCurrentMonth(next);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Farm reports" />
      
      <div className="container p-4 flex-1">
        {/* Month selector */}
        <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg mb-4">
          <Button 
            variant="outline"
            size="sm"
            className="bg-gray-200 border-0 hover:bg-gray-300"
            onClick={previousMonth}
          >
            <ChevronLeft size={20} />
          </Button>
          <span className="font-semibold">{formattedMonth}</span>
          <Button 
            variant="outline"
            size="sm"
            className="bg-gray-200 border-0 hover:bg-gray-300"
            onClick={nextMonth}
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Calendar view (simplified) */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            <div className="text-gray-500">SUN</div>
            <div className="text-gray-500">MON</div>
            <div className="text-gray-500">TUE</div>
            <div className="text-gray-500">WED</div>
            <div className="text-gray-500">THUR</div>
            <div className="text-gray-500">FRI</div>
            <div className="text-gray-500">SAT</div>
          </div>
          
          {/* This is a placeholder for a full calendar implementation */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square flex items-center justify-center text-sm ${
                  i === 18 ? "bg-gray-200 rounded" : ""
                }`}
              >
                {i >= 3 && i < 34 ? i - 2 : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Financial reports */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-600">📅</span>
              <p className="text-sm text-gray-500">Total revenue for today: {totalRevenue}</p>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500">📅</span>
              <p className="text-sm text-gray-500">Total expenditure for today: {totalExpenditure}</p>
            </div>
            <div className="font-semibold">
              Net revenue for today: {netRevenue}
            </div>
          </div>
          
          <div className="border-t pt-2 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-600">📅</span>
              <p className="text-sm text-gray-500">Total revenue for {formattedMonth}: {totalRevenue}</p>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500">📅</span>
              <p className="text-sm text-gray-500">Total expenditure for {formattedMonth}: {totalExpenditure}</p>
            </div>
            <div className="font-semibold">
              Net revenue for {formattedMonth}: {netRevenue}
            </div>
          </div>
          
          <div className="border-t pt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-500">💧</span>
              <p className="text-sm text-gray-500">Total milk for today: {totalMilk} lts</p>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-500">💧</span>
              <p className="text-sm text-gray-500">Total milk for {formattedMonth}: {totalMilk} lts</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">💧</span>
              <p className="text-sm">All time production: {totalMilk} lts</p>
            </div>
          </div>
        </div>

        {/* Income chart */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold mb-2">Income Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Income" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
