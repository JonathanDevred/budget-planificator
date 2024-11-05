"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from "@/components/ui/button"; 
import { Trash } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type Expense = {
  name: string;
  amount: number;
};

export const Hero = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const normalizedName = name.trim().toLowerCase();
    const exists = expenses.some(expense => expense.name.toLowerCase().trim() === normalizedName);

    if (exists) {
      setError("Ce type de dépense existe déjà."); 
      return;
    } else {
      setError(null); 
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Veuillez entrer un montant valide.");
      return;
    }

    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { name, amount: parsedAmount },
    ]);

    setName("");
    setAmount("");
};


  const handleDelete = (index: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const data = {
    labels: expenses.map((expense) => expense.name),
    datasets: [
      {
        data: expenses.map((expense) => ((expense.amount / totalAmount) * 100).toFixed(2)),
        backgroundColor: [
            "#4c6ef5", "#ffa94d", "#fa5252", "#51cf66", "#1c7ed6",
            "#7950f2", "#ff6b6b", "#20c997", "#fd7e14", "#f03e3e",
            "#c91e4b", "#e64980", "#007bff", "#6610f2", "#d63384"
        ],
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const percentage = tooltipItem.raw; 
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value) => `${value}%`,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4 md:px-0 space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Type de dépense"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Montant (en €)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Entrez le montant"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <Button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            disabled={!name || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
            >
            Ajouter au budget
        </Button>

      </form>

      {expenses.length > 0 && (
        <div className="flex flex-col md:flex-row mt-8 w-full max-w-4xl">
          <div className="flex-1">
            <Pie data={data} options={options} />
          </div>

          <div className="flex-1 overflow-x-auto mt-4 md:mt-0 md:ml-4">
            <table className="min-w-full border ">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2 text-left text-black">Dépense</th>
                    <th className="border px-4 py-2 text-left text-black">Montant</th>
                    <th className="border px-4 py-2 text-left text-black">Pourcentage</th>
                </tr>
            </thead>
              <tbody>

                {expenses.map((expense, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{expense.name}</td>
                    <td className="border px-4 py-2">{expense.amount} €</td>
                    <td className="border px-4 py-2">
                      {totalAmount > 0 ? ((expense.amount / totalAmount) * 100).toFixed(2) : '0.00'}%
                    </td>
                    <td className="border px-4 py-2">
                      <Button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                      <Trash />  
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                    <tr className=" font-bold">
                        <td className="bg-gray-300 border px-4 py-2 text-left text-black">Total</td>
                        <td className="bg-gray-300 border px-4 py-2 text-left text-black">{totalAmount} €</td>
                        <td className="bg-gray-300 border px-4 py-2 text-left text-black"> 100% </td>
                        <td className="border-transparent" />
                    </tr>
                </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
