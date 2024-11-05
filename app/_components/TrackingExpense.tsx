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
import * as XLSX from "xlsx"; // Importer la bibliothèque xlsx

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type Expense = {
  name: string;
  amount: number;
};

export const TrackingExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setDuplicateError(false);

    if (!name || !amount) return;

    const normalizedName = name.trim().toLowerCase();
    const exists = expenses.some(expense => expense.name.toLowerCase().trim() === normalizedName);

    if (exists) {
      setDuplicateError(true);
      return; 
    } 

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { name, amount: parsedAmount },
    ]);

    setName("");
    setAmount("");
    setSubmitted(false); 
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

  // Fonction pour télécharger les dépenses en XLSX
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses.map(expense => ({
      Dépense: expense.name,
      Montant: expense.amount,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dépenses");
    XLSX.writeFile(workbook, "depenses.xlsx");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4 md:px-0 space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-muted rounded-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Type de dépense"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-foreground">
            Montant (en €)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            className="mt-1 block w-full px-4 py-2 border border-muted rounded-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Entrez le montant"
          />
        </div>

        {submitted && !name && (
          <div className="text-red-500 text-sm mt-2">
            Veuillez entrer un nom pour la dépense.
          </div>
        )}

        {submitted && !amount && (
          <div className="text-red-500 text-sm mt-2">
            Veuillez entrer un montant valide.
          </div>
        )}

        {submitted && duplicateError && (
          <div className="text-red-500 text-sm mt-2">
            Une dépense avec ce nom existe déjà. Veuillez choisir un autre nom.
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-white font-bold py-2 px-4 rounded-md bg-blue-600 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
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
            <table className="min-w-full border bg-base">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2 text-left text-foreground">Dépense</th>
                  <th className="border px-4 py-2 text-left text-foreground">Montant</th>
                  <th className="border px-4 py-2 text-left text-foreground">Pourcentage</th>
                  <th className="border px-4 py-2 text-left text-foreground"></th>
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
                <tr className="font-bold">
                  <td className="bg-muted border px-4 py-2 text-left text-foreground">Total</td>
                  <td className="bg-muted border px-4 py-2 text-left text-foreground">{totalAmount} €</td>
                  <td className="bg-muted border px-4 py-2 text-left text-foreground">100%</td>
                  <td className="border-transparent" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {expenses.length > 0 && (
        <Button
          onClick={downloadExcel}
          className="mt-4 text-white font-bold py-2 px-4 rounded-md bg-green-600 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          Télécharger en XLSX
        </Button>
      )}
    </div>
  );
};
