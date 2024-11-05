"use client";

import React, { useState } from 'react';
import { FileDown, Trash } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';

const PlanningPage = () => {
  const [income, setIncome] = useState('');
  const [categories, setCategories] = useState<{ name: string; amount: number }[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryAmount, setCategoryAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddCategory = () => {
    const trimmedName = categoryName.trim();
    const amount = parseFloat(categoryAmount);

    if (!trimmedName || isNaN(amount) || amount <= 0) {
      setErrorMessage("Veuillez entrer un nom de catégorie valide et un montant positif.");
      return;
    }

    setCategories([...categories, { name: trimmedName, amount }]);
    setCategoryName('');
    setCategoryAmount('');
    setErrorMessage(''); 
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const totalExpenses = categories.reduce((total, category) => total + category.amount, 0);
  const remainingBalance = parseFloat(income) - totalExpenses || 0;

  // Fonction pour exporter en fichier Excel
  const handleExportExcel = () => {
    const worksheetData = [
      ["Catégorie", "Montant (€)"], 
      ...categories.map(category => [category.name, category.amount])
    ];
    worksheetData.push(["Total Dépenses", totalExpenses]);
    worksheetData.push(["Solde Restant", remainingBalance]);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Budget Mensuel");

    XLSX.writeFile(workbook, "Budget_Mensuel.xlsx");
  };

  return (
    <>
      <div className="p-4 max-w-[50%] mx-auto mt-4 border-2 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Planification Mensuelle</h1>

        <div className="mb-4">
          <label htmlFor="income" className="block mb-2">Revenus Totaux (€)</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => {
              const newIncome = e.target.value;
              setIncome(newIncome);
              if (parseFloat(newIncome) < 0) {
                setErrorMessage("Le revenu doit être un nombre positif.");
              } else {
                setErrorMessage('');
              }
            }}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">Ajouter une Catégorie</h2>
        <input
          type="text"
          placeholder="Nom de la Catégorie"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Montant (€)"
          value={categoryAmount}
          onChange={(e) => setCategoryAmount(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <button onClick={handleAddCategory} className="bg-blue-500 text-white rounded p-2">Ajouter</button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <table className="mt-4 w-full border">
          <thead>
            <tr>
              <th className="border p-2">Catégorie</th>
              <th className="border p-2">Montant (€)</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="border p-2 ml-4">{category.name}</td>
                <td className="border p-2 ml-4">{category.amount}</td>
                <td className="border p-2">
                  <Button
                    onClick={() => handleDeleteCategory(index)}
                    className="bg-red-500 text-white rounded p-1"
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p><strong>Total Dépenses : </strong>{totalExpenses} €</p>
          <p><strong>Solde Restant : </strong>{remainingBalance} €</p>
        </div>

        <Button onClick={handleExportExcel} className="bg-green-500 text-white rounded p-2 mt-4">
         <FileDown /> Télécharger en Excel
        </Button>
      </div>
    </>
  );
};

export default PlanningPage;
